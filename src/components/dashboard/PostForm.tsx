
import React, { useState } from 'react';
import { useContent, PostContent } from '@/context/ContentContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  
  const { addPost } = useContent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !description || !image) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please fill in all fields.',
      });
      return;
    }

    // Process Google Drive URL if needed
    let processedImageUrl = image;
    if (image.includes('drive.google.com/file/d/')) {
      // Extract file ID and convert to direct image URL
      const fileIdMatch = image.match(/\/d\/(.+?)\/|\/d\/(.+?)$/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1] || fileIdMatch[2];
        processedImageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }

    // Create a new unique ID
    const newId = Date.now();

    const newPost: PostContent = {
      id: newId,
      title,
      description,
      image: processedImageUrl,
    };

    addPost(newPost);
    toast({
      title: 'Post added',
      description: 'Your post has been added to the portfolio.',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setImage('');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow mb-6">
      <h3 className="text-xl font-bold mb-4">Add New Post</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="postTitle" className="block text-sm font-medium mb-1">Post Title</label>
          <Input
            id="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>
        
        <div>
          <label htmlFor="postDescription" className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            id="postDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter post description"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            id="imageUrl"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <div className="text-sm text-muted-foreground mt-1 space-y-1">
            <p>Accepted formats:</p>
            <ul className="list-disc pl-5">
              <li>Direct image URLs (https://example.com/image.jpg)</li>
              <li>Google Drive share links (will be automatically converted)</li>
              <li>Google Drive format: https://drive.google.com/uc?export=view&id=YOUR_FILE_ID</li>
            </ul>
          </div>
        </div>
        
        <Button type="submit">Add Post</Button>
      </form>
    </div>
  );
};

export default PostForm;
