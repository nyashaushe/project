import { NextRequest, NextResponse } from 'next/server';
import { fetchPodcast } from '../../../../src/services/api/podcast';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid podcast ID' },
                { status: 400 }
            );
        }

        const result = await fetchPodcast(id);
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch podcast' },
            { status: 500 }
        );
    }
}