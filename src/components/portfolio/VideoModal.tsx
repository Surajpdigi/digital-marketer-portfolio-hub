
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Play } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VideoProject } from "./ProjectTypes";

type VideoModalProps = {
  videoId: string;
  isShort: boolean;
  onClose: () => void;
  videoProjects: VideoProject[];
};

// Helper function to extract YouTube video ID from URL
const extractYouTubeId = (url: string): string => {
  if (!url) return '';

  // Check if it's already just an ID
  if (url.length === 11 && !url.includes('/')) {
    return url;
  }

  // Handle YouTube shorts URL format
  const shortsMatch = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/)([^#&?]{11})/);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);

  // Check if valid YouTube video ID is found
  if (match && match[2].length === 11) {
    return match[2];
  }

  // For "v=" format without full URL
  if (url.startsWith('v=')) {
    const id = url.substring(2).split('&')[0];
    return id;
  }

  // Just return whatever we have as a fallback
  return '';
};

// More comprehensive Google Drive link processor
const processGoogleDriveUrl = (url: string): string => {
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

// Helper function to get YouTube video thumbnail from video ID
const getYouTubeThumbnail = (videoId: string): string => {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const VideoModal = ({ videoId, isShort, onClose, videoProjects }: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
  const youtubeId = currentVideo?.url ? extractYouTubeId(currentVideo.url) : videoId;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-hidden">
      <div 
        ref={modalRef} 
        className={`relative bg-white rounded-lg overflow-hidden max-h-[90vh] flex flex-col ${
          isShort ? 'max-w-[350px] w-full' : 'max-w-4xl w-full'
        }`}
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/10 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        {/* Video section with contained aspect ratio */}
        <div 
          className={`${isShort ? 'aspect-[9/16]' : 'aspect-video'} w-full relative`}
          style={{maxHeight: isShort ? '70vh' : '60vh'}}
        >
          {isPlaying ? (
            <iframe 
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title="YouTube video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div
              className="w-full h-full cursor-pointer relative"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={getYouTubeThumbnail(youtubeId)}
                alt={currentVideo?.title || "YouTube thumbnail"}
                className="w-full h-full object-contain bg-black"
                onError={(e) => {
                  console.log("Failed to load YouTube thumbnail");
                  e.currentTarget.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Play className="h-16 w-16 text-white bg-black/60 rounded-full p-3" />
              </div>
            </div>
          )}
        </div>
        
        {/* Text content with ScrollArea for overflow */}
        <div className="bg-white flex-shrink-0 max-h-[30vh]">
          <ScrollArea className="h-full" style={{maxHeight: "30vh"}}>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                {currentVideo?.title || "Marketing Video"}
              </h3>
              <p className="text-muted-foreground">
                {currentVideo?.description || "Video description"}
              </p>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
