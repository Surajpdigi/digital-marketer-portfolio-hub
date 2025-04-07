import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { skills } from "@/components/portfolio/AboutSection";

// Simple stats to showcase experience and expertise
const stats = [{
  label: "Projects Completed",
  value: "75+"
}, {
  label: "Client Satisfaction",
  value: "98%"
}, {
  label: "Years Experience",
  value: "5+"
}, {
  label: "Awards Won",
  value: "12"
}];
export const PortfolioPreview = () => {
  return <section id="portfolio" className="py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl font-bold mb-4">My Portfolio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my creative work and digital marketing accomplishments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 reveal">
          {/* Left side - About Me & Stats */}
          <div className="space-y-6">
            
            
            {/* Stats section */}
            <div className="mb-8 bg-muted/30 p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                As a seasoned digital marketing specialist, I've helped dozens of brands achieve
                their goals through strategic content and innovative campaigns. My expertise spans 
                across multiple platforms and techniques, with a proven track record of success.
              </p>
              
              
            </div>
            
            {/* Skills & Expertise */}
            <div className="bg-muted/30 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Areas of Expertise
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                My work spans across several disciplines in digital marketing, from content creation 
                to audience engagement and analytics-driven strategy.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {skills.slice(0, 6).map(skill => <div key={skill.name} className="text-sm py-1">
                    <span className="font-medium">{skill.name}</span>
                  </div>)}
              </div>
            </div>
            
            <div className="pt-4">
              <Link to="/portfolio" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300">
                View my full portfolio
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Right side - Creative Project Display */}
          <div>
            
            
            <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[500px]">
              {/* Large featured project */}
              <Card className="col-span-4 row-span-6 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-full relative">
                  <AspectRatio ratio={4 / 5} className="h-full">
                    <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Brand Awareness Campaign" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
                  <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Content Strategy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Video Marketing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
    </section>;
};