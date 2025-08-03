import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "../lib/blogUtils";
import { markdownToBlogPost } from "../lib/markdownUtils";

const BlogEditor: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [readingTime, setReadingTime] = useState("5 min read");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<BlogPost | null>(null);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(newSlug);
  };

  const generateSlugFromTitle = () => {
    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(newSlug);
  };

  const handlePreview = () => {
    try {
      const markdown = `---
title: ${title}
slug: ${slug}
date: ${date}
excerpt: ${excerpt}
tags: [${tags
          .split(",")
          .map((tag) => `"${tag.trim()}"`)
          .join(", ")}]
readingTime: ${readingTime}
---

${content}`;

      const post = markdownToBlogPost(markdown, "preview");
      setPreview(post);
      setError("");
    } catch (err) {
      setError("Error generating preview");
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Create markdown content with frontmatter
      const markdown = `---
title: ${title}
slug: ${slug}
date: ${date}
excerpt: ${excerpt}
tags: [${tags
          .split(",")
          .map((tag) => `"${tag.trim()}"`)
          .join(", ")}]
readingTime: ${readingTime}
---

${content}`;

      console.log("Saving blog post:", markdown);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate(`/blog/${slug}`);
    } catch (err) {
      setError("Error saving blog post");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create New Blog Post</title>
      </Helmet>

      <section className="section">
        <div className="container mx-auto">
          <h1 className="section-title text-center text-glow">
            Create New Blog Post
          </h1>

          <div className="max-w-4xl mx-auto">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="blog-card mb-8">
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-2 font-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={generateSlugFromTitle}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="slug" className="block mb-2 font-semibold">
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={handleSlugChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="block mb-2 font-semibold">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="excerpt" className="block mb-2 font-semibold">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={2}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="tags" className="block mb-2 font-semibold">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Game Development, C++, Graphics"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="readingTime"
                    className="block mb-2 font-semibold"
                  >
                    Reading Time
                  </label>
                  <input
                    type="text"
                    id="readingTime"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="5 min read"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="block mb-2 font-semibold">
                    Content (Markdown)
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded font-mono"
                    rows={15}
                    placeholder="# Your Blog Post Title\n\nWrite your content here using Markdown..."
                  ></textarea>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="fancy-link"
                  >
                    Preview
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Post"}
                  </button>
                </div>
              </div>
            </form>

            {preview && (
              <div className="mb-8">
                <h2 className="text-xl font-trojan mb-4">Preview</h2>
                <article className="blog-card">
                  <div className="p-6">
                    <div className="blog-date mb-2">
                      {new Date(preview.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <h2 className="text-xl font-trojan mb-3">
                      {preview.title}
                    </h2>
                    <p className="blog-excerpt mb-4">{preview.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {preview.tags.map((tag, index) => (
                        <span key={index} className="project-tag">
                          {tag}
                        </span>
                      ))}
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {preview.readingTime}
                      </span>
                    </div>
                    <div
                      className="prose prose-lg max-w-none markdown-content"
                      dangerouslySetInnerHTML={{ __html: preview.content }}
                    />
                  </div>
                </article>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogEditor;
