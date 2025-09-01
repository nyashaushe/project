import { NextResponse } from 'next/server';
import { fetchFeatures } from '../../../src/services/api/features';

export async function GET() {
    try {
        const result = await fetchFeatures();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch features' },
            { status: 500 }
        );
    }
}