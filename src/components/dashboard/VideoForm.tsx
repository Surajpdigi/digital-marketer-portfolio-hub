
import React, { useState } from 'react';
import { useContent, VideoContent } from '@/context/ContentContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const VideoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isShort, setIsShort] = useState(false);
  
  const { addVideo } = useContent();

  const extractVideoId = (url: string): string | null => {
    // Extract YouTube video ID from different URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !description || !url) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please fill in at least the title, description and URL.',
      });
      return;
    }

    // Extract video ID for embedding
    const videoId = extractVideoId(url);
    if (!videoId) {
      toast({
        variant: 'destructive',
        title: 'Invalid YouTube URL',
        description: 'Please enter a valid YouTube video URL.',
      });
      return;
    }

    // If no thumbnail is provided, generate one from the YouTube video ID
    const finalThumbnail = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const newVideo: VideoContent = {
      id: videoId,
      title,
      description,
      url,
      thumbnail: finalThumbnail,
      isShort,
      imageUrl: imageUrl || undefined
    };

    addVideo(newVideo);
    toast({
      title: 'Video added',
      description: 'Your video has been added to the portfolio.',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setUrl('');
    setThumbnail('');
    setImageUrl('');
    setIsShort(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow mb-6">
      <h3 className="text-xl font-bold mb-4">Add New Video</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="videoTitle" className="block text-sm font-medium mb-1">Video Title</label>
          <Input
            id="videoTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
          />
        </div>
        
        <div>
          <label htmlFor="videoDescription" className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            id="videoDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">YouTube URL</label>
          <Input
            id="videoUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
        
        <div>
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium mb-1">Thumbnail URL (optional)</label>
          <Input
            id="thumbnailUrl"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Leave blank to use YouTube thumbnail"
          />
          <p className="text-xs text-muted-foreground mt-1">
            If left blank, the YouTube video thumbnail will be used automatically
          </p>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Cover Image URL (optional)</label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg or Google Drive link"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Additional cover image to show in the video modal
          </p>
        </div>
        
        <div className="flex items-center">
          <input
            id="isShort"
            type="checkbox"
            checked={isShort}
            onChange={(e) => setIsShort(e.target.checked)}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="isShort" className="ml-2 block text-sm">
            This is a YouTube Short (vertical video)
          </label>
        </div>
        
        <Button type="submit">Add Video</Button>
      </form>
    </div>
  );
};

export default VideoForm;
