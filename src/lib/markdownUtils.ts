import { marked } from 'marked';
import { BlogPost } from './blogUtils';

// Function to parse markdown content
export function parseMarkdown(content: string): string {
  return marked.parse(content, { breaks: true }) as string;
}

// Function to extract metadata from markdown frontmatter
export function extractFrontMatter(markdown: string): { frontMatter: Record<string, any>, content: string } {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) {
    return {
      frontMatter: {},
      content: markdown
    };
  }
  
  const frontMatterStr = match[1];
  const content = match[2];
  
  // Parse frontMatter into an object
  const frontMatter: Record<string, any> = {};
  frontMatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      
      // Handle arrays in frontmatter
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // If parsing fails, keep as string
          console.error('Failed to parse frontmatter array:', value);
        }
      }
      
      frontMatter[key.trim()] = value;
    }
  });
  
  return { frontMatter, content };
}

// Function to convert markdown file to blog post object
export function markdownToBlogPost(markdown: string, id: string): BlogPost | null {
  const { frontMatter, content } = extractFrontMatter(markdown);
  
  if (!frontMatter.title || !frontMatter.slug || !frontMatter.date) {
    console.error('Missing required frontmatter fields:', frontMatter);
    return null;
  }
  
  const parsedContent = parseMarkdown(content);
  
  return {
    id,
    slug: frontMatter.slug,
    title: frontMatter.title,
    date: frontMatter.date,
    excerpt: frontMatter.excerpt || '',
    content: parsedContent,
    tags: frontMatter.tags || [],
    coverImage: frontMatter.coverImage,
    readingTime: frontMatter.readingTime || '5 min read'
  };
} 