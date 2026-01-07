import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/mockDb';
import { Test } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, BarChart2, Users, CheckCircle, Search } from 'lucide-react';

export const CreatorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      db.getTestsForCreator(user.id).then(data => {
        setTests(data);
        setLoading(false);
      });
    }
  }, [user]);

  const activeTests = tests.filter(t => t.status === 'ACTIVE');
  const completedTests = tests.filter(t => t.status === 'COMPLETED');
  const totalApplicants = tests.reduce((acc, t) => acc + t.applicantCount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Manage your product tests and view analytics.</p>
        </div>
        <Link to="/creator/new">
          <Button variant="glow" className="flex items-center gap-2">
            <Plus size={18} /> Create New Test
          </Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-5 hoverEffect">
          <div className="p-4 bg-brand-500/10 text-brand-400 rounded-2xl border border-brand-500/20">
            <BarChart2 size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">Active Tests</p>
            <p className="text-3xl font-bold text-white mt-1">{activeTests.length}</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-5 hoverEffect">
          <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">Total Feedback</p>
            <p className="text-3xl font-bold text-white mt-1">{totalApplicants}</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-5 hoverEffect">
          <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">Completed</p>
            <p className="text-3xl font-bold text-white mt-1">{completedTests.length}</p>
          </div>
        </Card>
      </div>

      {/* Tests List */}
      <Card className="overflow-hidden border-slate-800">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-lg text-white">Recent Tests</h2>
          <div className="w-64 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search tests..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-full py-1.5 pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:border-brand-500/50"
              />
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="p-12 text-center text-slate-500">
             <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             Loading your data...
          </div>
        ) : tests.length === 0 ? (
          <div className="p-16 text-center">
            <div className="inline-block p-4 rounded-full bg-slate-800/50 mb-4 border border-slate-700">
               <Plus size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No tests created yet</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">Create your first product test to start getting valuable feedback from real users.</p>
            <Link to="/creator/new">
              <Button>Create Test</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/50 text-slate-400 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Test Name</th>
                  <th className="px-6 py-4">Niche</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {tests.map(test => (
                  <tr key={test.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-white group-hover:text-brand-300 transition-colors">{test.title}</td>
                    <td className="px-6 py-4 text-slate-400">{test.niche}</td>
                    <td className="px-6 py-4">
                      <Badge variant={test.status === 'ACTIVE' ? 'success' : test.status === 'COMPLETED' ? 'default' : 'warning'}>
                        {test.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1 text-slate-400">
                          <span>{Math.round((test.completedCount / test.packageSize) * 100)}%</span>
                          <span>{test.completedCount}/{test.packageSize}</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-brand-500 to-indigo-500" 
                            style={{ width: `${(test.completedCount / test.packageSize) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{new Date(test.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/creator/test/${test.id}`}>
                        <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Results</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};