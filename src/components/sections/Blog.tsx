import React from 'react';

interface BlogProps {
  title: string;
  content: string;
  author: string;
  date: string;
}

const Blog: React.FC<BlogProps> = ({ title, content, author, date }) => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{content}</p>
          <p className="text-gray-400">By {author} on {date}</p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
