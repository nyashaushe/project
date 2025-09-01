import { NextRequest, NextResponse } from 'next/server';
import { fetchPortfolioItems } from '../../../src/services/api/portfolio';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        const params = {
            ...(limit && { limit: parseInt(limit) }),
            ...(offset && { offset: parseInt(offset) }),
        };

        const result = await fetchPortfolioItems(params);
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch portfolio items' },
            { status: 500 }
        );
    }
}