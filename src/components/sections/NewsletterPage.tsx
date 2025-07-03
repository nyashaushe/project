"use client";

import React, { useState, useEffect } from 'react';
import { fetchNewsletters, Newsletter } from '../../services/api/newsletter';
import NewsletterForm from '../forms/NewsletterForm';

const NewsletterPage: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNewsletters = async () => {
      try {
        setLoading(true);
        const { data } = await fetchNewsletters();
        setNewsletters(data);
      } catch (err) {
        setError('Failed to fetch newsletters.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getNewsletters();
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Newsletter</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Subscribe to our newsletter to stay up to date.
          </p>
        </div>
        <NewsletterForm />
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-4">Latest Newsletters</h3>
          {loading ? (
            <p className="text-gray-400">Loading newsletters...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : newsletters.length > 0 ? (
            <ul className="space-y-4">
              {newsletters.map((newsletter) => (
                <li key={newsletter.id} className="bg-gray-800 rounded-lg p-4 text-left">
                  <h4 className="text-lg font-semibold text-white">{newsletter.title}</h4>
                  <p className="text-gray-400">{newsletter.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No newsletters yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterPage;
