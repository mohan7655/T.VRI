import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src', 'content');
const INDEX_FILE = path.join(process.cwd(), 'public', 'search-index.json');

let searchIndex = [];

/**
 * Extract meaningful content snippets from markdown
 * IMPORTANT: Keep names and actual content intact!
 */
function extractContentSnippets(content) {
  // Remove code blocks (they rarely contain names)
  let cleaned = content.replace(/```[\s\S]*?```/g, ' ');
  
  // Remove inline code (FIXED THE REGEX)
  cleaned = cleaned.replace(/`[^`]+`/g, ' ');
  
  // Remove images
  cleaned = cleaned.replace(/!\[.*?\]\(.*?\)/g, ' ');
  
  // Remove links but keep text (names might be in links!)
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  
  // Remove headers symbols but keep text (names might be in headers!)
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');
  
  // Remove HTML tags but keep content
  cleaned = cleaned.replace(/<[^>]+>/g, ' ');
  
  // Remove extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

/**
 * Extract headings for better search context
 */
function extractHeadings(content) {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1].trim());
  }
  
  return headings.join(' ');
}

/**
 * Generate a better excerpt from content
 */
function generateExcerpt(content, maxLength = 150) {
  const cleaned = extractContentSnippets(content);
  
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  
  // Try to break at sentence
  const truncated = cleaned.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastPeriod > maxLength * 0.7) {
    return truncated.substring(0, lastPeriod + 1);
  } else if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Recursively traverses the directory structure to find MDX files.
 */
function traverseDir(currentDir, currentPath = '') {
  const entries = fs.readdirSync(currentDir);
  
  entries.forEach(entry => {
    const fullPath = path.join(currentDir, entry);
    const relativePath = path.join(currentPath, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      traverseDir(fullPath, relativePath);
    } else if (/\.mdx?$/.test(entry)) {
      const slug = relativePath.replace(/\.mdx?$/, '').replace(/\\/g, '/'); // Normalize path separators
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Extract category from path
      const pathParts = relativePath.split(path.sep);
      const category = pathParts.length > 1 ? pathParts[0] : 'Uncategorized';
      
      // Clean and prepare content
      const cleanContent = extractContentSnippets(content);
      const headings = extractHeadings(content);
      const excerpt = generateExcerpt(cleanContent);
      
      // INDEX THE FULL BODY CONTENT - Don't truncate!
      // This is crucial for finding names and specific terms
      searchIndex.push({
        slug: slug,
        title: data.title || data.description || slug.split('/').pop(),
        excerpt: excerpt,
        body: cleanContent, // FULL body content for searching names
        headings: headings,
      });
    }
  });
}

/**
 * Build and save the search index
 */
export function buildSearchIndex() {
  searchIndex = [];
  traverseDir(POSTS_DIR);
  
  // Save the final index to the public folder
  fs.writeFileSync(INDEX_FILE, JSON.stringify(searchIndex, null, 2));
  console.log(`[Search Index] Built index with ${searchIndex.length} entries.`);
  
  return searchIndex;
}

// Execute the function immediately upon import/run
buildSearchIndex();