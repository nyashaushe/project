import { getStaticData, getStaticItem, DataParams } from "../clientDataService";

export interface Podcast {
  id: number;
  title: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  duration?: string;
  publishedAt: string;
  imageUrl?: string;
  category?: string;
  likes?: number;
  isLiked?: boolean;
  comments?: unknown[];
  host?: string;
  date?: string;
  guest?: string;
  type?: string;
}

export const fetchPodcasts = (params?: DataParams) =>
  getStaticData<Podcast>("podcasts", params);
export const fetchPodcast = (id: number) =>
  getStaticItem<Podcast>("podcasts", id);

// Note: createPodcast and likePodcast will need to be implemented as API routes in a later task
export const createPodcast = async (
  podcastData: Omit<Podcast, "id" | "publishedAt">
) => {
  throw new Error(
    "createPodcast functionality will be implemented in API routes"
  );
};
export const likePodcast = async (id: number) => {
  throw new Error(
    "likePodcast functionality will be implemented in API routes"
  );
};
