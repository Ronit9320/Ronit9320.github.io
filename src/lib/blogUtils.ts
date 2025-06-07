export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage?: string;
  readingTime: string;
}

// This will be our "database" of blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'welcome',
    title: 'Welcome to My Blog',
    date: '2025-05-02',
    excerpt: 'Stay Tuned for more Blogs',
    content: `
      <div class="text-center py-12">
        <h2 class="text-2xl font-trojan mb-4">Blogs Starting Soon</h2>
        <p class="text-gray-600">Stay tuned for upcoming content about game development, programming insights, and technical deep-dives.</p>
      </div>
    `,
    tags: ["Game Development", "Programming", "Learning Journey"],
    readingTime: "5 min read"
  }
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts];
}

export function getSortedPosts(): BlogPost[] {
  return getAllPosts().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find(post => post.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.tags.includes(tag)
  );
}

// Function to add new blog post (would typically connect to a backend/CMS)
export function addBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
  const newPost = {
    ...post,
    id: (blogPosts.length + 1).toString()
  };
  
  blogPosts.push(newPost);
  return newPost;
} 