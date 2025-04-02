export interface Author {
    name: string;
    id: string;
    bio?: string;
    profile_image?: string;
    linkedin_url?: string;
  }
  
  export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    author: Author;
    header_image: string;
    tags: string[];
    published: boolean;
  }
  
  export interface BlogArchive {
    [key: string]: BlogPost[];
  }