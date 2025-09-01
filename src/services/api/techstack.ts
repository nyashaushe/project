export interface TechStackItem {
  id: number;
  name: string;
  icon: string;
}

export const fetchTechStack = async () => {
  try {
    const response = await fetch('/api/techstack');
    if (!response.ok) {
      throw new Error('Failed to fetch tech stack');
    }
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return {
      data: [],
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
