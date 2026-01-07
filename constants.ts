import { Niche, TestCriteria } from './types';
import { Layout, Smartphone, Gamepad2, FileText, ShoppingBag } from 'lucide-react';

export const NICHE_DATA: Record<Niche, { icon: any, criteria: TestCriteria[] }> = {
  [Niche.SAAS]: {
    icon: Layout,
    criteria: [
      { label: 'Value Proposition Clarity', type: 'rating' },
      { label: 'Call-to-Action Effectiveness', type: 'rating' },
      { label: 'Trust & Credibility', type: 'rating' },
      { label: 'Pricing Clarity', type: 'rating' },
      { label: 'Would you sign up?', type: 'boolean' }
    ]
  },
  [Niche.MOBILE_APP]: {
    icon: Smartphone,
    criteria: [
      { label: 'UI/UX Quality', type: 'rating' },
      { label: 'Onboarding Experience', type: 'rating' },
      { label: 'Feature Functionality', type: 'rating' },
      { label: 'Performance/Bugs', type: 'rating' },
      { label: 'Would you download?', type: 'boolean' }
    ]
  },
  [Niche.GAME]: {
    icon: Gamepad2,
    criteria: [
      { label: 'Fun Factor', type: 'rating' },
      { label: 'Tutorial Clarity', type: 'rating' },
      { label: 'Difficulty Balance', type: 'rating' },
      { label: 'Graphics/Audio Quality', type: 'rating' },
      { label: 'Would you buy this?', type: 'boolean' }
    ]
  },
  [Niche.DIGITAL]: {
    icon: FileText,
    criteria: [
      { label: 'Content Quality', type: 'rating' },
      { label: 'Perceived Value', type: 'rating' },
      { label: 'Ease of Use', type: 'rating' },
      { label: 'Professional Presentation', type: 'rating' },
      { label: 'Would you purchase?', type: 'boolean' }
    ]
  },
  [Niche.ECOMMERCE]: {
    icon: ShoppingBag,
    criteria: [
      { label: 'Shopping Experience', type: 'rating' },
      { label: 'Product Presentation', type: 'rating' },
      { label: 'Checkout Flow', type: 'rating' },
      { label: 'Trust Signals', type: 'rating' },
      { label: 'Would you buy here?', type: 'boolean' }
    ]
  }
};

export const PRICING_PACKAGES = [
  { count: 10, price: 79, desc: 'Starter Validation' },
  { count: 20, price: 149, desc: 'Deep Dive' },
  { count: 50, price: 249, desc: 'Scale Ready' },
];
