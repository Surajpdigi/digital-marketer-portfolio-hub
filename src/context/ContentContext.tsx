
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchVideos, fetchPosts } from '@/utils/googleSheetsUtils';

export type VideoContent = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  isShort?: boolean;
};

export type PostContent = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export const defaultVideos: VideoContent[] = [];
export const defaultPosts: PostContent[] = [];

type ContentContextType = {
  videos: VideoContent[];
  posts: PostContent[];
  addVideo: (video: VideoContent) => void;
  addPost: (post: PostContent) => void;
  removeVideo: (id: string) => void;
  removePost: (id: number) => void;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [posts, setPosts] = useState<PostContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshContent = async () => {
    setIsLoading(true);
    try {
      const fetchedVideos = await fetchVideos();
      const fetchedPosts = await fetchPosts();
      
      console.log("Fetched videos:", fetchedVideos);
      console.log("Fetched posts:", fetchedPosts);
      
      setVideos(fetchedVideos);
      setPosts(fetchedPosts);
      
      localStorage.setItem('dashboardVideos', JSON.stringify(fetchedVideos));
      localStorage.setItem('dashboardPosts', JSON.stringify(fetchedPosts));
      
      console.log("Content refreshed from Google Sheets", {
        videos: fetchedVideos.length,
        posts: fetchedPosts.length
      });
    } catch (error) {
      console.error("Failed to refresh content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      try {
        // First try to load from localStorage for faster initial render
        const savedVideos = localStorage.getItem('dashboardVideos');
        const savedPosts = localStorage.getItem('dashboardPosts');
  
        if (savedVideos && savedPosts) {
          setVideos(JSON.parse(savedVideos));
          setPosts(JSON.parse(savedPosts));
        }
        
        // Then refresh from Google Sheets
        await refreshContent();
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, []);

  const addVideo = (video: VideoContent) => {
    const updatedVideos = [...videos, video];
    setVideos(updatedVideos);
    localStorage.setItem('dashboardVideos', JSON.stringify(updatedVideos));
  };

  const addPost = (post: PostContent) => {
    const updatedPosts = [...posts, post];
    setPosts(updatedPosts);
    localStorage.setItem('dashboardPosts', JSON.stringify(updatedPosts));
  };

  const removeVideo = (id: string) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    setVideos(updatedVideos);
    localStorage.setItem('dashboardVideos', JSON.stringify(updatedVideos));
  };

  const removePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('dashboardPosts', JSON.stringify(updatedPosts));
  };

  return (
    <ContentContext.Provider 
      value={{ 
        videos, 
        posts, 
        addVideo, 
        addPost, 
        removeVideo, 
        removePost, 
        isLoading, 
        refreshContent 
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
