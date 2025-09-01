import { NextResponse } from 'next/server';
import { fetchContactInfo } from '../../../src/services/api/contact';

export async function GET() {
    try {
        const result = await fetchContactInfo();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact info' },
            { status: 500 }
        );
    }
}