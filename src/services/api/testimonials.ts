import { prisma } from '../../lib/prisma';

export interface Testimonial {
    id: number;
    content: string;
    author: string;
    role: string;
    company: string;
    image?: string;
    rating: number;
    publishedAt: string;
}

export const fetchTestimonials = async (): Promise<{ data: Testimonial[] }> => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { publishedAt: 'desc' },
        });

        return {
            data: testimonials.map(testimonial => ({
                id: testimonial.id,
                content: testimonial.content,
                author: testimonial.author,
                role: testimonial.role,
                company: testimonial.company,
                image: testimonial.image || undefined,
                rating: testimonial.rating,
                publishedAt: testimonial.publishedAt.toISOString(),
            })),
        };
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw new Error('Failed to fetch testimonials');
    }
};

export const fetchTestimonial = async (id: number): Promise<{ data: Testimonial }> => {
    try {
        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
        });

        if (!testimonial) {
            throw new Error('Testimonial not found');
        }

        return {
            data: {
                id: testimonial.id,
                content: testimonial.content,
                author: testimonial.author,
                role: testimonial.role,
                company: testimonial.company,
                image: testimonial.image || undefined,
                rating: testimonial.rating,
                publishedAt: testimonial.publishedAt.toISOString(),
            },
        };
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        throw new Error('Failed to fetch testimonial');
    }
};