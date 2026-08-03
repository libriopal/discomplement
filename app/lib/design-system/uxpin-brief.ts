/**
 * UXPin Integration Guide & Design System Export
 * 
 * For bicameral AI system: Prompt-to-Design-to-App
 * Using UXPin Classic + Ant Design + custom geometric design tokens
 */

export const UXPIN_IMPLEMENTATION_PROMPT = `
╔════════════════════════════════════════════════════════════════════════════════╗
║                    BICAMERAL AI SYSTEM - UX/UI DESIGN BRIEF                    ║
║                         For UXPin.com Implementation                            ║
╚════════════════════════════════════════════════════════════════════════════════╝

PROJECT OVERVIEW
═══════════════════════════════════════════════════════════════════════════════
Name: Cohere Prompt-to-App (Bicameral Design System)
Purpose: Research-backed design → Code implementation pipeline with geometric 
         memory lattice visualization
Target Users: Product designers, developers, AI researchers, startup founders
Platform: Web (responsive mobile-first), future: Electron desktop app

DESIGN PHILOSOPHY
═══════════════════════════════════════════════════════════════════════════════
• Bicameral Split-Brain Metaphor: Left (semantic/design) ↔ Right (code/logic)
• Geometric Lattice Memory: 3D node positioning showing semantic-code alignment
• Research-First Approach: Scite citations embedded throughout design
• Credit-Efficient: Visual credit usage tracking (free Scite → minimal Cohere)
• Approval Gates: Multi-checkpoint verification before code generation

COLOR PALETTE
═══════════════════════════════════════════════════════════════════════════════

Primary Semantic (Left Brain - Design):
  • Semantic Blue: #4F46E5 (Indigo-600) - Research, thinking, exploration
  • Semantic Gradient: #6366F1 → #818CF8 (soft, flowing thinking)
  • Accent: #10B981 (Emerald) - Approved, verified research

Technical Code (Right Brain - Implementation):
  • Technical Purple: #8B5CF6 (Violet-600) - Code, logic, execution
  • Technical Gradient: #A78BFA → #C4B5FD (precise, structured)
  • Accent: #F59E0B (Amber) - Active code generation

Lattice Bridge (Corpus Callosum):
  • Connection: #EC4899 (Pink-500) - Resonance, alignment
  • Warning: #EF4444 (Red-500) - Low resonance
  • Success: #10B981 (Green-500) - High resonance

Geometric Accents:
  • Primary Geometric: #06B6D4 (Cyan-500) - Node positioning
  • Background Grid: rgba(99,102,241,0.05) - Subtle lattice pattern
  • Border Emphasis: #E5E7EB (Gray-200 light) / #374151 (Gray-700 dark)

TYPOGRAPHY
═══════════════════════════════════════════════════════════════════════════════
Font Family: Inter (primary), Fira Code (code blocks)
Sizes:
  • H1: 36px / Bold / Line-height 1.2
  • H2: 28px / Semibold / Line-height 1.3
  • H3: 20px / Semibold / Line-height 1.4
  • Body: 14px / Regular / Line-height 1.6
  • Small: 12px / Regular / Line-height 1.5
  • Code: 13px / Fira Code / Line-height 1.5

LAYOUT & SPACING
═══════════════════════════════════════════════════════════════════════════════
Grid System: 4px base unit (8, 12, 16, 20, 24, 32, 40, 48px)
Container Width: 
  • Mobile: Full width - 16px padding
  • Tablet: 768px max
  • Desktop: 1200px max
  • Ultra-wide: 1600px max

Breakpoints:
  • Mobile: 320px - 767px
  • Tablet: 768px - 1023px
  • Desktop: 1024px+

COMPONENT SPECIFICATIONS
═══════════════════════════════════════════════════════════════════════════════

1. HEADER / NAVIGATION
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Bolt Bicameral                [Dashboard] [Vault] [Menu] │
└─────────────────────────────────────────────────────────────────┘

Mobile: Hamburger menu, stacked layout
Sticky: Yes, shadow on scroll
Dark Mode: Full support

2. LEFT SIDEBAR (DESIGN THINKING)
┌──────────────────────┐
│ 📚 Research Phase    │
│                      │
│ [Scite Search Bar]   │
│ ──────────────────   │
│ 📄 Papers Loaded     │
│ ✓ Citation 1         │
│ ✓ Citation 2         │
│ ✓ Citation 3         │
│ ──────────────────   │
│ 📋 Requirements      │
│ ✓ Mobile-responsive  │
│ ✓ Real-time API      │
│ ✓ Database schema    │
│                      │
│ [Approve Design]     │
└──────────────────────┘

Mobile: Collapsible drawer
Styling: 
  - Background: Semantic Blue gradient (very faint)
  - Borders: 2px geometric style
  - Icons: Phosphor icons (light weight)

3. CENTER AREA (LATTICE VISUALIZATION)
┌──────────────────────────────────────────────────────────┐
│              BICAMERAL LATTICE MEMORY MAP               │
│                                                          │
│        [Design Node]              [Code Node]           │
│         ●────────────────○────────────────●             │
│        /                 ╱                 ╲            │
│       /               ╱                     ╲           │
│      ●─────────────○─────────────────────●  │           │
│      │ Semantic                Implementation│           │
│      │ Blue                    Purple      │           │
│                                                          │
│  Resonance Score: ████████░░  82%                       │
│  Lattice Centroid: (45.2, 32.1, 67.8)                  │
│                                                          │
└──────────────────────────────────────────────────────────┘

3D Visualization using Three.js (not limited to 2D):
  - Nodes as geometric shapes (spheres, cubes, pyramids)
  - Edges with flowing lines showing data flow
  - Hover to see node details
  - Drag to rotate/zoom lattice
  - Color coding: Blue (semantic) → Pink (bridge) → Purple (code)

4. RIGHT SIDEBAR (CODE IMPLEMENTATION)
┌──────────────────────┐
│ ⚙️  Implementation    │
│                      │
│ Framework Selection  │
│ [React + Remix ▼]    │
│ ──────────────────   │
│ Key Modules:         │
│ □ UI Components      │
│ □ API Layer          │
│ □ State Mgmt         │
│ □ Authentication     │
│ □ Database           │
│ ──────────────────   │
│ 💰 Credit Usage      │
│ Scite: FREE ✓        │
│ Cohere: 0.0042 ⚠️    │
│ ──────────────────   │
│ [Generate Code]      │
└──────────────────────┘

Mobile: Collapsible drawer (bottom sheet)
Styling:
  - Background: Technical Purple gradient (very faint)
  - Borders: 2px geometric style
  - Credit meter: Animated bar chart

5. MODAL: APPROVAL CHECKPOINT
┌──────────────────────────────────────────────┐
│  DESIGN SPECIFICATION APPROVAL               │
│                                              │
│  Title: [User's Prompt]                      │
│  ────────────────────────────────────────    │
│  Requirements:                               │
│   • Mobile-responsive design                 │
│   • API integration & REST endpoints         │
│   • Data persistence & DB management         │
│  ────────────────────────────────────────    │
│  Research Basis:                             │
│   📚 Paper 1: "Mobile-First Design"          │
│      Cited: 245 times                        │
│   📚 Paper 2: "REST API Design Patterns"     │
│      Cited: 189 times                        │
│  ────────────────────────────────────────    │
│  Target Audience: Startups & MVP Builders    │
│  Success Metrics: 3/5 defined                │
│                                              │
│  [❌ Reject] [⚠️  Revise] [✅ Approve]       │
└──────────────────────────────────────────────┘

Entrance: Slide up from bottom (mobile) / Centered (desktop)
Backdrop: Blur with dark overlay
Buttons: Geometric rounded corners (16px)

6. CARD COMPONENTS (RESEARCH, CODE BLOCKS, REQUIREMENTS)
┌────────────────────────────────────┐
│ ┌──────────────────────────────┐   │
│ │ 📄 Research Citation Card    │   │
│ ├──────────────────────────────┤   │
│ │ Title: "Mobile UI Design..." │   │
│ │ Authors: Smith, Johnson      │   │
│ │ Citations: 124               │   │
│ │ [View on Scite] [Add to Spec]│   │
│ └──────────────────────────────┘   │
│                                    │
│ ┌──────────────────────────────┐   │
│ │ ⚙️  Code Module Card          │   │
│ ├──────────────────────────────┤   │
│ │ Name: API Layer              │   │
│ │ Responsibility: Backend comm  │   │
│ │ Dependencies: fetch, axios    │   │
│ │ Lines of Code: ~250 (est)     │   │
│ │ [View Details] [Edit]         │   │
│ └──────────────────────────────┘   │
└────────────────────────────────────┘

Styling:
  - Border: 2px solid (semantic blue or code purple)
  - Border Radius: 16px (geometric)
  - Hover: Scale 1.02, shadow increase, border glow
  - Active: Border color shift, background highlight

7. EXECUTION PLAN TIMELINE
┌─────────────────────────────────────────┐
│ EXECUTION PLAN: 7-Week Development     │
├─────────────────────────────────────────┤
│ Week 1: ███░░░░░ Foundation             │
│ Week 2: █████░░░ Core Implementation    │
│ Week 3: ███████░ Testing & QA           │
│ Week 4: ████████ Security & Optimize    │
│ Week 5: ████████ Deployment Ready       │
├─────────────────────────────────────────┤
│ ✅ Design Specification                │
│ ⏳ Code Generation (in progress)       │
│ ⏰ Testing Strategy (pending)           │
│ ⏰ Deployment (pending)                 │
└─────────────────────────────────────────┘

INTERACTION PATTERNS
═══════════════════════════════════════════════════════════════════════════════

1. PROMPT INPUT FLOW
   User types prompt → [Enter] → Design phase triggers
   → Scite research loads (FREE)
   → Design specification card appears
   → Approval modal opens
   → [Approve] → Code phase starts
   → Code structure displays
   → Lattice connects both hemispheres

2. LATTICE INTERACTION
   Hover node → Shows node details in tooltip
   Drag node → Rotates/pans 3D visualization
   Click node → Expands to full details panel
   Resonance bar → Real-time alignment visualization
   Edge highlight → Shows data flow direction

3. CREDIT TRACKING
   Top-right corner: Persistent credit meter
   Scite lookups: FREE (green icon)
   Cohere calls: Counted (red icon with counter)
   Total cost: Continuously updated
   Tooltip: Shows per-call breakdown

4. MOBILE EXPERIENCE
   Desktop: 3-column (left sidebar | center lattice | right sidebar)
   Tablet: 2-column or single column toggle
   Mobile: Bottom sheet drawer pattern
     - Swipe down to collapse
     - Tap header to expand/collapse
     - Full screen design/code views

ANIMATION & MICRO-INTERACTIONS
═══════════════════════════════════════════════════════════════════════════════

• Lattice nodes: Subtle floating animation (±5px vertical)
• Resonance score: Number counter animation (0 → X% over 2s)
• Card hover: 200ms spring animation (scale + shadow)
• Sidebar toggle: 300ms slide animation
• Credit meter: Smooth fill animation
• Edge connections: Animated line drawing on load
• Toast notifications: Slide in from bottom-right

ACCESSIBILITY REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════════

• All buttons: Keyboard accessible (Tab, Enter/Space)
• Color contrast: WCAG AA (4.5:1 for text, 3:1 for graphics)
• ARIA labels: All interactive elements labeled
• Focus indicators: Visible 2px outline
• Modals: Trap focus, ESC to close
• Icons: Alternative text for screen readers
• Reduced motion: Respect prefers-reduced-motion

DARK MODE SUPPORT
═══════════════════════════════════════════════════════════════════════════════

Toggle in header → Applies to entire app
Persistent via localStorage
Colors automatically invert/adjust
Lattice nodes maintain color identity
Grid background: Subtle in both themes

RESPONSIVE BREAKPOINTS IN UXPIN
═══════════════════════════════════════════════════════════════════════════════

Mobile (320px):
  - Single column layout
  - Bottom sheet for sidebars
  - Lattice simplified (2D projection)
  - Touch-friendly buttons (48px min height)

Tablet (768px):
  - Two-column: center + collapsible sidebars
  - Lattice 3D available
  - Drawer width: 280px

Desktop (1024px):
  - Three-column: left sidebar (240px) | center | right sidebar (240px)
  - Full 3D lattice
  - Hover states enabled

Ultra-wide (1600px):
  - Expanded layout
  - Larger lattice visualization
  - Side panels + detail panes

UXPIN COMPONENT LIBRARY TO CREATE
═══════════════════════════════════════════════════════════════════════════════

Base Components:
  □ Button (Primary, Secondary, Danger, Ghost variants)
  □ Input (Text, Search, Code)
  □ Card (Base, Elevated, Interactive)
  □ Badge (Status, Metric, Citation)
  □ Progress Bar (Linear, Circular)
  □ Modal Dialog
  □ Drawer (Sidebar)
  □ Tooltip
  □ Toast Notification
  □ Dropdown Menu
  □ Toggle Switch
  □ Slider

Layout Components:
  □ Header/Navigation
  □ Sidebar Container
  □ Three-Column Layout
  □ Mobile Bottom Sheet
  □ Centered Modal Container

Feature Components:
  □ Research Citation Card
  □ Code Module Card
  □ Requirements List
  □ Lattice Node (3D simulation)
  □ Resonance Meter
  □ Credit Usage Display
  □ Execution Timeline
  □ Approval Checkpoint Modal
  □ Design Specification Panel
  □ Code Implementation Panel

DESIGN TOKENS TO EXPORT FROM UXPIN
═══════════════════════════════════════════════════════════════════════════════

Colors:
  Primary: #4F46E5, #6366F1, #818CF8
  Secondary: #8B5CF6, #A78BFA, #C4B5FD
  Accent: #EC4899, #F59E0B, #10B981
  Backgrounds: #FFFFFF, #F9FAFB, #F3F4F6
  Text: #1F2937, #374151, #6B7280
  Borders: #E5E7EB, #D1D5DB, #9CA3AF

Typography:
  H1: Inter 36px Bold 1.2
  H2: Inter 28px Semibold 1.3
  H3: Inter 20px Semibold 1.4
  Body: Inter 14px Regular 1.6
  Small: Inter 12px Regular 1.5
  Code: Fira Code 13px Regular 1.5

Spacing:
  8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80px

Border Radius:
  Small: 8px (default)
  Medium: 12px (cards)
  Large: 16px (geometric - PREFERRED)
  Full: 9999px (buttons)

Shadows:
  sm: 0 1px 2px rgba(0,0,0,0.05)
  md: 0 4px 6px rgba(0,0,0,0.1)
  lg: 0 10px 15px rgba(0,0,0,0.1)
  xl: 0 20px 25px rgba(0,0,0,0.1)

UXPIN EXPORT FORMAT
═══════════════════════════════════════════════════════════════════════════════

Component Package Name: bolt-bicameral-ui

Export as:
  ✓ Figma design file (for developer handoff)
  ✓ React component code (Copy-paste ready)
  ✓ Design tokens JSON (for Tailwind/Ant Design)
  ✓ Storybook documentation
  ✓ Interactive Prototype (clickthrough demo)
  ✓ Design specs (Zeplin export)

IMPLEMENTATION CHECKLIST FOR DEVELOPER
═══════════════════════════════════════════════════════════════════════════════

After exporting from UXPin:
  □ Import design tokens into Tailwind/Ant Design config
  □ Create React component wrappers
  □ Connect to bicameral-engine.ts API
  □ Implement Scite search integration
  □ Add Three.js for 3D lattice visualization
  □ Build modal approval workflows
  □ Add credit tracking UI
  □ Implement dark mode toggle
  □ Mobile responsiveness testing
  □ Accessibility audit (Axe, WAVE)
  □ Performance optimization (component memoization)
  □ Storybook stories for all components

NEXT STEPS
═══════════════════════════════════════════════════════════════════════════════

1. Copy this entire prompt into UXPin project brief
2. Create design in UXPin using Ant Design + custom geometric tokens
3. Build 5 key pages:
   - Landing/Dashboard
   - Design Specification Panel
   - Code Implementation Panel
   - Lattice Visualization
   - Approval Checkpoint Modal
4. Export components & design tokens
5. Integrate with bolt.libriopal React app
6. Test on mobile, tablet, desktop

═══════════════════════════════════════════════════════════════════════════════
`;

