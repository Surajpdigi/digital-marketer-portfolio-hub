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
  const currentPost = postProjects.find(p => p.id === postId);

  const processImageUrl = (url: string) => {
    const match = url.match(/\/d\/([^/]+)/);
    return match ? `https://drive.google.com/uc?id=${match[1]}` : url;
  };

  const imageUrl = currentPost?.image ? processImageUrl(currentPost.image) : '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef} 
        className="relative bg-white rounded-lg flex flex-col items-center shadow-lg"
        style={{
          width: "90vw", 
          maxWidth: "500px", 
          maxHeight: "90vh", 
          overflow: "hidden" 
        }}
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/10 text-black hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        {/* Image Container */}
        <div className="w-full bg-gray-100" style={{ height: "60%" }}>
          {currentPost?.image && (
            <img 
              src={imageUrl}
              alt={currentPost.title || "Post"}
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
        </div>
        
        {/* Text Content */}
        <div className="p-4 bg-white w-full">
          <h3 className="text-lg font-bold">{currentPost?.title || "Post Title"}</h3>

          {/* Description */}
          <div 
            className={`text-gray-600 transition-all`}
            style={{
              maxHeight: expanded ? "4.5em" : "1.5em", // Expands to 3 lines, starts at 1
              overflowY: expanded ? "auto" : "hidden",
              position: "relative",
            }}
          >
            <p className="inline">
              {currentPost?.description || "Post description"}{" "}
              {!expanded && (
                <span 
                  className="text-blue-500 cursor-pointer" 
                  onClick={() => setExpanded(true)}
                >
                  Show More
                </span>
              )}
            </p>
          </div>

          {/* Show Less Button */}
          {expanded && (
            <button
              onClick={() => setExpanded(false)}
              className="text-blue-500 text-sm mt-2 block"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
