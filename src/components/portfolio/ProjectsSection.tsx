
import React, { useState } from "react";
import { FilterButtons } from "./FilterButtons";
import { ProjectCard, isVideoProject } from "./ProjectCard";
import { VideoModal } from "./VideoModal";
import { VideoProject, PostProject, Project } from "./ProjectTypes";

type ProjectsSectionProps = {
  isLoading: boolean;
  videoProjects: VideoProject[];
  postProjects: PostProject[];
};

export const ProjectsSection = ({ isLoading, videoProjects, postProjects }: ProjectsSectionProps) => {
  const [filter, setFilter] = useState("all");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeVideoIsShort, setActiveVideoIsShort] = useState(false);

  // Filter out projects without essential data
  const validVideoProjects = videoProjects.filter(video => 
    video.title && video.description && video.thumbnail);
  
  // Remove duplicates from videos by unique ID
  const uniqueVideoProjects = validVideoProjects.reduce((acc: VideoProject[], current) => {
    const existingIndex = acc.findIndex(v => v.id === current.id);
    if (existingIndex === -1) {
      acc.push(current);
    }
    return acc;
  }, []);
  
  const validPostProjects = postProjects.filter(post => 
    post.title && post.description && post.image);
  
  const allProjects: Project[] = [...validPostProjects, ...uniqueVideoProjects];
  
  const filteredProjects = allProjects.filter(project => 
    filter === "all" ? true : project.category === filter
  );

  const handleVideoClick = (videoId: string, isShort = false) => {
    setActiveVideo(videoId);
    setActiveVideoIsShort(isShort);
  };

  const closeVideoModal = () => {
    setActiveVideo(null);
    setActiveVideoIsShort(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">My Work</h2>
        
        <FilterButtons filter={filter} setFilter={setFilter} />

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found. Add projects through the dashboard or update the Google Sheet.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={`${project.category}-${project.id}`} 
              project={project}
              onClick={() => {
                if (isVideoProject(project)) {
                  handleVideoClick(project.id.toString(), project.isShort);
                }
              }}
            />
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoModal 
          videoId={activeVideo}
          isShort={activeVideoIsShort}
          onClose={closeVideoModal}
          videoProjects={uniqueVideoProjects}
        />
      )}
    </section>
  );
};
