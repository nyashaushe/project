// populate-strapi.js
// Script to populate Strapi with engaging, high-converting demo content
// Usage: node populate-strapi.js

import axios from 'axios';

const STRAPI_URL = 'http://localhost:1337/api'; // Change if your Strapi runs elsewhere
const AUTH_TOKEN = 'd3749719649903b98cd186765485e8bdc32135c75ced29de21ed79b665eb986069028302a864cd898731e3f1e97ec4a6c8234c3506f2d7880064586b93ec7e9c93812913e6b06c7ab9e8405268b999d482895139d7b59754d2bb860366bf9555c8a144634b8e11a8672dbaf44d305bac631cb910afc1c5956f68d24d65d471c6'; // Your Strapi API token

// Example content for each collection
const data = {
  blogs: [
    {
      title: 'Unlocking the Secrets of Scalable Web Design',
      content: 'Discover proven strategies to build websites that grow with your business. Learn from industry leaders and avoid common pitfalls.',
      author: 'Jane Smith',
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'How AI is Transforming Business in 2025',
      content: 'Explore the latest AI trends and how they can give your company a competitive edge. Real-world case studies included.',
      author: 'John Doe',
      publishedAt: new Date().toISOString(),
    },
  ],
  podcasts: [
    {
      title: 'Startup Growth Hacks',
      description: 'Actionable tips from founders who scaled their startups to millions.',
      host: 'Emily Chen',
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'Design Principles for Modern Web Apps',
      description: 'Learn the design secrets behind today’s most engaging web applications.',
      host: 'Alex Turner',
      publishedAt: new Date().toISOString(),
    },
  ],
  testimonials: [
    {
      name: 'Sarah Lee',
      feedback: 'This platform helped us double our conversion rate in just three months! Highly recommended.',
      company: 'GrowthLabs',
    },
    {
      name: 'Michael Brown',
      feedback: 'The features and support are top-notch. Our team is more productive than ever.',
      company: 'TechStart',
    },
  ],
  features: [
    {
      name: 'AI-Powered Analytics',
      description: 'Gain actionable insights with real-time analytics powered by artificial intelligence.',
    },
    {
      name: 'Seamless Integrations',
      description: 'Connect with your favorite tools and platforms effortlessly.',
    },
  ],
};

async function createEntry(collection, entry) {
  try {
    // Use PUT for testimonials (single type), POST for others
    const method = collection === 'testimonials' ? 'put' : 'post';
    const url = `${STRAPI_URL}/${collection}`;
    const res = await axios({
      method,
      url,
      data: { data: entry },
      headers: { 'Authorization': AUTH_TOKEN }
    });
    console.log(`Created in ${collection}:`, res.data);
  } catch (err) {
    console.error(`Error creating in ${collection}:`, err.response?.data || err.message, err.stack);
  }
}

async function populate() {
  for (const [collection, entries] of Object.entries(data)) {
    for (const entry of entries) {
      await createEntry(collection, entry);
    }
  }
}

populate();

// Instructions:
// 1. Install dependencies: npm install axios
// 2. Replace YOUR_ADMIN_JWT_TOKEN with your Strapi admin JWT token.
// 3. Run the script: node populate-strapi.js
// 4. Ensure your Strapi server is running and accessible at the specified URL.
