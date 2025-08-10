import { getStaticData } from "../clientDataService";

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export const fetchFeatures = () => getStaticData<Feature>("features");
