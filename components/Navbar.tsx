import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { Bell, User as UserIcon, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="sticky top-4 z-50 px-4">
      <nav className="h-16 mx-auto max-w-7xl rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-md px-6 flex items-center justify-between shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur group-hover:blur-md transition-all"></div>
            <div className="relative w-full h-full rounded-lg bg-gradient-to-br from-surface to-black border border-white/10 flex items-center justify-center text-white font-bold group-hover:border-primary/50 transition-colors">
              L
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-primary-glow transition-colors">LaunchLens</span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-white/5">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">{user.role}</p>
                </div>
                
                <Link to="/profile">
                  <div className="w-9 h-9 rounded-full bg-surface border border-white/10 flex items-center justify-center text-slate-300 hover:border-primary/50 hover:text-white transition-all cursor-pointer">
                    <UserIcon className="w-4 h-4" />
                  </div>
                </Link>
                
                <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-400 transition-colors" title="Log out">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/auth/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Log In
              </Link>
              <Link to="/auth/register">
                <Button size="sm" variant="glow" className="font-semibold text-xs uppercase tracking-wide">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};