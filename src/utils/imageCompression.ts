// ==============================================================================
// 🖼️ IMAGE COMPRESSION & STORAGE UTILITY
// Client-side resize (max 1600px), WebP quality 0.8, max 5MB validation
// ==============================================================================

import { supabase } from '../lib/supabase';

export interface CompressResult {
  file: File;
  previewUrl: string;
  originalSize: number;
  compressedSize: number;
}

/**
 * Resizes an image to max 1600px on the longest side and compresses to WebP @ 0.8 quality
 */
export async function compressImage(
  file: File, 
  maxWidth: number = 1600, 
  maxHeight: number = 1600, 
  quality: number = 0.8
): Promise<CompressResult> {
  const originalSize = file.size;

  // Enforce 5MB limit
  if (originalSize > 5 * 1024 * 1024) {
    throw new Error('File size exceeds 5MB limit. Please choose a smaller image.');
  }

  // If already a PDF, return as is (PDFs should not be run through canvas)
  if (file.type === 'application/pdf') {
    return {
      file,
      previewUrl: '',
      originalSize,
      compressedSize: originalSize,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserving dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to create canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas compression failed'));
              return;
            }

            const cleanName = file.name.replace(/\.[^/.]+$/, "") + '.webp';
            const compressedFile = new File([blob], cleanName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            const previewUrl = URL.createObjectURL(blob);

            resolve({
              file: compressedFile,
              previewUrl,
              originalSize,
              compressedSize: compressedFile.size,
            });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image for compression'));
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}

/**
 * Uploads a compressed file to the Supabase "portfolio" bucket
 * Returns the public URL
 */
export async function uploadToStorage(
  file: File, 
  folder: 'avatars' | 'projects' | 'certificates' | 'cv' = 'projects'
): Promise<string> {
  const timestamp = Date.now();
  const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${folder}/${timestamp}_${safeFileName}`;

  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('portfolio')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

/**
 * Deletes an old file from Supabase storage when replaced
 */
export async function deleteFromStorage(fileUrl: string): Promise<void> {
  if (!fileUrl || !fileUrl.includes('portfolio/')) return;

  try {
    const parts = fileUrl.split('/portfolio/');
    if (parts.length > 1) {
      const relativePath = decodeURIComponent(parts[1]);
      await supabase.storage.from('portfolio').remove([relativePath]);
    }
  } catch (err) {
    console.warn('Could not delete old file from storage:', err);
  }
}
