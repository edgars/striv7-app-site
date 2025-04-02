import blogPosts from '../data/blog-posts.json';
import type { BlogPost } from '../types/blog';

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = blogPosts.find(post => post.slug === slug);
  return post || null;
}

export function getMonthlyArchive(posts: BlogPost[]) {
  const archive: Record<string, BlogPost[]> = {};
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

  posts.forEach(post => {
    const date = new Date(post.date);
    if (date >= threeYearsAgo) {
      const monthYear = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long'
      }).format(date);
      
      if (!archive[monthYear]) {
        archive[monthYear] = [];
      }
      archive[monthYear].push(post);
    }
  });

  return archive;
}