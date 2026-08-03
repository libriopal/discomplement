import { DashboardShell } from '~/components/dashboard/DashboardShell';

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="p-4 md:p-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Settings
          </h1>

          {/* API Keys Section */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              API Keys
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Cohere API Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="sk-..."
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                  <button className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Governance Settings */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Governance & Compliance
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Content Moderation
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Filter harmful content using Cohere guardrails
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    PII Detection
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Detect and mask personally identifiable information
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                <input type="checkbox" className="rounded" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Bias Detection
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Monitor for potential bias in AI outputs
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Appearance
            </h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
                Dark
              </button>
              <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                Light
              </button>
              <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                System
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}