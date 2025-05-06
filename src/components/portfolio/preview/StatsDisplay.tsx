
import React from "react";

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

export const StatsDisplay = () => {
  return (
    <div className="mb-4 md:mb-8 bg-muted/30 p-4 md:p-6 rounded-lg backdrop-blur-sm shadow-md">
      <p className="text-muted-foreground mb-4 text-sm md:text-base">
        As a seasoned digital marketing specialist, I've helped dozens of brands achieve
        their goals through strategic content and innovative campaigns. My expertise spans 
        across multiple platforms and techniques, with a proven track record of success.
      </p>
      
      <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="text-center p-2 md:p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors duration-300 shadow-sm"
          >
            <div className="text-primary font-bold text-lg md:text-xl">{stat.value}</div>
            <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
