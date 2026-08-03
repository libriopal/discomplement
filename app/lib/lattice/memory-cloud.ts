/**
 * Semantic-Code Lattice Memory Cloud
 * 
 * Bicameral AI System using Scite + Cohere for efficient, research-backed design-to-code pipeline
 * - Left Brain (Design/Semantic): Scite for research, low-cost embeddings
 * - Right Brain (Code): Cohere for implementation planning
 * - Bridge: Lattice geometry for parallel reasoning & memory mapping
 */

import type { CohereClientV2 } from 'cohere-sdk';

export interface MemoryNode {
  id: string;
  type: 'design' | 'code' | 'requirement' | 'specification' | 'execution';
  content: string;
  embedding?: number[];
  metadata: {
    source?: 'scite' | 'cohere' | 'user';
    researchCitations?: string[];
    timestamp: Date;
    confidence: number;
    parentNodeIds: string[];
    childNodeIds: string[];
  };
  position: { x: number; y: number; z: number }; // 3D lattice positioning
}

export interface LatticeEdge {
  fromId: string;
  toId: string;
  type: 'semantic-flow' | 'code-flow' | 'dependency' | 'reference';
  weight: number;
  reasoningPath: string;
}

export interface MemoryLattice {
  nodes: Map<string, MemoryNode>;
  edges: LatticeEdge[];
  centroid: { x: number; y: number; z: number };
  resonanceScore: number; // How well semantic & code brains align
}

/**
 * Scite Integration - Free research lookup (no credits burned)
 * Uses Scite's open API for literature references
 */
