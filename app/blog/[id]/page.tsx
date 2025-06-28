'use client';

import { useRouter } from 'next/router';
import BlogPost from '../../../src/components/pages/BlogPost';

export default function DynamicBlogPost() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <BlogPost id={Number(id)} />;
}