import React, { useEffect, useState } from 'react';
import { Zap, Shield, BarChart, Globe, Code, Compass } from 'lucide-react';
import { fetchFeatures, Feature } from '@/services/api/features';

const ICONS: Record<string, React.ElementType> = {
  Zap,
  Shield,
  BarChart,
  Globe,
  Code,
  Compass,
};

const Features: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFeatures = async () => {
      try {
        setLoading(true);
        const data = await fetchFeatures();
        setFeatures(data);
      } catch (err) {
        setError('Failed to load features.');
      } finally {
        setLoading(false);
      }
    };
    getFeatures();
  }, []);

  if (loading) return <div className="text-center text-gray-900 py-20">Loading features...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need, nothing you don't
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Our platform combines powerful capabilities with an intuitive interface, allowing you to focus on creating exceptional experiences.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon && ICONS[feature.icon] ? ICONS[feature.icon] : Zap;
            return (
              <div key={feature.id} className="flex flex-col items-start">
                <div className="rounded-lg bg-indigo-50 p-3 ring-1 ring-indigo-100">
                  <Icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-6 text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base leading-7 text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;