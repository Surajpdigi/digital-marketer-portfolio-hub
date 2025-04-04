
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Play } from "lucide-react";
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
  return url;
};

// Helper function to convert Google Drive link to direct image link
const getDriveImageLink = (url: string): string => {
  if (!url) return "";
  
  // Check if it's already in the correct format
  if (url.includes('drive.google.com/uc?')) {
    return url;
  }
  
  // Match different Google Drive link formats
  const match = url.match(/(?:\/d\/|id=|open\?id=)([^\/\?&]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};

// Helper function to get YouTube video thumbnail from video ID
const getYouTubeThumbnail = (videoId: string): string => {
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

  console.log("Current video:", currentVideo);
  console.log("YouTube ID:", youtubeId);

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
        <div className={isShort ? 'aspect-[9/16] w-full relative' : 'aspect-video w-full relative'}>
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
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Play className="h-16 w-16 text-white bg-black/60 rounded-full p-3" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-xl font-bold mb-2">
            {currentVideo?.title || "Marketing Video"}
          </h3>
          <p className="text-muted-foreground">
            {currentVideo?.description || "Video description"}
          </p>
          {currentVideo?.imageUrl && !isPlaying && (
            <div className="mt-4">
              <img
                src={getDriveImageLink(currentVideo.imageUrl)}
                alt={currentVideo.title || "Video image"}
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          )}
          {!currentVideo?.imageUrl && !isPlaying && (
            <div className="mt-4">
              <img
                src={getYouTubeThumbnail(youtubeId)}
                alt={currentVideo?.title || "Default video cover"}
                className="w-full max-w-md rounded-lg shadow-lg" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
