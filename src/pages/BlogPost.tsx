import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Process Google Drive URLs
const processGoogleDriveUrl = (url: string): string => {
  if (!url) return '';
  
  // If it's already in the format we need
  if (url.includes('drive.google.com/uc?')) {
    return url;
  }
  
  // Extract file ID from sharing URL
  let fileId = '';
  
  // Handle the standard file viewing format: /file/d/FILE_ID/view
  if (url.includes('drive.google.com/file/d/')) {
    const fileIdMatch = url.match(/\/d\/([^\/\?&]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      fileId = fileIdMatch[1];
    }
  } 
  // Handle the direct sharing link: /open?id=FILE_ID
  else if (url.includes('open?id=')) {
    const idMatch = url.match(/open\?id=([^\/\?&]+)/);
    if (idMatch && idMatch[1]) {
      fileId = idMatch[1];
    }
  }
  // Handle folder links
  else if (url.includes('drive.google.com/drive/folders/')) {
    const folderIdMatch = url.match(/folders\/([^\/\?&]+)/);
    if (folderIdMatch && folderIdMatch[1]) {
      fileId = folderIdMatch[1];
    }
  }
  // Handle direct ID (when user just enters the ID)
  else if (/^[A-Za-z0-9_-]{25,}$/.test(url)) {
    fileId = url;
  }
  
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  return url;
};

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { blogPosts, isLoading } = useContent();
  
  const post = postId ? blogPosts.find(p => p.id === postId) : null;
  
  useEffect(() => {
    // If posts are loaded and the requested post is not found, redirect to 404
    if (!isLoading && !post && blogPosts.length > 0) {
      navigate('/not-found');
    }
  }, [post, isLoading, blogPosts, navigate]);

  // Process the image URL if it exists
  const processedImageUrl = post?.image ? processGoogleDriveUrl(post.image) : '';

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {isLoading ? (
          <div className="max-w-4xl mx-auto px-4">
            <Skeleton className="h-6 w-32 mb-8" />
            <Skeleton className="aspect-video w-full rounded-lg mb-8" />
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-8" />
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-5 w-full mb-6" />
            ))}
          </div>
        ) : post ? (
          <article className="max-w-4xl mx-auto px-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="aspect-video relative overflow-hidden rounded-lg mb-8 max-h-[60vh] flex justify-center">
              <img 
                src={processedImageUrl || post.image} 
                alt={post.title}
                className="object-contain max-w-full max-h-[60vh]"
                onError={(e) => {
                  console.log("Failed to load blog image:", processedImageUrl);
                  e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
                }}
              />
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{post.description}</p>
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6">{paragraph}</p>
              ))}
            </div>
          </article>
        ) : (
          <div className="max-w-4xl mx-auto px-4 text-center py-12">
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
