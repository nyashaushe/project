import { prisma } from '../../lib/prisma';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export const fetchServices = async (): Promise<{ data: Service[] }> => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { id: 'asc' },
    });

    return {
      data: services.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon || undefined,
      }))
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    throw new Error('Failed to fetch services');
  }
};

export const fetchService = async (id: number): Promise<{ data: Service }> => {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return {
      data: {
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon || undefined,
      }
    };
  } catch (error) {
    console.error('Error fetching service:', error);
    throw new Error('Failed to fetch service');
  }
};