// Contact forms now use Next.js API routes instead of Strapi

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
}

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

export const fetchContactInfo = () => fetchSingleton<ContactInfo>('contact-info');
export const submitContactForm = (data: Omit<ContactFormSubmission, 'id' | 'submittedAt'>) =>
  createItem<ContactFormSubmission>('contact-forms', data);