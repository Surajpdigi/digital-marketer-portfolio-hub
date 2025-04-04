
import React from "react";
import { Play } from "lucide-react";
import { Project, VideoProject, PostProject } from "./ProjectTypes";

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

  return (match && match[2].length === 11) ? match[2] : url;
};

// Helper to get YouTube thumbnail
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const getImageSource = (project: Project): string => {
  let imageUrl = '';
  
  if (project.category === "video") {
    const videoProject = project as VideoProject;
    
    // First try to use the thumbnail
    if (videoProject.thumbnail) {
      imageUrl = videoProject.thumbnail;
    } 
    // If no thumbnail, try to generate one from YouTube URL
    else if (videoProject.url) {
      const youtubeId = extractYouTubeId(videoProject.url);
      return getYouTubeThumbnail(youtubeId);
    }
  } else {
    imageUrl = (project as PostProject).image || '';
  }

  // Process Google Drive links
  if (imageUrl && imageUrl.includes('drive.google.com')) {
    // Check if it's already in the correct format
    if (imageUrl.includes('drive.google.com/uc?')) {
      return imageUrl;
    }
    
    // Match different Google Drive link formats
    const match = imageUrl.match(/(?:\/d\/|id=|open\?id=)([^\/\?&]+)/);
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    
    // Handle sharing URLs format
    if (imageUrl.includes('drive.google.com/file/d/')) {
      const parts = imageUrl.split('/');
      const fileIdIndex = parts.indexOf('d') + 1;
      if (fileIdIndex > 0 && fileIdIndex < parts.length) {
        return `https://drive.google.com/uc?export=view&id=${parts[fileIdIndex]}`;
      }
    }
  }
  
  // Check if the URL is from placeholder service or doesn't exist
  if (imageUrl.includes('via.placeholder.com') || !imageUrl) {
    return isVideoProject(project) 
      ? "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
      : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
  }
  
  return imageUrl;
};

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [imageError, setImageError] = React.useState(false);
  
  const fallbackImage = isVideoProject(project)
    ? "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
  
  // For video projects, try to get YouTube thumbnail if available
  let imageSource = getImageSource(project);
  if (isVideoProject(project) && (project as VideoProject).url && (!imageSource || imageError)) {
    const youtubeId = extractYouTubeId((project as VideoProject).url || '');
    imageSource = getYouTubeThumbnail(youtubeId);
  }
    
  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer shadow-md"
      onClick={onClick}
    >
      <div className="aspect-video">
        <img 
          src={imageError ? fallbackImage : imageSource}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.log(`Image failed to load: ${imageSource}`);
            if (isVideoProject(project) && (project as VideoProject).url && !imageError) {
              // Try YouTube thumbnail as fallback for videos
              const youtubeId = extractYouTubeId((project as VideoProject).url || '');
              e.currentTarget.src = getYouTubeThumbnail(youtubeId);
              setImageError(true);
            } else {
              e.currentTarget.src = fallbackImage;
              setImageError(true);
            }
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
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-center">{project.description}</p>
      </div>
    </div>
  );
};
