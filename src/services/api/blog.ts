import { getStrapiContent } from '@/lib/strapiApi';

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
  $or?: Array<{ title?: { $containsi: string }; content?: { $containsi: string } }>;
  categories?: { $containsi: string };
};

type BlogPostParams = {
  pagination?: { page: number; pageSize: number };
  sort?: string;
  filters?: BlogPostFilters;
};

export async function fetchBlogPosts(params: BlogPostParams = {}) {
  // Convert params object to query string for Strapi
  const query = new URLSearchParams();
  if (params.pagination) {
    query.append('pagination[page]', params.pagination.page);
    query.append('pagination[pageSize]', params.pagination.pageSize);
  }
  if (params.sort) {
    query.append('sort', params.sort);
  }
  if (params.filters) {
    if (params.filters.$or) {
      params.filters.$or.forEach((filter, i) => {
        if (filter.title) query.append(`filters[$or][${i}][title][$containsi]`, filter.title.$containsi);
        if (filter.content) query.append(`filters[$or][${i}][content][$containsi]`, filter.content.$containsi);
      });
    }
    if (params.filters.categories) {
      query.append('filters[categories][$containsi]', params.filters.categories.$containsi);
    }
  }
  const url = `blogs?${query.toString()}`;
  return await getStrapiContent(url);
}

export async function fetchBlogPost(id: number) {
  return await getStrapiContent(`blogs/${id}`);
}

export async function createBlogPost(/* blogPostData: Omit<BlogPost, 'id' | 'publishedAt'> */) {
  // POST request to Strapi (not implemented here, see Strapi docs for auth)
  // You can use fetch or axios for POST requests
}