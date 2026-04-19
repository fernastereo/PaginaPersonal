import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Download, FileIcon } from 'lucide-react';
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
    const parts = url.split('/');
    return parts[parts.length - 1] || 'archivo';
  }
};

const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop()?.toLowerCase() || '';
};

const isImageFile = (file?: File, fileUrl?: string): boolean => {
  if (file) {
    if (file.type.startsWith('image/')) return true;
    const ext = file.name.toLowerCase().split('.').pop() || '';
    return ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'].includes(ext);
  }
  if (fileUrl) {
    const ext = getFileExtension(getFileNameFromUrl(fileUrl));
    return ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'].includes(ext);
  }
  return false;
};

const getFileTypeIcon = (file?: File, fileUrl?: string): string | null => {
  let extension = '';
  let mimeType = '';

  if (file) {
    extension = file.name.toLowerCase().split('.').pop() || '';
    mimeType = file.type.toLowerCase();
  } else if (fileUrl) {
    extension = getFileExtension(getFileNameFromUrl(fileUrl).toLowerCase());
  }

  if (mimeType === 'application/pdf' || extension === 'pdf') return pdfIcon;
  if (mimeType.includes('word') || extension === 'doc' || extension === 'docx') return wordIcon;
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet') || extension === 'xls' || extension === 'xlsx') return excelIcon;

  return null;
};

const truncateFileName = (name: string, maxLength = 18): string => {
  const ext = name.split('.').pop() || '';
  const base = name.slice(0, name.lastIndexOf('.'));
  if (name.length <= maxLength) return name;
  const allowedBase = maxLength - ext.length - 4;
  return `${base.slice(0, allowedBase)}….${ext}`;
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
  const fileTypeIcon = getFileTypeIcon(file, fileUrl);

  useEffect(() => {
    if (isImage) {
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        return () => URL.revokeObjectURL(url);
      } else if (fileUrl) {
        setImageUrl(fileUrl);
      }
    }
  }, [file, fileUrl, isImage]);

  const fileName = file?.name || (fileUrl ? getFileNameFromUrl(fileUrl) : 'archivo');
  const fileSizeKB = file ? (file.size / 1024).toFixed(1) : null;

  return (
    <div className="flex flex-col gap-1 w-[76px] flex-shrink-0">
      {/* Thumbnail / icon area */}
      <div className="relative h-14 rounded-md border border-border bg-muted overflow-hidden group/item">

        {isImage && imageUrl ? (
          <img
            src={imageUrl}
            alt={fileName}
            className="w-full h-full object-cover"
          />
        ) : fileTypeIcon ? (
          <div className="w-full h-full flex items-center justify-center p-2">
            <img
              src={fileTypeIcon}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileIcon className="h-6 w-6 text-muted-foreground/50" />
          </div>
        )}

        {/* Hover overlay con acciones */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
          {fileUrl && (
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-7 w-7 cursor-pointer"
              onClick={() => window.open(fileUrl, '_blank')}
              disabled={loading}
              title="Descargar"
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="h-7 w-7 cursor-pointer"
            onClick={() => onRemove(index)}
            disabled={loading}
            title="Eliminar"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Nombre y tamaño */}
      <div className="px-0.5">
        <p className="text-[11px] font-medium leading-tight truncate" title={fileName}>
          {truncateFileName(fileName)}
        </p>
        {fileSizeKB && (
          <p className="text-[10px] text-muted-foreground leading-tight">
            {Number(fileSizeKB) >= 1024
              ? `${(Number(fileSizeKB) / 1024).toFixed(1)} MB`
              : `${fileSizeKB} KB`}
          </p>
        )}
      </div>
    </div>
  );
};

