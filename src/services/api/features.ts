export interface Feature {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export const fetchFeatures = async () => {
  try {
    const response = await fetch('/api/features');
    if (!response.ok) {
      throw new Error('Failed to fetch features');
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
