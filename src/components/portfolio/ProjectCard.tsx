
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

export const getImageSource = (project: Project): string => {
  let imageUrl = '';
  
  if (project.category === "video") {
    imageUrl = (project as VideoProject).thumbnail || '';
  } else {
    imageUrl = (project as PostProject).image || '';
  }
  
  // Check if the URL is from placeholder service and the image exists
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
    
  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer shadow-md"
      onClick={onClick}
    >
      <div className="aspect-video">
        <img 
          src={imageError ? fallbackImage : getImageSource(project)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.log(`Image failed to load: ${getImageSource(project)}`);
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
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-center">{project.description}</p>
      </div>
    </div>
  );
};
