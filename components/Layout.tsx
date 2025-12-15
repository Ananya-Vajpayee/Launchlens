import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-slate-200 selection:bg-accent selection:text-black">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>
      <footer className="border-t border-border py-12 relative z-10 bg-surface/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
             <div className="w-6 h-6 rounded bg-slate-800"></div>
             <span className="font-bold tracking-widest text-sm">LAUNCHLENS</span>
          </div>
          <p className="text-slate-600 text-sm font-mono">
            ENGINEERED FOR EXCELLENCE &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};