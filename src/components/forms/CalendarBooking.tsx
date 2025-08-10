import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Calendar, Clock, User, Mail } from 'lucide-react';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
}

const CalendarBooking: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // This would be replaced with an actual API call
      console.log('Booking submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      setSubmitError('There was an error submitting your booking. Please try again.');
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time slots from 9 AM to 5 PM
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    timeSlots.push(`${hourFormatted}:00 ${amPm}`);
    timeSlots.push(`${hourFormatted}:30 ${amPm}`);
  }

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 border border-white/10 rounded-lg p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
          <Calendar className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">Booking Confirmed!</h3>
        <p className="text-gray-300 mb-6">
          Your consultation has been scheduled. We'll send you a confirmation email with all the details.
        </p>
        <Button 
          variant="primary" 
          onClick={() => setSubmitSuccess(false)}
          className="mx-auto"
        >
          Book Another Consultation
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-lg p-4 sm:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-w-0 w-full"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Your Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe"
                  aria-label="Your Name"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="john@example.com"
                  aria-label="Email Address"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="(555) 123-4567"
                  aria-label="Phone Number"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                  Date *
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Date"
                  aria-required="true"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                  Time *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Time"
                  aria-required="true"
                >
                  <option value="" disabled>Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Let us know any details or questions..."
                aria-label="Message"
              />
            </div>

            {submitError && (
              <div className="text-red-500 text-sm mb-2">{submitError}</div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              disabled={isSubmitting}
              aria-label="Book Consultation"
            >
              {isSubmitting ? 'Booking...' : 'Book Consultation'}
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:pl-6 min-w-0 w-full"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Book a Consultation</h3>
            <p className="text-gray-400 mb-6">
              Schedule a free 30-minute consultation with our experts to discuss your project needs and how we can help you achieve your business goals.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <div>
                  <h4 className="text-white font-medium">What to Expect</h4>
                  <p className="text-gray-400 text-sm">
                    A 30-minute video call with one of our specialists to discuss your needs, answer questions, and explore potential solutions.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                <div>
                  <h4 className="text-white font-medium">Availability</h4>
                  <p className="text-gray-400 text-sm">
                    Monday to Friday, 9:00 AM - 5:00 PM EST. Select your preferred date and time, and we'll confirm via email.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-lg font-medium text-white mb-3">Why Book a Consultation?</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Get personalized advice for your specific business needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Learn about our services and how they can benefit you</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Discuss project timelines, budgets, and expectations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>No obligation or pressure to commit</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarBooking;