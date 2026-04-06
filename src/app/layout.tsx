import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Email Forge',
  description: 'Compose, transform, and send email-safe HTML emails',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface-950 text-surface-200 h-screen flex overflow-hidden">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#e2e8f0',
            },
          }}
        />
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      </body>
    </html>
  );
}

function Sidebar() {
  return (
    <nav className="w-16 bg-surface-900 border-r border-surface-700 flex flex-col items-center py-4 gap-2 shrink-0">
      <a
        href="/"
        className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm mb-4"
        title="Email Forge"
      >
        EF
      </a>
      <NavLink href="/" label="Compose" icon={composeIcon} />
      <NavLink href="/settings" label="Settings" icon={settingsIcon} />
    </nav>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-lg flex items-center justify-center text-surface-400 hover:text-white hover:bg-surface-800 transition-colors"
      title={label}
    >
      {icon}
    </a>
  );
}

const composeIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const settingsIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);
