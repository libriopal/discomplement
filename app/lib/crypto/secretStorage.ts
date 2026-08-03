/**
 * Client-side encryption-at-rest for secrets (API keys, GitHub tokens, git credentials)
 * that would otherwise be stored as plaintext in cookies/localStorage.
 *
 * Threat model: this protects against casual inspection of storage (devtools "Application"
 * tab, exported cookie dumps) and against an attacker who can only read storage (e.g. via a
 * storage-dump-style XSS, or someone with filesystem access to the browser profile). It is
 * NOT a defense against a fully compromised page that can call this module's own
 * encrypt/decrypt functions at runtime (a live XSS payload running in-page can always just
 * call decryptSecret() itself, same as it could call the app's own code to use the secret).
 *
 * How it works:
 * - A random AES-256-GCM key is generated once per browser profile with the Web Crypto API
 *   (`crypto.subtle`), created as `extractable: false` so it can never be exported/read back
 *   out as raw key material - not by this code, not by an attacker who gets a reference to it.
 * - The non-extractable CryptoKey object is stored directly in IndexedDB (IndexedDB supports
 *   storing CryptoKey via structured clone) rather than being serialized into a cookie or
 *   localStorage, which would defeat the purpose.
 * - Each encrypted value is stored as base64(iv || ciphertext), a compact string safe to put
 *   in a cookie or localStorage value.
 */

const DB_NAME = 'bolt_secret_storage';
const DB_VERSION = 1;
const STORE_NAME = 'keys';
const KEY_RECORD_ID = 'aes-gcm-key';
const IV_LENGTH_BYTES = 12;

let keyPromise: Promise<CryptoKey> | null = null;

function isCryptoAvailable(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.indexedDB !== 'undefined' &&
    typeof window.crypto !== 'undefined' &&
    typeof window.crypto.subtle !== 'undefined'
  );
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Failed to open secret storage database'));
  });
}

async function getStoredKey(db: IDBDatabase): Promise<CryptoKey | undefined> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(KEY_RECORD_ID);

    request.onsuccess = () => resolve(request.result as CryptoKey | undefined);
    request.onerror = () => reject(request.error ?? new Error('Failed to read secret key'));
  });
}

async function putKey(db: IDBDatabase, key: CryptoKey): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(key, KEY_RECORD_ID);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error('Failed to persist secret key'));
  });
}

async function getOrCreateKey(): Promise<CryptoKey> {
  if (!isCryptoAvailable()) {
    throw new Error(
      'Secret storage unavailable: Web Crypto API / IndexedDB not present in this environment. Refusing to store secrets in plaintext.',
    );
  }

  const db = await openDb();

  try {
    const existing = await getStoredKey(db);

    if (existing) {
      return existing;
    }

    const newKey = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    await putKey(db, newKey);

    return newKey;
  } finally {
    db.close();
  }
}

function getKey(): Promise<CryptoKey> {
  if (!keyPromise) {
    keyPromise = getOrCreateKey().catch((error) => {
      // Allow retrying on a later call instead of caching a permanent failure.
      keyPromise = null;
      throw error;
    });
  }

  return keyPromise;
}

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

// Prefix used to make it easy to recognize values produced by this module, and to
// distinguish them from legacy plaintext values during the migration window.
const ENCRYPTED_PREFIX = 'enc.v1.';

/**
 * Encrypts a plaintext secret string. Returns a compact string safe to store in a cookie or
 * localStorage value. Throws if Web Crypto / IndexedDB is unavailable (fail closed rather than
 * silently falling back to plaintext).
 */
export async function encryptSecret(plaintext: string): Promise<string> {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH_BYTES));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);

  return ENCRYPTED_PREFIX + bufferToBase64(combined);
}

/** Returns true if the given stored string looks like a value produced by encryptSecret(). */
export function isEncryptedSecret(stored: string | null | undefined): boolean {
  return typeof stored === 'string' && stored.startsWith(ENCRYPTED_PREFIX);
}

let hasWarnedAboutLegacyPlaintext = false;

function warnAboutLegacyPlaintextOnce() {
  if (!hasWarnedAboutLegacyPlaintext) {
    hasWarnedAboutLegacyPlaintext = true;
    console.warn(
      '[secretStorage] Found a secret stored as legacy plaintext (from before encryption-at-rest was added). ' +
        'It will keep working, but consider re-saving your API keys / GitHub credentials so they get encrypted.',
    );
  }
}

/**
 * Decrypts a value previously produced by encryptSecret(). If the value does not look like
 * ciphertext produced by this module (e.g. it's a legacy plaintext secret saved before this
 * feature existed), it is returned as-is and a one-time console warning is logged - existing
 * users should not get silently logged out / lose their saved credentials.
 */
export async function decryptSecret(stored: string): Promise<string> {
  if (!isEncryptedSecret(stored)) {
    warnAboutLegacyPlaintextOnce();
    return stored;
  }

  try {
    const key = await getKey();
    const combined = base64ToBuffer(stored.slice(ENCRYPTED_PREFIX.length));
    const iv = combined.slice(0, IV_LENGTH_BYTES);
    const ciphertext = combined.slice(IV_LENGTH_BYTES);
    const plaintextBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);

    return new TextDecoder().decode(plaintextBuffer);
  } catch (error) {
    /*
     * Decryption failed - most likely this is plaintext that happens to start with our prefix
     * (extremely unlikely), or the key changed (e.g. IndexedDB was cleared). Treat as legacy
     * plaintext rather than throwing, so we never hard-crash a read path over a stored secret.
     */
    console.warn('[secretStorage] Failed to decrypt stored secret, treating as legacy plaintext.', error);
    return stored;
  }
}
