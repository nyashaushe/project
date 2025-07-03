'use client';


import BlogPost from '../../../src/components/pages/BlogPost';

export default function DynamicBlogPost({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <BlogPost id={Number(id)} />;
}