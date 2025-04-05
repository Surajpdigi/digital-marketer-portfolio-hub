
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PostProject } from "./ProjectTypes";

type PostModalProps = {
  postId: number;
  onClose: () => void;
  postProjects: PostProject[];
};

// Comprehensive Google Drive link processor
const processGoogleDriveUrl = (url: string): string => {
  if (!url) return '';
  
  // Already in the correct format
  if (url.includes('drive.google.com/uc?')) {
    return url;
  }
  
  // File ID format: /d/FILE_ID/
  if (url.includes('drive.google.com/file/d/')) {
    const fileIdMatch = url.match(/\/d\/([^\/\?&]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
  }
  
  // Alternate format with open?id=
  if (url.includes('open?id=')) {
    const idMatch = url.match(/open\?id=([^\/\?&]+)/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }
  }
  
  // Handle view links
  if (url.includes('/view')) {
    const idMatch = url.match(/\/d\/([^\/\?&]+)\/view/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }
  }
  
  // Handle Google Drive sharing links (new format)
  if (url.includes('drive.google.com/drive/folders/')) {
    const folderIdMatch = url.match(/folders\/([^\/\?&]+)/);
    if (folderIdMatch && folderIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${folderIdMatch[1]}`;
    }
  }
  
  // Handle direct sharing links
  if (url.includes('drive.google.com/file/d/')) {
    const shareIdMatch = url.match(/\/d\/([^\/\?&]+)/);
    if (shareIdMatch && shareIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${shareIdMatch[1]}`;
    }
  }
  
  return url;
};

export const PostModal = ({ postId, onClose, postProjects }: PostModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const currentPost = postProjects.find((p) => p.id === postId);

  const rawImageUrl = currentPost?.image || '';
  const processedImageUrl = processGoogleDriveUrl(rawImageUrl);
  
  console.log("Post image URL:", rawImageUrl);
  console.log("Processed URL:", processedImageUrl);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    // Check if image is portrait (height > width)
    setIsPortrait(img.naturalHeight > img.naturalWidth);
    setImageLoaded(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Reset error state when post changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [postId]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-auto">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg flex flex-col shadow-lg overflow-hidden max-h-[90vh] w-[90vw] max-w-3xl"
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/10 text-black hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Image Container with proper aspect ratio handling */}
        <div 
          className="w-full flex justify-center bg-gray-100 overflow-hidden flex-shrink-0"
          style={{ 
            maxHeight: '60vh'
          }}
        >
          {processedImageUrl && (
            <img
              src={imageError ? "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" : processedImageUrl}
              alt={currentPost?.title || "Post"}
              className="w-auto h-auto max-w-full max-h-[60vh] object-contain"
              onLoad={handleImageLoad}
              onError={() => {
                console.log("Failed to load post image:", processedImageUrl);
                setImageError(true);
              }}
            />
          )}
        </div>

        {/* Text Content with ScrollArea */}
        <div className="bg-white flex-shrink-0" style={{ maxHeight: "30vh" }}>
          <ScrollArea className="h-full max-h-[30vh]">
            <div className="p-4">
              <h3 className="text-lg font-bold">{currentPost?.title || "Post Title"}</h3>
              <div className="text-gray-600 mt-2">
                {currentPost?.description || "Post description"}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
