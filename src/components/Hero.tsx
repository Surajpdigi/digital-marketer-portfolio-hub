
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-5rem)] relative px-4 py-16 md:py-0 bg-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-white/75" />
      </div>

      <div className="relative flex items-center min-h-[calc(100vh-5rem)]">
        <div className="max-w-4xl mx-auto text-center reveal">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm mb-6 text-sm md:text-base text-primary font-medium">
            Digital Marketing Expert
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight text-foreground">
            Transforming Brands Through Digital Innovation
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            I help businesses grow their digital presence through strategic marketing solutions and data-driven campaigns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button size="lg" variant="default" className="w-full sm:w-auto">
                View Portfolio
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
      <button 
        onClick={scrollToServices}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll to services"
      >
        <ChevronDown className="h-8 w-8 text-primary" />
      </button>
    </section>
  );
};
