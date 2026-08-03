import { Link } from '@remix-run/react';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <span className="hidden md:inline text-lg text-slate-900 dark:text-white">
            Bicameral
          </span>
        </Link>

        {/* Center - Search */}
        <div className="hidden md:flex items-center gap-2 max-w-sm flex-1 mx-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search projects... ⌘K"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
            aria-label="Search"
          >
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* User Menu */}
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
          </button>

          {/* Menu Toggle */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
            aria-label="Menu"
          >
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="md:hidden px-4 py-3 border-t border-slate-200 dark:border-slate-800">
          <input
            type="text"
            placeholder="Search projects..."
            autoFocus
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </header>
  );
}