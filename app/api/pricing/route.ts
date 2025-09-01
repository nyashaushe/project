import { NextResponse } from 'next/server';
import { fetchPricingPlans } from '../../../src/services/api/pricing';

export async function GET() {
    try {
        const result = await fetchPricingPlans();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pricing plans' },
            { status: 500 }
        );
    }
}