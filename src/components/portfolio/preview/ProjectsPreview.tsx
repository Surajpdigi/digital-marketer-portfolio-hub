
import React from "react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PostProject, VideoProject } from "@/components/portfolio/ProjectTypes";
import { getImageSource } from "@/components/portfolio/ProjectCard";

type ProjectsPreviewProps = {
  isLoading: boolean;
  isMobile: boolean;
  postProjects: PostProject[];
  videoProjects: VideoProject[];
};

export const ProjectsPreview = ({ isLoading, isMobile, postProjects, videoProjects }: ProjectsPreviewProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        // Mobile layout (single column)
        <div className="space-y-4">
          {/* Featured post project */}
          {postProjects.length > 0 ? (
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-full relative">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={getImageSource(postProjects[0])} 
                    alt={postProjects[0].title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
                    }}
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{postProjects[0].title}</h3>
                    <p className="text-gray-200 text-xs line-clamp-2">{postProjects[0].description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-full relative">
                <AspectRatio ratio={16 / 9}>
                  <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Brand Awareness Campaign" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="font-bold text-lg">Add Posts in Dashboard</h3>
                    <p className="text-gray-200 text-xs">Showcase your work by adding posts</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Video projects in a row */}
          <div className="grid grid-cols-2 gap-3">
            {videoProjects.length > 0 ? (
              videoProjects.map((videoProject, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="h-full relative">
                    <AspectRatio ratio={1}>
                      <img 
                        src={getImageSource(videoProject)} 
                        alt={videoProject.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        onError={(e) => {
                          e.currentTarget.src = index === 0 
                            ? "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                            : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 p-2 text-white">
                          <h3 className="font-bold text-xs">{videoProject.title}</h3>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                </Card>
              ))
            ) : (
              <>
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="h-full relative">
                    <AspectRatio ratio={1}>
                      <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Content Strategy" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 p-2 text-white">
                          <h3 className="font-bold text-xs">Add Videos</h3>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                </Card>
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="h-full relative">
                    <AspectRatio ratio={1}>
                      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Video Marketing" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 p-2 text-white">
                          <h3 className="font-bold text-xs">More Videos</h3>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      ) : (
        // Desktop layout (grid)
        <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[400px] md:h-[500px]">
          {/* Featured post project - larger display */}
          {postProjects.length > 0 ? (
            <Card className="col-span-4 row-span-6 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-full relative">
                <AspectRatio ratio={4 / 5} className="h-full">
                  <img 
                    src={getImageSource(postProjects[0])} 
                    alt={postProjects[0].title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
                    }}
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="font-bold text-xl">{postProjects[0].title}</h3>
                    <p className="text-gray-200 text-sm line-clamp-2">{postProjects[0].description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="col-span-4 row-span-6 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-full relative">
                <AspectRatio ratio={4 / 5} className="h-full">
                  <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Brand Awareness Campaign" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="font-bold text-xl">Add Posts in Dashboard</h3>
                    <p className="text-gray-200 text-sm">Showcase your work by adding posts</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Top Video Project */}
          {videoProjects.length > 0 ? (
            <Card className="col-span-2 row-span-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-full relative">
                <img 
                  src={getImageSource(videoProjects[0])} 
                  alt={videoProjects[0].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-3 text-white">
                    <h3 className="font-bold text-sm">{videoProjects[0].title}</h3>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="col-span-2 row-span-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-full relative">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Content Strategy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-3 text-white">
                    <h3 className="font-bold text-sm">Add Videos</h3>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Bottom Video Project */}
          {videoProjects.length > 1 ? (
            <Card className="col-span-2 row-span-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-full relative">
                <img 
                  src={getImageSource(videoProjects[1])} 
                  alt={videoProjects[1].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-3 text-white">
                    <h3 className="font-bold text-sm">{videoProjects[1].title}</h3>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="col-span-2 row-span-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-full relative">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Video Marketing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-3 text-white">
                    <h3 className="font-bold text-sm">More Videos</h3>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
      
      <div className="mt-4 md:mt-6 text-center lg:text-right">
        <Link to="/portfolio">
          <Button variant="outline" className="gap-2 group text-sm md:text-base">
            Explore All Projects
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </>
  );
};
