import { serialize } from "next-mdx-remote/serialize";
import { getPostData, getSlugsForCategory } from "@/lib/posts";
import { Typography, Box, Paper, Container, Grid } from "@mui/material";
import MdxContent from "@/app/components/mdxcontent";
import { TextBoxContainer } from "@/app/components/components";
import TableOfContents from "@/app/components/table_of_contents";
import { blue } from "@mui/material/colors";

import remarkGfm from "remark-gfm";

// --- 1. SET THE CATEGORY FOR THIS ROUTE ---
const CATEGORY = "buddha/incidents_from_the_life_of_the_buddha";

// --- 2. This is getStaticPaths ---
export async function generateStaticParams() {
  const paths = getSlugsForCategory(CATEGORY);
  return paths.map((p) => p.params);
}

// --- 3. This is getStaticProps ---
export default async function PostPage({ params }) {
  const { slug } = await params;
  const { content, frontmatter } = await getPostData(CATEGORY, slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [[remarkGfm, { singleTilde: false }]],
    },
  });

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {frontmatter.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <TextBoxContainer
          sx={{
            flexGrow: 1,
            minWidth: 0,
            p: 2, // A common flexbox fix to prevent content overflow
          }}
        >
          <MdxContent source={mdxSource} />
        </TextBoxContainer>
        <TableOfContents />
      </Box>
    </>
  );
}
