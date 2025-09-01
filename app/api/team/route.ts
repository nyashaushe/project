import { NextResponse } from 'next/server';
import { fetchTeamMembers } from '../../../src/services/api/team';

export async function GET() {
    try {
        const result = await fetchTeamMembers();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch team members' },
            { status: 500 }
        );
    }
}