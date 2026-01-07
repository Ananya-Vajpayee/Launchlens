import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { NICHE_DATA } from '../constants';
import { ArrowRight, CheckCircle, Shield, TrendingUp, Hexagon, Crosshair } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10"></div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-4">
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:border-primary/50 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-300">Matching Algorithm v2.0 Live</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
            VALIDATE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">BEFORE CODE.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Connect with real, targeted users. Get video recordings and brutal honesty in <span className="text-accent font-mono">24 hours</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/auth/register?role=CREATOR">
              <Button variant="accent" size="lg" className="min-w-[200px] h-14 text-lg border-none hover:scale-105 transition-transform">
                Start Testing <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth/register?role=TESTER">
              <Button variant="secondary" size="lg" className="min-w-[200px] h-14 text-lg">
                Become a Tester
              </Button>
            </Link>
          </div>

          {/* Abstract Dashboard Graphic */}
          <div className="mt-20 relative mx-auto max-w-5xl perspective-1000">
             <div className="relative rounded-xl bg-surface/80 border border-white/10 p-2 shadow-2xl backdrop-blur-xl transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out group">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
                <div className="aspect-[16/9] rounded-lg bg-black/50 border border-white/5 overflow-hidden relative">
                   {/* Fake Dashboard UI */}
                   <div className="absolute top-0 left-0 w-60 h-full border-r border-white/10 bg-surface/50 p-4 hidden md:block">
                      <div className="w-8 h-8 rounded bg-primary/20 mb-8"></div>
                      <div className="space-y-4">
                        <div className="h-2 w-20 bg-white/10 rounded"></div>
                        <div className="h-2 w-32 bg-white/10 rounded"></div>
                        <div className="h-2 w-24 bg-white/10 rounded"></div>
                      </div>
                   </div>
                   <div className="p-8 md:pl-72">
                      <div className="flex justify-between items-center mb-8">
                        <div className="h-8 w-48 bg-white/10 rounded"></div>
                        <div className="h-8 w-24 bg-accent/20 rounded"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-8">
                         <div className="h-24 bg-white/5 rounded border border-white/5"></div>
                         <div className="h-24 bg-white/5 rounded border border-white/5"></div>
                         <div className="h-24 bg-white/5 rounded border border-white/5"></div>
                      </div>
                      <div className="h-40 bg-white/5 rounded border border-white/5"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Bar (Auralee style typography) */}
      <section className="border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
              <div>
                 <p className="text-4xl md:text-5xl font-black text-white mb-2">5K+</p>
                 <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Testers</p>
              </div>
              <div>
                 <p className="text-4xl md:text-5xl font-black text-white mb-2">24H</p>
                 <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Turnaround</p>
              </div>
              <div>
                 <p className="text-4xl md:text-5xl font-black text-white mb-2">12K</p>
                 <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Tests Run</p>
              </div>
              <div>
                 <p className="text-4xl md:text-5xl font-black text-white mb-2">4.9</p>
                 <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Avg Rating</p>
              </div>
           </div>
        </div>
      </section>

      {/* Niches Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div className="max-w-xl">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Specialized Evaluation Criteria.</h2>
               <p className="text-slate-400">Generic forms don't work. We use tailored metrics for every product category.</p>
             </div>
             <Button variant="outline" className="hidden md:flex">View All Categories</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(NICHE_DATA).map(([key, data]) => {
              const Icon = data.icon;
              return (
                <Card key={key} hoverEffect className="group bg-surface/30 backdrop-blur-sm border-white/5 p-6 h-full flex flex-col justify-between">
                  <div className="mb-8">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-accent group-hover:bg-accent/10 transition-colors mb-6">
                       <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">{key}</h3>
                  </div>
                  <div className="flex items-center text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
                     <Crosshair className="w-3 h-3 mr-2" />
                     {data.criteria.length} Metrics
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark Feature Section */}
      <section className="py-32 bg-surface/50 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-12">
               <div>
                  <div className="inline-flex items-center gap-2 mb-4 text-accent font-mono text-xs uppercase tracking-widest">
                    <Hexagon size={12} fill="currentColor" /> Intelligence
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Precision Matching.</h2>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Stop wasting money on random traffic. Our algorithm filters testers by age, profession, tech-savviness, and specific interests to find your actual potential users.
                  </p>
               </div>

               <div className="space-y-8">
                  <div className="flex gap-6 group">
                     <div className="mt-1 w-12 h-12 rounded bg-black border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-accent group-hover:border-accent/50 transition-colors shrink-0">
                        <TrendingUp size={20} />
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-lg">Demographic Filters</h4>
                        <p className="text-slate-500 text-sm mt-1">Target by age, gender, location, and tech proficiency.</p>
                     </div>
                  </div>
                  <div className="flex gap-6 group">
                     <div className="mt-1 w-12 h-12 rounded bg-black border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-accent group-hover:border-accent/50 transition-colors shrink-0">
                        <Shield size={20} />
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-lg">Quality Guaranteed</h4>
                        <p className="text-slate-500 text-sm mt-1">Low effort responses are automatically rejected.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="relative">
               {/* Visual representation of matching */}
               <div className="relative z-10 bg-black/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                     <div>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Target Profile</p>
                        <p className="text-white font-bold">SaaS Founder, 25-40</p>
                     </div>
                     <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Compatibility</p>
                        <p className="text-accent font-mono">98.4%</p>
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     {[1,2,3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 transition-colors">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600"></div>
                           <div className="flex-1">
                              <div className="h-2 w-24 bg-slate-700 rounded mb-2"></div>
                              <div className="h-2 w-16 bg-slate-800 rounded"></div>
                           </div>
                           <CheckCircle className="text-primary w-5 h-5" />
                        </div>
                     ))}
                  </div>
                  
                  {/* Decorative Elements behind */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative text-center">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 -z-10"></div>
         <div className="container mx-auto px-4">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">READY TO LAUNCH?</h2>
            <div className="flex flex-col items-center gap-6">
               <Link to="/auth/register">
                  <Button variant="accent" size="lg" className="h-16 px-12 text-xl hover:scale-105 transition-transform text-black">
                     Start Your Test
                  </Button>
               </Link>
               <p className="text-slate-500 font-mono text-sm">NO CREDIT CARD REQUIRED</p>
            </div>
         </div>
      </section>
    </div>
  );
};