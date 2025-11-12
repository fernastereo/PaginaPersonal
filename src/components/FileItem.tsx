import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Download } from 'lucide-react';
import wordIcon from '@/assets/001-word.png';
import pdfIcon from '@/assets/002-acrobat.png';
import excelIcon from '@/assets/003-excel.png';

interface FileItemProps {
  file?: File;
  fileUrl?: string;
  index: number;
  onRemove: (index: number) => void;
  loading?: boolean;
  isExisting?: boolean;
}

const getFileNameFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const fileName = pathname.split('/').pop() || 'archivo';
    return decodeURIComponent(fileName);
  } catch {
    // Si no es una URL válida, intentar extraer el nombre del path
    const parts = url.split('/');
    return parts[parts.length - 1] || 'archivo';
  }
};

const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop()?.toLowerCase() || '';
};

const isImageFile = (file?: File, fileUrl?: string): boolean => {
  if (file) {
    const mimeType = file.type;
    const fileName = file.name.toLowerCase();
    const extension = fileName.split('.').pop() || '';

    if (mimeType.startsWith('image/')) {
      return true;
    }

    const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'];
    return imageExtensions.includes(extension);
  }

  if (fileUrl) {
    const fileName = getFileNameFromUrl(fileUrl);
    const extension = getFileExtension(fileName);
    const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'];
    return imageExtensions.includes(extension);
  }

  return false;
};

const getFileTypeBackground = (
  file?: File,
  fileUrl?: string
): string | null => {
  let fileName = '';
  let extension = '';
  let mimeType = '';

  if (file) {
    fileName = file.name.toLowerCase();
    extension = fileName.split('.').pop() || '';
    mimeType = file.type.toLowerCase();
  } else if (fileUrl) {
    fileName = getFileNameFromUrl(fileUrl).toLowerCase();
    extension = getFileExtension(fileName);
  }

  // Detectar PDF
  if (mimeType === 'application/pdf' || extension === 'pdf') {
    return pdfIcon;
  }

  // Detectar Word (doc, docx)
  if (
    mimeType.includes('word') ||
    extension === 'doc' ||
    extension === 'docx'
  ) {
    return wordIcon;
  }

  // Detectar Excel (xls, xlsx)
  if (
    mimeType.includes('excel') ||
    mimeType.includes('spreadsheet') ||
    extension === 'xls' ||
    extension === 'xlsx'
  ) {
    return excelIcon;
  }

  return null;
};

export const FileItem = ({
  file,
  fileUrl,
  index,
  onRemove,
  loading = false,
}: FileItemProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const isImage = isImageFile(file, fileUrl);
  const fileTypeBackground = getFileTypeBackground(file, fileUrl);

  useEffect(() => {
    if (isImage) {
      if (file) {
        // Archivo nuevo: crear URL del objeto File
        const url = URL.createObjectURL(file);
        setImageUrl(url);

        // Limpiar la URL cuando el componente se desmonte
        return () => {
          URL.revokeObjectURL(url);
        };
      } else if (fileUrl) {
        // Archivo existente: usar la URL directamente
        setImageUrl(fileUrl);
      }
    }
  }, [file, fileUrl, isImage]);

  // Determinar qué imagen usar como fondo
  const backgroundImage = imageUrl || fileTypeBackground;
  const hasBackground = Boolean(backgroundImage);

  // Obtener nombre y tamaño del archivo
  const fileName =
    file?.name || (fileUrl ? getFileNameFromUrl(fileUrl) : 'archivo');
  const fileSize = file ? (file.size / 1024).toFixed(2) : null;

  return (
    <div>
      <div
        className="flex items-center justify-between p-2 rounded-md h-[120px] relative overflow-hidden border-1 border-muted-foreground"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex items-center justify-evenly absolute bottom-2 left-0 z-10 w-full">
          {/* Solo mostrar botón de descarga si hay fileUrl (archivo guardado en S3) */}
          {fileUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => window.open(fileUrl, '_blank')}
              disabled={loading}
              className={`cursor-pointer ${
                hasBackground ? 'bg-black/50 hover:bg-black/70 text-white' : ''
              }`}
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            disabled={loading}
            className={`cursor-pointer ${
              hasBackground ? 'bg-black/50 hover:bg-black/70 text-white' : ''
            }`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 min-w-0 relative z-10">
        <span className="text-xs truncate block">{fileName}</span>
        <span className="text-xs text-muted-foreground">
          {fileSize ? (Number(fileSize) / 1024).toFixed(2) : '0'} KB
        </span>
      </div>
    </div>
  );
};

