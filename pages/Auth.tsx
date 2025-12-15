import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Niche } from '../types';

export const AuthPage: React.FC<{ mode: 'login' | 'register' }> = ({ mode }) => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const [role, setRole] = useState(roleParam === 'TESTER' ? 'TESTER' : 'CREATOR');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Dummy
  const [name, setName] = useState('');
  const [interest, setInterest] = useState<Niche>(Niche.SAAS);
  
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(email, role as any);
      } else {
        await register({
          email,
          name,
          role: role as any,
          interests: role === 'TESTER' ? [interest] : undefined
        });
      }
      navigate(role === 'CREATOR' ? '/creator' : '/tester');
    } catch (err) {
      alert("Auth failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <Link to="/" className="mb-8 flex items-center gap-2 relative z-10 group">
         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">L</div>
         <span className="text-2xl font-bold text-white tracking-tight">LaunchLens</span>
      </Link>
      
      <Card className="w-full max-w-md p-8 relative z-10 border-slate-800 bg-slate-900/80">
        <h2 className="text-2xl font-bold mb-2 text-center text-white">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-400 text-center mb-8 text-sm">
          {mode === 'login' ? 'Enter your details to access your dashboard' : 'Start your journey with LaunchLens today'}
        </p>
        
        {mode === 'register' && (
          <div className="flex gap-2 p-1.5 bg-slate-950/50 border border-slate-800 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setRole('CREATOR')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                role === 'CREATOR' ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              I'm a Creator
            </button>
            <button
              type="button"
              onClick={() => setRole('TESTER')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                role === 'TESTER' ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              I'm a Tester
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Input 
              label="Full Name" 
              placeholder="John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          )}
          
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          {mode === 'register' && role === 'TESTER' && (
            <Select 
              label="Primary Interest" 
              value={interest} 
              onChange={(e) => setInterest(e.target.value as Niche)}
            >
              {Object.values(Niche).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </Select>
          )}

          <Button type="submit" variant="glow" className="w-full mt-4" isLoading={isLoading}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <span 
            className="text-brand-400 font-medium cursor-pointer hover:text-brand-300 transition-colors hover:underline"
            onClick={() => navigate(mode === 'login' ? '/auth/register' : '/auth/login')}
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </span>
        </p>
      </Card>
      
      {/* Demo helper */}
      <div className="mt-8 text-xs text-slate-600 text-center bg-slate-900/50 p-4 rounded-lg border border-slate-800/50 backdrop-blur-sm">
        <p className="font-bold text-slate-500 mb-1">Demo Credentials:</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-left">
          <span>Creator: <code className="text-slate-400">creator@demo.com</code></span>
          <span>Tester: <code className="text-slate-400">tester@demo.com</code></span>
        </div>
        <p className="mt-2 text-slate-600">Password: any</p>
      </div>
    </div>
  );
};