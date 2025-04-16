
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-5rem)] relative px-4 py-16 md:py-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20" />
      </div>

      <div className="relative flex items-center min-h-[calc(100vh-5rem)]">
        <div className="max-w-4xl mx-auto text-center reveal backdrop-blur-sm bg-white/30 p-8 md:p-10 rounded-xl shadow-lg">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 mb-6 text-sm md:text-base text-primary font-medium">
            Digital Marketing Expert
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight text-foreground">
            Transforming Brands Through Digital Innovation
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto text-foreground/90">
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
              className="w-full sm:w-auto bg-white/70 hover:bg-white/90"
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
