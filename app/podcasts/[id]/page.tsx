import { redirect } from 'next/navigation';

export default function DynamicPodcastsEpisodePage({ params }: { params: { id: string } }) {
  redirect(`/podcast/${params.id}`);
}