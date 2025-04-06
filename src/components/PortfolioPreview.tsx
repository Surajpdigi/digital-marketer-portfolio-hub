
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Target, Globe, BarChart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const services = [
  {
    title: "Digital Strategy",
    description: "Crafting comprehensive digital marketing strategies that align with your business objectives",
    icon: Target,
  },
  {
    title: "Social Media",
    description: "Creating engaging content and managing social platforms to build your brand's community",
    icon: Globe,
  },
  {
    title: "Analytics",
    description: "Providing data-driven insights to track performance and guide decision-making",
    icon: BarChart,
  },
  {
    title: "Brand Growth",
    description: "Developing strategic approaches for brand positioning and market expansion",
    icon: Award,
  },
];

export const PortfolioPreview = () => {
  return (
    <section id="portfolio" className="py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl font-bold mb-4">What I Do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transforming brands with creative strategies and impactful digital solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 reveal">
          {/* Left side - Services */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">My Services</h3>
            
            <div className="space-y-5">
              {services.map((service) => (
                <div key={service.title} className="flex items-start gap-4 group">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 group-hover:bg-primary/20">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{service.title}</h4>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Link to="/portfolio" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300">
                See how I implement these services
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Right side - Creative Project Display */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Featured Projects</h3>
            
            <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[500px]">
              {/* Large featured project */}
              <Card className="col-span-4 row-span-6 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-full relative">
                  <AspectRatio ratio={4/5} className="h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Brand Awareness Campaign" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="font-bold text-xl">Brand Awareness Campaign</h3>
                      <p className="text-gray-200 text-sm">Increased brand visibility by 45%</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Top right project */}
              <Card className="col-span-2 row-span-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-full relative">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Content Strategy" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                      <h3 className="font-bold text-sm">Content Strategy</h3>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Bottom right project */}
              <Card className="col-span-2 row-span-3 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-full relative">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Video Marketing" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                      <h3 className="font-bold text-sm">Video Marketing</h3>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="mt-6 text-right">
              <Link to="/portfolio">
                <Button variant="outline" className="gap-2 group">
                  Explore All Projects
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
