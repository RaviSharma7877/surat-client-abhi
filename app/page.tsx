import { getProducts } from "@/lib/data";
import { CatalogProvider } from "@/lib/catalog-context";
import { CatalogClient } from "./catalog-client";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <CatalogProvider>
      <CatalogClient initialProducts={products} />
    </CatalogProvider>
  );
}
