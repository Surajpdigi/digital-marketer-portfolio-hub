
import React from "react";
import { useContent } from "@/context/ContentContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { PostProject, VideoProject } from "@/components/portfolio/ProjectTypes";
import { InfoSection } from "@/components/portfolio/preview/InfoSection";
import { ProjectsPreview } from "@/components/portfolio/preview/ProjectsPreview";

export const PortfolioPreview = () => {
  const { posts, videos, isLoading } = useContent();
  const isMobile = useIsMobile();
  
  // Convert to project types for consistency with portfolio page
  const postProjects: PostProject[] = posts.slice(0, 1).map(post => ({
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.image,
    category: "post"
  }));
  
  const videoProjects: VideoProject[] = videos.slice(0, 2).map(video => ({
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    url: video.url,
    category: "video",
    isShort: video.isShort || false,
    imageUrl: video.imageUrl
  }));

  return (
    <section id="portfolio" className="py-16 md:py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12 reveal">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">My Portfolio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            A showcase of my creative work and digital marketing accomplishments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 reveal">
          {/* Left side - About Me & Stats */}
          <InfoSection />
          
          {/* Right side - Dynamic Project Display */}
          <div className="order-1 lg:order-2 mb-8 lg:mb-0">
            <ProjectsPreview 
              isLoading={isLoading}
              isMobile={isMobile}
              postProjects={postProjects}
              videoProjects={videoProjects}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
