/**
 * Bicameral AI Engine
 * 
 * Split-brain architecture:
 * - Left Brain: Semantic design thinking (Scite research → Design specifications)
 * - Right Brain: Code implementation (Technical planning → Execution)
 * - Corpus Callosum: Lattice memory connecting both sides
 * 
 * Prioritizes Scite (free) → Local processing → Cohere (paid, sparingly)
 */

import type { CohereClientV2 } from 'cohere-sdk';
import {
  type MemoryNode,
  type MemoryLattice,
  type CreditUsage,
  fetchSciteResearch,
  createResearchNode,
  embedCriticalNode,
  computeLatticePositions,
  buildLattice,
  queryLattice,
  calculateCreditUsage,
  runParallelReasoning,
} from './memory-cloud';

export interface DesignSpecification {
  id: string;
  title: string;
  researchBasis: string[];
  requirements: string[];
  architectureNotes: string;
  targetAudience: string;
  successMetrics: string[];
  approvalStatus: 'pending' | 'approved' | 'rejected' | 'revision_requested';
  createdAt: Date;
  approvedAt?: Date;
  executionPlan: string;
}

export interface CodeStructure {
  language: string;
  framework: string;
  keyModules: Array<{
    name: string;
    responsibility: string;
    dependencies: string[];
  }>;
  fileStructure: string;
  apiIntegrations: string[];
  dataModels: string[];
}

export interface CodeImplementation {
  id: string;
  specification: DesignSpecification;
  codeStructure: CodeStructure;
  generatedCode: string;
  testingStrategy: string;
  deploymentPlan: string;
  securityConsiderations: string[];
  performanceOptimizations: string[];
  creditsCost: number;
  createdAt: Date;
}

export interface ApprovalCheckpoint {
  phase: 'design' | 'implementation' | 'testing' | 'deployment';
  status: 'pending' | 'approved' | 'blocked';
  reviewer?: string;
  comments?: string;
  timestamp: Date;
}

/**
 * LEFT BRAIN: Design Thinking Phase
 * Uses Scite for research-backed design WITHOUT Cohere costs
 * 
 * Flow:
 * 1. Parse user prompt
 * 2. Search Scite for relevant research/papers
 * 3. Extract requirements from research + prompt
 * 4. Build design specification grounded in research
 * 5. Generate architecture recommendations
 */
