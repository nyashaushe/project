'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag, ChevronRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import { fetchBlogPosts, BlogPost } from '@/services/api/blog';

const categories = [
  'All',
  'Technology',
  'Development',
  'Design',
  'Business',
  'Marketing'
];

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await fetchBlogPosts();
        setBlogPosts(posts);
      } catch (err) {
        setError('Failed to fetch blog posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getBlogPosts();
  }, []);

  console.log('blogPosts:', blogPosts); // Add this line for debugging

  const filteredPosts = blogPosts.filter(post => {
    console.log('Filtering post:', post); // Add this line for debugging
    // Ensure post and its properties exist before accessing them
    if (!post || typeof post.title === 'undefined' || typeof post.content === 'undefined') {
      console.log('Skipping invalid post:', post); // Add this line for debugging
      return false; // Skip invalid posts
    }

    const matchesSearch = (post.title as string).toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.content as string).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || (post.categories && post.categories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center text-white py-20">Loading blog posts...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Blog</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in technology and development.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={post.featuredImage || '/blog/default.jpg'} // Use a default image if none is provided
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  {post.categories && post.categories.length > 0 && (
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                      {post.categories[0]}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  {/* Assuming readTime is not directly from Strapi, or needs calculation */}
                  {/* <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span> */}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4">{post.content.substring(0, 150)}...</p> {/* Use content as excerpt */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories && post.categories.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full group"
                  onClick={() => window.location.href = `/blog/${post.id}`}
                >
                  Read More
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {/* You might implement pagination with Strapi for this */}
        {/* <div className="text-center mt-12">
          <Button variant="ghost" className="group">
            Load More Articles
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Blog;
