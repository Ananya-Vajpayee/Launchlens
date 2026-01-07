import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/mockDb';
import { useAuth } from '../../contexts/AuthContext';
import { Test } from '../../types';
import { NICHE_DATA } from '../../constants';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TextArea } from '../../components/ui/Input';
import { Mic, Video, StopCircle } from 'lucide-react';

export const ActiveTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [step, setStep] = useState<'instructions' | 'recording' | 'feedback'>('instructions');
  const [ratings, setRatings] = useState<Record<string, any>>({});
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      db.getTestById(id).then(test => setTest(test || null));
    }
  }, [id]);

  if (!test) return <div>Loading...</div>;

  const criteria = NICHE_DATA[test.niche]?.criteria || [];

  const handleStartRecording = () => {
    // Request permissions would go here
    setIsRecording(true);
    setStep('recording');
    window.open(test.productUrl, '_blank');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setStep('feedback');
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    await db.submitTestResult({
      testId: test.id,
      testerId: user.id,
      testerName: user.name,
      ratings,
      feedback,
    });
    setIsSubmitting(false);
    navigate('/tester');
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Recording Indicator */}
      {isRecording && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <span className="font-bold text-sm">Recording in progress...</span>
        </div>
      )}

      {step === 'instructions' && (
        <Card className="p-8 space-y-6">
          <div className="border-b border-slate-200 pb-6">
             <h1 className="text-2xl font-bold mb-2">{test.title}</h1>
             <p className="text-slate-500">{test.description}</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2">Instructions</h3>
            <p className="text-blue-800 whitespace-pre-line">{test.instructions}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">Requirements</h3>
            <ul className="list-disc pl-5 text-slate-600 space-y-2">
              <li>Record your screen and microphone while testing.</li>
              <li>Speak your thoughts aloud constantly (think-aloud protocol).</li>
              <li>Complete the specific tasks mentioned above.</li>
              <li>Spend at least 5 minutes testing.</li>
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
             <Button onClick={handleStartRecording} className="w-full flex items-center justify-center gap-2 text-lg py-4">
               <Video size={20} /> Start Recording & Open Site
             </Button>
          </div>
        </Card>
      )}

      {step === 'recording' && (
        <Card className="p-8 text-center space-y-6">
          <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Mic size={40} />
          </div>
          <h2 className="text-2xl font-bold">Testing in Progress</h2>
          <p className="text-slate-600">
            The product website has been opened in a new tab.<br/>
            Complete the tasks and return here when finished.
          </p>
          
          <div className="p-4 bg-slate-50 rounded-lg text-left text-sm text-slate-600">
            <span className="font-bold block mb-1">Reminder:</span>
            {test.instructions}
          </div>

          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300" onClick={handleStopRecording}>
            <StopCircle size={20} className="mr-2" /> Stop Recording & Submit Feedback
          </Button>
        </Card>
      )}

      {step === 'feedback' && (
        <Card className="p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Submit Feedback</h2>
            <p className="text-slate-500">Rate your experience based on the categories below.</p>
          </div>

          <div className="space-y-6">
            {criteria.map((c, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-6 last:border-0">
                <label className="block font-medium text-slate-900 mb-2">{c.label}</label>
                {c.type === 'rating' ? (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRatings({...ratings, [c.label]: num})}
                        className={`w-10 h-10 rounded-lg border transition-all ${
                          ratings[c.label] === num 
                            ? 'bg-brand-500 text-white border-brand-500' 
                            : 'border-slate-200 hover:border-brand-300 text-slate-600'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRatings({...ratings, [c.label]: true})}
                      className={`px-6 py-2 rounded-lg border transition-all ${
                        ratings[c.label] === true 
                          ? 'bg-green-500 text-white border-green-500' 
                          : 'border-slate-200 hover:border-green-300'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setRatings({...ratings, [c.label]: false})}
                      className={`px-6 py-2 rounded-lg border transition-all ${
                        ratings[c.label] === false 
                          ? 'bg-red-500 text-white border-red-500' 
                          : 'border-slate-200 hover:border-red-300'
                      }`}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <TextArea 
            label="Written Feedback"
            placeholder="What did you like? What was confusing? Be specific."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <Button className="w-full h-12" onClick={handleSubmit} isLoading={isSubmitting}>
            Submit Test & Earn Credits
          </Button>
        </Card>
      )}
    </div>
  );
};
