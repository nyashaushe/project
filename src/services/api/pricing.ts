import { getStaticData } from "../clientDataService";

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const fetchPricingPlans = () => getStaticData<PricingPlan>("pricing");
