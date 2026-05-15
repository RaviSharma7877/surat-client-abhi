import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";
import { getSession } from "@/lib/auth";
import type { Product } from "@/lib/types";
import { randomUUID } from "crypto";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const authed = await getSession();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { image } = await request.json() as { image: string };
    if (!image) return NextResponse.json({ error: "image required" }, { status: 400 });

    const products = await getProducts();
    const newProduct: Product = {
      id: randomUUID(),
      image,
      createdAt: new Date().toISOString(),
    };
    await saveProducts([...products, newProduct]);
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
