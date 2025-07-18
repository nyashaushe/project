import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '../ui/Button';
import { fetchPricingPlans, PricingPlan } from '@/services/api/pricing';

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPlans = async () => {
      try {
        setLoading(true);
        const data = await fetchPricingPlans();
        setPlans(data);
      } catch {
        setError('Failed to load pricing plans.');
      } finally {
        setLoading(false);
      }
    };
    getPlans();
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Transparent Pricing</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Flexible plans designed to fit your business needs and budget. No hidden fees.
          </p>
          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-primary' : 'bg-gray-600'
              }`}
              aria-label="Toggle yearly pricing"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>
              Yearly <span className="text-accent">Save 20%</span>
            </span>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-white py-10">Loading pricing plans...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`pricing-card rounded-lg p-8 relative ${
                  plan.popular ? 'border-2 border-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    POPULAR
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-white">${isYearly ? Math.round(parseInt(plan.price.replace(/,/g, '')) * 0.8) : plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-accent mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? 'primary' : 'ghost'} className="w-full">
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        )}
        <p className="text-center text-gray-400 mt-12">
          Need a custom plan? <a href="#contact" className="text-primary hover:text-primary-light">Contact us</a> for a tailored solution.
        </p>
      </div>
    </section>
  );
};

export default Pricing;