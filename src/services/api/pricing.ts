import { fetchCollection } from './apiService';

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const fetchPricingPlans = () => fetchCollection<PricingPlan>('pricing-plans');
