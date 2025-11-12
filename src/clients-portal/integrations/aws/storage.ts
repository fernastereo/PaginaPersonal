import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, AWS_CONFIG } from '@/clients-portal/integrations/aws/client';

export const uploadTaskFileToS3 = async (
  taskId: string,
  file: File,
  type: 'original' | 'completed' = 'original'
): Promise<string | null> => {
  try {
    // Validar configuración de AWS
    if (!AWS_CONFIG.bucket || !AWS_CONFIG.folder) {
      throw new Error('AWS S3 no está configurado correctamente. Verifica las variables de entorno.');
    }

    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}_${sanitizedFileName}`;
    
    const key = `${AWS_CONFIG.folder}/${taskId}/${type}/${fileName}`;
    
    // Convertir File a ArrayBuffer (requerido por AWS SDK v3)
    const arrayBuffer = await file.arrayBuffer();
    
    const command = new PutObjectCommand({
      Bucket: AWS_CONFIG.bucket,
      Key: key,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type || 'application/octet-stream',
      ACL: 'public-read',
      Metadata: {
        'original-filename': file.name,
        'upload-timestamp': timestamp.toString(),
      },
    });
    
    const response = await s3Client.send(command);
    
    if (response.ETag) {
      const fileUrl = `${AWS_CONFIG.path}/${key}`;
      return fileUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error uploading file to S3:', {
      error,
      fileName: file.name,
      bucket: AWS_CONFIG.bucket,
      region: AWS_CONFIG.region,
    });
    
    if (error instanceof Error) {
      if (error.name === 'NoSuchBucket') {
        throw new Error(`El bucket "${AWS_CONFIG.bucket}" no existe`);
      }
      if (error.name === 'InvalidAccessKeyId') {
        throw new Error('Las credenciales de AWS son inválidas');
      }
      if (error.name === 'SignatureDoesNotMatch') {
        throw new Error('La firma de AWS no coincide. Verifica tu Secret Access Key');
      }
      throw new Error(`Error al subir ${file.name}: ${error.message}`);
    }
    
    throw new Error(`Error desconocido al subir ${file.name}`);
  }
};