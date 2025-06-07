import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BlogPost } from '../lib/blogUtils';
import { loadAllBlogPosts } from '../lib/blogLoader';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      const allPosts = loadAllBlogPosts();
      // Sort posts by date (newest first)
      const sortedPosts = allPosts.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Schema markup for blog
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "GameDev Portfolio Blog",
    "description": "Insights and experiences from game development and programming",
    "url": "https://ronit9320.github.io/blog",
    "author": {
      "@type": "Person",
      "name": "Ronit Shah"
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": "Ronit Shah"
      },
      "keywords": post.tags.join(", ")
    }))
  };

  return (
    <>
      <Helmet>
        <title>Gamedev Blogs- Insights on Game Development and Programming</title>
        <meta name="description" content="Explore insights, tutorials, and experiences in game development, programming, and technical deep-dives." />
        <meta name="keywords" content="game development blog, programming tutorials, game engine development, OpenGL, Vulkan, C++" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="GameDev Blog - Technical Insights and Tutorials" />
        <meta property="og:description" content="Dive into game development, programming tutorials, and technical deep-dives." />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://ronit9320.github.io/blog" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GameDev Blog - Technical Insights" />
        <meta name="twitter:description" content="Explore game development, programming tutorials, and technical deep-dives." />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      <section className="section">
        <div className="container mx-auto">
          <h1 className="section-title text-center text-glow">Blogs</h1>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            Technical insights, tutorials, and experiences from my journey in game development and programming.
          </p>
          
          <div className="flex justify-center mb-8">
            <Link to="/blog/new" className="submit-button">
              Create New Post
            </Link>
          </div>
          
          <div className="mythical-divider mx-auto w-3/4 mb-12"></div>
          
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center p-12">
                <div className="animate-pulse text-center">
                  <p className="text-lg">Loading blog posts...</p>
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center p-12">
                <h2 className="text-xl font-trojan mb-3">No posts found</h2>
                <p>Check back soon for new content!</p>
              </div>
            ) : (
              <>
                {posts.map((post) => (
                  <article 
                    key={post.id}
                    className="blog-card mb-10"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    <div className="p-6">
                      <div className="blog-date mb-2" itemProp="datePublished">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h2 className="text-xl font-trojan mb-3" itemProp="headline">
                        {post.title}
                      </h2>
                      <p className="blog-excerpt mb-4" itemProp="description">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <React.Fragment key={tagIndex}>
                            <span 
                              className="project-tag"
                              itemProp="keywords"
                            >
                              {tag}
                            </span>
                            {tagIndex < post.tags.length - 1 && <span className="text-gray-400">•</span>}
                          </React.Fragment>
                        ))}
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{post.readingTime}</span>
                      </div>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="fancy-link inline-block mt-4 font-semibold"
                        itemProp="url"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                ))}
              </>
            )}
            
            <article className="blog-card mb-10">
              <div className="p-6 text-center">
                <h2 className="text-xl font-trojan mb-3">More Posts Coming Soon</h2>
                <p className="blog-excerpt mb-4">
                  Upcoming articles will cover various topics including:
                  <br/><br/>
                  • Game Development Experiences<br/>
                  • Programming Insights<br/>
                  • Project Updates<br/>
                  • Learning Journey<br/>
                  • Industry Thoughts<br/>
                  • Open Source Contributions<br/>
                  <br/>
                  Follow me on X for regular updates and new blog posts.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog; 