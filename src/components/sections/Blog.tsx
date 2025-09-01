"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import { BlogPost } from "@/services/api/blog";
import Skeleton from "../ui/Skeleton";

const categories = [
  "All",
  "Technology",
  "Development",
  "Design",
  "Business",
  "Marketing",
];

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          limit: '10',
          offset: ((page - 1) * 10).toString(),
        });

        const response = await fetch(`/api/blog?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const result = await response.json();
        setBlogPosts(
          page === 1 ? result.data : [...blogPosts, ...result.data]
        );
        setMeta(result.meta);
      } catch (err) {
        setError("Failed to fetch blog posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getBlogPosts();
  }, [searchQuery, selectedCategory, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    // The useEffect hook will automatically refetch the posts
  };

  const loadMore = () => {
    if (meta && meta.pagination.page < meta.pagination.pageCount) {
      setPage(page + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl overflow-hidden">
                <Skeleton className="h-48" />
                <div className="p-6">
                  <Skeleton className="h-4 w-1/4 mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;

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
            Stay updated with the latest insights, trends, and best practices in
            technology and development.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <form onSubmit={handleSearch} className="mb-12">
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
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={post.featuredImage || "/blog/default.jpg"} // Use a default image if none is provided
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
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {post.content.substring(0, 150)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories &&
                    post.categories.map((tag: string) => (
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
                  onClick={() => (window.location.href = `/blog/${post.id}`)}
                >
                  Read More
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {meta &&
          meta.pagination &&
          page * meta.pagination.pageSize < meta.pagination.total && (
            <div className="text-center mt-12">
              <Button
                variant="ghost"
                className="group"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More Articles"}
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
      </div>
    </section>
  );
};

export default Blog;
