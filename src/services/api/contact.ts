import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';

export interface ContactFormSubmission {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  subscribeToNewsletter: boolean;
  agreeToPrivacyPolicy: boolean;
  submittedAt?: string;
}

export async function submitContactForm(data: Omit<ContactFormSubmission, 'id' | 'submittedAt'>): Promise<ContactFormSubmission> {
  const response = await axios.post(`${API_URL}/contact-forms`, { data });
  return { id: response.data.data.id, ...response.data.data.attributes };
}