import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PodcastsIndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/podcast');
  }, [router]);

  return null;
};

export default PodcastsIndexPage;