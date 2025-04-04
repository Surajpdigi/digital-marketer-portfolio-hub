
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { VideoProject, PostProject } from "@/components/portfolio/ProjectTypes";

const Portfolio = () => {
  // Use the content context to access shared content
  const { videos: contextVideos, posts: contextPosts, isLoading } = useContent();
  
  const postProjects: PostProject[] = contextPosts.map(post => ({
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.image,
    category: "post"
  }));
  
  const videoProjects: VideoProject[] = contextVideos.map(video => ({
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    category: "video",
    isShort: video.isShort || false,
    url: video.url,
    imageUrl: video.imageUrl
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 max-w-7xl mx-auto w-full">
        <AboutSection />
        <ProjectsSection 
          isLoading={isLoading}
          videoProjects={videoProjects}
          postProjects={postProjects}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
