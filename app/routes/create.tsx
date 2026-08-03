import { useState } from 'react';
import { DashboardShell } from '~/components/dashboard/DashboardShell';

export default function CreatePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState('blank');

  const templates = [
    { id: 'blank', name: 'Blank Project', icon: '▭' },
    { id: 'agent', name: 'AI Agent', icon: '🤖' },
    { id: 'research', name: 'Research Tool', icon: '📊' },
    { id: 'api', name: 'API Service', icon: '⚙️' },
  ];

  return (
    <DashboardShell>
      <div className="p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Create Project
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Start a new AI-powered application with geometric precision
          </p>

          {/* Template Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Choose a template
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    template === t.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Project"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this project do?"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Cohere Governance Settings */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-2">
                Governance Settings
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                Enable Cohere guardrails for safety and compliance
              </p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-blue-900 dark:text-blue-400">
                  Enable Cohere Safety Features
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                Create Project
              </button>
              <button className="px-4 py-3 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}