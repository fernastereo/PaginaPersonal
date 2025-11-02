import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export const AWS_CONFIG = {
  bucket: import.meta.env.VITE_AWS_BUCKET,
  region: import.meta.env.VITE_AWS_REGION,
  folder: import.meta.env.VITE_AWS_BUCKET_FOLDER,
  path: import.meta.env.VITE_AWS_PATH,
};