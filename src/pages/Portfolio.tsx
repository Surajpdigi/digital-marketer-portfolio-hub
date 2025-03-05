
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
    url: video.url // Add the URL from context
  }));

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <AboutSection />
        <ProjectsSection 
          isLoading={isLoading}
          videoProjects={videoProjects}
          postProjects={postProjects}
        />
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
