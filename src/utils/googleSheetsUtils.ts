
// Google Sheets URLs for our content
const VIDEOS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3J5vtzHVOs3KxTSN2_z6N8aPfRbVrJoKs5_TcKeyMeIVMk_HQS_YJC4mOZljoIsWjnP--PDvC6xH2/pub?gid=0&single=true&output=csv";
const POSTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3J5vtzHVOs3KxTSN2_z6N8aPfRbVrJoKs5_TcKeyMeIVMk_HQS_YJC4mOZljoIsWjnP--PDvC6xH2/pub?gid=1156220402&single=true&output=csv";
const BLOG_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3J5vtzHVOs3KxTSN2_z6N8aPfRbVrJoKs5_TcKeyMeIVMk_HQS_YJC4mOZljoIsWjnP--PDvC6xH2/pub?gid=1990156849&single=true&output=csv";

import { VideoContent, PostContent, BlogPostContent } from "@/context/ContentContext";

// Helper function to process Google Drive image URLs
function processGoogleDriveUrl(url: string): string {
  if (!url) return url;
  
  // Check if it's already in the correct format
  if (url.includes('drive.google.com/uc?export=view&id=')) {
    return url;
  }
  
  // Check if it's a Google Drive link that needs conversion
  if (url.includes('drive.google.com/file/d/')) {
    // Extract file ID and convert to direct image URL
    const fileIdMatch = url.match(/\/d\/(.+?)\/|\/d\/(.+?)$/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1] || fileIdMatch[2];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }
  
  return url;
}

// Fetch data from Google Sheets CSV
export async function fetchGoogleSheet(sheetURL: string) {
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    
    const text = await response.text();
    console.log("Raw CSV data:", text); // Log the raw data for debugging
    
    // Handle empty rows at the start
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) {
      console.warn("No data in sheet or empty response");
      return [];
    }
    
    // Find the actual header row (ignore empty or metadata rows)
    let headerRowIndex = 0;
    while (headerRowIndex < lines.length) {
      const line = lines[headerRowIndex];
      // Check if this line contains expected column headers
      if (line.includes('id') && (line.includes('title') || line.includes('description'))) {
        break;
      }
      headerRowIndex++;
    }
    
    if (headerRowIndex >= lines.length) {
      console.warn("Could not find header row in sheet");
      return [];
    }
    
    // Parse headers
    const headerLine = lines[headerRowIndex];
    const headers = parseCSVLine(headerLine);
    
    // Parse data rows
    const result = [];
    for (let i = headerRowIndex + 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue;
      
      const values = parseCSVLine(lines[i]);
      if (values.length === 0) continue;
      
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        if (header && header.trim()) {
          obj[header.trim()] = index < values.length ? values[index] : '';
        }
      });
      
      // Only add rows that have at least an id and title
      if (obj.id && obj.title) {
        result.push(obj);
      }
    }
    
    console.log("Parsed sheet data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching Google Sheets:", error);
    return [];
  }
}

// Parse a CSV line handling quoted values
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"' && (i === 0 || line[i-1] !== '\\')) {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  // Add the last value
  values.push(currentValue.trim());
  
  // Clean up values (remove surrounding quotes)
  return values.map(value => {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.substring(1, value.length - 1);
    }
    return value;
  });
}

// Function to convert raw data to VideoContent objects
export async function fetchVideos(): Promise<VideoContent[]> {
  const data = await fetchGoogleSheet(VIDEOS_SHEET_URL);
  return data.map((item: any, index) => ({
    id: item.id || String(index + 1),
    title: item.title || "Untitled Video",
    description: item.description || "",
    url: item.url || "",
    thumbnail: processGoogleDriveUrl(item.thumbnail) || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    isShort: item.isShort === "true" || item.isShort === "TRUE" || false
  }));
}

// Function to convert raw data to PostContent objects
export async function fetchPosts(): Promise<PostContent[]> {
  const data = await fetchGoogleSheet(POSTS_SHEET_URL);
  return data.map((item: any, index) => ({
    id: parseInt(item.id) || index + 1,
    title: item.title || "Untitled Post",
    description: item.description || "",
    image: processGoogleDriveUrl(item.image) || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  }));
}

// Function to convert raw data to BlogPostContent objects
export async function fetchBlogPosts(): Promise<BlogPostContent[]> {
  const data = await fetchGoogleSheet(BLOG_SHEET_URL);
  return data.map((item: any, index) => ({
    id: item.id || `blog-${index + 1}`,
    title: item.title || "Untitled Blog Post",
    description: item.description || "",
    image: processGoogleDriveUrl(item.image) || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: item.date || new Date().toLocaleDateString(),
    readTime: item.readTime || "5 min read",
    content: item.content || "No content available"
  }));
}
