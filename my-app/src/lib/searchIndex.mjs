import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import FlexSearch from 'flexsearch';

const POSTS_DIR = path.join(process.cwd(), 'src', 'content');
const INDEX_FILE = path.join(process.cwd(), 'public', 'search-index.json');
const FLEXSEARCH_INDEX_FILE = path.join(process.cwd(), 'public', 'flexsearch-index.json');

let searchIndex = [];


/**
 * Normalize Pali text - remove diacritics for search matching
 */
function normalizePali(text) {
  if (!text) return '';
  
  return text
    .replace(/ā/g, 'a').replace(/ī/g, 'i').replace(/ū/g, 'u')
    .replace(/ñ/g, 'n').replace(/ṃ/g, 'm').replace(/ṁ/g, 'm')
    .replace(/ṭ/g, 't').replace(/ḍ/g, 'd').replace(/ṇ/g, 'n')
    .replace(/ḷ/g, 'l').replace(/ṛ/g, 'r').replace(/ṝ/g, 'r')
    .replace(/ś/g, 's').replace(/ṣ/g, 's')
    .replace(/Ā/g, 'A').replace(/Ī/g, 'I').replace(/Ū/g, 'U')
    .replace(/Ñ/g, 'N').replace(/Ṃ/g, 'M').replace(/Ṁ/g, 'M')
    .replace(/Ṭ/g, 'T').replace(/Ḍ/g, 'D').replace(/Ṇ/g, 'N')
    .replace(/Ḷ/g, 'L').replace(/Ṛ/g, 'R').replace(/Ṝ/g, 'R')
    .replace(/Ś/g, 'S').replace(/Ṣ/g, 'S');
}

function extractContentSnippets(content) {
  let cleaned = content.replace(/```[\s\S]*?```/g, ' ');
  cleaned = cleaned.replace(/`[^`]+`/g, ' ');
  cleaned = cleaned.replace(/!\[.*?\]\(.*?\)/g, ' ');
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');
  cleaned = cleaned.replace(/<[^>]+>/g, ' ');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/(\*\*|__|\*|_)/g, '');

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
    } else if (/\.mdx?$/.test(entry) && entry !== "_index.mdx") {
      const slug = relativePath.replace(/\.mdx?$/, '').replace(/\\/g, '/');
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const pathParts = relativePath.split(path.sep);
      const category = pathParts.length > 1 ? pathParts[0] : 'Uncategorized';
      
      const cleanContent = extractContentSnippets(content);
      const headings = extractHeadings(content);
      const excerpt = generateExcerpt(cleanContent);
      
      // Normalize for search
      const normalizedTitle = normalizePali(data.title || data.description || slug.split('/').pop());
      const normalizedBody = normalizePali(cleanContent);
      
      searchIndex.push({
        slug: slug,
        title: data.title || data.description || slug.split('/').pop(),
        description: data.description || excerpt,
        excerpt: excerpt,
        body: cleanContent,
        titleNormalized: normalizedTitle,
        bodyNormalized: normalizedBody,
        category: data.category || category,
        tags: data.tags || [],
        date: data.date || '',
        author: data.author || '',
      });
    }
  });
}

/**
 * Build and save both the search index AND pre-built FlexSearch index
 */
export function buildSearchIndex() {
  console.log('[Search Index] Starting build...');
  searchIndex = [];
  traverseDir(POSTS_DIR);
  
  // Save the raw data
  fs.writeFileSync(INDEX_FILE, JSON.stringify(searchIndex, null, 2));
  console.log(`[Search Index] Built index with ${searchIndex.length} entries.`);
  
  // Build FlexSearch index
  console.log('[FlexSearch] Building pre-compiled index...');
  const flexIndex = new FlexSearch.Document({
    document: {
      id: "slug",
      index: ["titleNormalized", "bodyNormalized", "category"],
      store: ["slug", "title", "description", "excerpt", "category", "tags", "date", "author","body"]
    },
    tokenize: "forward",
    context: {
      resolution: 5,
      depth: 3
    },
    optimize: true,
    cache: true
  });

  // Add all documents
  searchIndex.forEach((doc) => flexIndex.add(doc));
  
  // Export the index with callback - store in array format
  const exportedData = [];
  flexIndex.export((key, data) => {
    exportedData.push({ key, data });
  });
  
  // Save exported index
  fs.writeFileSync(FLEXSEARCH_INDEX_FILE, JSON.stringify(exportedData));
  console.log('[FlexSearch] Pre-compiled index saved! Search will be instant.');
  
  return searchIndex;
}

buildSearchIndex();