import React from 'react';
import { useRouter } from 'next/router';
import PodcastEpisodePage from '../../src/components/pages/PodcastEpisodePage';

const DynamicPodcastEpisode: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <PodcastEpisodePage id={Number(id)} />;
};

export default DynamicPodcastEpisode;