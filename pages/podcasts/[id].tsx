import { useEffect } from 'react';
import { useRouter } from 'next/router';

const DynamicPodcastsEpisodePage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      router.replace(`/podcast/${id}`);
    }
  }, [router, id]);

  return null;
};

export default DynamicPodcastsEpisodePage;