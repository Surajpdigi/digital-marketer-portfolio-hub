
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-5rem)] relative px-4 py-16 md:py-0 bg-gradient-to-br from-primary/90 to-blue-400 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      <div className="relative flex items-center min-h-[calc(100vh-5rem)]">
        <div className="max-w-4xl mx-auto text-center reveal">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 text-sm md:text-base">
            Digital Marketing Expert
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Transforming Brands Through Digital Innovation
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto text-blue-50">
            I help businesses grow their digital presence through strategic marketing solutions and data-driven campaigns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-blue-50">
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
              className="w-full sm:w-auto border-white text-white hover:bg-white/10"
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
        <ChevronDown className="h-8 w-8 text-white" />
      </button>
    </section>
  );
};
