import { getStaticData } from "../clientDataService";

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
  category?: string;
  tags?: string[];
  github?: string;
  live?: string;
}

export const fetchPortfolioItems = () =>
  getStaticData<PortfolioItem>("portfolio");
