import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "This platform has completely transformed how we approach development. The speed and flexibility are unmatched in the industry. We've reduced our deployment time by 80%.",
    author: "Sarah Johnson",
    role: "CTO, TechVision Inc.",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 2,
    content: "As a startup founder, I needed a solution that could scale with our rapid growth. This platform has exceeded all expectations and allowed us to focus on our core business.",
    author: "Michael Chen",
    role: "Founder, InnovateLab",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 3,
    content: "The developer experience is simply outstanding. Our team was able to adapt quickly and the productivity gains have been substantial. I highly recommend this to any tech company.",
    author: "Alex Rivera",
    role: "Lead Developer, CodeCraft",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Loved by businesses worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 flex flex-col items-center">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full min-w-full p-6"
                >
                  <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
                    <div className="flex items-center gap-x-4 pb-4 mb-4 border-b border-gray-100">
                      <img src={testimonial.image} alt={testimonial.author} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                      </div>
                      <Quote className="ml-auto h-8 w-8 text-indigo-200" />
                    </div>
                    <p className="text-lg leading-7 text-gray-700">{testimonial.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-x-4">
            <button
              type="button"
              className="rounded-full bg-white p-2 text-gray-800 shadow-md hover:bg-gray-50 focus:outline-none"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-8 rounded-full ${
                    index === activeIndex ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>
            <button
              type="button"
              className="rounded-full bg-white p-2 text-gray-800 shadow-md hover:bg-gray-50 focus:outline-none"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;