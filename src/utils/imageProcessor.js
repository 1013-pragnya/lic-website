/**
 * Image processing utilities for validating, resizing, cropping, and compressing product banners.
 */

export const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Validates file type and size.
 * @param {File} file 
 * @returns {{valid: boolean, error?: string}}
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Unsupported file format. Please upload JPG, JPEG, PNG, or WebP only.' };
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { valid: false, error: 'File size exceeds 5 MB. Please select a smaller image.' };
  }
  return { valid: true };
}

/**
 * Process image file and convert it to a scaled 16:9 WebP data URL.
 * Supports zoom and horizontal/vertical reposition offsets.
 * 
 * @param {string} imageSrc - Base64 or ObjectURL of the image.
 * @param {Object} options - Zoom, offsetX, offsetY options.
 * @param {number} options.zoom - Zoom factor (1.0 to 3.0).
 * @param {number} options.offsetX - Horizontal positioning offset (0.0 to 1.0, where 0.5 is center).
 * @param {number} options.offsetY - Vertical positioning offset (0.0 to 1.0, where 0.5 is center).
 * @returns {Promise<string>} - Resolves to WebP base64 data URL.
 */
export function cropAndResizeImage(imageSrc, { zoom = 1, offsetX = 0.5, offsetY = 0.5 }) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const targetWidth = 1200;
      const targetHeight = 675; // 16:9

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      // Calculate initial scale to cover the target 16:9 area (object-fit: cover implementation)
      const imageRatio = img.width / img.height;
      const targetRatio = targetWidth / targetHeight;
      let initialScale = 1;

      if (imageRatio > targetRatio) {
        // Image is wider than 16:9 - match height and crop sides
        initialScale = targetHeight / img.height;
      } else {
        // Image is taller than 16:9 - match width and crop top/bottom
        initialScale = targetWidth / img.width;
      }

      // Apply zoom factor
      const scale = initialScale * zoom;

      // Scaled dimensions
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      // Excess dimensions that can be panned
      const excessWidth = Math.max(0, scaledWidth - targetWidth);
      const excessHeight = Math.max(0, scaledHeight - targetHeight);

      // Pan coordinates based on offset (0.5 is center)
      const drawX = -excessWidth * offsetX;
      const drawY = -excessHeight * offsetY;

      // Render image onto target size canvas
      ctx.fillStyle = '#050a17';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, drawX, drawY, scaledWidth, scaledHeight);

      // Compress and export as WebP
      // WebP quality set to 0.75 for optimal compression-to-quality ratio (typically ~45KB)
      const dataUrl = canvas.toDataURL('image/webp', 0.75);
      resolve(dataUrl);
    };

    img.onerror = () => reject(new Error('Failed to load image file.'));
    img.src = imageSrc;
  });
}
