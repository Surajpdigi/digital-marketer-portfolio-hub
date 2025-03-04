
// Google Sheets URLs for our content
const VIDEOS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3J5vtzHVOs3KxTSN2_z6N8aPfRbVrJoKs5_TcKeyMeIVMk_HQS_YJC4mOZljoIsWjnP--PDvC6xH2/pub?gid=0&single=true&output=csv";
const POSTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3J5vtzHVOs3KxTSN2_z6N8aPfRbVrJoKs5_TcKeyMeIVMk_HQS_YJC4mOZljoIsWjnP--PDvC6xH2/pub?gid=1156220402&single=true&output=csv";

import { VideoContent, PostContent } from "@/context/ContentContext";

// Fetch data from Google Sheets CSV
export async function fetchGoogleSheet(sheetURL: string) {
  try {
    const response = await fetch(sheetURL);
    const text = await response.text();
    const rows = text.split("\n").map(row => {
      // Handle quoted CSV values that might contain commas
      const values: string[] = [];
      let inQuote = false;
      let currentValue = "";
      
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        
        if (char === '"' && (i === 0 || row[i-1] !== '\\')) {
          inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
          values.push(currentValue.trim());
          currentValue = "";
        } else {
          currentValue += char;
        }
      }
      
      // Add the last value
      values.push(currentValue.trim());
      return values;
    });
    
    const headers = rows[0].map(header => header.trim()); // Get column names
    return rows.slice(1).map(row => {
      let obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        // Clean up values (remove quotes)
        let value = row[i] ? row[i].trim() : "";
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        obj[header] = value;
      });
      return obj;
    });
  } catch (error) {
    console.error("Error fetching Google Sheets:", error);
    return [];
  }
}

// Function to convert raw data to VideoContent objects
export async function fetchVideos(): Promise<VideoContent[]> {
  const data = await fetchGoogleSheet(VIDEOS_SHEET_URL);
  return data.map((item: any, index) => ({
    id: item.id || String(index + 1),
    title: item.title || "Untitled Video",
    description: item.description || "",
    url: item.url || "",
    thumbnail: item.thumbnail || "https://via.placeholder.com/320x180?text=Video",
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
    image: item.image || "https://via.placeholder.com/320x180?text=Post"
  }));
}
