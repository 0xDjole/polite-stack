import axios from 'axios';
import type { WPPost, WPPage } from './types.js';

export async function getPosts(endpoint: string, options = {}) {
  try {
    const params = {
      _embed: 'wp:featuredmedia,author,wp:term',
      ...options,
    };

    const response = await axios.get(`${endpoint}/wp/v2/posts`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(endpoint: string, slug: string) {
  try {
    const posts = await getPosts(endpoint, { slug });
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post: ${slug}`, error);
    return null;
  }
}

export async function getPages(endpoint: string, options = {}) {
  try {
    const params = {
      _embed: 'wp:featuredmedia',
      ...options,
    };

    const response = await axios.get(`${endpoint}/wp/v2/pages`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function getPage(endpoint: string, slug: string) {
  try {
    const pages = await getPages(endpoint, { slug });
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`Error fetching page: ${slug}`, error);
    return null;
  }
}

export function getFeaturedImage(post: WPPost | WPPage) {
  if (post._embedded?.['wp:featuredmedia']?.[0]) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

export function getCategories(post: WPPost) {
  const terms = post._embedded?.['wp:term'] || [];
  return terms[0]?.filter((term) => term.taxonomy === 'category') || [];
}

export function getTags(post: WPPost) {
  const terms = post._embedded?.['wp:term'] || [];
  return terms[1]?.filter((term) => term.taxonomy === 'post_tag') || [];
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
