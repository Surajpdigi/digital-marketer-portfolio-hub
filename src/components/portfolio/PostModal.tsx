import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PostProject } from "./ProjectTypes";

type PostModalProps = {
  postId: number;
  onClose: () => void;
  postProjects: PostProject[];
};

export const PostModal = ({ postId, onClose, postProjects }: PostModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const currentPost = postProjects.find((p) => p.id === postId);

  // Improved function to process Google Drive image URLs
  const processImageUrl = (url: string) => {
    if (!url) return "";
    
    // Match different Google Drive link formats
    const match = url.match(/(?:\/d\/|id=)([^\/?]+)/);
    return match ? `https://drive.google.com/uc?id=${match[1]}` : url;
  };

  const imageUrl = currentPost?.image ? processImageUrl(currentPost.image) : "";

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

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg flex flex-col items-center shadow-lg overflow-hidden"
        style={{
          width: "90vw",
          maxWidth: "500px",
          maxHeight: "90vh",
        }}
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

        {/* Image Container - Fix for Google Drive Images */}
        <div className="w-full flex justify-center bg-gray-100">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={currentPost?.title || "Post"}
              className="max-h-[70vh] w-auto object-contain rounded-t-lg"
            />
          )}
        </div>

        {/* Text Content */}
        <div className="p-4 bg-white w-full">
          <h3 className="text-lg font-bold">{currentPost?.title || "Post Title"}</h3>

          {/* Description with Scrollable Area if it exceeds 2 lines */}
          <div
            className="text-gray-600 overflow-y-auto"
            style={{
              maxHeight: "3em", // Approx. 2 lines of text
              lineHeight: "1.5em",
              paddingRight: "0.5rem", // Prevents text from touching scrollbar
            }}
          >
            {currentPost?.description || "Post description"}
          </div>
        </div>
      </div>
    </div>
  );
};
