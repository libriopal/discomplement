import { CohereClientV2 } from 'cohere-sdk';

let cohereClient: CohereClientV2 | null = null;

export function getCohereClient() {
  if (!cohereClient) {
    const apiKey = process.env.COHERE_API_KEY;
    if (!apiKey) {
      throw new Error('COHERE_API_KEY environment variable is not set');
    }

    cohereClient = new CohereClientV2({
      token: apiKey,
    });
  }
  return cohereClient;
}

export interface GovernanceConfig {
  enableContentModeration: boolean;
  enablePIIDetection: boolean;
  enableBiasDetection: boolean;
  customRules?: string[];
}

export async function analyzeWithGovernance(
  text: string,
  config: GovernanceConfig
): Promise<{ safe: boolean; violations: string[]; confidence: number }> {
  try {
    const client = getCohereClient();

    // Check for harmful content using Cohere API
    const response = await client.generate({
      model: 'command-r-plus',
      prompt: `You are a content safety analyzer. Analyze the following text for harmful content, PII, and bias. Return a JSON object with:
{
  "safe": boolean,
  "violations": ["violation1", "violation2"],
  "confidence": number (0-1)
}

Text to analyze:
"${text.replace(/"/g, '\\"')}"

${
  config.enableContentModeration
    ? 'Check for: hate speech, violence, illegal activities, adult content.'
    : ''
}
${config.enablePIIDetection ? 'Check for: emails, phone numbers, addresses, SSNs, credit cards.' : ''}
${config.enableBiasDetection ? 'Check for: stereotypes, unfair generalizations, discriminatory language.' : ''}

Respond only with the JSON object.`,
      maxTokens: 200,
    });

    const content = response.generations?.[0]?.text || '';
    const result = JSON.parse(content);

    return result;
  } catch (error) {
    console.error('Governance analysis error:', error);
    return {
      safe: true,
      violations: [],
      confidence: 0,
    };
  }
}

export async function generateWithGovernance(
  prompt: string,
  config: GovernanceConfig
): Promise<{ text: string; governance: any }> {
  const client = getCohereClient();

  // First check input
  const inputAnalysis = await analyzeWithGovernance(prompt, config);

  if (!inputAnalysis.safe && config.enableContentModeration) {
    throw new Error(`Input violates governance policy: ${inputAnalysis.violations.join(', ')}`);
  }

  // Generate with Cohere
  const response = await client.generate({
    model: 'command-r-plus',
    prompt,
    maxTokens: 500,
  });

  const generatedText = response.generations?.[0]?.text || '';

  // Check output
  const outputAnalysis = await analyzeWithGovernance(generatedText, config);

  return {
    text: generatedText,
    governance: {
      input: inputAnalysis,
      output: outputAnalysis,
      compliant: outputAnalysis.safe,
    },
  };
}