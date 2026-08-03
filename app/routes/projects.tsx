import { json } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { DashboardShell } from '~/components/dashboard/DashboardShell';

export const loader = async () => {
  return json({
    projects: [
      { id: '1', name: 'Insights Agent', status: 'in-progress', progress: 76 },
      { id: '2', name: 'Ticket Router', status: 'verified', progress: 100 },
      { id: '3', name: 'Pricing Engine', status: 'review', progress: 60 },
    ],
  });
};

export default function ProjectsPage() {
  const { projects } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <DashboardShell>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Projects
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your AI-backed applications
          </p>
        </div>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {project.name}
                </h2>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    project.status === 'verified'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : project.status === 'in-progress'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                  }`}
                >
                  {project.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Progress</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline">
                View Project →
              </button>
            </button>
          ))}
        </div>

        {/* Empty State CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/create')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>+</span>
            <span>New Project</span>
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}