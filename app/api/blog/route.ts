import { NextRequest, NextResponse } from 'next/server';
import { fetchBlogPosts } from '../../../src/services/api/blog';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        const params = {
            ...(limit && { limit: parseInt(limit) }),
            ...(offset && { offset: parseInt(offset) }),
        };

        const result = await fetchBlogPosts(params);
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}