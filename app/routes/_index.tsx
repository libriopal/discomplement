import { useEffect, useState } from 'react';
import { json, type MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { DashboardShell } from '~/components/dashboard/DashboardShell';
import { LatticeViz } from '~/components/lattice/LatticeViz';

export const meta: MetaFunction = () => [
  { title: 'Bicameral AI · Command Deck' },
  { name: 'description', content: 'Research-backed design meets code generation' },
];

export const loader = async ({ context }: { context: any }) => {
  try {
    // Initialize with safe defaults
    return json({
      user: null,
      projects: [],
      appReady: true,
      theme: 'dark',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Loader error:', error);
    return json({ user: null, projects: [], appReady: true, theme: 'dark' });
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <DashboardShell>
        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
          {/* Desktop/Tablet: Left sidebar (60%) */}
          <div className="w-full md:w-8/12 flex flex-col gap-6">
            {/* Lattice Hero Section */}
            <div className="bg-slate-900 rounded-2xl p-6 md:p-8 min-h-48 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Live Lattice
                </h1>
                <p className="text-slate-400 text-sm md:text-base">
                  Geometric orchestration of your AI research
                </p>
              </div>
              <LatticeViz />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Projects</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {data.projects?.length || 0}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Active</div>
                <div className="text-2xl font-bold text-blue-600">0</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Verified</div>
                <div className="text-2xl font-bold text-green-600">0</div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/projects')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transition-all"
            >
              Start Building
            </button>
          </div>

          {/* Desktop/Tablet: Right sidebar (40%) - Hidden on mobile */}
          <div className="hidden md:flex w-4/12 flex-col gap-4">
            {/* Status Rail */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                System Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-slate-600 dark:text-slate-400">API Connected</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-slate-600 dark:text-slate-400">Cohere Ready</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-600 dark:text-slate-400">Governance Active</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Quick Access
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Documentation
                </button>
                <button className="w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  API Settings
                </button>
                <button className="w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Governance Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}