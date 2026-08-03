import { Link, useLocation } from '@remix-run/react';
import { useState } from 'react';

interface DesktopSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Lattice', path: '/lattice' },
  { name: 'Composer', path: '/composer' },
  { name: 'Research', path: '/research' },
];

export function DesktopSidebar({ isOpen, onClose }: DesktopSidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-200 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        {!collapsed && <span className="font-bold text-slate-900 dark:text-white">Bicameral</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-4 h-4 text-slate-600 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'}
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
              title={collapsed ? item.name : undefined}
            >
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-purple-600" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">Settings</div>
          <button className="w-full text-left text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2 px-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Governance
          </button>
          <button className="w-full text-left text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2 px-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            API Keys
          </button>
        </div>
      )}
    </aside>
  );
}