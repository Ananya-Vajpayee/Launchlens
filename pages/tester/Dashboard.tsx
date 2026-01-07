import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/mockDb';
import { Test } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DollarSign, Award, Clock, Zap, Star } from 'lucide-react';

export const TesterDashboard: React.FC = () => {
  const { user } = useAuth();
  const [availableTests, setAvailableTests] = useState<Test[]>([]);
  
  useEffect(() => {
    if (user) {
      db.getAvailableTestsForTester(user.id).then(setAvailableTests);
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tester Dashboard</h1>
          <p className="text-slate-400">Complete tests to earn credits and level up.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 shadow-lg">
           <div className={`p-2 rounded-lg ${user?.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-700/50 text-slate-300'}`}>
             <Award size={20} />
           </div>
           <div>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tier Status</p>
             <p className="font-bold text-white">{user?.tier || 'Bronze'}</p>
           </div>
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Credits Card */}
        <Card className="p-6 bg-gradient-to-br from-indigo-900/80 to-slate-900 border-indigo-500/30 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-indigo-200 text-sm font-medium mb-1 flex items-center gap-2"><DollarSign size={14} /> Wallet Balance</p>
              <h2 className="text-4xl font-bold tracking-tight">{user?.credits || 0} <span className="text-lg font-normal text-indigo-300">credits</span></h2>
              <p className="text-xs text-indigo-300/80 mt-2 bg-indigo-950/50 inline-block px-2 py-1 rounded">≈ ${(user?.credits || 0) * 0.1} USD</p>
            </div>
          </div>
          <Button size="sm" className="mt-8 w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-sm">Redeem Earnings</Button>
        </Card>

        {/* Progress Card */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
             <div>
               <p className="text-slate-400 text-sm font-medium mb-1">Tests Completed</p>
               <h2 className="text-3xl font-bold text-white">{user?.completedTests || 0}</h2>
             </div>
             <div className="p-3 bg-brand-500/10 text-brand-400 rounded-lg"><Clock size={24} /></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
               <span>Next Tier: Silver</span>
               <span>12/20</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
               <div className="h-full bg-brand-500 w-[60%] shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 flex flex-col justify-center space-y-3">
           <h3 className="font-bold text-white mb-2 flex items-center gap-2"><Zap size={18} className="text-yellow-400" /> Quick Actions</h3>
           <Link to="/tester/available" className="w-full">
             <Button variant="outline" className="w-full justify-start border-slate-700 bg-slate-800/50">Browse New Tests</Button>
           </Link>
           <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white">Update Profile</Button>
           <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white">View Payment History</Button>
        </Card>
      </div>

      {/* Available Tests */}
      <div className="flex items-center justify-between pt-4">
         <h2 className="text-xl font-bold text-white flex items-center gap-2">
           <span className="w-2 h-6 bg-brand-500 rounded-full"></span>
           Recommended for You
         </h2>
         <Link to="/tester/available">
           <Button variant="ghost">Browse All <span className="ml-1 text-slate-500 text-xs">({availableTests.length})</span></Button>
         </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableTests.map(test => (
          <Card key={test.id} className="flex flex-col h-full hover:border-brand-500/40 hover:-translate-y-1 transition-all group" hoverEffect>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="info" className="bg-slate-800 text-brand-300 border-slate-700">{test.niche}</Badge>
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  <Star size={12} fill="currentColor" />
                  <span>25 Credits</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">{test.title}</h3>
              <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{test.description}</p>
            </div>
            <div className="p-6 border-t border-slate-800 mt-auto bg-slate-900/30">
              <Link to={`/tester/test/${test.id}`}>
                <Button className="w-full" variant="secondary">Start Test</Button>
              </Link>
            </div>
          </Card>
        ))}
        {availableTests.length === 0 && (
          <div className="col-span-full py-16 text-center bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
            <p className="text-slate-500 mb-4">No tests match your current interests.</p>
            <Button variant="outline">Update Interests</Button>
          </div>
        )}
      </div>
    </div>
  );
};