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

  // CSS to hide the first heading in the blog content
  const hideFirstHeadingStyle = `
    .markdown-content h1:first-of-type,
    .markdown-content h2:first-of-type {
      display: none;
    }
  `;

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
          
          {/* Custom style to hide first heading */}
          <style>{hideFirstHeadingStyle}</style>
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
                <h2 className="text-xl section-title mb-3">Post Not Found</h2>
                <p className="mb-4">Sorry, the blog post you're looking for couldn't be found.</p>
                <Link to="/blog" className="fancy-link">
                  Browse all posts
                </Link>
              </div>
            ) : (
              <article className="blog-card" itemScope itemType="https://schema.org/BlogPosting">
                <div className="p-6">
                  <div className="flex justify-end mb-4">
                    <span className="text-sm text-gray-600">{post.readingTime}</span>
                  </div>
                  
                  <h1 className="text-3xl section-title text-glow text-center mb-6" itemProp="headline">
                    {post.title}
                  </h1>
                  
                  <div 
                    className="prose prose-lg max-w-none markdown-content mb-8"
                    itemProp="articleBody"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  <div className="border-t border-gray-700 pt-4 mt-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    
                    <div className="blog-date" itemProp="datePublished">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
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