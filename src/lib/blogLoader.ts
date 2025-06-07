import { BlogPost, getAllPosts, getPostBySlug } from './blogUtils';

// Load all blog posts
export function loadAllBlogPosts(): BlogPost[] {
  return getAllPosts();
}

// Load a specific blog post by slug
export function loadBlogPostBySlug(slug: string): BlogPost | null {
  const post = getPostBySlug(slug);
  return post || null;
} 