import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchServices } from '@/services/api/services';

const StarField = dynamic(() => import('../ui/StarField'), { ssr: false });
const MotionSection = dynamic(() => import('framer-motion').then(mod => mod.motion.section), { ssr: false });

interface Service {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const res = await fetchServices();
        setServices(res.data || []);
      } catch {
        setError('Failed to load services.');
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <StarField>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <MotionSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Services
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover how we can help transform your business with our comprehensive range of services.
              </p>
            </MotionSection>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center text-white py-10">Loading services...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-10">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map(service => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-xl p-8 shadow-lg border border-violet-400/10"
                  >
                    {service.icon && (
                      <div className="mb-4 text-4xl text-violet-400">
                        <span>{service.icon}</span>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-white mb-4">{service.name}</h2>
                    <p className="text-gray-300">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </StarField>
  );
};

export default ServicesPage;
