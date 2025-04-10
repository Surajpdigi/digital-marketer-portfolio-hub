
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (!window.location.pathname.startsWith('/#')) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img 
                src="https://i.pinimg.com/736x/83/6c/d2/836cd27d3bf3d81122d089088f60d60f.jpg" 
                alt="Digital Marketing Icon" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold">Suraj Poojari</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="hover:text-primary transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('blog')} 
              className="hover:text-primary transition-colors"
            >
              Blog
            </button>
            <Link 
              to="/portfolio" 
              className="hover:text-primary transition-colors"
            >
              Portfolio
            </Link>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-primary transition-colors"
            >
              Contact
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 flex flex-col space-y-4 animate-fade-in">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="py-2 hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="py-2 hover:text-primary transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('blog')} 
              className="py-2 hover:text-primary transition-colors"
            >
              Blog
            </button>
            <Link 
              to="/portfolio" 
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="py-2 hover:text-primary transition-colors"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
