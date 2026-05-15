import { getProducts } from "@/lib/data";
import { CatalogProvider } from "@/lib/catalog-context";
import { ReviewClient } from "./review-client";

export default async function ReviewPage() {
  const products = await getProducts();
  return (
    <CatalogProvider>
      <ReviewClient allProducts={products} />
    </CatalogProvider>
  );
}
