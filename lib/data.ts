import { readCatalogJson, writeCatalogJson } from "./s3";
import type { Product } from "./types";

export async function getProducts(): Promise<Product[]> {
  try {
    const json = await readCatalogJson();
    if (!json) return [];
    return JSON.parse(json) as Product[];
  } catch {
    return [];
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeCatalogJson(JSON.stringify(products));
}