export async function designThinkingPhase(userPrompt: string): Promise<{
  node: MemoryNode;
  specification: DesignSpecification;
  creditUsage: CreditUsage;
}> {
  const creditUsage: CreditUsage = {
    sciteLookups: 1,
    cohereEmbeddings: 0,
    cohereGenerations: 0,
    estimatedCost: 0,
  };

  try {
    console.log('[LEFT BRAIN] Design Thinking Phase Started');
    console.log('[LEFT BRAIN] Fetching Scite research...');

    // Step 1: Research via Scite (FREE - no API credits burned)
    const sciteResults = await fetchSciteResearch(userPrompt);
    creditUsage.sciteLookups++;

    console.log(`[LEFT BRAIN] Found ${sciteResults.papers.length} research papers`);

    // Step 2: Create design node with research citations
    const designNode = createResearchNode(userPrompt, sciteResults, 'design');

    // Step 3: Extract requirements and architecture (local processing, FREE)
    const requirements = extractRequirementsFromPrompt(userPrompt);
    const archNotes = generateArchitectureNotes(userPrompt);
    const audience = identifyTargetAudience(userPrompt);
    const metrics = defineSuccessMetrics(userPrompt);

    // Step 4: Build comprehensive specification
    const specification: DesignSpecification = {
      id: `spec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: `Design: ${userPrompt.substring(0, 50)}...`,
      researchBasis: sciteResults.citations,
      requirements,
      architectureNotes: archNotes,
      targetAudience: audience,
      successMetrics: metrics,
      approvalStatus: 'pending',
      createdAt: new Date(),
      executionPlan: '',
    };

    console.log('[LEFT BRAIN] Design specification generated');
    console.log(`[LEFT BRAIN] Requirements: ${requirements.length}`);
    console.log(`[LEFT BRAIN] Research citations: ${sciteResults.citations.length}`);

    return {
      node: designNode,
      specification,
      creditUsage: calculateCreditUsage(creditUsage),
    };
  } catch (error) {
    console.error('[LEFT BRAIN] Design thinking phase failed:', error);
    throw error;
  }
}

/**
 * RIGHT BRAIN: Code Implementation Phase
 * Uses Cohere ONLY for code generation and planning
 * Only executes after design approval
 * 
 * Flow:
 * 1. Validate design approval
 * 2. Generate code structure via Cohere (PAID - 1 call)
 * 3. Plan testing strategy via Cohere (PAID - 1 call)
 * 4. Create execution plan
 * 5. Build full implementation spec
 */
export async function codeImplementationPhase(
  specification: DesignSpecification,
  cohereClient: CohereClientV2
): Promise<{
  node: MemoryNode;
  implementation: CodeImplementation;
  creditUsage: CreditUsage;
}> {
  const creditUsage: CreditUsage = {
    sciteLookups: 0,
    cohereEmbeddings: 0,
    cohereGenerations: 2, // 2 Cohere API calls only
    estimatedCost: 0,
  };

  try {
    console.log('[RIGHT BRAIN] Code Implementation Phase Started');

    // Validate approval
    if (specification.approvalStatus !== 'approved') {
      throw new Error(
        `Cannot proceed with code generation. Specification status: ${specification.approvalStatus}`
      );
    }

    console.log('[RIGHT BRAIN] Design approved. Starting code generation...');

    // Step 1: Generate code structure via Cohere (PAID CALL #1)
    console.log('[RIGHT BRAIN] Generating code structure (Cohere API Call #1)...');
    const structurePrompt = buildCodeStructurePrompt(specification);

    const structureResponse = await cohereClient.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: structurePrompt,
        },
      ],
      maxTokens: 1000,
    });

    const structureText =
      structureResponse.message.content[0].type === 'text'
        ? structureResponse.message.content[0].text
        : '';
    const codeStructure = parseCodeStructure(structureText, specification);

    console.log(`[RIGHT BRAIN] Code structure generated with ${codeStructure.keyModules.length} modules`);

    // Step 2: Generate testing strategy via Cohere (PAID CALL #2)
    console.log('[RIGHT BRAIN] Generating testing strategy (Cohere API Call #2)...');
    const testingPrompt = buildTestingPrompt(codeStructure, specification);

    const testingResponse = await cohereClient.chat({
      model: 'command-r',
      messages: [
        {
          role: 'user',
          content: testingPrompt,
        },
      ],
      maxTokens: 500,
    });

    const testingStrategy =
      testingResponse.message.content[0].type === 'text'
        ? testingResponse.message.content[0].text
        : '';

    console.log('[RIGHT BRAIN] Testing strategy generated');

    // Step 3: Create code node for lattice
    const codeNode: MemoryNode = {
      id: `code_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'code',
      content: `Implementation for: ${specification.title}`,
      metadata: {
        source: 'cohere',
        researchCitations: specification.researchBasis,
        timestamp: new Date(),
        confidence: 0.85,
        parentNodeIds: [],
        childNodeIds: [],
      },
      position: { x: 0, y: 100, z: 100 },
    };

    // Step 4: Build deployment plan (local processing, FREE)
    const deploymentPlan = generateDeploymentPlan(codeStructure, specification);
    const securityConsiderations = extractSecurityConsiderations(specification);
    const performanceOptimizations = extractPerformanceOptimizations(codeStructure);

    // Step 5: Create implementation spec
    const implementation: CodeImplementation = {
      id: `impl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      specification,
      codeStructure,
      generatedCode: '', // Generated on-demand later
      testingStrategy,
      deploymentPlan,
      securityConsiderations,
      performanceOptimizations,
      creditsCost: creditUsage.cohereGenerations * 0.002, // Approximate cost
      createdAt: new Date(),
    };

    console.log('[RIGHT BRAIN] Implementation spec generated');
    console.log(`[RIGHT BRAIN] Estimated credits used: ${creditUsage.cohereGenerations}`);

    return {
      node: codeNode,
      implementation,
      creditUsage: calculateCreditUsage(creditUsage),
    };
  } catch (error) {
    console.error('[RIGHT BRAIN] Code implementation phase failed:', error);
    throw error;
  }
}

/**
 * CORPUS CALLOSUM: Lattice Bridge Phase
 * Connects design and code nodes in geometric memory space
 * Verifies resonance between semantic and code thinking
 * 
 * Creates a unified memory lattice where both sides communicate
 */
export async function connectLattice(
  designNode: MemoryNode,
  codeNode: MemoryNode,
  specification: DesignSpecification,
  implementation: CodeImplementation,
  cohereClient: CohereClientV2
): Promise<{
  lattice: MemoryLattice;
  resonanceScore: number;
  alignmentReport: string;
  recommendations: string[];
}> {
  try {
    console.log('[CORPUS CALLOSUM] Connecting design and code hemispheres...');

    // Position nodes in 3D lattice space
    const positionedNodes = computeLatticePositions([designNode, codeNode]);
    const lattice = buildLattice(positionedNodes);

    console.log('[CORPUS CALLOSUM] Lattice structure created');
    console.log(`[CORPUS CALLOSUM] Centroid position: (${lattice.centroid.x.toFixed(2)}, ${lattice.centroid.y.toFixed(2)}, ${lattice.centroid.z.toFixed(2)})`);

    // Run parallel reasoning to verify alignment
    const reasoning = await runParallelReasoning(
      `Design: ${specification.requirements.join(', ')}`,
      `Implement: ${implementation.codeStructure.keyModules.map((m) => m.name).join(', ')}`,
      cohereClient
    );

    const resonanceScore = reasoning.resonanceAlignment;
    const recommendations: string[] = [];

    // Analyze resonance and provide recommendations
    if (resonanceScore < 0.4) {
      recommendations.push(
        '⚠️  LOW RESONANCE: Design and code thinking diverging. Recommend design iteration before implementation.'
      );
    } else if (resonanceScore < 0.65) {
      recommendations.push(
        '⚡ MODERATE RESONANCE: Consider aligning requirements with implementation modules.'
      );
    } else {
      recommendations.push(
        '✅ HIGH RESONANCE: Design and implementation well-aligned. Proceed with confidence.'
      );
    }

    // Additional validation checks
    if (specification.researchBasis.length === 0) {
      recommendations.push('💡 Add academic/technical citations to strengthen design foundation.');
    }

    if (implementation.codeStructure.keyModules.length < 3) {
      recommendations.push('⚙️  Consider breaking implementation into more focused modules.');
    }

    if (!specification.successMetrics || specification.successMetrics.length === 0) {
      recommendations.push('📊 Define clear success metrics for this implementation.');
    }

    const alignmentReport = `
═══════════════════════════════════════════════════════════
BICAMERAL ALIGNMENT REPORT
═══════════════════════════════════════════════════════════

Design Hemisphere (Semantic):
  • Requirements: ${specification.requirements.length}
  • Research Citations: ${specification.researchBasis.length}
  • Target Audience: ${specification.targetAudience}
  • Success Metrics: ${specification.successMetrics.length}

Code Hemisphere (Implementation):
  • Modules: ${implementation.codeStructure.keyModules.length}
  • Framework: ${implementation.codeStructure.framework}
  • API Integrations: ${implementation.codeStructure.apiIntegrations.length}
  • Data Models: ${implementation.codeStructure.dataModels.length}

Resonance Score: ${(resonanceScore * 100).toFixed(1)}%
Lattice Centroid: (${lattice.centroid.x.toFixed(2)}, ${lattice.centroid.y.toFixed(2)}, ${lattice.centroid.z.toFixed(2)})

═══════════════════════════════════════════════════════════
REASONING ALIGNMENT
═══════════════════════════════════════════════════════════

Design Thinking:
${reasoning.designThinking.substring(0, 300)}...

Code Thinking:
${reasoning.codeThinking.substring(0, 300)}...

═══════════════════════════════════════════════════════════
    `;

    console.log('[CORPUS CALLOSUM] Lattice connection complete');
    console.log(`[CORPUS CALLOSUM] Resonance Score: ${(resonanceScore * 100).toFixed(1)}%`);

    return {
      lattice,
      resonanceScore,
      alignmentReport,
      recommendations,
    };
  } catch (error) {
    console.error('[CORPUS CALLOSUM] Lattice connection failed:', error);
    throw error;
  }
}

/**
 * FULL PIPELINE: Prompt → Design → Code → Approved Execution
 * 
 * Main orchestrator that runs the complete bicameral flow:
 * 1. Design thinking (Scite research, no cost)
 * 2. Approval checkpoint (human decision)
 * 3. Code implementation (Cohere, minimal cost)
 * 4. Lattice connection (verify alignment)
 * 5. Execution plan generation
 */
export async function executePromptToApp(
  userPrompt: string,
  cohereClient: CohereClientV2,
  approvalCallback?: (spec: DesignSpecification) => Promise<boolean>
): Promise<{
  design: DesignSpecification;
  implementation?: CodeImplementation;
  lattice?: MemoryLattice;
  alignmentReport?: string;
  recommendations?: string[];
  totalCreditsUsed: number;
  executionApproved: boolean;
  executionPlan?: string;
}> {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     PROMPT-TO-APP BICAMERAL PIPELINE INITIALIZED          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  let totalCredits = 0;
  const checkpoints: ApprovalCheckpoint[] = [];

  try {
    // ─────────────────────────────────────────────────
    // PHASE 1: DESIGN THINKING (Left Brain)
    // ─────────────────────────────────────────────────
    console.log('\n[PHASE 1] DESIGN THINKING - Research-Backed Specification');
    const designPhase = await designThinkingPhase(userPrompt);
    totalCredits += designPhase.creditUsage.estimatedCost;
    let specification = designPhase.specification;

    checkpoints.push({
      phase: 'design',
      status: 'pending',
      timestamp: new Date(),
    });

    // ─────────────────────────────────────────────────
    // CHECKPOINT 1: Design Approval
    // ─────────────────────────────────────────────────
    console.log('\n[CHECKPOINT 1] DESIGN APPROVAL');
    console.log('Awaiting review of design specification...');

    let approved = false;
    if (approvalCallback) {
      approved = await approvalCallback(specification);
    }

    if (!approved) {
      console.log('❌ Design specification REJECTED or PENDING');
      checkpoints[0].status = 'blocked';

      return {
        design: specification,
        totalCreditsUsed: totalCredits,
        executionApproved: false,
        checkpoints,
      } as any;
    }

    specification.approvalStatus = 'approved';
    specification.approvedAt = new Date();
    checkpoints[0].status = 'approved';

    console.log('✅ Design specification APPROVED');

    // ─────────────────────────────────────────────────
    // PHASE 2: CODE IMPLEMENTATION (Right Brain)
    // ─────────────────────────────────────────────────
    console.log('\n[PHASE 2] CODE IMPLEMENTATION - Technical Design');
    const codePhase = await codeImplementationPhase(specification, cohereClient);
    totalCredits += codePhase.creditUsage.estimatedCost;
    const implementation = codePhase.implementation;

    checkpoints.push({
      phase: 'implementation',
      status: 'approved',
      timestamp: new Date(),
    });

    console.log('✅ Code implementation phase complete');

    // ─────────────────────────────────────────────────
    // PHASE 3: CORPUS CALLOSUM - Lattice Connection
    // ─────────────────────────────────────────────────
    console.log('\n[PHASE 3] CORPUS CALLOSUM - Connecting Hemispheres');
    const latticeConnection = await connectLattice(
      designPhase.node,
      codePhase.node,
      specification,
      implementation,
      cohereClient
    );

    console.log(latticeConnection.alignmentReport);
    console.log('\nRecommendations:');
    latticeConnection.recommendations.forEach((rec) => console.log(`  ${rec}`));

    // ─────────────────────────────────────────────────
    // PHASE 4: Execution Planning
    // ─────────────────────────────────────────────────
    console.log('\n[PHASE 4] EXECUTION PLANNING');
    const executionPlan = generateExecutionPlan(specification, implementation);

    checkpoints.push({
      phase: 'testing',
      status: 'pending',
      timestamp: new Date(),
    });

    checkpoints.push({
      phase: 'deployment',
      status: 'pending',
      timestamp: new Date(),
    });

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║              PIPELINE EXECUTION COMPLETE                  ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log(`\nTotal Credits Used: ${totalCredits.toFixed(4)}`);
    console.log(`Resonance Score: ${(latticeConnection.resonanceScore * 100).toFixed(1)}%`);

    return {
      design: specification,
      implementation,
      lattice: latticeConnection.lattice,
      alignmentReport: latticeConnection.alignmentReport,
      recommendations: latticeConnection.recommendations,
      totalCreditsUsed: totalCredits,
      executionApproved: true,
      executionPlan,
    };
  } catch (error) {
    console.error('\n❌ PIPELINE FAILED:', error);
    throw error;
  }
}

// ============================================================================
// HELPER FUNCTIONS - Local Processing (No API Costs)
// ============================================================================

function extractRequirementsFromPrompt(prompt: string): string[] {
  const requirements: string[] = [];

  const keywordMap: Record<string, string> = {
    mobile: 'Mobile-responsive design',
    api: 'API integration & REST endpoints',
    database: 'Data persistence & database management',
    auth: 'Authentication & authorization',
    'real-time': 'Real-time updates & WebSocket support',
    'user': 'User interface & UX design',
    'performance': 'Performance optimization',
    'security': 'Security & data protection',
    'scalability': 'Scalable architecture',
    'testing': 'Comprehensive testing coverage',
    'documentation': 'Technical documentation',
    'monitoring': 'Monitoring & logging',
  };

  Object.entries(keywordMap).forEach(([keyword, requirement]) => {
    if (prompt.toLowerCase().includes(keyword)) {
      requirements.push(requirement);
    }
  });

  if (requirements.length === 0) {
    requirements.push(
      'Core functionality implementation',
      'Responsive user interface',
      'API integration',
      'Data persistence'
    );
  }

  return requirements;
}

function generateArchitectureNotes(prompt: string): string {
  let notes = 'Recommended Architecture:\n\n';

  if (prompt.toLowerCase().includes('mobile')) {
    notes += '• Mobile-First Approach: React Native or responsive React web\n';
  }
  if (prompt.toLowerCase().includes('real-time')) {
    notes += '• Real-Time Capabilities: WebSocket server, Redis for pub/sub\n';
  }
  if (prompt.toLowerCase().includes('microservice') || prompt.toLowerCase().includes('scalable')) {
    notes += '• Microservices Pattern: Independent, deployable services\n';
  }

  notes += '• Frontend: React 18+ with TypeScript\n';
  notes += '• Backend: Node.js with Express/Remix\n';
  notes += '• Database: PostgreSQL with Prisma ORM\n';
  notes += '• Deployment: Cloudflare Pages or Vercel\n';

  return notes;
}

function identifyTargetAudience(prompt: string): string {
  if (prompt.toLowerCase().includes('enterprise')) return 'Enterprise organizations';
  if (prompt.toLowerCase().includes('startup') || prompt.toLowerCase().includes('mvp')) return 'Startups & MVP builders';
  if (prompt.toLowerCase().includes('developer')) return 'Developers & technical teams';
  if (prompt.toLowerCase().includes('consumer')) return 'End-user consumers';
  return 'General users';
}

function defineSuccessMetrics(prompt: string): string[] {
  const metrics: string[] = [];

  if (prompt.toLowerCase().includes('performance')) {
    metrics.push('Response time < 200ms', 'Page load < 1s', 'Uptime > 99.9%');
  }
  if (prompt.toLowerCase().includes('user')) {
    metrics.push('User engagement rate', 'Task completion rate', 'User retention rate');
  }
  if (prompt.toLowerCase().includes('scalability')) {
    metrics.push('Handle 10k+ concurrent users', 'Linear scaling with load', 'Minimal latency increase');
  }

  if (metrics.length === 0) {
    metrics.push('Feature completeness', 'Code test coverage > 80%', 'Zero critical bugs at launch');
  }

  return metrics;
}

function buildCodeStructurePrompt(spec: DesignSpecification): string {
  return `You are an expert software architect. Design the implementation structure for:

Title: ${spec.title}
Requirements: ${spec.requirements.join(', ')}
Architecture Notes: ${spec.architectureNotes}
Target Audience: ${spec.targetAudience}

Provide a detailed implementation plan including:
1. Core modules (names, responsibilities, 3-5 modules)
2. File structure (key directories and files)
3. API endpoints or data flows
4. Key dependencies and libraries
5. Data models needed

Format as structured text with clear sections. Be specific and actionable.`;
}

function buildTestingPrompt(codeStructure: CodeStructure, spec: DesignSpecification): string {
  return `Create a comprehensive testing strategy for a ${codeStructure.framework} application with these modules:
${codeStructure.keyModules.map((m) => `- ${m.name}: ${m.responsibility}`).join('\n')}

Coverage requirements: ${spec.requirements.join(', ')}

Include:
1. Unit testing strategy (framework, coverage targets)
2. Integration testing approach
3. E2E testing critical flows
4. Performance testing benchmarks
5. Security testing checklist

Be practical and achievable.`;
}

function parseCodeStructure(response: string, spec: DesignSpecification): CodeStructure {
  const lines = response.split('\n');
  const modules: CodeStructure['keyModules'] = [];

  // Extract modules from response
  for (const line of lines) {
    if (line.match(/^\d+\.|^-|^•/)) {
      const moduleName = line.replace(/^\d+\.|^-|^•/, '').trim().split(':')[0];
      if (moduleName && moduleName.length > 2) {
        modules.push({
          name: moduleName,
          responsibility: 'TBD',
          dependencies: [],
        });
      }
    }
  }

  return {
    language: 'TypeScript',
    framework: extractFramework(response) || 'React + Remix + TailwindCSS',
    keyModules: modules.slice(0, 5).length > 0 ? modules.slice(0, 5) : defaultModules(),
    fileStructure: generateFileStructure(),
    apiIntegrations: extractApiIntegrations(spec),
    dataModels: extractDataModels(response),
  };
}

function extractFramework(text: string): string | null {
  const frameworks = ['React', 'Next.js', 'Vue', 'Svelte', 'Angular', 'Remix'];
  for (const fw of frameworks) {
    if (text.toLowerCase().includes(fw.toLowerCase())) return fw;
  }
  return null;
}

function extractDataModels(text: string): string[] {
  const models: string[] = [];
  const keywords = ['User', 'Post', 'Comment', 'Message', 'Product', 'Order', 'Project', 'Task'];
  for (const keyword of keywords) {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      models.push(keyword);
    }
  }
  return models.length > 0 ? models : ['Entity', 'Resource'];
}

function extractApiIntegrations(spec: DesignSpecification): string[] {
  const integrations: string[] = [];
  if (spec.requirements.some((r) => r.toLowerCase().includes('auth'))) integrations.push('OAuth/JWT');
  if (spec.requirements.some((r) => r.toLowerCase().includes('api'))) integrations.push('REST API');
  if (spec.requirements.some((r) => r.toLowerCase().includes('database'))) integrations.push('Database ORM');
  integrations.push('Cohere AI API'); // Always include
  return integrations;
}

function defaultModules(): CodeStructure['keyModules'] {
  return [
    { name: 'UI Components', responsibility: 'Reusable React components', dependencies: ['React'] },
    { name: 'API Layer', responsibility: 'Backend communication', dependencies: ['fetch', 'axios'] },
    { name: 'State Management', responsibility: 'Application state', dependencies: ['zustand', 'nanostores'] },
    { name: 'Authentication', responsibility: 'User auth flows', dependencies: ['jose', 'crypto'] },
    { name: 'Database', responsibility: 'Data persistence', dependencies: ['prisma', 'postgres'] },
  ];
}

function generateFileStructure(): string {
  return `
src/
  ├── components/        # React components
  ├── lib/              # Utilities & helpers
  │   ├── api/          # API clients
  │   ├── auth/         # Authentication
  │   └── db/           # Database
  ├── routes/           # Page routes
  ├── styles/           # CSS/SCSS
  ├── types/            # TypeScript types
  └── utils/            # Shared utilities
  `;
}

function extractSecurityConsiderations(spec: DesignSpecification): string[] {
  const considerations: string[] = [];

  if (spec.requirements.some((r) => r.toLowerCase().includes('auth'))) {
    considerations.push('Implement secure password hashing (bcrypt)', 'Use JWT with short expiration', 'CORS configuration');
  }

  if (spec.requirements.some((r) => r.toLowerCase().includes('api'))) {
    considerations.push('API rate limiting', 'Input validation & sanitization', 'SQL injection prevention');
  }

  considerations.push(
    'HTTPS enforcement',
    'Environment variable protection',
    'Dependency vulnerability scanning'
  );

  return considerations;
}

function extractPerformanceOptimizations(codeStructure: CodeStructure): string[] {
  const optimizations: string[] = [];

  if (codeStructure.framework.includes('React')) {
    optimizations.push(
      'React.memo for expensive components',
      'Code splitting with React.lazy',
      'Image optimization with next/image',
      'Bundle size monitoring'
    );
  }

  optimizations.push('Database query optimization', 'Caching strategies (Redis)', 'CDN for static assets');

  return optimizations;
}

function generateDeploymentPlan(codeStructure: CodeStructure, spec: DesignSpecification): string {
  return `
DEPLOYMENT PLAN FOR: ${spec.title}

Pre-Deployment:
  ✓ Run full test suite
  ✓ Build optimization (tree-shaking, minification)
  ✓ Security scanning
  ✓ Performance profiling

Deployment Strategy:
  1. Build: ${codeStructure.framework} production build
  2. Test: Automated E2E tests
  3. Stage: Deploy to staging environment
  4. Review: QA review & testing
  5. Prod: Deploy to production with monitoring

Post-Deployment:
  • Monitor error rates & performance metrics
  • Set up automated alerts
  • Prepare rollback plan
  • Document deployment process
  `;
}

function generateExecutionPlan(spec: DesignSpecification, impl: CodeImplementation): string {
  return `
═══════════════════════════════════════════════════════════
EXECUTION PLAN: ${spec.title}
═══════════════════════════════════════════════════════════

WEEK 1-2: Foundation
  □ Set up development environment
  □ Initialize project structure
  □ Configure build tooling (Vite, TypeScript)
  □ Set up CI/CD pipeline

WEEK 3-4: Core Implementation
  □ Build core modules:
${impl.codeStructure.keyModules.map((m) => `     - ${m.name}`).join('\n')}
  □ Implement API endpoints
  □ Connect database models
  □ Integrate Cohere AI

WEEK 5: Testing & QA
  □ Write unit tests (${impl.testingStrategy.substring(0, 50)}...)
  □ Integration testing
  □ E2E testing for critical flows
  □ Performance testing

WEEK 6: Security & Optimization
  □ Security audit
  □ Performance optimization
  □ Code review & refactoring
  □ Documentation

WEEK 7: Deployment
  □ Staging deployment
  □ User acceptance testing
  □ Production deployment
  □ Monitoring & support

Credits Used: ${impl.creditsCost.toFixed(4)}
Resonance Alignment: Ready for execution
═══════════════════════════════════════════════════════════
  `;
}
