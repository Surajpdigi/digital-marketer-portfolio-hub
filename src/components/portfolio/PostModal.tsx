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
  const currentPost = postProjects.find(p => p.id === postId);

  // Function to process Google Drive links
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

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setIsPortrait(img.naturalHeight > img.naturalWidth);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef} 
        className="relative bg-white rounded-lg overflow-hidden w-full max-w-3xl flex flex-col"
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/10 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="flex flex-col">
          {/* Dynamically adjust the container size based on image orientation */}
          <div className={`bg-gray-100 w-full flex items-center justify-center ${isPortrait ? 'h-[500px] max-w-[400px]' : 'h-[400px] max-w-full'}`}>
            {currentPost?.image && (
              <img 
                src={imageUrl}
                alt={currentPost.title || "Post"}
                className="w-full h-full object-cover"
                onLoad={handleImageLoad}
              />
            )}
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
