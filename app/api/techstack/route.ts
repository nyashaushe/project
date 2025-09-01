import { NextResponse } from 'next/server';
import { fetchTechStack } from '../../../src/services/api/techstack';

export async function GET() {
    try {
        const result = await fetchTechStack();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tech stack' },
            { status: 500 }
        );
    }
}