import React, { useRef, useEffect, useState } from "react";
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
  const [isPortrait, setIsPortrait] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const currentPost = postProjects.find((p) => p.id === postId);

  const processImageUrl = (url: string) => {
    const match = url.match(/\/d\/([^/]+)/);
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

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setIsPortrait(img.naturalHeight > img.naturalWidth);
  };

  useEffect(() => {
    // Check if the description is long enough to require expansion
    if (currentPost?.description) {
      setShowButton(currentPost.description.length > 100);
    }
  }, [currentPost]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg overflow-hidden flex flex-col items-center shadow-lg"
        style={{
          width: isPortrait ? "40vw" : "40vw",
          height: isPortrait ? "80vh" : "65vh",
        }}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/10 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Image Container */}
        <div
          className="flex items-center justify-center bg-gray-100 w-full"
          style={{
            height: isPortrait ? "70%" : "80%",
          }}
        >
          {currentPost?.image && (
            <img
              src={imageUrl}
              alt={currentPost.title || "Post"}
              className="w-full h-full object-contain"
              onLoad={handleImageLoad}
            />
          )}
        </div>

        {/* Text Content */}
        <div className="p-4 bg-white w-full text-center">
          <h3 className="text-lg font-bold">{currentPost?.title || "Marketing Post"}</h3>

          {/* Description Container */}
          <div
            className={`relative text-gray-600 transition-all overflow-hidden ${
              expanded ? "max-h-full" : "max-h-16"
            }`}
          >
            <p className="px-4">{currentPost?.description || "Post description"}</p>

            {!expanded && showButton && (
              <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent"></div>
            )}
          </div>

          {/* Show More / Show Less Button */}
          {showButton && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 text-sm mt-2"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
