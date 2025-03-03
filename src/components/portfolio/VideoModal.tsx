
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { VideoProject } from "./ProjectTypes";

type VideoModalProps = {
  videoId: string;
  isShort: boolean;
  onClose: () => void;
  videoProjects: VideoProject[];
};

export const VideoModal = ({ videoId, isShort, onClose, videoProjects }: VideoModalProps) => {
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

  const currentVideo = videoProjects.find(v => v.id === videoId);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef} 
        className={`relative bg-white rounded-lg overflow-hidden ${isShort ? 'w-[350px] max-w-full' : 'w-full max-w-4xl'}`}
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/10 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <div className={isShort ? 'aspect-[9/16] w-full' : 'aspect-video w-full'}>
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-xl font-bold mb-2">
            {currentVideo?.title || "Marketing Video"}
          </h3>
          <p className="text-muted-foreground">
            {currentVideo?.description || "Video description"}
          </p>
        </div>
      </div>
    </div>
  );
};
