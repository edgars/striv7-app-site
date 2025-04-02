import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Clock } from 'lucide-react';
import { getAllPosts, getMonthlyArchive } from '../lib/blog';
import type { BlogPost } from '../types/blog';
import SEO from '../components/SEO';

interface BlogListProps {
  darkMode: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ darkMode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [posts, searchQuery]);

  // Get recent posts (last 5)
  const recentPosts = useMemo(() => posts.slice(0, 5), [posts]);

  // Get monthly archive
  const archivePosts = useMemo(() => getMonthlyArchive(posts), [posts]);

  // Get featured post (most recent)
  const featuredPost = useMemo(() => posts[0], [posts]);

  if (loading) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-sb-green border-t-transparent rounded-full" />
          <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Blog"
        description="Read our latest articles about API development, security, and best practices."
        type="website"
        image={featuredPost?.header_image}
      />
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Blog Posts
                </h1>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg ${
                      darkMode 
                        ? 'bg-sb-dark border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } border focus:outline-none focus:ring-2 focus:ring-sb-green`}
                  />
                  <Search className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              </div>

              <div className="grid gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className={`${
                      darkMode ? 'bg-sb-dark border-gray-800' : 'bg-white border-gray-200'
                    } border rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]`}
                  >
                    <Link to={`/blog/${post.slug}`} className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative h-48 md:h-auto">
                        <img
                          src={post.header_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            <time className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-2">
                            {post.author.profile_image && (
                              <img
                                src={post.author.profile_image}
                                alt={post.author.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            )}
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {post.author.name}
                            </span>
                          </div>
                        </div>
                        <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {post.title}
                        </h2>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-1 rounded-full ${
                                darkMode
                                  ? 'bg-sb-slate text-gray-300'
                                  : 'bg-gray-200 text-gray-800'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      No blog posts found.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-8">
              {/* Recent Posts */}
              <div className={`${darkMode ? 'bg-sb-dark border-gray-800' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Clock className="h-5 w-5" />
                  Recent Posts
                </h2>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <h3 className={`text-sm font-medium group-hover:text-sb-green transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {post.title}
                      </h3>
                      <time className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Archive */}
              <div className={`${darkMode ? 'bg-sb-dark border-gray-800' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Archive
                </h2>
                <div className="space-y-2">
                  {Object.entries(archivePosts).map(([monthYear, posts]) => (
                    <div key={monthYear} className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {monthYear}
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        ({posts.length})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;