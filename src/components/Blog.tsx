
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { Skeleton } from "@/components/ui/skeleton";

export const Blog = () => {
  const { blogPosts, isLoading } = useContent();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30" id="blog">
      <div className="max-w-6xl mx-auto reveal">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest insights, tutorials, and industry news.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <div className="aspect-video relative overflow-hidden">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <Link to={`/blog/${post.id}`} key={post.id} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full border border-border/50 hover:border-primary/20">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-primary group-hover:underline inline-flex items-center">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No blog posts available. Please add some through the dashboard.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
