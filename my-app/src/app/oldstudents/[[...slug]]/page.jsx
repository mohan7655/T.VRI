import { getPostData } from "@/lib/posts";
import { getAllPostPaths } from "@/lib/autoNav";
import MdxContent from "@/app/components/mdxcontent";
import TableOfContents from "@/app/components/table_of_contents";
import { Typography, Container, Grid, Box } from "@mui/material";
import { TextBoxContainer } from "@/app/components/components";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
export default async function PostPage({ params }) {
  // Your 'await' here is unnecessary, 'params' is a standard object

  const resolvedParams = await params;
  const slugArray = ["oldstudents", ...resolvedParams.slug];

  const { content, frontmatter } = await getPostData(slugArray);

  const hasContent = content && content.trim().length > 0;

  let mdxSource = null;
  if (hasContent) {
    mdxSource = await serialize(content, {
      scope: frontmatter,
      mdxOptions: {
        remarkPlugins: [
          [remarkGfm, { inlineNotes: true, footnoteLabel: "References" }],
        ],
      },
      parseFrontmatter: false,
    });
  }
  const showtoc = frontmatter.showToc !== false;
  return (
    <>
      <Typography variant="h1" gutterBottom sx={{fontSize:"2.7rem", mt: "1rem" }}>
        {frontmatter.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
            p: 2, // A common flexbox fix to prevent content overflow
          }}
        >
          {hasContent ? (
            <MdxContent source={mdxSource} />
          ) : (
            <Typography>No content available</Typography>
          )}
        </Box>
        {showtoc ? <TableOfContents /> : null}
      </Box>
    </>
  );
}

export async function generateStaticParams() {
  const paths = await getAllPostPaths("vri");

  return paths.map((p) => ({
    slug: ["oldstudents", ...p.slug.map((segment) => segment.replace(/\.mdx$/, ""))],
  }));
}
