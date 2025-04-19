
import { Award, BarChart, Globe, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Digital Strategy",
    description: "Comprehensive digital marketing strategies tailored to your business goals",
    icon: Target,
  },
  {
    title: "Social Media",
    description: "Engaging social media management and content creation",
    icon: Globe,
  },
  {
    title: "Analytics",
    description: "Data-driven insights and performance tracking",
    icon: BarChart,
  },
  {
    title: "Brand Growth",
    description: "Strategic brand development and market positioning",
    icon: Award,
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      <div className="max-w-6xl mx-auto reveal relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Services</h2>
          <p className="text-blue-50/90 max-w-2xl mx-auto text-lg">
            Specialized digital marketing services to help your business thrive in the digital landscape
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base text-blue-50/80">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
