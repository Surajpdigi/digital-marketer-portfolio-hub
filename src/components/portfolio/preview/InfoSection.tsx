
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { StatsDisplay } from "./StatsDisplay";
import { SkillsDisplay } from "./SkillsDisplay";

export const InfoSection = () => {
  return (
    <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
      {/* Stats section */}
      <StatsDisplay />
      
      {/* Skills & Expertise */}
      <SkillsDisplay />
      
      <div className="pt-2 md:pt-4 text-center lg:text-left">
        <Link 
          to="/portfolio" 
          className="text-primary font-medium text-sm md:text-base flex items-center gap-1 hover:gap-2 transition-all duration-300 justify-center lg:justify-start"
        >
          View my full portfolio
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
