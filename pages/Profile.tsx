import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User as UserIcon, Shield, Zap, Award, Edit2, Save, X, Layers } from 'lucide-react';
import { Niche } from '../types';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    companyName: user?.companyName || '',
    interests: user?.interests || [],
  });

  if (!user) return null;

  const handleSave = async () => {
    await updateProfile({
      name: formData.name,
      companyName: formData.companyName,
      interests: formData.interests
    });
    setIsEditing(false);
  };

  const toggleInterest = (interest: Niche) => {
    if (formData.interests.includes(interest)) {
      setFormData({ ...formData, interests: formData.interests.filter(i => i !== interest) });
    } else {
      setFormData({ ...formData, interests: [...formData.interests, interest] });
    }
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Hero Header */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-surface/50">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-surface to-accent/10"></div>
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end md:items-center gap-6 -mt-12">
          <div className="w-24 h-24 rounded-2xl bg-surface border-4 border-surface shadow-2xl flex items-center justify-center text-3xl font-bold text-white relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-primary to-cyan opacity-20 group-hover:opacity-30 transition-opacity rounded-xl"></div>
             {getInitials(user.name)}
          </div>
          <div className="flex-1 mb-2">
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
               <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase tracking-wider text-[10px] font-mono text-primary-glow">{user.role}</span>
               <span>{user.email}</span>
            </div>
          </div>
          <div className="mb-4">
            {isEditing ? (
              <div className="flex gap-2">
                 <Button variant="ghost" onClick={() => setIsEditing(false)}><X size={16} className="mr-2"/> Cancel</Button>
                 <Button variant="accent" onClick={handleSave} isLoading={isLoading}><Save size={16} className="mr-2"/> Save Changes</Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}><Edit2 size={16} className="mr-2"/> Edit Profile</Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Info Column */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserIcon size={20} className="text-cyan-400" /> Personal Details
            </h2>
            <div className="space-y-6">
              <Input 
                label="Full Name" 
                value={isEditing ? formData.name : user.name} 
                disabled={!isEditing}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                label="Email Address" 
                value={user.email} 
                disabled={true} 
                className="opacity-50 cursor-not-allowed"
              />
              {user.role === 'CREATOR' && (
                <Input 
                  label="Company Name" 
                  value={isEditing ? formData.companyName : (user.companyName || 'Not set')} 
                  disabled={!isEditing}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                  placeholder="e.g. Acme Inc."
                />
              )}
            </div>
          </Card>

          {user.role === 'TESTER' && (
            <Card className="p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Layers size={20} className="text-accent" /> Testing Interests
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(Niche).map((niche) => {
                  const isActive = formData.interests.includes(niche);
                  return (
                    <button
                      key={niche}
                      disabled={!isEditing}
                      onClick={() => toggleInterest(niche)}
                      className={`p-3 rounded-lg border text-left text-sm transition-all ${
                        isActive 
                          ? 'bg-accent/10 border-accent text-accent-glow shadow-[0_0_10px_rgba(190,242,100,0.2)]' 
                          : 'bg-black/20 border-white/5 text-slate-500 hover:border-white/10'
                      } ${!isEditing ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
                    >
                      {niche}
                    </button>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        {/* Stats Column */}
        <div className="space-y-6">
          {user.role === 'TESTER' ? (
            <>
              <Card className="p-6 bg-gradient-to-br from-surface to-surface-light border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest">Current Tier</h3>
                  <Award className={`w-6 h-6 ${user.tier === 'Gold' ? 'text-yellow-400' : user.tier === 'Silver' ? 'text-slate-300' : 'text-orange-400'}`} />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{user.tier || 'Bronze'}</p>
                <div className="w-full bg-black/50 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-primary h-full w-3/4"></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">120 points to next tier</p>
              </Card>

              <Card className="p-6">
                 <div className="flex items-center gap-4 mb-4">
                   <div className="p-3 rounded bg-accent/10 text-accent"><Zap size={20}/></div>
                   <div>
                     <p className="text-2xl font-bold text-white">{user.completedTests || 0}</p>
                     <p className="text-xs text-slate-400">Tests Completed</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="p-3 rounded bg-cyan-500/10 text-cyan-400"><Shield size={20}/></div>
                   <div>
                     <p className="text-2xl font-bold text-white">98%</p>
                     <p className="text-xs text-slate-400">Approval Rate</p>
                   </div>
                 </div>
              </Card>
            </>
          ) : (
             <Card className="p-6 bg-gradient-to-br from-primary/10 to-surface border-primary/20">
                <h3 className="text-primary-glow font-bold mb-2">Creator Account</h3>
                <p className="text-sm text-slate-400 mb-4">
                  You have full access to create tests and view detailed analytics.
                </p>
                <Button variant="outline" className="w-full">Upgrade Plan</Button>
             </Card>
          )}
        </div>
      </div>
    </div>
  );
};