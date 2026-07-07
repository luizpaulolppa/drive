// src/services/generate-upload-url.ts

import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3 } from "../lib/s3";

interface GenerateUploadUrlParams {
  filename: string;
  contentType: string;
}

interface GenerateUploadUrlResponse {
  key: string;
  uploadUrl: string;
}

export async function generateUploadUrl({
  filename,
  contentType,
}: GenerateUploadUrlParams): Promise<GenerateUploadUrlResponse> {
  const extension = filename.split(".").pop();

  const key = `${randomUUID()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.MINIO_BUCKET!,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 300, // 5 minutos
  });

  return {
    key,
    uploadUrl,
  };
}