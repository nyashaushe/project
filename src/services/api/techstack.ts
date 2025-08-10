import { getStaticData } from '../clientDataService';

export interface TechStackItem {
  id: number;
  name: string;
  icon: string;
}

export const fetchTechStack = () => getStaticData<TechStackItem>('techstack');
