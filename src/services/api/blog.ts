import {
  getStaticData,
  getStaticItem,
  ApiResponse,
} from "../clientDataService";

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  categories: string[];
  featuredImage?: string;
  publishedAt: string;
}

type BlogPostFilters = {
  $or?: Array<{
    title?: { $containsi: string };
    content?: { $containsi: string };
  }>;
  categories?: { $containsi: string };
};

type BlogPostParams = {
  pagination?: { page: number; pageSize: number };
  sort?: string;
  filters?: BlogPostFilters;
};

export async function fetchBlogPosts(
  params: BlogPostParams = {}
): Promise<ApiResponse<BlogPost[]>> {
  return await getStaticData<BlogPost>("blog", {
    pagination: params.pagination,
    sort: params.sort,
    filters: params.filters,
  });
}

export async function fetchBlogPost(
  id: number
): Promise<ApiResponse<BlogPost>> {
  return await getStaticItem<BlogPost>("blog", id);
}

export async function createBlogPost(/* blogPostData: Omit<BlogPost, 'id' | 'publishedAt'> */) {
  // POST request functionality would be implemented via API routes
  // This would typically submit to /api/blog endpoint
  throw new Error(
    "Blog post creation not implemented - use API routes instead"
  );
}
