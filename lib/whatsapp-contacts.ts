export interface WhatsAppContactConfig {
  name: string;
  contact: string; // digits only with country code, e.g. "919876543210"
}

export const WHATSAPP_CONTACTS: WhatsAppContactConfig[] = [
  { name: "Abhishek", contact: "917891271844" }
];
