import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPresignedUploadUrl } from "@/lib/s3";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

export async function POST(request: Request) {
  const authed = await getSession();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { filename, contentType, size } = await request.json() as {
      filename: string;
      contentType: string;
      size: number;
    };

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }
    if (size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 15 MB)" }, { status: 400 });
    }

    const ext = filename.split(".").pop() ?? "jpg";
    const key = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { uploadUrl, publicUrl } = await getPresignedUploadUrl(key, contentType);

    return NextResponse.json({ uploadUrl, publicUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[upload/presign]", message);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
