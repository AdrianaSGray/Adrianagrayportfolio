import { Outlet } from 'react-router';
import { Toaster } from './ui/sonner';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background patterns */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #F1E194 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Outlet />
        
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-[#F1E194]/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[#F1E194]/40">
              Email: simonegraybiz@gmail.com
            </p>
          </div>
        </footer>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#F1E194',
            border: '1px solid rgba(241, 225, 148, 0.2)'
          }
        }}
      />
    </div>
  );
}
