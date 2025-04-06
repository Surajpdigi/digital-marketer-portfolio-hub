
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { ContentProvider } from "./context/ContentContext";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Log when app mounts to help with debugging
  useEffect(() => {
    console.log("App mounted, routes initialized");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/admin-dashboard-8492" element={<Dashboard />} />
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ContentProvider>
    </QueryClientProvider>
  );
};

export default App;
