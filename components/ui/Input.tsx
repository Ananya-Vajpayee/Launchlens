import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-accent transition-colors">{label}</label>}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 bg-black/40 border rounded-lg focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all text-white placeholder-slate-700 font-medium ${
            error 
              ? 'border-red-500/50 focus:border-red-500' 
              : 'border-white/10 hover:border-white/20'
          } ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
            {icon}
          </div>
        )}
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-focus-within:border-accent/50 transition-colors pointer-events-none rounded-tl-lg"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-focus-within:border-accent/50 transition-colors pointer-events-none rounded-br-lg"></div>
      </div>
      {error && <p className="mt-1 text-xs text-red-400 font-mono">{error}</p>}
    </div>
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ label, children, className = '', ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-accent transition-colors">{label}</label>}
      <select
        className={`w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 text-white transition-all appearance-none cursor-pointer hover:border-white/20 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-accent transition-colors">{label}</label>}
      <textarea
        className={`w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 text-white transition-all placeholder-slate-700 min-h-[100px] resize-y ${className}`}
        {...props}
      />
    </div>
  );
};