import { getPostData } from "@/lib/posts";
import { getAllPostPaths } from "@/lib/autoNav";
import MdxContent from "@/app/components/mdxcontent";
import TableOfContents from "@/app/components/table_of_contents";
import { Typography, Container, Grid, Box } from "@mui/material";
import { TextBoxContainer } from "@/app/components/components";
import { serialize } from "next-mdx-remote/serialize";
import remarkFootnotes from "remark-footnotes";

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const slugArray = ["resources", ...resolvedParams.slug];

  const { content, frontmatter } = await getPostData(slugArray);

  const hasContent = content && content.trim().length > 0;

  let mdxSource = null;
  if (hasContent) {
    mdxSource = await serialize(content, {
      scope: frontmatter,
      mdxOptions: {
        remarkPlugins: [[remarkFootnotes, { inlineNotes: true }]],
      },
      parseFrontmatter: false,
    });
  }
  const showtoc = frontmatter.showToc !== false;
  return (
    <>
              <Typography variant="h1" gutterBottom sx={{ fontSize:{xs:"2rem",sm: "3.2rem"}, m: "2rem 0 2rem 1rem" }}>
                {frontmatter.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection:{xs:"column",sm:"row-reverse"},
                  gap: "2rem",
                }}
              >
                {showtoc ? <TableOfContents /> : null}
                <Box
                  sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    
                  }}
                >
                  {hasContent ? (
                    <MdxContent source={mdxSource} />
                  ) : (
                    <Typography>No content available</Typography>
                  )}
                </Box>
                
              </Box>
            </>
  );
}

export async function generateStaticParams() {
  const paths = await getAllPostPaths("resources");

  return paths.map((p) => ({
    slug: p.slug.map((segment) => segment.replace(/\.mdx$/, "")),
  }));
}
