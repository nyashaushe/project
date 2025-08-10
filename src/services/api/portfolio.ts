import { getStaticData } from "../clientDataService";

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export const fetchPortfolioItems = () =>
  getStaticData<PortfolioItem>("portfolio");
