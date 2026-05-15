import { NextResponse } from "next/server";
import { getWhatsAppContacts, saveWhatsAppContacts } from "@/lib/data";
import { getSession } from "@/lib/auth";
import type { WhatsAppContact } from "@/lib/types";
import { randomUUID } from "crypto";

export async function GET() {
  const contacts = await getWhatsAppContacts();
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const authed = await getSession();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json() as { name: string; number: string };
    if (!body.name?.trim() || !body.number?.trim()) {
      return NextResponse.json({ error: "Name and number required" }, { status: 400 });
    }
    const contacts = await getWhatsAppContacts();
    const newContact: WhatsAppContact = {
      id: randomUUID(),
      name: body.name.trim(),
      number: body.number.trim().replace(/\D/g, ""),
    };
    await saveWhatsAppContacts([...contacts, newContact]);
    return NextResponse.json(newContact, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
