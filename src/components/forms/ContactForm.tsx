import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../ui/Button';
import { Phone, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { submitContactForm } from '../../services/api/contact';
import { useToast } from '../../contexts/ToastContext';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, { message: 'Please select a subject' }),
  message: z.string().min(1, { message: 'Message is required' }),
  subscribeToNewsletter: z.boolean(),
  agreeToPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
});

type ContactFormData = z.infer<typeof schema>;

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    ['name', 'email', 'phone', 'company'], // Step 1 fields
    ['subject', 'message', 'subscribeToNewsletter', 'agreeToPrivacyPolicy'] // Step 2 fields
  ];

  const handleNext = async () => {
    const isValid = await trigger(steps[currentStep] as (keyof ContactFormData)[]);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      showToast('Message sent successfully!', 'success');
      reset();
      setCurrentStep(0);
    } catch (error) {
      showToast('There was an error submitting your form. Please try again.', 'error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name *
                </label>
                <input
                  id="name"
                  {...register('name')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe"
                  aria-required="true"
                  aria-label="Your Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="john@example.com"
                  aria-required="true"
                  aria-label="Email Address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+1 (555) 123-4567"
                    aria-label="Phone Number"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    id="company"
                    {...register('company')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your Company"
                    aria-label="Company"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  {...register('subject')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 custom-select"
                  defaultValue=""
                  aria-required="true"
                  aria-label="Subject"
                >
                  <option value="" disabled className="custom-select-option">Select a subject</option>
                  <option value="General Inquiry" className="custom-select-option">General Inquiry</option>
                  <option value="Service Request" className="custom-select-option">Service Request</option>
                  <option value="Partnership Opportunity" className="custom-select-option">Partnership Opportunity</option>
                  <option value="Technical Support" className="custom-select-option">Technical Support</option>
                  <option value="Other" className="custom-select-option">Other</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell us about your project or questions..."
                  aria-required="true"
                  aria-label="Message"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="subscribeToNewsletter"
                      type="checkbox"
                      {...register('subscribeToNewsletter')}
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      aria-label="Subscribe to newsletter"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="subscribeToNewsletter" className="text-gray-300">
                      Subscribe to our newsletter for updates
                    </label>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToPrivacyPolicy"
                      type="checkbox"
                      {...register('agreeToPrivacyPolicy')}
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      aria-label="Agree to privacy policy"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToPrivacyPolicy" className="text-gray-300">
                      I agree to the <a href="/privacy-policy" className="text-purple-400 hover:text-purple-300">privacy policy</a> *
                    </label>
                    {errors.agreeToPrivacyPolicy && (
                      <p className="mt-1 text-sm text-red-400">{errors.agreeToPrivacyPolicy.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}



          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button type="button" variant="secondary" onClick={handlePrevious} aria-label="Previous Step">
                <ArrowLeft size={20} className="mr-2" aria-hidden="true" /> Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="button" variant="primary" onClick={handleNext} className="ml-auto" aria-label="Next Step">
                Next <ArrowRight size={20} className="ml-2" aria-hidden="true" />
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
                aria-label="Submit Contact Form"
              >
                {isSubmitting ? 'Sending...' : 'Schedule Consultation'}
              </Button>
            )}
          </div>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:pl-6"
      >
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
          <p className="text-gray-400 mb-6">
            Have questions about our services? Need a custom solution for your business?
            Fill out the form or contact us directly using the information below.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-purple-400 mr-3" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-purple-400 mr-3" />
              <span className="text-gray-300">info@baobabstack.com</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h4 className="text-lg font-medium text-white mb-3">Business Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
              <li>Saturday: 10:00 AM - 2:00 PM EST</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;