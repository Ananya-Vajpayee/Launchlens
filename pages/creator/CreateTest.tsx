import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/mockDb';
import { Niche } from '../../types';
import { NICHE_DATA, PRICING_PACKAGES } from '../../constants';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select, TextArea } from '../../components/ui/Input';
import { Check, ArrowRight, CheckCircle, Zap, CreditCard, Lock } from 'lucide-react';

const STEPS = ['Select Niche', 'Product Details', 'Audience', 'Secure Checkout'];

export const CreateTest: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    niche: Niche.SAAS,
    title: '',
    productUrl: '',
    description: '',
    instructions: '',
    minAge: 18,
    maxAge: 65,
    gender: 'All',
    packageIndex: 0
  });
  
  // Payment State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);

  // Format Card Number (groups of 4)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};
    if (!cardName) newErrors.cardName = "Name is required";
    if (cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = "Invalid card number";
    if (!expiry || !expiry.includes('/')) newErrors.expiry = "Invalid expiry";
    if (cvc.length < 3) newErrors.cvc = "Invalid CVC";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validatePayment()) return;
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const pkg = PRICING_PACKAGES[formData.packageIndex];
      // Simulate API call processing payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await db.createTest({
        creatorId: user.id,
        niche: formData.niche,
        title: formData.title,
        productUrl: formData.productUrl,
        description: formData.description,
        instructions: formData.instructions,
        packageSize: pkg.count as 10 | 20 | 50,
        price: pkg.price,
        targetAudience: {
          minAge: formData.minAge,
          maxAge: formData.maxAge,
          gender: formData.gender
        }
      });
      navigate('/creator');
    } catch (err) {
      setIsSubmitting(false);
      alert('Error creating test');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Steps */}
      <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2 rounded-full"></div>
        {STEPS.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center group cursor-default">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-all duration-300 relative z-10 ${
              idx <= currentStep 
                ? 'bg-primary border-primary/20 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]' 
                : 'bg-surface border-white/10 text-slate-600'
            }`}>
              {idx < currentStep ? <Check size={18} /> : idx + 1}
            </div>
            <span className={`text-xs mt-3 font-mono font-medium uppercase tracking-wider px-2 py-1 rounded transition-colors ${idx <= currentStep ? 'text-primary-glow bg-primary/10' : 'text-slate-600'}`}>{step}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 animate-fade-in-up">
        {currentStep === 0 && (
          <Card className="p-8 border-slate-700 bg-surface/80 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Select Product Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(NICHE_DATA).map(([key, data]) => {
                const Icon = data.icon;
                const isSelected = formData.niche === key;
                return (
                  <button
                    key={key}
                    onClick={() => setFormData({ ...formData, niche: key as Niche })}
                    className={`p-6 rounded-xl border transition-all text-left relative overflow-hidden group ${
                      isSelected 
                        ? 'border-primary bg-primary/10 ring-1 ring-primary/50' 
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    {isSelected && <div className="absolute top-2 right-2"><CheckCircle size={18} className="text-primary" /></div>}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-surface-light text-slate-500 group-hover:bg-white/10 group-hover:text-white'}`}>
                      <Icon size={24} />
                    </div>
                    <p className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{key}</p>
                    <p className="text-xs text-slate-500 mt-2">{data.criteria.length} specific metrics</p>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end pt-8 mt-4">
              <Button onClick={handleNext} variant="glow">Next Step <ArrowRight size={16} className="ml-2"/></Button>
            </div>
          </Card>
        )}

        {currentStep === 1 && (
          <Card className="p-8 border-slate-700 bg-surface/80 shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-white">Product Details</h2>
            <div className="grid gap-6">
              <Input 
                label="Test Title" 
                placeholder="e.g. New Landing Page Validation" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <Input 
                label="Product URL" 
                placeholder="https://" 
                value={formData.productUrl}
                onChange={e => setFormData({...formData, productUrl: e.target.value})}
              />
              <TextArea 
                label="Description" 
                placeholder="Briefly describe your product context..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <TextArea 
                label="Testing Instructions" 
                placeholder="List specific tasks (e.g., 'Find the pricing page', 'Create an account')..."
                className="min-h-[150px]"
                value={formData.instructions}
                onChange={e => setFormData({...formData, instructions: e.target.value})}
              />
            </div>
            <div className="flex justify-between pt-6 border-t border-white/10">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext}>Next Step <ArrowRight size={16} className="ml-2"/></Button>
            </div>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="p-8 border-slate-700 bg-surface/80 shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-white">Target Audience</h2>
            <div className="grid grid-cols-2 gap-6">
              <Input 
                label="Min Age" 
                type="number" 
                value={formData.minAge}
                onChange={e => setFormData({...formData, minAge: parseInt(e.target.value)})}
              />
              <Input 
                label="Max Age" 
                type="number" 
                value={formData.maxAge}
                onChange={e => setFormData({...formData, maxAge: parseInt(e.target.value)})}
              />
            </div>
            <Select 
              label="Gender"
              value={formData.gender}
              onChange={e => setFormData({...formData, gender: e.target.value})}
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex gap-4 items-start">
              <div className="p-2 bg-primary/20 rounded-full text-primary-glow mt-1">
                <Zap size={16} />
              </div>
              <div>
                <p className="font-bold text-primary-glow mb-1">Smart Matching Active</p>
                <p className="text-sm text-slate-300">We will prioritize testers who have expressed interest in <span className="text-white font-semibold">{formData.niche}</span> and match these demographics.</p>
              </div>
            </div>
            
            <div className="flex justify-between pt-6 border-t border-white/10">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext}>Next Step <ArrowRight size={16} className="ml-2"/></Button>
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 bg-surface/80 border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                
                {/* Package Selection */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {PRICING_PACKAGES.map((pkg, idx) => {
                    const isSelected = formData.packageIndex === idx;
                    return (
                      <div 
                        key={idx}
                        onClick={() => setFormData({...formData, packageIndex: idx})}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden text-center ${
                          isSelected 
                            ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                            : 'border-white/10 bg-black/20 hover:border-white/20'
                        }`}
                      >
                        <h3 className="font-bold text-white text-sm">{pkg.count} Testers</h3>
                        <p className={`text-xl font-black my-1 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`}>${pkg.price}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Credit Card Form */}
                <div className="space-y-4">
                  <Input 
                    label="Cardholder Name" 
                    placeholder="JOHN DOE" 
                    value={cardName}
                    onChange={e => setCardName(e.target.value.toUpperCase())}
                    error={errors.cardName}
                    className="font-mono"
                  />
                  <Input 
                    label="Card Number" 
                    placeholder="0000 0000 0000 0000" 
                    value={cardNumber}
                    maxLength={19}
                    onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                    error={errors.cardNumber}
                    className="font-mono tracking-wider"
                    icon={<CreditCard className="text-slate-500" />}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Expiry Date" 
                      placeholder="MM/YY" 
                      value={expiry}
                      maxLength={5}
                      onChange={e => setExpiry(e.target.value)}
                      error={errors.expiry}
                      className="font-mono"
                    />
                    <Input 
                      label="CVC" 
                      placeholder="123" 
                      value={cvc}
                      maxLength={4}
                      type="password"
                      onChange={e => setCvc(e.target.value)}
                      error={errors.cvc}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                  <Lock size={12} />
                  Payments are secure and encrypted.
                </div>
              </Card>
              <div className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-surface/80 border-white/10 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-white/10 text-sm">
                   <div className="flex justify-between">
                     <span className="text-slate-400">Test Type</span>
                     <span className="text-white font-medium">{formData.niche}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-400">Package</span>
                     <span className="text-white font-medium">{PRICING_PACKAGES[formData.packageIndex].count} Testers</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-400">Targeting</span>
                     <span className="text-white font-medium">Custom</span>
                   </div>
                </div>

                <div className="flex justify-between items-end mb-6">
                   <span className="text-slate-400">Total Due</span>
                   <span className="text-3xl font-black text-white">${PRICING_PACKAGES[formData.packageIndex].price}</span>
                </div>

                <Button 
                  className="w-full h-12 text-lg font-bold" 
                  variant="accent"
                  onClick={handleSubmit} 
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : `Pay $${PRICING_PACKAGES[formData.packageIndex].price}`}
                </Button>

                <div className="mt-4 flex justify-center gap-4 opacity-50">
                  <div className="h-6 w-10 bg-white rounded"></div>
                  <div className="h-6 w-10 bg-white rounded"></div>
                  <div className="h-6 w-10 bg-white rounded"></div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};