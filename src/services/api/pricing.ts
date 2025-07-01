// src/services/api/pricing.ts
import axios from 'axios';

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export async function fetchPricingPlans(): Promise<PricingPlan[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pricing-plans`);
    // Adjust data path as per Strapi response structure
    return res.data.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      price: item.attributes.price,
      description: item.attributes.description,
      features: item.attributes.features,
      popular: item.attributes.popular,
    }));
  } catch (error) {
    throw new Error('Failed to fetch pricing plans');
  }
}
