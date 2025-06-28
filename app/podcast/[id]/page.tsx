'use client';

import { useRouter } from 'next/router';
import PodcastEpisodePage from '../../../src/components/pages/PodcastEpisodePage';

export default function DynamicPodcastEpisode() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <PodcastEpisodePage id={Number(id)} />;
}