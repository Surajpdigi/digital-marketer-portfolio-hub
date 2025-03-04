
import React from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ContentList = () => {
  const { videos, posts, removeVideo, removePost } = useContent();

  const handleRemoveVideo = (id: string) => {
    removeVideo(id);
    toast({
      title: 'Video removed',
      description: 'The video has been removed from your portfolio.',
    });
  };

  const handleRemovePost = (id: number) => {
    removePost(id);
    toast({
      title: 'Post removed',
      description: 'The post has been removed from your portfolio.',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Videos</h3>
        
        {videos.length === 0 ? (
          <p className="text-muted-foreground">No videos added yet.</p>
        ) : (
          <div className="space-y-4">
            {videos.map((video) => (
              <div key={video.id} className="flex items-start gap-4 border-b pb-4">
                <div className="relative w-20 h-16 overflow-hidden rounded">
                  <img 
                    src={video.thumbnail || "https://youtu.be/h2pyOejlbJA?si=hfbQXtfBEdYsUW3C"} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3J5vtzHVOs3KxTSN2_z6N8aPfRbVrJoKs5_TcKeyMeIVMk_HQS_YJC4mOZljoIsWjnP--PDvC6xH2/pub?gid=0&single=true&output=csv";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{video.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {video.description}
                  </p>
                  {video.isShort && (
                    <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary rounded mt-1">
                      YouTube Short
                    </span>
                  )}
                  <div className="mt-1">
                    <a 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-blue-500 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View on YouTube
                    </a>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveVideo(video.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Posts</h3>
        
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts added yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-start gap-4 border-b pb-4">
                <div className="relative w-20 h-16 overflow-hidden rounded">
                  <img 
                    src={post.image || "https://via.placeholder.com/320x180?text=Post+Image"} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/320x180?text=Post+Image";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{post.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {post.description}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemovePost(post.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;
