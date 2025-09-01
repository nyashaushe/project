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

export const fetchContactInfo = async (): Promise<{ data: ContactInfo }> => {
  // For now, return mock contact info since API routes aren't implemented yet
  return {
    data: {
      email: 'contact@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345'
    }
  };
};

export const submitContactForm = async (data: Omit<ContactFormSubmission, 'id' | 'submittedAt'>): Promise<ContactFormSubmission> => {
  // For now, return mock response since API routes aren't implemented yet
  return {
    id: Date.now(),
    ...data,
    submittedAt: new Date().toISOString(),
  };
};