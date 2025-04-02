import { promises as fs } from 'fs';
import path from 'path';
import matter from 'front-matter';
import type { BlogPost, BlogFrontMatter } from '../src/types/blog';

const BLOG_DIR = 'content/blog';
const OUTPUT_FILE = 'src/data/blog-posts.json';

async function buildBlogData() {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async file => {
          const content = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8');
          const { attributes, body } = matter<BlogFrontMatter>(content);
          const slug = file.replace(/\.md$/, '');

          return {
            slug,
            title: attributes.title,
            date: attributes.date,
            excerpt: attributes.excerpt,
            content: body,
            author: attributes.author,
            header_image: attributes.header_image,
            tags: attributes.tags,
            published: attributes.published,
          };
        })
    );

    const publishedPosts = posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    await fs.mkdir('src/data', { recursive: true });
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(publishedPosts, null, 2));
    console.log(`Blog data written to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error building blog data:', error);
    process.exit(1);
  }
}

buildBlogData();