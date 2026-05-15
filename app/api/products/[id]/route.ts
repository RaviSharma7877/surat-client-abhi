import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";
import { getSession } from "@/lib/auth";
import { deleteFromS3 } from "@/lib/s3";
import type { Product } from "@/lib/types";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await getSession();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json() as Partial<Product>;
    const products = await getProducts();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    products[idx] = { ...products[idx], ...body, id };
    await saveProducts(products);
    return NextResponse.json(products[idx]);
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await getSession();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Remove from S3 (best-effort — don't fail the delete if S3 errors)
  try {
    await deleteFromS3(product.image);
  } catch (err) {
    console.error("[delete] S3 removal failed:", err);
  }

  await saveProducts(products.filter((p) => p.id !== id));
  return NextResponse.json({ success: true });
}
