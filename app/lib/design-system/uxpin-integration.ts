/**
 * UXPin Export Integration Guide
 * 
 * Step-by-step guide for importing UXPin designs into bolt.libriopal
 * Covers design tokens, components, and bicameral engine hookup
 */

export const UXPIN_INTEGRATION_WORKFLOW = `
╔════════════════════════════════════════════════════════════════════════════════╗
║              UXPin → React Implementation Integration Guide                    ║
║                    For Bicameral AI Design System                              ║
╚════════════════════════════════════════════════════════════════════════════════╝

PHASE 1: EXPORT FROM UXPIN
═══════════════════════════════════════════════════════════════════════════════

Step 1.1: Export Design Tokens
────────────────────────────────
In UXPin:
  1. Right-click design token library
  2. Select "Export Design Tokens"
  3. Choose format: "JSON (CSS Variables)"
  4. Save as: design-tokens.json

File location in your project:
  app/lib/design-system/tokens/design-tokens.json

Step 1.2: Export Components as React Code
──────────────────────────────────────────
In UXPin:
  1. Select "Component Library"
  2. Right-click on component group
  3. Choose "Export as React Components"
  4. Settings:
     - Framework: React 18+
     - TypeScript: Yes
     - Include Storybook stories: Yes
     - Format: ESM modules
  5. Download .zip file

Extract to:
  app/components/uxpin-exported/
  └── index.ts (barrel export)
  └── Button/
  └── Card/
  └── Modal/
  └── [other components]

Step 1.3: Export Interactive Prototype
──────────────────────────────────────
In UXPin:
  1. Click "Share Prototype"
  2. Generate public link (for team review)
  3. Download as "Clickthrough Prototype" (HTML)

Save prototype link for QA team:
  https://uxpin.com/prototype/[your-project-id]

PHASE 2: SETUP DESIGN TOKEN SYSTEM
═══════════════════════════════════════════════════════════════════════════════

Step 2.1: Configure Tailwind with Design Tokens
────────────────────────────────────────────────

File: tailwind.config.ts
\`\`\`typescript
import { tokens } from './app/lib/design-system/tokens/design-tokens';

export default {
  theme: {
    colors: {
      // Semantic Colors (Left Brain)
      'semantic': {
        'blue': tokens.colors.semanticBlue,
        'blue-light': tokens.colors.semanticBlueLite,
      },
      // Technical Colors (Right Brain)
      'technical': {
        'purple': tokens.colors.technicalPurple,
        'purple-light': tokens.colors.technicalPurpleLite,
      },
      // Bridge Colors (Corpus Callosum)
      'bridge': {
        'pink': tokens.colors.bridgePink,
        'success': tokens.colors.bridgeSuccess,
        'warning': tokens.colors.bridgeWarning,
      },
    },
    spacing: {
      ...tokens.spacing,
    },
    fontSize: {
      ...tokens.typography.sizes,
    },
    borderRadius: {
      ...tokens.borderRadius,
    },
    boxShadow: {
      ...tokens.shadows,
    },
  },
};
\`\`\`

Step 2.2: Create Token Export Utility
──────────────────────────────────────

File: app/lib/design-system/tokens/index.ts
\`\`\`typescript
// Re-export parsed design tokens from UXPin
import tokenData from './design-tokens.json';

export const designTokens = {
  colors: {
    // Semantic (Left Brain)
    semanticBlue: '#4F46E5',
    semanticBlueLite: '#6366F1',
    semanticBlueFaded: '#818CF8',
    
    // Technical (Right Brain)
    technicalPurple: '#8B5CF6',
    technicalPurpleLite: '#A78BFA',
    technicalPurpleFaded: '#C4B5FD',
    
    // Bridge (Corpus Callosum)
    bridgePink: '#EC4899',
    bridgeSuccess: '#10B981',
    bridgeWarning: '#EF4444',
    
    // Neutrals
    bg: {
      light: '#FFFFFF',
      gray50: '#F9FAFB',
      gray100: '#F3F4F6',
      gray900: '#111827',
    },
    text: {
      primary: '#1F2937',
      secondary: '#374151',
      muted: '#6B7280',
    },
  },
  
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },
  
  typography: {
    h1: { size: '36px', weight: 700, lineHeight: '1.2' },
    h2: { size: '28px', weight: 600, lineHeight: '1.3' },
    h3: { size: '20px', weight: 600, lineHeight: '1.4' },
    body: { size: '14px', weight: 400, lineHeight: '1.6' },
    small: { size: '12px', weight: 400, lineHeight: '1.5' },
    code: { size: '13px', weight: 400, lineHeight: '1.5', font: 'Fira Code' },
  },
  
  borderRadius: {
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px - GEOMETRIC DEFAULT
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.1)',
  },
};

export type DesignTokens = typeof designTokens;
\`\`\`

PHASE 3: INTEGRATE EXPORTED COMPONENTS
═══════════════════════════════════════════════════════════════════════════════

Step 3.1: Setup Component Barrel Exports
────────────────────────────────────────

File: app/components/uxpin-exported/index.ts
\`\`\`typescript
// Auto-export all UXPin components
export { Button, type ButtonProps } from './Button';
export { Card, type CardProps } from './Card';
export { Modal, type ModalProps } from './Modal';
export { Drawer, type DrawerProps } from './Drawer';
export { Badge, type BadgeProps } from './Badge';
export { ProgressBar, type ProgressBarProps } from './ProgressBar';
export { Toast, type ToastProps } from './Toast';
export { ResearchCitationCard } from './ResearchCitationCard';
export { CodeModuleCard } from './CodeModuleCard';
export { LatticeVisualization } from './LatticeVisualization';
export { ResonanceMeter } from './ResonanceMeter';
export { LeftSidebar, type LeftSidebarProps } from './LeftSidebar';
export { RightSidebar, type RightSidebarProps } from './RightSidebar';
export { ApprovalCheckpoint, type ApprovalCheckpointProps } from './ApprovalCheckpoint';
\`\`\`

Step 3.2: Enhance Exported Components with Logic
─────────────────────────────────────────────────

Create wrappers that connect UXPin components to bicameral engine:

File: app/components/bicameral/ResearchCitationCardContainer.tsx
\`\`\`typescript
import { ResearchCitationCard } from '../uxpin-exported';
import type { MemoryNode } from '~/lib/lattice/memory-cloud';

interface Props {
  node: MemoryNode;
  isSelected: boolean;
  onSelect: (nodeId: string) => void;
}

export function ResearchCitationCardContainer({ node, isSelected, onSelect }: Props) {
  const citation = node.metadata.researchCitations?.[0] || '';
  
  return (
    <ResearchCitationCard
      title={node.content}
      citation={citation}
      citations={node.metadata.researchCitations?.length || 0}
      isSelected={isSelected}
      onClick={() => onSelect(node.id)}
    />
  );
}
\`\`\`

File: app/components/bicameral/CodeModuleCardContainer.tsx
\`\`\`typescript
import { CodeModuleCard } from '../uxpin-exported';
import type { CodeStructure } from '~/lib/lattice/bicameral-engine';

interface Props {
  module: CodeStructure['keyModules'][0];
  status: 'planned' | 'in-progress' | 'completed' | 'error';
  onEdit: () => void;
}

export function CodeModuleCardContainer({ module, status, onEdit }: Props) {
  return (
    <CodeModuleCard
      name={module.name}
      responsibility={module.responsibility}
      dependencies={module.dependencies}
      status={status}
      onEdit={onEdit}
    />
  );
}
\`\`\`

Step 3.3: Create Lattice Visualization Wrapper
───────────────────────────────────────────────

File: app/components/bicameral/LatticeVisualizationContainer.tsx
\`\`\`typescript
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { MemoryLattice } from '~/lib/lattice/memory-cloud';

interface Props {
  lattice: MemoryLattice;
  onNodeClick?: (nodeId: string) => void;
  isMobile?: boolean;
}

export function LatticeVisualizationContainer({ lattice, onNodeClick, isMobile }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (isMobile) {
      // Simplified 2D version for mobile
      render2DLattice(containerRef.current, lattice);
    } else {
      // Full 3D version for desktop
      render3DLattice(containerRef.current, lattice, onNodeClick);
    }
  }, [lattice, isMobile]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-semantic-blue overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
}

function render3DLattice(
  container: HTMLDivElement,
  lattice: MemoryLattice,
  onNodeClick?: (nodeId: string) => void
) {
  // Setup Three.js scene
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf9fafb);
  scene.fog = new THREE.Fog(0xf9fafb, 1000, 4000);

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(100, 75, 150);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create nodes
  lattice.nodes.forEach((node) => {
    const color =
      node.type === 'design' ? 0x4f46e5 : node.type === 'code' ? 0x8b5cf6 : 0xec4899;
    const geometry = new THREE.SphereGeometry(8, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(node.position.x, node.position.y, node.position.z);
    sphere.userData = { nodeId: node.id };

    scene.add(sphere);
  });

  // Create edges (connections)
  lattice.edges.forEach((edge) => {
    const fromNode = lattice.nodes.get(edge.fromId);
    const toNode = lattice.nodes.get(edge.toId);

    if (fromNode && toNode) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array([
            fromNode.position.x,
            fromNode.position.y,
            fromNode.position.z,
            toNode.position.x,
            toNode.position.y,
            toNode.position.z,
          ]),
          3
        )
      );

      const color = edge.type === 'semantic-flow' ? 0x4f46e5 : 0x8b5cf6;
      const material = new THREE.LineBasicMaterial({ color, linewidth: 2 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    }
  });

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(100, 100, 100);
  scene.add(directionalLight);

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Subtle rotation
    scene.rotation.x += 0.0001;
    scene.rotation.y += 0.0002;

    renderer.render(scene, camera);
  };

  animate();

  // Cleanup on unmount
  return () => {
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
}

function render2DLattice(container: HTMLDivElement, lattice: MemoryLattice) {
  const canvas = document.createElement('canvas');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  const ctx = canvas.getContext('2d')!;
  container.appendChild(canvas);

  // Draw edges
  ctx.strokeStyle = 'rgba(79, 70, 229, 0.3)';
  ctx.lineWidth = 2;
  lattice.edges.forEach((edge) => {
    const from = lattice.nodes.get(edge.fromId);
    const to = lattice.nodes.get(edge.toId);
    if (from && to) {
      ctx.beginPath();
      ctx.moveTo(from.position.x + canvas.width / 2, from.position.y + canvas.height / 2);
      ctx.lineTo(to.position.x + canvas.width / 2, to.position.y + canvas.height / 2);
      ctx.stroke();
    }
  });

  // Draw nodes
  lattice.nodes.forEach((node) => {
    const color = node.type === 'design' ? '#4f46e5' : node.type === 'code' ? '#8b5cf6' : '#ec4899';
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.position.x + canvas.width / 2, node.position.y + canvas.height / 2, 8, 0, Math.PI * 2);
    ctx.fill();
  });
}
\`\`\`

PHASE 4: CREATE BICAMERAL LAYOUT COMPONENT
═══════════════════════════════════════════════════════════════════════════════

File: app/components/bicameral/BicameralLayout.tsx
\`\`\`typescript
'use client';

import { useState } from 'react';
import type { DesignSpecification, CodeImplementation } from '~/lib/lattice/bicameral-engine';
import type { MemoryLattice } from '~/lib/lattice/memory-cloud';
import { LeftSidebar, RightSidebar } from '../uxpin-exported';
import { LatticeVisualizationContainer } from './LatticeVisualizationContainer';
import { ApprovalCheckpointContainer } from './ApprovalCheckpointContainer';
import { useMediaQuery } from '~/lib/hooks/useMediaQuery';

interface Props {
  specification: DesignSpecification;
  implementation?: CodeImplementation;
  lattice?: MemoryLattice;
  totalCreditsUsed: number;
  onApprove: (comments: string) => Promise<void>;
}

export function BicameralLayout({
  specification,
  implementation,
  lattice,
  totalCreditsUsed,
  onApprove,
}: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
  const [showApprovalModal, setShowApprovalModal] = useState(
    specification.approvalStatus === 'pending'
  );

  if (isMobile) {
    // Mobile: Stacked layout with bottom sheets
    return (
      <div className="flex flex-col h-screen w-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Bolt Bicameral</h1>
          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            📚
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {lattice ? (
            <LatticeVisualizationContainer lattice={lattice} isMobile={true} />
          ) : (
            <div className="p-4 text-center text-gray-500">Awaiting design phase...</div>
          )}
        </main>

        {/* Bottom Sheet - Left Sidebar */}
        {leftSidebarOpen && (
          <LeftSidebar
            specification={specification}
            onClose={() => setLeftSidebarOpen(false)}
          />
        )}

        {/* Bottom Sheet - Right Sidebar */}
        {rightSidebarOpen && implementation && (
          <RightSidebar
            implementation={implementation}
            creditsUsed={totalCreditsUsed}
            onClose={() => setRightSidebarOpen(false)}
          />
        )}

        {/* Approval Modal */}
        {showApprovalModal && (
          <ApprovalCheckpointContainer
            specification={specification}
            onApprove={async (comments) => {
              await onApprove(comments);
              setShowApprovalModal(false);
            }}
            onReject={() => setShowApprovalModal(false)}
          />
        )}
      </div>
    );
  }

  if (isTablet) {
    // Tablet: 2-column with collapsible sidebars
    return (
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Bolt Bicameral</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className={`px-4 py-2 rounded-lg ${leftSidebarOpen ? 'bg-semantic-blue text-white' : 'bg-gray-100'}`}
            >
              Design
            </button>
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className={`px-4 py-2 rounded-lg ${rightSidebarOpen ? 'bg-technical-purple text-white' : 'bg-gray-100'}`}
            >
              Code
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          {leftSidebarOpen && (
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <LeftSidebar
                specification={specification}
                onClose={() => setLeftSidebarOpen(false)}
              />
            </div>
          )}

          {/* Center Lattice */}
          <main className="flex-1 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            {lattice ? (
              <LatticeVisualizationContainer lattice={lattice} isMobile={false} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Awaiting design and code phases...
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          {rightSidebarOpen && implementation && (
            <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
              <RightSidebar
                implementation={implementation}
                creditsUsed={totalCreditsUsed}
                onClose={() => setRightSidebarOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Approval Modal */}
        {showApprovalModal && (
          <ApprovalCheckpointContainer
            specification={specification}
            onApprove={async (comments) => {
              await onApprove(comments);
              setShowApprovalModal(false);
            }}
            onReject={() => setShowApprovalModal(false)}
          />
        )}
      </div>
    );
  }

  // Desktop: Full 3-column layout
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-semantic-blue to-technical-purple rounded-lg" />
          <h1 className="text-2xl font-bold text-gray-900">Bolt Bicameral</h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>Credits Used: <strong>{totalCreditsUsed.toFixed(4)}</strong></span>
          <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            ⚙️ Settings
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Design Thinking */}
        <aside className="w-80 bg-gradient-to-b from-blue-50 to-white border-r-2 border-semantic-blue overflow-y-auto">
          <LeftSidebar specification={specification} />
        </aside>

        {/* Center - Lattice Visualization */}
        <main className="flex-1 bg-gradient-to-br from-blue-50 via-purple-50 to-white p-6 overflow-hidden">
          {lattice ? (
            <LatticeVisualizationContainer lattice={lattice} isMobile={false} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-4">🧠</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Awaiting Phases...</h2>
              <p className="text-gray-600">Design phase will initialize when you submit a prompt</p>
            </div>
          )}
        </main>

        {/* Right Sidebar - Code Implementation */}
        <aside className="w-80 bg-gradient-to-b from-purple-50 to-white border-l-2 border-technical-purple overflow-y-auto">
          {implementation ? (
            <RightSidebar
              implementation={implementation}
              creditsUsed={totalCreditsUsed}
            />
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>Code generation pending design approval...</p>
            </div>
          )}
        </aside>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <ApprovalCheckpointContainer
          specification={specification}
          onApprove={async (comments) => {
            await onApprove(comments);
            setShowApprovalModal(false);
          }}
          onReject={() => setShowApprovalModal(false)}
        />
      )}
    </div>
  );
}
\`\`\`

PHASE 5: HOOK UP TO BICAMERAL ENGINE
═══════════════════════════════════════════════════════════════════════════════

File: app/routes/bicameral.tsx
\`\`\`typescript
'use client';

import { useState } from 'react';
import type { MetaFunction } from '@remix-run/cloudflare';
import { CohereClientV2 } from 'cohere-sdk';
import { executePromptToApp } from '~/lib/lattice/bicameral-engine';
import { BicameralLayout } from '~/components/bicameral/BicameralLayout';

export const meta: MetaFunction = () => [
  { title: 'Bicameral AI - Prompt to App' },
  { name: 'description', content: 'Split-brain design-to-code pipeline with Scite + Cohere' },
];

export default function BicameralPage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const cohereClient = new CohereClientV2({
        token: process.env.VITE_COHERE_API_KEY,
      });

      const result = await executePromptToApp(
        prompt,
        cohereClient,
        async (spec) => {
          // Auto-approve for demo, or show UI approval modal
          return true;
        }
      );

      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      {!result ? (
        // Landing / Input Phase
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-semantic-blue to-technical-purple bg-clip-text text-transparent">
                Bolt Bicameral AI
              </h1>
              <p className="text-gray-600">
                Prompt → Research-backed Design → Code Implementation
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-semantic-blue p-6 shadow-lg">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your app idea... (e.g., 'Create a mobile-friendly task management app with real-time collaboration')"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-semantic-blue resize-none"
              />

              <button
                onClick={handleSubmitPrompt}
                disabled={loading || !prompt.trim()}
                className={`w-full mt-4 py-3 rounded-lg font-semibold text-white transition ${
                  loading || !prompt.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-semantic-blue to-technical-purple hover:shadow-lg'
                }`}
              >
                {loading ? '🧠 Processing...' : '✨ Start Bicameral Pipeline'}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-2xl mb-2">📚</div>
                <p className="text-gray-600">Research-backed</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🧠</div>
                <p className="text-gray-600">Split-brain AI</p>
              </div>
              <div>
                <div className="text-2xl mb-2">💰</div>
                <p className="text-gray-600">Credit efficient</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Results Phase - Show Bicameral Layout
        <BicameralLayout
          specification={result.design}
          implementation={result.implementation}
          lattice={result.lattice}
          totalCreditsUsed={result.totalCreditsUsed}
          onApprove={async (comments) => {
            console.log('Approved with comments:', comments);
            // Handle approval logic
          }}
        />
      )}
    </div>
  );
}
\`\`\`

PHASE 6: DEPLOYMENT CHECKLIST
═══════════════════════════════════════════════════════════════════════════════

Pre-Launch Testing:
  □ Components render correctly (desktop, tablet, mobile)
  □ Lattice visualization renders smoothly (60fps)
  □ Scite API integration working
  □ Cohere API integration working (with API key)
  □ Design tokens applied consistently
  □ Dark mode toggle functioning
  □ Approval workflows triggering correctly
  □ Credit tracking accurate
  □ Mobile responsiveness tested
  □ Accessibility audit passed (Axe)
  □ Performance metrics checked (Lighthouse)

Environment Variables:
  VITE_COHERE_API_KEY=your_cohere_key_here
  VITE_SCITE_API_KEY=optional_scite_key

Deployment:
  □ Build passes: pnpm run build
  □ TypeScript types pass: pnpm run typecheck
  □ Tests pass: pnpm run test
  □ Deploy to Cloudflare Pages or Vercel
  □ Smoke test on production URL
  □ Monitor error logs & performance

═══════════════════════════════════════════════════════════════════════════════
NEXT STEPS IN UXPin
═══════════════════════════════════════════════════════════════════════════════

1. ✅ Copy the design brief prompt into UXPin
2. ✅ Create 5 key pages in UXPin:
     - Landing / Input Page
     - Design Phase Panel
     - Code Implementation Panel
     - Lattice Visualization (simplified 2D)
     - Approval Checkpoint Modal

3. ✅ Build component library:
     - 20-30 reusable components
     - Geometric border radius (16px default)
     - Semantic + Technical color schemes
     - Responsive variants

4. ✅ Export from UXPin:
     - Design tokens as JSON
     - React components as .ts files
     - Interactive prototype link

5. ✅ Follow this integration guide to connect:
     - Import design tokens to Tailwind
     - Use exported components in React
     - Hook up to bicameral-engine.ts
     - Deploy!

═══════════════════════════════════════════════════════════════════════════════
`;

export const QUICK_START_COMMANDS = `
# Install dependencies
pnpm install

# Add UXPin exported components
mkdir -p app/components/uxpin-exported

# Add design system setup
mkdir -p app/lib/design-system/tokens

# Create design token file from UXPin export
cp /path/to/uxpin-export/design-tokens.json app/lib/design-system/tokens/

# Update Tailwind config
# (See PHASE 2 step 2.1 above)

# Create component wrappers
touch app/components/bicameral/ResearchCitationCardContainer.tsx
touch app/components/bicameral/CodeModuleCardContainer.tsx
touch app/components/bicameral/LatticeVisualizationContainer.tsx
touch app/components/bicameral/BicameralLayout.tsx

# Add bicameral route
touch app/routes/bicameral.tsx

# Set environment variables
echo "VITE_COHERE_API_KEY=your_key" >> .env.local

# Build and test
pnpm run build
pnpm run dev

# Navigate to: http://localhost:5173/bicameral
`;
