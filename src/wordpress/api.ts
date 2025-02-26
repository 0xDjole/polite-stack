import axios from 'axios';
import type { WPPost, WPPage } from './types.js';

export async function getPages(endpoint: string, options = {}) {
  try {
    const params = {
      _embed: 'wp:featuredmedia',
      ...options,
    };

    const response = await axios.get(`${endpoint}/wp/v2/pages`, { params });

    console.log('evoo me', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function getPage(endpoint: string, id: number) {
  try {
    const response = await axios.get(`${endpoint}/wp/v2/pages/${id}`, {
      params: {
        _embed: 'wp:featuredmedia',
        acf_format: 'standard',
      },
    });
    console.log('Page response:', response.data);
    return response.data;
  } catch (error) {
    //console.error(`Error fetching page with ID ${id}:`, error);
    return null;
  }
}

export function getFeaturedImage(post: WPPost | WPPage) {
  if (post?._embedded?.['wp:featuredmedia']?.[0]) {
    console.log(post._embedded?.['wp:featuredmedia']?.[0]?.source_url);
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
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

// Updated getImage function that accepts postId and fieldName
export async function getImage(endpoint: string, postId, fieldName) {
  try {
    let content = await getPost(endpoint, postId);
    console.log('cont', content);

    // Extract the image using the existing logic
    const imageField = content?.acf?.[fieldName];
    if (!imageField) {
      return null;
    }

    console.log('i', imageField);

    if (typeof imageField === 'string') {
      return imageField;
    }

    if (typeof imageField === 'object') {
      if (imageField.url) {
        return imageField.url;
      }
      if (imageField.sizes) {
        return (
          imageField.sizes.large ||
          imageField.sizes.medium ||
          imageField.sizes.full ||
          imageField.url
        );
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

export async function getPosts(endpoint: string, options = {}) {
  try {
    const params = {
      _embed: 'wp:featuredmedia,author,wp:term',
      acf_format: 'standard',
      ...options,
    };
    const response = await axios.get(`${endpoint}/wp/v2/posts`, { params });
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getPost(endpoint: string, id: number) {
  try {
    const response = await axios.get(`${endpoint}/wp/v2/posts/${id}`, {
      params: {
        _embed: 'wp:featuredmedia',
        acf_format: 'standard',
      },
    });

    console.log('reee', response.data);

    return response.data;
  } catch (error) {
    return null;
  }
}
