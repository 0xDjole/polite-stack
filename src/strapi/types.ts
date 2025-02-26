export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        thumbnail?: {
          url: string;
        };
        small?: {
          url: string;
        };
        medium?: {
          url: string;
        };
        large?: {
          url: string;
        };
      };
      url: string;
    };
  };
}

export interface StrapiRelation<T> {
  data: T[];
}

export interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiTag {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiAuthor {
  id: number;
  attributes: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiPostAttributes {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage: StrapiMedia;
  categories: {
    data: StrapiCategory[];
  };
  tags: {
    data: StrapiTag[];
  };
  author: {
    data: StrapiAuthor;
  };
}

export interface StrapiPageAttributes {
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage: StrapiMedia;
}

export interface StrapiPost {
  id: number;
  attributes: StrapiPostAttributes;
}

export interface StrapiPage {
  id: number;
  attributes: StrapiPageAttributes;
}
