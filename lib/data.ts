import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { Product, WhatsAppContact } from "./types";

const productsPath = path.join(process.cwd(), "data", "products.json");
const contactsPath = path.join(process.cwd(), "data", "whatsapp-contacts.json");

export async function getProducts(): Promise<Product[]> {
  try {
    const raw = await readFile(productsPath, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeFile(productsPath, JSON.stringify(products, null, 2), "utf-8");
}

export async function getWhatsAppContacts(): Promise<WhatsAppContact[]> {
  try {
    const raw = await readFile(contactsPath, "utf-8");
    return JSON.parse(raw) as WhatsAppContact[];
  } catch {
    return [];
  }
}

export async function saveWhatsAppContacts(contacts: WhatsAppContact[]): Promise<void> {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
}
