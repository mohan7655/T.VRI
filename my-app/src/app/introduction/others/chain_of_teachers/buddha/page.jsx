import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { getPostData, getSlugsForCategory } from "@/lib/posts";
import { Typography, Box, Paper, Container, Grid } from "@mui/material";
import MdxContent from "@/app/components/mdxcontent";
import { TextBoxContainer } from "@/app/components/components";
import TableOfContents from "@/app/components/table_of_contents";
import { blue } from "@mui/material/colors";
import remarkGfm from "remark-gfm";

// --- 2. This is getStaticPaths ---
export async function generateStaticParams() {
  const paths = getSlugsForCategory(CATEGORY);
  return paths.map((p) => p.params);
}

// --- 3. This is getStaticProps ---
export default async function PostPage({ params }) {
  const filePath = path.join(
    process.cwd(),
    "src/content/buddha/life_of_the_buddha.mdx"
  );

  const fileContent = fs.readFileSync(filePath, "utf8");

  const mdxSource = await serialize(fileContent, {
    mdxOptions: {
      remarkPlugins: [[remarkGfm]],
    },
  });
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Life of The Buddha
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
          <MdxContent source={mdxSource} />
        </Box>
        <TableOfContents />
      </Box>
    </>
  );
}
