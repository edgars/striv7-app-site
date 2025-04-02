import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '../lib/blog';
import type { BlogPost } from '../types/blog';
import { Calendar, User } from 'lucide-react';
import AuthorCard from '../components/AuthorCard';
import SEO from '../components/SEO';

interface BlogPostPageProps {
  darkMode: boolean;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ darkMode }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate('/404');
        return;
      }

      try {
        const postData = await getPostBySlug(slug);
        if (!postData) {
          navigate('/404');
          return;
        }

        setPost(postData);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-sb-green border-t-transparent rounded-full" />
          <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            {error || 'Post not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.header_image}
        type="article"
        publishedAt={post.date}
        author={post.author.name}
        keywords={post.tags}
      />
      <div className={`min-h-screen ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px] w-full">
          <img
            src={post.header_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-sb-darker via-sb-darker/80' : 'bg-gradient-to-t from-white via-black/50 to-transparent'}`}></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-white" />
                  <time className="text-white">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-white" />
                  <Link 
                    to={`/author/${post.author.id}`}
                    className="text-white hover:text-sb-green transition-colors duration-200"
                  >
                    {post.author.name}
                  </Link>
                </div>
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
                {post.title}
              </h1>
              <p className={`text-xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
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
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Author Section */}
          <div className={`mt-16 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              About the Author
            </h2>
            <AuthorCard 
              author={post.author} 
              darkMode={darkMode}
              showLink={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;