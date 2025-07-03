"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchTestimonials, submitTestimonial, Testimonial } from '../../services/api/testimonial';
import { useToast } from '../../contexts/ToastContext';

const schema = z.object({
  author: z.string().min(1, { message: 'Name is required' }),
  company: z.string().optional(),
  content: z.string().min(1, { message: 'Testimonial is required' }),
});

type TestimonialFormData = z.infer<typeof schema>;

const TestimonialsPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(schema),
  });
  const { showToast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load testimonials.');
        setLoading(false);
      });
  }, []);

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    try {
      const newTestimonial = await submitTestimonial(data);
      setTestimonials([newTestimonial, ...testimonials]);
      reset();
      showToast('Thank you for your feedback!', 'success');
    } catch {
      showToast('Failed to submit testimonial. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Testimonials</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what our clients are saying about us.
          </p>
        </div>
        <div className="max-w-xl mx-auto mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Submit Your Testimonial</h3>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                {...register('author')}
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              />
              {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>}
            </div>
            <div>
              <input
                type="text"
                {...register('company')}
                placeholder="Your Company (optional)"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              />
            </div>
            <div>
              <textarea
                {...register('content')}
                placeholder="Your testimonial..."
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none min-h-[100px]"
              />
              {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>}
            </div>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-4">Client Reviews</h3>
          {loading ? (
            <p className="text-gray-400">Loading testimonials...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : testimonials.length > 0 ? (
            <ul className="space-y-6">
              {testimonials.map(testimonial => (
                <li key={testimonial.id} className="bg-gray-800 rounded-lg p-6 text-left">
                  <p className="text-gray-200 italic mb-2">"{testimonial.content}"</p>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{testimonial.author}</span>
                    <span className="text-gray-400 text-sm">{testimonial.company}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No testimonials yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
