
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const PortfolioPreview = () => {
  return (
    <section id="portfolio" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of my recent digital marketing projects, showcasing creative strategies and successful campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 reveal">
          <Card className="overflow-hidden">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Digital Marketing Campaign" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">Brand Awareness Campaign</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">Strategic social media campaign that increased brand awareness by 45%.</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Content Creation Project" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">Content Marketing Strategy</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">Comprehensive content strategy that generated 200% increase in organic traffic.</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Video Marketing Campaign" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">Video Marketing Series</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">Viral video campaign that achieved over 2 million views across platforms.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center reveal">
          <Link to="/portfolio">
            <Button size="lg" className="gap-2">
              View Full Portfolio
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
