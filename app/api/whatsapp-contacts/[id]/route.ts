import { NextResponse } from "next/server";
import { getWhatsAppContacts, saveWhatsAppContacts } from "@/lib/data";
import { getSession } from "@/lib/auth";
import type { WhatsAppContact } from "@/lib/types";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await getSession();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json() as Partial<WhatsAppContact>;
    const contacts = await getWhatsAppContacts();
    const idx = contacts.findIndex((c) => c.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (body.number) body.number = body.number.replace(/\D/g, "");
    contacts[idx] = { ...contacts[idx], ...body, id };
    await saveWhatsAppContacts(contacts);
    return NextResponse.json(contacts[idx]);
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
  const contacts = await getWhatsAppContacts();
  const filtered = contacts.filter((c) => c.id !== id);
  if (filtered.length === contacts.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveWhatsAppContacts(filtered);
  return NextResponse.json({ success: true });
}