export const DESIGN_TOOL_RECOMMENDATION = {
  recommended: 'UXPin Classic',
  reasoning: `
UXPin Classic is BEST for this project because:

1. ✅ GEOMETRIC DESIGN SYSTEM
   - Native support for custom border-radius tokens
   - Grid-based alignment perfect for lattice metaphor
   - Component variants for left/right brain color schemes

2. ✅ INTERACTIVE PROTOTYPING
   - Can simulate lattice node interactions
   - Modal/drawer interactions fully supported
   - Click flows for approval checkpoints work natively
   - Responsive breakpoints built-in

3. ✅ DEVELOPER HANDOFF
   - Generates clean React/TypeScript code
   - Export design tokens as JSON
   - Ant Design integration ready
   - Copy-paste components into codebase

4. ✅ DESIGN TOKENS
   - Central token management
   - Color, typography, spacing all exportable
   - Auto-generates CSS/Tailwind files
   - Perfect for multi-theme (light/dark)

5. ✅ COLLABORATION
   - Real-time team editing
   - Comment threads on components
   - Version history preserved
   - Design system library (reusable components)

6. ✅ COST-EFFICIENT
   - Free tier covers single project
   - No per-seat licensing like Figma
   - Full features for design system work

WHY NOT THE OTHERS:

❌ MUI: Pre-designed components limit geometric customization
❌ Shadcn/ui: Component library, not design tool (use AFTER UXPin)
❌ Ant Design: Great for implementation, but UXPin exports TO Ant Design
❌ Bootstrap: Too basic, no geometric/lattice support

RECOMMENDED WORKFLOW:

1. Design in UXPin Classic (this tool)
   ↓
2. Export tokens to Tailwind/Ant Design format
   ↓
3. Import into bolt.libriopal React app
   ↓
4. Use Shadcn/ui or Ant Design components for implementation
   ↓
5. Connect to bicameral-engine.ts backend

This gives you design system → component library → implementation in one workflow!
  `,
  alternatives: [
    {
      tool: 'Figma + Storybook',
      pros: 'Most popular, large community, great for design systems',
      cons: 'Requires separate tool for prototyping, no code generation',
    },
    {
      tool: 'Penpot (Open Source)',
      pros: 'Free, open source, good for teams',
      cons: 'Smaller ecosystem, less component library support',
    },
  ],
};

