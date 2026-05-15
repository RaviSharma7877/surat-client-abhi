"use client";

import { useRef, useState } from "react";

interface UploadItem {
  file: File;
  previewUrl: string;
  status: "uploading" | "done" | "error";
  errorMsg?: string;
}

interface ImageUploadZoneProps {
  onUploaded: (urls: string[]) => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 15 * 1024 * 1024;

export function ImageUploadZone({ onUploaded }: ImageUploadZoneProps) {
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadItem[]>([]);
  const [dragging, setDragging] = useState(false);

  async function uploadFile(item: UploadItem): Promise<string | null> {
    try {
      // Step 1 — get presigned URL from our API
      const presignRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: item.file.name,
          contentType: item.file.type,
          size: item.file.size,
        }),
      });

      if (!presignRes.ok) {
        const { error } = await presignRes.json() as { error: string };
        throw new Error(error);
      }

      const { uploadUrl, publicUrl } = await presignRes.json() as {
        uploadUrl: string;
        publicUrl: string;
      };

      // Step 2 — PUT file directly to S3 (no Vercel size limit)
      const s3Res = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": item.file.type },
        body: item.file,
      });

      if (!s3Res.ok) throw new Error("S3 upload failed");

      return publicUrl;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setItems((prev) =>
        prev.map((p) => (p === item ? { ...p, status: "error", errorMsg: msg } : p))
      );
      return null;
    }
  }

  async function processFiles(files: File[]) {
    const valid = files.filter((f) => {
      if (!ALLOWED_TYPES.includes(f.type)) return false;
      if (f.size > MAX_BYTES) return false;
      return true;
    });
    if (!valid.length) return;

    const newItems: UploadItem[] = valid.map((f) => ({
      file: f,
      previewUrl: URL.createObjectURL(f),
      status: "uploading",
    }));

    setItems((prev) => [...prev, ...newItems]);

    const uploaded: string[] = [];
    await Promise.all(
      newItems.map(async (item) => {
        const url = await uploadFile(item);
        if (url) {
          uploaded.push(url);
          setItems((prev) =>
            prev.map((p) => (p === item ? { ...p, status: "done" } : p))
          );
        }
      })
    );

    if (uploaded.length) onUploaded(uploaded);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    processFiles(Array.from(e.target.files ?? []));
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        className={`w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-10 transition-colors ${
          dragging
            ? "border-primary bg-primary-container/10"
            : "border-outline-variant bg-surface-container-low"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          processFiles(Array.from(e.dataTransfer.files));
        }}
      >
        <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-primary">cloud_upload</span>
        </div>
        <p className="text-body-md text-on-surface font-medium mb-1">
          Drag &amp; drop images here
        </p>
        <p className="text-body-sm text-on-surface-variant mb-6">
          JPG, PNG, WebP · up to 15 MB each · multiple allowed
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full text-label-md hover:bg-surface-tint transition-colors"
          >
            <span className="material-symbols-outlined text-lg">photo_library</span>
            Select from Gallery
          </button>
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            className="flex items-center gap-2 border border-outline-variant text-on-surface bg-surface-container-lowest px-5 py-2.5 rounded-full text-label-md hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-lg">photo_camera</span>
            Take Photo
          </button>
        </div>

        <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={handleInput} />
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleInput} />
      </div>

      {/* Progress thumbnails */}
      {items.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {items.map((item, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-surface-container-low">
              <img src={item.previewUrl} alt="" className="w-full h-full object-cover" />
              {item.status === "uploading" && (
                <div className="absolute inset-0 bg-on-surface/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl animate-spin">refresh</span>
                </div>
              )}
              {item.status === "done" && (
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-xs" style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px" }}>check</span>
                </div>
              )}
              {item.status === "error" && (
                <div className="absolute inset-0 bg-error/60 flex flex-col items-center justify-center p-1">
                  <span className="material-symbols-outlined text-white text-xl">error</span>
                  {item.errorMsg && (
                    <p className="text-white text-[10px] text-center mt-1 leading-tight">{item.errorMsg}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
