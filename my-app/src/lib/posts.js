import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src", "content");

/**
 * Gets the full post data for a single page
 * @param {string[]} slugArray - The array from params.slug
 */
export async function getPostData(slugArray) {
  let postPath;
  
  if (slugArray && slugArray.length > 0) {
    // Build the full path from the slug array
    // e.g., ['introduction', 'chain_of_teachers', 'buddha', 'articles_on_buddha', '01_buddha-the-super-scientist']
    const fullPath = path.join(contentDirectory, ...slugArray);
    
    // 1. First, try as a direct file with .mdx extension
    postPath = `${fullPath}.mdx`;
    
    // 2. If not found, try looking inside as a folder with _index.mdx
    if (!fs.existsSync(postPath)) {
      postPath = path.join(fullPath, "_index.mdx");
    }
  } else {
    // --- This is the Root Index ---
    postPath = path.join(contentDirectory, "introduction", "_index.mdx");
  }
  
  if (!fs.existsSync(postPath)) {
    throw new Error(`Post not found at: ${postPath}\nSlug array: ${JSON.stringify(slugArray)}`);
  }
  
  const fileContents = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(fileContents);
  
  return {
    slug: slugArray ? slugArray.join("/") : "",
    frontmatter: data,
    content,
  };
}