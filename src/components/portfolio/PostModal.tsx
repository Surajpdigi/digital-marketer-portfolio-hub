import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PostProject } from "./ProjectTypes";

type PostModalProps = {
  postId: number;
  onClose: () => void;
  postProjects: PostProject[];
};

// Function to extract Google Drive Image Direct Link
const processGoogleDriveUrl = (url: string): string => {
  if (!url) return "";

  // Already in correct format
  if (url.includes("drive.google.com/uc?")) {
    return url;
  }

  // Extract Google Drive File ID
  const match = url.match(/(?:\/d\/|id=)([^\/?&]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return url;
};

export const PostModal = ({ postId, onClose, postProjects }: PostModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const currentPost = postProjects.find((p) => p.id === postId);
  const rawImageUrl = currentPost?.image || "";
  const processedImageUrl = processGoogleDriveUrl(rawImageUrl);

  console.log("Post image URL:", rawImageUrl);
  console.log("Processed URL:", processedImageUrl);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    // Determine if image is portrait
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

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [postId]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-auto">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg flex flex-col items-center shadow-lg overflow-hidden max-h-[90vh] w-[90vw] max-w-3xl"
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

        {/* Image Section */}
        <div className="w-full flex justify-center bg-gray-100 overflow-hidden" style={{ maxHeight: "60vh" }}>
          {processedImageUrl && (
            <img
              src={imageError ? "https://via.placeholder.com/800x600?text=Image+Not+Available" : processedImageUrl}
              alt={currentPost?.title || "Post"}
              className="w-auto h-auto max-w-full max-h-[60vh] object-contain"
              onLoad={handleImageLoad}
              onError={() => {
                console.error("Failed to load image:", processedImageUrl);
                setImageError(true);
              }}
            />
          )}
        </div>

        {/* Post Details */}
        <div className="p-4 bg-white w-full overflow-auto">
          <h3 className="text-lg font-bold">{currentPost?.title || "Post Title"}</h3>
          <div
            className="text-gray-600 overflow-y-auto mt-2"
            style={{ maxHeight: "20vh", lineHeight: "1.5em", paddingRight: "0.5rem" }}
          >
            {currentPost?.description || "Post description"}
          </div>
        </div>
      </div>
    </div>
  );
};
