import { getStaticData } from "../clientDataService";

export interface Stat {
  id: number;
  icon: string;
  value: string;
  label: string;
}

export const fetchStats = () => getStaticData<Stat>("stats");
