import { prisma } from '../../lib/prisma';

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image?: string;
    bio?: string;
    social?: any;
}

export const fetchTeamMembers = async (): Promise<{ data: TeamMember[] }> => {
    try {
        const teamMembers = await prisma.team.findMany({
            orderBy: { id: 'asc' },
        });

        return {
            data: teamMembers.map(member => ({
                id: member.id,
                name: member.name,
                role: member.role,
                image: member.image || undefined,
                bio: member.bio || undefined,
                social: member.social,
            }))
        };
    } catch (error) {
        console.error('Error fetching team members:', error);
        throw new Error('Failed to fetch team members');
    }
};

export const fetchTeamMember = async (id: number): Promise<{ data: TeamMember }> => {
    try {
        const member = await prisma.team.findUnique({
            where: { id },
        });

        if (!member) {
            throw new Error('Team member not found');
        }

        return {
            data: {
                id: member.id,
                name: member.name,
                role: member.role,
                image: member.image || undefined,
                bio: member.bio || undefined,
                social: member.social,
            }
        };
    } catch (error) {
        console.error('Error fetching team member:', error);
        throw new Error('Failed to fetch team member');
    }
};