export const UXPIN_COMPONENT_CHECKLIST = [
  {
    category: 'Core Inputs',
    components: [
      { name: 'Prompt Input Field', variants: ['empty', 'focused', 'filled', 'error'] },
      {
        name: 'Scite Search Box',
        variants: ['empty', 'focused', 'loading', 'results', 'no-results'],
      },
      { name: 'Requirement Toggle', variants: ['unchecked', 'checked', 'disabled'] },
    ],
  },
  {
    category: 'Visualization',
    components: [
      {
        name: 'Lattice Node',
        variants: [
          'semantic-blue',
          'code-purple',
          'bridge-pink',
          'hover',
          'selected',
          'connected',
        ],
      },
      {
        name: 'Resonance Meter',
        variants: [
          'low-0%',
          'medium-50%',
          'high-85%',
          'loading',
          'animated',
        ],
      },
      { name: '3D Lattice Container', variants: ['desktop', 'tablet', 'mobile-2d'] },
    ],
  },
  {
    category: 'Panels',
    components: [
      {
        name: 'Left Sidebar (Design)',
        variants: [
          'research-phase',
          'requirements-phase',
          'approval-pending',
          'collapsed-mobile',
        ],
      },
      {
        name: 'Right Sidebar (Code)',
        variants: [
          'module-selection',
          'code-structure',
          'credit-usage',
          'collapsed-mobile',
        ],
      },
    ],
  },
  {
    category: 'Modals',
    components: [
      {
        name: 'Approval Checkpoint',
        variants: ['design-phase', 'code-phase', 'testing-phase', 'deployment-phase'],
      },
      { name: 'Credit Warning', variants: ['approaching-limit', 'at-limit', 'exceeded'] },
    ],
  },
  {
    category: 'Cards',
    components: [
      {
        name: 'Research Citation Card',
        variants: ['unselected', 'selected', 'hover', 'loading'],
      },
      {
        name: 'Code Module Card',
        variants: [
          'planned',
          'in-progress',
          'completed',
          'error',
          'hover',
        ],
      },
    ],
  },
  {
    category: 'Feedback',
    components: [
      { name: 'Progress Timeline', variants: ['7-week', 'phase-based', 'mobile'] },
      { name: 'Toast Notification', variants: ['success', 'error', 'info', 'warning'] },
      { name: 'Inline Status Badge', variants: ['pending', 'approved', 'rejected', 'in-progress'] },
    ],
  },
];
