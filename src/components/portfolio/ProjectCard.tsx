
import React from "react";
import { Play } from "lucide-react";
import { Project, VideoProject, PostProject } from "./ProjectTypes";
import { processGoogleDriveUrl } from "@/utils/imageUtils";

type ProjectCardProps = {
  project: Project;
  onClick: () => void;
};

export const isVideoProject = (project: Project): project is VideoProject => {
  return project.category === "video";
};

// Helper function to extract YouTube video ID from URL
const extractYouTubeId = (url: string): string => {
  if (!url) return '';

  // Check if it's already just an ID
  if (url.length === 11 && !url.includes('/')) {
    return url;
  }

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) ? match[2] : '';
};

// Helper to get YouTube thumbnail
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const getImageSource = (project: Project): string => {
  if (isVideoProject(project)) {
    const videoProject = project as VideoProject;
    
    // First try to use the thumbnail if available
    if (videoProject.thumbnail && videoProject.thumbnail.trim() !== '') {
      return processGoogleDriveUrl(videoProject.thumbnail);
    } 
    
    // Always get YouTube thumbnail for videos if URL exists
    if (videoProject.url) {
      const youtubeId = extractYouTubeId(videoProject.url);
      if (youtubeId) {
        return getYouTubeThumbnail(youtubeId);
      }
    }
    
    // Fallback image for videos
    return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
  } else {
    // For post projects
    const imageUrl = (project as PostProject).image || '';
    if (!imageUrl) {
      return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
    }
    
    return processGoogleDriveUrl(imageUrl);
  }
};

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [imageError, setImageError] = React.useState(false);
  
  const fallbackImage = isVideoProject(project)
    ? "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
  
  // Get the image source with proper fallbacks
  let imageSource = getImageSource(project);

  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer shadow-md aspect-[4/5]" // Changed aspect ratio to be more squarish
      onClick={onClick}
    >
      <div className="h-full w-full">
        <img 
          src={imageError ? fallbackImage : imageSource}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.log(`Image failed to load: ${imageSource}`);
            
            // For videos, try YouTube thumbnail if possible
            if (isVideoProject(project) && (project as VideoProject).url && !imageError) {
              const youtubeId = extractYouTubeId((project as VideoProject).url || '');
              if (youtubeId) {
                console.log("Falling back to YouTube thumbnail");
                e.currentTarget.src = getYouTubeThumbnail(youtubeId);
                setImageError(true);
                return;
              }
            }
            
            e.currentTarget.src = fallbackImage;
            setImageError(true);
          }}
        />
        {isVideoProject(project) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="bg-primary text-white rounded-full p-3">
              <Play className="h-6 w-6" />
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
        <h3 className="text-xl font-bold mb-2 text-center">{project.title}</h3>
        <p className="text-center text-sm line-clamp-3 overflow-hidden">{project.description}</p>
      </div>
    </div>
  );
};
