import { getStaticData, ApiResponse, DataParams } from "../clientDataService";

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role?: string;
  company?: string;
  image?: string;
  rating?: number;
  publishedAt: string;
}

export async function fetchTestimonials(
  params?: DataParams
): Promise<ApiResponse<Testimonial[]>> {
  return await getStaticData<Testimonial>("testimonials", params);
}

export async function submitTestimonial(): Promise<Testimonial> {
  // POST request functionality would be implemented via API routes
  // This would typically submit to /api/testimonials endpoint
  throw new Error(
    "Testimonial submission not implemented - use API routes instead"
  );
}
