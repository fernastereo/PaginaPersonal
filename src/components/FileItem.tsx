import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import wordIcon from '@/assets/001-word.png';
import pdfIcon from '@/assets/002-acrobat.png';
import excelIcon from '@/assets/003-excel.png';

interface FileItemProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
  loading?: boolean;
}

const isImageFile = (file: File): boolean => {
  const mimeType = file.type;
  const fileName = file.name.toLowerCase();
  const extension = fileName.split('.').pop() || '';

  if (mimeType.startsWith('image/')) {
    return true;
  }

  const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'];
  return imageExtensions.includes(extension);
};

const getFileTypeBackground = (file: File): string | null => {
  const mimeType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  const extension = fileName.split('.').pop() || '';

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

export const FileItem = ({ file, index, onRemove, loading = false }: FileItemProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const isImage = isImageFile(file);
  const fileTypeBackground = getFileTypeBackground(file);

  useEffect(() => {
    if (isImage) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // Limpiar la URL cuando el componente se desmonte
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file, isImage]);

  // Determinar qué imagen usar como fondo
  const backgroundImage = imageUrl || fileTypeBackground;
  const hasBackground = Boolean(backgroundImage);

  return (
    <div>
      <div
        className="flex items-center justify-between p-2 rounded-md h-[120px] relative overflow-hidden"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >  
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          disabled={loading}
          className={`absolute top-2 right-2 z-10 cursor-pointer ${hasBackground ? 'bg-black/50 hover:bg-black/70 text-white' : ''}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 min-w-0 relative z-10">
        <span className="text-sm truncate block">
          {file.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {(file.size / 1024).toFixed(2)} KB
        </span>
      </div>
    </div>
  );
};

