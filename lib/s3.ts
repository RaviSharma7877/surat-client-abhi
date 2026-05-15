import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const CATALOG_KEY = "catalog/products.json";

export async function uploadToS3(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const bucket = process.env.S3_BUCKET_NAME!;
  const key = `products/${filename}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function deleteFromS3(imageUrl: string): Promise<void> {
  const bucket = process.env.S3_BUCKET_NAME!;
  const key = new URL(imageUrl).pathname.slice(1);
  await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export async function readCatalogJson(): Promise<string | null> {
  const bucket = process.env.S3_BUCKET_NAME!;
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: CATALOG_KEY }));
    return (await res.Body?.transformToString()) ?? null;
  } catch {
    return null; // doesn't exist yet
  }
}

export async function writeCatalogJson(json: string): Promise<void> {
  const bucket = process.env.S3_BUCKET_NAME!;
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: CATALOG_KEY,
      Body: json,
      ContentType: "application/json",
    })
  );
}
