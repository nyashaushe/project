import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, User, Tag, Share2 } from 'lucide-react';
import { fetchBlogPosts, BlogPost as Blog } from "../../services/api/blog";

// Mock data for blog posts
const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: 'Building Scalable Web Applications with React',
    excerpt: 'Learn how to architect and build web applications that can scale to millions of users.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
    author: 'Sarah Johnson',
    date: 'June 15, 2023',
    category: 'Development',
    tags: ['React', 'Architecture', 'Performance'],
    image: 'https://via.placeholder.com/800x450'
  },
  {
    id: 2,
    title: 'The Future of AI in Business Applications',
    excerpt: 'Exploring how artificial intelligence is transforming modern business operations and decision making.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
    author: 'Michael Chen',
    date: 'May 22, 2023',
    category: 'Technology',
    tags: ['AI', 'Business', 'Innovation'],
    image: 'https://via.placeholder.com/800x450'
  },
  {
    id: 3,
    title: 'Optimizing Database Performance for High-Traffic Applications',
    excerpt: 'Strategies and techniques to ensure your database can handle heavy loads without compromising performance.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
    author: 'David Wilson',
    date: 'April 10, 2023',
    category: 'Database',
    tags: ['Performance', 'Optimization', 'SQL'],
    image: 'https://via.placeholder.com/800x450'
  },
];

// Mock categories
const CATEGORIES = ['All', 'Development', 'Technology', 'Design', 'Business', 'Database'];

interface BlogPostProps {
  post: typeof MOCK_BLOG_POSTS[0];
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <motion.div 
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 hover:text-purple-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
        <div className="flex items-center text-gray-500 text-xs mb-4">
          <User size={14} className="mr-1" />
          <span className="mr-3">{post.author}</span>
          <Calendar size={14} className="mr-1" />
          <span>{post.date}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <motion.span 
              key={tag} 
              className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full flex items-center"
              whileHover={{ backgroundColor: "#4B5563", color: "#E9D5FF" }}
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </motion.span>
          ))}
        </div>
        <motion.button 
          className="text-purple-400 text-sm font-medium flex items-center hover:text-purple-300 transition-colors"
          whileHover={{ x: 5 }}
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load blog posts.");
        setLoading(false);
      });
  }, []);

  // Filter posts based on search term and category using API data
  const filteredPosts = posts.filter(post => {
    const postTitle = post.title || "";
    const postContent = post.content || ""; // Assuming Blog type has content
    const postExcerpt = post.excerpt || ""; // Assuming Blog type has excerpt

    const matchesSearch = postTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          postContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          postExcerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent opacity-30" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/30 rounded-full filter blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            whileHover={{ scale: 1.05, color: "#A78BFA" }}
          >
            Our Blog
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Insights, tutorials, and updates from our team of experts
          </motion.p>
        </motion.div>

        {/* Search and filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <motion.div 
              className="relative w-full md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Filter size={18} className="text-gray-500 mr-2" />
              {CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Blog posts grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-12"
              variants={itemVariants}
            >
              <p className="text-gray-400 text-lg">No blog posts found matching your criteria.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Pagination */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex space-x-2">
            <motion.button 
              className="px-4 py-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled
            >
              Previous
            </motion.button>
            <motion.button 
              className="px-3 py-2 rounded-md bg-purple-600 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              1
            </motion.button>
            <motion.button 
              className="px-3 py-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              2
            </motion.button>
            <motion.button 
              className="px-3 py-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              3
            </motion.button>
            <motion.button 
              className="px-4 py-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          </div>
        </motion.div>

        {/* Social sharing */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-400 mb-4">Share our blog with your network</p>
          <div className="flex justify-center space-x-4">
            <motion.button 
              className="p-2 rounded-full bg-blue-600 text-white"
              whileHover={{ scale: 1.1, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={18} />
            </motion.button>
            <motion.button 
              className="p-2 rounded-full bg-purple-600 text-white"
              whileHover={{ scale: 1.1, backgroundColor: "#7C3AED" }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={18} />
            </motion.button>
            <motion.button 
              className="p-2 rounded-full bg-green-600 text-white"
              whileHover={{ scale: 1.1, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPage;