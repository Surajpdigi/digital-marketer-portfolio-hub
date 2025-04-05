
/**
 * Comprehensive utility for processing various Google Drive URL formats
 * to generate direct viewable image URLs
 */

/**
 * Converts various Google Drive URL formats to direct viewable image URL
 * Handles multiple link formats including sharing links, file/d/ links, and more
 */
export const processGoogleDriveUrl = (url: string): string => {
  if (!url) return '';
  
  // If it's already in the format we need
  if (url.includes('drive.google.com/uc?')) {
    return url;
  }
  
  // Extract file ID from sharing URL
  let fileId = '';
  
  // Handle the standard file viewing format: /file/d/FILE_ID/view
  if (url.includes('drive.google.com/file/d/')) {
    const fileIdMatch = url.match(/\/d\/([^\/\?&]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      fileId = fileIdMatch[1];
    }
  } 
  // Handle the direct sharing link: /open?id=FILE_ID
  else if (url.includes('open?id=')) {
    const idMatch = url.match(/open\?id=([^\/\?&]+)/);
    if (idMatch && idMatch[1]) {
      fileId = idMatch[1];
    }
  }
  // Handle folder links
  else if (url.includes('drive.google.com/drive/folders/')) {
    const folderIdMatch = url.match(/folders\/([^\/\?&]+)/);
    if (folderIdMatch && folderIdMatch[1]) {
      fileId = folderIdMatch[1];
    }
  }
  // Handle direct ID (when user just enters the ID)
  else if (/^[A-Za-z0-9_-]{25,}$/.test(url)) {
    fileId = url;
  }
  
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  return url;
};
