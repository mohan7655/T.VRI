import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src", "content");

/**
 * Recursively scans folders to build the navigation tree
 */
function buildTreeRecursive(directory, baseUrl) {
  const items = fs.readdirSync(directory);
  const tree = [];

  for (const item of items) {
    if (item.startsWith(".")) continue;

    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);
    const relativePath = path
      .relative(contentDirectory, itemPath)
      .replace(/\\/g, "/");
    const url = `/${relativePath.replace(/\.mdx$/, "")}`;

    if (stat.isDirectory()) {
      // --- FOLDER ---
      let title = item;
      const indexPath = path.join(itemPath, "_index.mdx");
      if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, "utf8");
        title = matter(indexContent).data.title || title;
      }

      tree.push({
        id: item,
        label: title,
        children: buildTreeRecursive(itemPath, baseUrl),
        originalName: item,
      });
    } else if (item.endsWith(".mdx") && item !== "_index.mdx") {
      // --- FILE ---
      const fileContents = fs.readFileSync(itemPath, "utf8");
      const { data } = matter(fileContents);
      const slug = item.replace(/\.mdx$/, "");
      const isExternal = !!data.external_url;
      const href = isExternal ? data.external_url : url;
      tree.push({
        id: slug,
        label: data.title || data.description || slug, // Use title first
        href: href, // Use the external or internal href
        external: isExternal,
        originalName: item,
      });
    }
  }

  return tree.sort((a, b) => {
    return a.originalName.localeCompare(b.originalName);
  });
}

/**
 * Main function to build the top-level categories
 */
export function getNavigationTree() {
  const menuData = [
    {
      id: "vri",
      text: "VRI",
      icon: "vri",
      tree: buildTreeRecursive(path.join(contentDirectory, "vri"), "/vri"),
    },
    {
      id: "vipassana",
      text: "Vipassana",
      icon: "vipassana",
      tree: buildTreeRecursive(
        path.join(contentDirectory, "introduction"),
        "/introduction"
      ),
    },
    {
      id: "anapana",
      text: "Anapana",
      icon: "anapana",
      tree: buildTreeRecursive(
        path.join(contentDirectory, "anapana"),
        "/anapana"
      ),
    },
    {
      id: "courses",
      text: "Courses",
      icon: "courses",
      tree: buildTreeRecursive(
        path.join(contentDirectory, "courses"),
        "/courses"
      ),
    },
    {
      id: "centers",
      text: "Centers",
      icon: "centers",
      tree: buildTreeRecursive(
        path.join(contentDirectory, "centers"),
        "/centers"
      ),
    },
    
    {
      id: "resources",
      text: "Resources",
      icon: "resources",
      tree: buildTreeRecursive(
        path.join(contentDirectory, "resources"),
        "/resources"
      ),
    },
    // {
    //   id: "oldstudent",
    //   text: "Old Students",
    //   icon: "old",
    //   tree: buildTreeRecursive(
    //     path.join(contentDirectory, "oldstudents"),
    //     "/oldstudents"
    //   ),
    // },
    {
      id: "donations",
      text: "Donations",
      icon: "donations",
      tree: buildTreeRecursive(
        path.join(contentDirectory, "donations"),
        "/donations"
      ),
    },
    {
      id: "books",
      text: "Books",
      icon: "store",
      tree: buildTreeRecursive(path.join(contentDirectory, "books"), "/books"),
    },
  ];

  return menuData;
}

/**
 * Helper function for generateStaticParams
 */
export async function getAllPostPaths(baseCategory) {
  const paths = [];
  const startDir = path.join(contentDirectory, baseCategory);

  function findPathsRecursive(directory) {
    const items = fs.readdirSync(directory);

    for (const item of items) {
      if (item.startsWith(".")) continue;

      const itemPath = path.join(directory, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Check if folder has an _index.mdx
        const indexPath = path.join(itemPath, "_index.mdx");
        if (fs.existsSync(indexPath)) {
          const relativePath = path
            .relative(startDir, itemPath)
            .replace(/\\/g, "/");
          paths.push({
            slug: relativePath.split("/"),
          });
        }
        findPathsRecursive(itemPath);
      } else if (item.endsWith(".mdx") && item !== "_index.mdx") {
        // This is a post file
        const relativePath = path
          .relative(startDir, itemPath)
          .replace(/\\/g, "/")
          .replace(/\.mdx$/, "");

        paths.push({
          slug: relativePath.split("/"),
        });
      }
    }
  }

  findPathsRecursive(startDir);
  return paths;
}
