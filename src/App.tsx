import { useEffect, useRef, useState, Component } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import BlogEditor from "./components/BlogEditor";
import About from "./components/About";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";

// Debug info to console
console.log("App.tsx is loading");
console.log("Current URL:", window.location.href);
console.log("Current path:", window.location.pathname);
console.log("Current hash:", window.location.hash);

// Error boundary to catch rendering errors
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#ffdddd",
            border: "1px solid #ff6666",
            borderRadius: "5px",
            margin: "20px",
            color: "#333",
          }}
        >
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message || "Unknown error"}</p>
          <p>{this.state.error?.stack}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ff6666",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Log to help debug
    console.log("App component mounted");

    const mainElement = mainRef.current;
    if (!mainElement) {
      console.warn("Main element ref not found");
      return;
    }

    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        const currentScrollY = mainElement.scrollTop;

        // Update scroll state with a higher threshold
        setIsScrolled(currentScrollY > 150);

        // Update last scroll position
        lastScrollY.current = currentScrollY;
      }, 10);
    };

    mainElement.addEventListener("scroll", handleScroll);
    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const scrollDown = () => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const targetPosition = window.innerHeight;
    // Immediately scroll to target position
    mainElement.scrollTop = targetPosition;
  };

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            {/* Debug info - Keep this for now until site works correctly */}
            <div
              id="debug-info"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                background: "rgba(0,0,0,0.7)",
                color: "white",
                padding: "5px",
                zIndex: 9999,
                fontSize: "12px",
                visibility: "hidden",
              }}
            >
              App is rendering v4
              <br />
              Base URL: {window.location.href}
              <br />
              Path: {window.location.pathname}
              <br />
              Hash: {window.location.hash}
            </div>

            {/* Render check - Force React to render */}
            <div style={{ display: "none" }}>
              {new Date().toISOString()}
              {window.location.href}
            </div>

            {/* Theme subtle decorative elements */}
            <div className="theme-elements">
              <div className="theme-leaf"></div>
              <div className="theme-leaf"></div>
              <div className="theme-leaf"></div>
              <div className="theme-wave"></div>
            </div>

            {/* Sticky header - appears when scrolled */}
            <header className={`sticky-header ${isScrolled ? "visible" : ""}`}>
              <h1 className="text-center text-glow font-trojan w-full">
                ⚜ Ronit Shah ⚜
              </h1>
            </header>

            {/* Main Content */}
            <main
              ref={mainRef}
              className="scroll-container-no-nav overflow-auto"
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <section className="hero-section">
                        <div className="container mx-auto text-center pt-32 relative z-10">
                          <div className="decorative-corner"></div>
                          <div className="decorative-corner"></div>
                          <div className="decorative-corner"></div>
                          <div className="decorative-corner"></div>
                          <div className="flex justify-center mb-8 mt-8 relative z-20">
                            <img
                              src="./profile2.png"
                              alt="Profile"
                              className="rounded-full border-4 border-accent-1 shadow-lg w-36 h-36 object-cover relative"
                              style={{
                                boxShadow:
                                  "0 0 0 4px #7e4e31, 0 0 0 8px rgba(139, 69, 19, 0.3), 0 5px 15px rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <h1 className="font-trojan text-glow mb-6 hero-title text-center">
                            ⚜ Ronit Shah ⚜
                          </h1>
                          <p className="text-xl mb-10 max-w-2xl mx-auto animated-gradient p-6 rounded-lg shadow-sm">
                            Crafting games from the ground up. C++ enthusiast
                            building engines, exploring graphics, and diving
                            deep into system internals. I use Arch btw.
                          </p>
                          <div className="flex justify-center space-x-6 flex-wrap gap-4 mt-4">
                            <Link to="/projects" className="submit-button">
                              View Projects
                            </Link>
                            <Link to="/blog" className="submit-button">
                              Blog
                            </Link>
                            <Link to="/contact" className="submit-button">
                              Get in Touch
                            </Link>
                          </div>

                          <div
                            className="scroll-indicator-container mt-8"
                            onClick={scrollDown}
                          >
                            <div className="scroll-indicator">
                              <div className="scroll-arrow"></div>
                              <div className="scroll-arrow"></div>
                              <div className="scroll-arrow"></div>
                            </div>
                          </div>
                        </div>
                      </section>

                      <div className="mythical-divider mx-auto w-3/4"></div>

                      <section className="section">
                        <div className="container mx-auto">
                          <h2 className="section-title text-center text-glow">
                            Featured Projects
                          </h2>
                          <div className="project-grid">
                            <div className="project-card">
                              <div className="project-content">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-trojan">
                                    Game Engine
                                  </h3>
                                  <a
                                    href="https://github.com/Ronit9320/game-engine"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                  >
                                    <svg
                                      className="w-6 h-6"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p className="mb-4">
                                  Custom game engine with focus on low-level
                                  optimization and memory management. Designed
                                  for maximum performance with minimal resource
                                  usage.
                                </p>
                                <div className="project-tags">
                                  <span className="project-tag">C++</span>
                                  <span className="project-tag">OpenGL</span>
                                  <span className="project-tag">
                                    Custom Memory Allocator
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-card">
                              <div className="project-content">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-trojan">
                                    The Last Crusade
                                  </h3>
                                  <a
                                    href="https://github.com/Ronit9320/the-last-crusade"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                  >
                                    <svg
                                      className="w-6 h-6"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p className="mb-4">
                                  A game featuring immersive gameplay and modern
                                  graphics. Built with a custom rendering
                                  pipeline and physics system.
                                </p>
                                <div className="project-tags">
                                  <span className="project-tag">C++</span>
                                  <span className="project-tag">OpenGL</span>
                                  <span className="project-tag">SDL3</span>
                                </div>
                              </div>
                            </div>
                            <div className="project-card">
                              <div className="project-content">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-trojan">
                                    CMake Generator CLI
                                  </h3>
                                  <a
                                    href="https://github.com/Ronit9320/CMake-gen-CLI"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                  >
                                    <svg
                                      className="w-6 h-6"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <p className="mb-4">
                                  Command-line tool for automatically generating
                                  CMake project structures. Streamlines project
                                  setup and build configuration management.
                                </p>
                                <div className="project-tags">
                                  <span className="project-tag">C++</span>
                                  <span className="project-tag">CMake</span>
                                  <span className="project-tag">
                                    CLI Development
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-8">
                            <Link to="/projects" className="submit-button">
                              View All Projects
                            </Link>
                          </div>
                        </div>
                      </section>

                      <div className="mythical-divider mx-auto w-3/4"></div>

                      <section className="section">
                        <div className="container mx-auto">
                          <h2 className="section-title text-center text-glow">
                            Latest Blog Posts
                          </h2>
                          <div className="blog-preview">
                            <div className="blog-card">
                              <div className="p-6">
                                <div className="blog-date">May 2, 2025</div>
                                <h3 className="text-xl font-trojan mb-2">
                                  Welcome to My Blog
                                </h3>
                                <p className="blog-excerpt">
                                  Join me as I share insights from my journey in
                                  game development and programming. I'll be
                                  documenting my experiences, learnings, and
                                  thoughts on various aspects of software
                                  development and game creation...
                                </p>
                                <Link
                                  to="/blog"
                                  className="fancy-link inline-block mt-4 font-semibold"
                                >
                                  Read More
                                </Link>
                              </div>
                            </div>
                            <div className="blog-card bg-gradient-to-br from-autumn-50 to-forest-50">
                              <div className="p-6 flex flex-col items-center justify-center h-full">
                                <h3 className="text-xl font-trojan mb-4 text-forest-700">
                                  More Posts Coming Soon
                                </h3>
                                <p className="text-forest-600 text-center">
                                  Upcoming articles about game development,
                                  programming insights, project updates, and my
                                  experiences with open source contributions.
                                  Follow me on X for regular updates.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-8">
                            <Link to="/blog" className="submit-button">
                              Visit Blog
                            </Link>
                          </div>
                        </div>
                      </section>

                      <div className="mythical-divider mx-auto w-3/4"></div>

                      <section className="section">
                        <div className="container mx-auto">
                          <h2 className="section-title text-center text-glow">
                            Get In Touch
                          </h2>
                          <div className="max-w-2xl mx-auto mythical-border">
                            <p className="mb-6 text-center">
                              Interested in collaborating or discussing my work?
                              Feel free to reach out.
                            </p>
                            <Link
                              to="/contact"
                              className="submit-button block mx-auto text-center w-fit"
                            >
                              Contact Me
                            </Link>
                          </div>
                        </div>
                      </section>
                    </>
                  }
                />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/new" element={<BlogEditor />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="footer-wrapper">
              <div className="container mx-auto">
                <div className="footer-content">
                  <div className="footer-links flex justify-center space-x-4">
                    <Link to="/" className="footer-link">
                      Home
                    </Link>
                    <Link to="/projects" className="footer-link">
                      Projects
                    </Link>
                    <Link to="/blog" className="footer-link">
                      Blog
                    </Link>
                    <Link to="/about" className="footer-link">
                      About
                    </Link>
                    <Link to="/contact" className="footer-link">
                      Contact
                    </Link>
                  </div>
                  <p className="footer-copyright text-xs text-center">
                    © {new Date().getFullYear()} Ronit Shah. All rights
                    reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
