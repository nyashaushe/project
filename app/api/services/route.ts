import { NextResponse } from 'next/server';
import { fetchServices } from '../../../src/services/api/services';

export async function GET() {
    try {
        const result = await fetchServices();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}