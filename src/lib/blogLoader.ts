import { BlogPost } from './blogUtils';
import { markdownToBlogPost } from './markdownUtils';

// In a real application, this would load files from the file system
// For this demo, we're going to import them directly
// This would typically be done server-side or during build time

// Import markdown files
import welcomePost from '../data/blog/welcome-post.md?raw';
import gameEnginePost from '../data/blog/game-engine-architecture.md?raw';

// Map of all blog posts
const blogPostFiles: Record<string, string> = {
  'welcome': welcomePost,
  'game-engine-architecture': gameEnginePost,
  // Add more posts here
};

// Load all blog posts
export function loadAllBlogPosts(): BlogPost[] {
  return Object.entries(blogPostFiles).map(([slug, content], index) => {
    const post = markdownToBlogPost(content, (index + 1).toString());
    return post;
  }).filter(Boolean) as BlogPost[];
}

// Load a specific blog post by slug
export function loadBlogPostBySlug(slug: string): BlogPost | null {
  const content = blogPostFiles[slug];
  if (!content) return null;
  
  return markdownToBlogPost(content, slug);
} 