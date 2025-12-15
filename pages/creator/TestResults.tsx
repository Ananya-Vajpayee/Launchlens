import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { Test, TestResult } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, PlayCircle, Star, Download } from 'lucide-react';
import { NICHE_DATA } from '../../constants';

export const TestResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      Promise.all([
        db.getTestById(id),
        db.getResultsForTest(id)
      ]).then(([t, r]) => {
        setTest(t || null);
        setResults(r);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading results...</div>;
  if (!test) return <div className="p-10 text-center">Test not found</div>;

  // Calculate Averages
  const criteria = NICHE_DATA[test.niche]?.criteria || [];
  const averages = criteria.map(c => {
    if (c.type === 'rating') {
      const sum = results.reduce((acc, r) => acc + (r.ratings[c.label] as number || 0), 0);
      return { label: c.label, value: results.length ? (sum / results.length).toFixed(1) : '-' };
    } else {
      const yesCount = results.filter(r => r.ratings[c.label] === true).length;
      return { label: c.label, value: results.length ? `${Math.round((yesCount / results.length) * 100)}% Yes` : '-' };
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Link to="/creator">
        <Button variant="ghost" className="pl-0 mb-4 hover:bg-transparent hover:text-brand-600"><ArrowLeft size={16} className="mr-2" /> Back to Dashboard</Button>
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{test.title}</h1>
          <div className="flex gap-2">
            <Badge variant="info">{test.niche}</Badge>
            <Badge variant={test.status === 'ACTIVE' ? 'success' : 'default'}>{test.status}</Badge>
            <span className="text-sm text-slate-500 flex items-center ml-2">
              {test.completedCount} / {test.packageSize} Responses
            </span>
          </div>
        </div>
        <Button variant="outline" className="flex gap-2">
          <Download size={16} /> Export Report
        </Button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {averages.map((stat, idx) => (
          <Card key={idx} className="p-4 border-t-4 border-t-brand-500">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Individual Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Tester Feedback</h2>
        {results.length === 0 ? (
           <Card className="p-8 text-center text-slate-500">
             No feedback submitted yet.
           </Card>
        ) : (
          results.map(result => (
            <Card key={result.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Video Placeholder */}
                <div className="w-full md:w-1/3 aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url(https://picsum.photos/400/225)' }}></div>
                  <PlayCircle size={48} className="text-white relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">04:23</span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                   <div className="flex justify-between items-start">
                     <div>
                       <h3 className="font-bold text-lg">{result.testerName}</h3>
                       <p className="text-sm text-slate-500">Quality Score: <span className="text-green-600 font-bold">{result.qualityScore}</span></p>
                     </div>
                     <span className="text-xs text-slate-400">{new Date(result.submittedAt).toLocaleDateString()}</span>
                   </div>

                   <div className="bg-slate-50 p-4 rounded-lg">
                     <p className="text-slate-700 italic">"{result.feedback}"</p>
                   </div>

                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                      {Object.entries(result.ratings).map(([key, val]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-slate-400 text-xs truncate" title={key}>{key}</span>
                          <span className="font-medium">
                            {typeof val === 'boolean' ? (val ? 'Yes' : 'No') : (
                              <div className="flex items-center text-brand-600">
                                <Star size={12} fill="currentColor" className="mr-1" /> {val}/10
                              </div>
                            )}
                          </span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
