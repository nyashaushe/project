'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchFeatures, Feature } from '../../services/api/features';
import Skeleton from '../ui/Skeleton';

const FeaturesPage: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFeatures = async () => {
      try {
        setLoading(true);
        const { data } = await fetchFeatures();
        setFeatures(data);
      } catch (err) {
        setError('Failed to fetch features.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getFeatures();
  }, []);

  if (loading) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl overflow-hidden p-6">
                <Skeleton className="h-8 w-8 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn more about our amazing features.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* You can add an icon here if you have one */}
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;
