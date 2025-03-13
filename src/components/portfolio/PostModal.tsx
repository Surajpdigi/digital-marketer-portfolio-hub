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
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const currentPost = postProjects.find((p) => p.id === postId);

  useEffect(() => {
    if (currentPost?.description) {
      setShowButton(currentPost.description.length > 100); // Show button only for long descriptions
    }
  }, [currentPost]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg p-6 w-[40vw] max-w-lg flex flex-col"
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/10 text-gray-600 hover:bg-gray-200"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Image */}
        {currentPost?.image && (
          <div className="w-full h-56 flex items-center justify-center bg-gray-100 overflow-hidden">
            <img
              src={currentPost.image}
              alt={currentPost.title || "Post"}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-center mt-4">{currentPost?.title || "Marketing Post"}</h3>

        {/* Description */}
        <div className="text-gray-600 mt-2 text-center">
          <p className={`transition-all ${expanded ? "max-h-full" : "line-clamp-3"}`}>
            {currentPost?.description || "No description available."}
          </p>

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
