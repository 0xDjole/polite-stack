# Polite Stack

A headless WordPress integration for Astro.

## Features

- WordPress REST API integration
- Reusable Astro components
- TypeScript support
- Easy to use with minimal configuration

## Installation

```bash
npm install polite-stack
```

## Usage

```astro
---
// src/pages/index.astro
import Layout from "../layouts/Layout.astro";
import { wordpress } from "polite-stack";

// Access components through the wordpress namespace
const { Posts } = wordpress.components;

// WordPress API URL
const WP_API = "http://your-wordpress-site.com/wp-json";

// Fetch posts
const posts = await wordpress.getPosts(WP_API, { per_page: 6 });
---
<Layout title="WordPress Blog">
  <main>
    <h1>Latest Posts</h1>
    <Posts posts={posts} columns={3} />
  </main>
</Layout>
```

## API

### WordPress API

- `getPosts(endpoint, options)` - Fetch posts with options
- `getPost(endpoint, slug)` - Fetch a single post by slug
- `getPages(endpoint, options)` - Fetch pages with options
- `getPage(endpoint, slug)` - Fetch a single page by slug
- `getFeaturedImage(post)` - Get the featured image URL from a post
- `getCategories(post)` - Get categories from a post
- `getTags(post)` - Get tags from a post
- `formatDate(dateString)` - Format a date string

### Components

- `Post` - Renders a single post
- `Posts` - Renders a grid of posts
- `Page` - Renders a single page

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## License

MIT
