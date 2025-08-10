import { getStaticData } from "../clientDataService";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export const fetchServices = () => getStaticData<Service>("services");
