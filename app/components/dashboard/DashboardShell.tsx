import { useEffect, useState } from 'react';
import { Outlet, useLocation } from '@remix-run/react';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { DesktopSidebar } from './DesktopSidebar';

interface DashboardShellProps {
  children?: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <DesktopSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileNav />}
    </div>
  );
}