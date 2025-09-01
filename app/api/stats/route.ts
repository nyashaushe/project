import { NextResponse } from 'next/server';
import { fetchStats } from '../../../src/services/api/stats';

export async function GET() {
    try {
        const result = await fetchStats();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}