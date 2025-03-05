
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

  const currentPost = postProjects.find(p => p.id === postId);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef} 
        className="relative bg-white rounded-lg overflow-hidden w-full max-w-2xl"
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/10 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="aspect-video w-full">
            <img 
              src={currentPost?.image || ""}
              alt={currentPost?.title || "Post"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 bg-white">
            <h3 className="text-xl font-bold mb-4">
              {currentPost?.title || "Marketing Post"}
            </h3>
            <p className="text-muted-foreground">
              {currentPost?.description || "Post description"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
