import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../lib/blogUtils';
import { loadBlogPostBySlug } from '../lib/blogLoader';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!slug) {
      navigate('/blog');
      return;
    }
    
    try {
      const loadedPost = loadBlogPostBySlug(slug);
      if (loadedPost) {
        setPost(loadedPost);
      } else {
        // Post not found
        console.error(`Blog post with slug "${slug}" not found`);
      }
    } catch (error) {
      console.error(`Error loading blog post with slug "${slug}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, [slug, navigate]);

  // Schema markup for blog post
  const postSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Ronit Shah"
    },
    "description": post.excerpt || "Welcome to my game development blog where I share insights and experiences.",
    "keywords": post.tags.join(", ")
  } : null;

  return (
    <>
      {post && (
        <Helmet>
          <title>{post.title} - GameDev Blog</title>
          <meta name="description" content={post.excerpt || "Welcome to my game development blog where I share insights and experiences."} />
          <meta name="keywords" content={post.tags.join(", ")} />
          
          {/* Open Graph tags */}
          <meta property="og:title" content={`${post.title} - GameDev Blog`} />
          <meta property="og:description" content={post.excerpt || "Welcome to my game development blog where I share insights and experiences."} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://ronit9320.github.io/blog/${slug}`} />
          
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${post.title} - GameDev Blog`} />
          <meta name="twitter:description" content={post.excerpt || "Welcome to my game development blog where I share insights and experiences."} />
          
          {/* Schema.org markup */}
          {postSchema && (
            <script type="application/ld+json">
              {JSON.stringify(postSchema)}
            </script>
          )}
        </Helmet>
      )}

      <section className="section">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="fancy-link inline-block mb-8">
              ← Back to Blog
            </Link>

            {isLoading ? (
              <div className="flex justify-center p-12">
                <div className="animate-pulse text-center">
                  <p className="text-lg">Loading blog post...</p>
                </div>
              </div>
            ) : !post ? (
              <div className="blog-card p-6 text-center">
                <h2 className="text-xl font-trojan mb-3">Post Not Found</h2>
                <p className="mb-4">Sorry, the blog post you're looking for couldn't be found.</p>
                <Link to="/blog" className="fancy-link">
                  Browse all posts
                </Link>
              </div>
            ) : (
              <article className="blog-card" itemScope itemType="https://schema.org/BlogPosting">
                <div className="p-6">
                  <div className="blog-date mb-2" itemProp="datePublished">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <h1 className="text-3xl font-trojan text-glow" itemProp="headline">
                      {post.title}
                    </h1>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{post.readingTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <div 
                    className="prose prose-lg max-w-none markdown-content"
                    itemProp="articleBody"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost; 