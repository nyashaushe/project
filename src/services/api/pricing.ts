export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const fetchPricingPlans = async () => {
  try {
    const response = await fetch('/api/pricing');
    if (!response.ok) {
      throw new Error('Failed to fetch pricing plans');
    }
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return {
      data: [],
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
