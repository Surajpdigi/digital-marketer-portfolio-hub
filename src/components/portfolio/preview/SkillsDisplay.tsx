
import React from "react";
import { Award } from "lucide-react";
import { skills } from "@/components/portfolio/AboutSection";

export const SkillsDisplay = () => {
  return (
    <div className="bg-muted/30 p-4 md:p-6 rounded-lg backdrop-blur-sm shadow-md">
      <h4 className="font-semibold text-base md:text-lg mb-3 md:mb-4 flex items-center gap-2">
        <Award className="h-4 w-4 md:h-5 md:w-5 text-primary" />
        Areas of Expertise
      </h4>
      <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
        My work spans across several disciplines in digital marketing, from content creation 
        to audience engagement and analytics-driven strategy.
      </p>
      <div className="grid grid-cols-2 gap-1 md:gap-2">
        {skills.slice(0, 6).map(skill => (
          <div key={skill.name} className="text-xs md:text-sm py-1 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-primary inline-block"></span>
            <span className="font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
