"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Calendar, User, ChevronLeft } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Button = dynamic(() => import("../ui/Button"), { ssr: false });
import { fetchBlogPost, BlogPost } from "@/services/api/blog";

const BlogPostPage: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const getPost = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogPost(Number(id));
        setPost(response.data);
      } catch {
        setError("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  if (loading)
    return <div className="text-center text-white py-20">Loading...</div>;
  if (error || !post)
    return (
      <div className="text-center text-red-500 py-20">
        {error || "Blog post not found."}
      </div>
    );

  return (
    <article className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            className="group"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Button>
        </motion.div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {post.categories && post.categories.length > 0 && (
            <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4 inline-block">
              {post.categories[0]}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-400 mb-8">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {post.publishedAt}
            </span>
          </div>
        </motion.div>
        {/* Featured Image */}
        {post.featuredImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1024}
              height={400}
              className="w-full h-[400px] object-cover rounded-xl"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        )}
        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