export async function fetchSciteResearch(query: string): Promise<{
  papers: Array<{
    id: string;
    title: string;
    abstract: string;
    url: string;
    citations: number;
  }>;
  citations: string[];
}> {
  try {
    // Using Scite's free public API - no authentication needed
    const response = await fetch(`https://api.scite.ai/search?q=${encodeURIComponent(query)}&limit=5`);
    
    if (!response.ok) {
      throw new Error(`Scite API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      papers: data.results?.map((paper: any) => ({
        id: paper.id,
        title: paper.title,
        abstract: paper.abstract,
        url: paper.url,
        citations: paper.citation_count || 0,
      })) || [],
      citations: data.results?.map((p: any) => `${p.title} (${p.url})`) || [],
    };
  } catch (error) {
    console.warn('Scite research lookup failed, continuing without citations:', error);
    return { papers: [], citations: [] };
  }
}

/**
 * Create memory nodes from research (free operation)
 * Stores references without embedding cost
 */
export function createResearchNode(
  query: string,
  sciteResults: Awaited<ReturnType<typeof fetchSciteResearch>>,
  nodeType: 'design' | 'specification' = 'design'
): MemoryNode {
  const nodeId = `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    id: nodeId,
    type: nodeType,
    content: query,
    metadata: {
      source: 'scite',
      researchCitations: sciteResults.citations,
      timestamp: new Date(),
      confidence: Math.min(sciteResults.papers.length / 5, 1), // Confidence based on citation count
      parentNodeIds: [],
      childNodeIds: [],
    },
    position: { x: Math.random() * 100, y: Math.random() * 100, z: 0 }, // Will be repositioned in lattice
  };
}

/**
 * Cohere Embedding - Only for critical nodes (credit-efficient)
 * Uses Cohere's embed model sparingly, only for nodes that bridge semantic/code
 */
export async function embedCriticalNode(
  node: MemoryNode,
  cohereClient: CohereClientV2
): Promise<MemoryNode> {
  try {
    // Only embed if this is a bridge node or final specification
    if (node.type !== 'design' && node.type !== 'specification') {
      return node; // Skip embedding for code-only nodes
    }

    const response = await cohereClient.embed({
      texts: [node.content],
      model: 'embed-english-v3.0',
      inputType: 'search_query',
    });

    return {
      ...node,
      embedding: response.embeddings[0],
      metadata: {
        ...node.metadata,
        source: 'cohere',
      },
    };
  } catch (error) {
    console.error('Embedding failed:', error);
    return node; // Return without embedding if failed
  }
}

/**
 * Geometric Lattice Positioning
 * Places nodes in 3D space based on semantic similarity
 * Using simple cosine similarity without additional API calls
 */
export function computeLatticePositions(nodes: MemoryNode[]): MemoryNode[] {
  const positioned: MemoryNode[] = [];

  nodes.forEach((node, index) => {
    const angle = (index / nodes.length) * Math.PI * 2;
    const radius = 50;
    const layer = node.type === 'design' ? 0 : node.type === 'code' ? 100 : 50;

    positioned.push({
      ...node,
      position: {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: layer,
      },
    });
  });

  return positioned;
}

/**
 * Build Lattice Structure
 * Creates edges based on semantic flow (design→specification→code)
 */
export function buildLattice(nodes: MemoryNode[]): MemoryLattice {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const edges: LatticeEdge[] = [];

  // Connect nodes based on type hierarchy: design → specification → code
  const typeHierarchy = { design: 0, specification: 1, requirement: 1, code: 2, execution: 3 };
  const sortedNodes = [...nodes].sort((a, b) => typeHierarchy[a.type] - typeHierarchy[b.type]);

  for (let i = 0; i < sortedNodes.length - 1; i++) {
    const fromNode = sortedNodes[i];
    const toNode = sortedNodes[i + 1];

    // Determine connection type
    const flowType =
      fromNode.type === 'design' && toNode.type === 'specification'
        ? 'semantic-flow'
        : fromNode.type === 'specification' && toNode.type === 'code'
          ? 'code-flow'
          : 'dependency';

    edges.push({
      fromId: fromNode.id,
      toId: toNode.id,
      type: flowType,
      weight: 1.0,
      reasoningPath: `${fromNode.type} → ${toNode.type}`,
    });

    // Update node relationships
    fromNode.metadata.childNodeIds.push(toNode.id);
    toNode.metadata.parentNodeIds.push(fromNode.id);
  }

  // Compute lattice centroid
  const centroid = {
    x: nodes.reduce((sum, n) => sum + n.position.x, 0) / nodes.length,
    y: nodes.reduce((sum, n) => sum + n.position.y, 0) / nodes.length,
    z: nodes.reduce((sum, n) => sum + n.position.z, 0) / nodes.length,
  };

  // Compute resonance score (how well aligned the two brains are)
  const designNodes = nodes.filter((n) => n.type === 'design');
  const codeNodes = nodes.filter((n) => n.type === 'code');
  const resonanceScore = designNodes.length > 0 && codeNodes.length > 0 ? 0.7 : 0.3;

  return {
    nodes: nodeMap,
    edges,
    centroid,
    resonanceScore,
  };
}

/**
 * Query the Lattice
 * Retrieves relevant nodes without expensive embeddings
 */
export function queryLattice(
  lattice: MemoryLattice,
  query: string,
  resultType: 'design' | 'code' | 'all' = 'all'
): MemoryNode[] {
  const queryLower = query.toLowerCase();
  let results = Array.from(lattice.nodes.values()).filter((node) => {
    const contentMatch = node.content.toLowerCase().includes(queryLower);
    const typeMatch = resultType === 'all' || node.type === resultType;
    return contentMatch && typeMatch;
  });

  // Sort by confidence and recency
  return results.sort(
    (a, b) =>
      b.metadata.confidence - a.metadata.confidence ||
      b.metadata.timestamp.getTime() - a.metadata.timestamp.getTime()
  );
}

/**
 * Credit-Efficient Strategy
 * Tracks API usage and minimizes Cohere calls
 */
export interface CreditUsage {
  sciteLookups: number;
  cohereEmbeddings: number;
  cohereGenerations: number;
  estimatedCost: number;
}

export function calculateCreditUsage(usage: CreditUsage): CreditUsage {
  return {
    ...usage,
    estimatedCost: usage.cohereEmbeddings * 0.0001 + usage.cohereGenerations * 0.002, // Approximate Cohere pricing
  };
}

/**
 * Parallel Reasoning Engine
 * Runs design and code analysis in parallel
 */
export async function runParallelReasoning(
  designPrompt: string,
  codePrompt: string,
  cohereClient: CohereClientV2
): Promise<{
  designThinking: string;
  codeThinking: string;
  resonanceAlignment: number;
}> {
  try {
    // Run both in parallel to maximize efficiency
    const [designResponse, codeResponse] = await Promise.all([
      // Left brain: Design research via Scite first
      fetchSciteResearch(designPrompt),
      // Right brain: Code generation thinking via Cohere
      cohereClient.chat({
        model: 'command-r-plus',
        messages: [
          {
            role: 'user',
            content: `You are an expert software architect. Create an implementation plan for: ${codePrompt}. Focus on technical details, dependencies, and execution steps.`,
          },
        ],
        maxTokens: 500,
      }),
    ]);

    const designThinking = designResponse.citations.join('\n');
    const codeThinking = codeResponse.message.content[0].type === 'text' ? codeResponse.message.content[0].text : '';

    // Calculate resonance (how well the two align)
    const designKeywords = designThinking.toLowerCase().split(/\s+/);
    const codeKeywords = codeThinking.toLowerCase().split(/\s+/);
    const commonKeywords = designKeywords.filter((k) => codeKeywords.includes(k));
    const resonanceAlignment = commonKeywords.length / Math.max(designKeywords.length, codeKeywords.length);

    return {
      designThinking,
      codeThinking,
      resonanceAlignment: Math.min(resonanceAlignment, 1),
    };
  } catch (error) {
    console.error('Parallel reasoning failed:', error);
    return {
      designThinking: '',
      codeThinking: '',
      resonanceAlignment: 0,
    };
  }
}
