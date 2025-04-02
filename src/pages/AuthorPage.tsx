import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllPosts } from '../lib/blog';
import type { Author, BlogPost } from '../types/blog';
import { Calendar, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import AuthorCard from '../components/AuthorCard';

interface AuthorPageProps {
  darkMode: boolean;
}

const AuthorPage: React.FC<AuthorPageProps> = ({ darkMode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorAndPosts = async () => {
      if (!id) {
        navigate('/404');
        return;
      }

      try {
        // Fetch all posts and filter by author
        const allPosts = await getAllPosts();
        const authorPosts = allPosts.filter(post => post.author.id === id);

        if (authorPosts.length === 0) {
          navigate('/404');
          return;
        }

        // Get author info from the first post
        setAuthor(authorPosts[0].author);
        setPosts(authorPosts);
      } catch (err) {
        console.error('Error fetching author data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorAndPosts();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
          <Loader2 className={`h-8 w-8 animate-spin ${darkMode ? 'text-white' : 'text-gray-900'}`} />
          <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading author profile...</p>
        </div>
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            {error || 'Author not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${author.name} - Author Profile`}
        description={author.bio || `Read articles written by ${author.name}`}
        image={author.profile_image}
        type="profile"
      />
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Author Card */}
          <div className="mb-12">
            <AuthorCard author={author} darkMode={darkMode} showLink={false} />
          </div>

          {/* Author's Posts */}
          <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Articles by {author.name}
          </h2>

          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className={`${
                  darkMode ? 'bg-sb-dark border-gray-800' : 'bg-white border-gray-200'
                } border rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]`}
              >
                <a href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.header_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-sb-dark' : 'bg-gradient-to-t from-white'} opacity-60`}></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm mb-4">
                      <Calendar className="h-4 w-4" />
                      <time className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </h3>
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
                </a>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No published articles yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthorPage;