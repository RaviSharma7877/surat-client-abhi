export interface Product {
  id: string;
  image: string;
  createdAt: string;
}

export interface WhatsAppContact {
  id: string;
  name: string;
  number: string;
}

export interface UserInquiryDetails {
  name: string;
  mobile: string;
  message?: string;
}
