import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { Product } from "./types";

const productsPath = path.join(process.cwd(), "data", "products.json");

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
