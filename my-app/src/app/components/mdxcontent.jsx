"use client";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import {
  Typography,
  Button,
  Box,
  Grid,
  Link,
  Divider,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
} from "@mui/material";
import {
  ContainerDivider,
  StyledLink,
  Text,
  TextBoxContainer,
} from "./components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";
import remarkFootnotes from "remark-footnotes";
import rehypeSlug from "rehype-slug";
import { CldImage } from "next-cloudinary";

// Helper function to create URL-friendly IDs
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

// CodeBlock component for syntax highlighting
const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace("language-", "") : "text";

  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{ borderRadius: "8px", margin: "1rem 0" }}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};

// Map all the components you want to use in MDX
const muiComponents = {
  h1: (props) => {
    const id = slugify(props.children);
    return <Typography variant="h1" gutterBottom id={id} {...props} />;
  },
  h2: (props) => {
    const id = slugify(props.children);
    return (
      <Typography
        variant="h2"
        gutterBottom
        id={id}
        sx={{ scrollMarginTop: "100px", pl: "-2rem" }}
        {...props}
      />
    );
  },
  h3: (props) => {
    const id = slugify(props.children);
    return (
      <Typography
        variant="h3"
        gutterBottom
        id={id}
        sx={{
          scrollMarginTop: "100px",
          pl: "-1",
         
        }}
        {...props}
      />
    );
  },
  h4: (props) => {
    const id = slugify(props.children);
    return (
      <Typography
        variant="h4"
        gutterBottom
        id={id}
        sx={{
          scrollMarginTop: "100px",
          pl: "0.5rem",
         
        }}
        {...props}
      />
    );
  },
  h5: (props) => {
    const id = slugify(props.children);
    return (
      <Typography
        variant="h5"
        gutterBottom
        id={id}
        sx={{ scrollMarginTop: "100px", pl: "1.7rem" }}
        {...props}
      />
    );
  },
  h6: (props) => {
    const id = slugify(props.children);
    return (
      <Typography
        variant="h6"
        gutterBottom
        id={id}
        sx={{ scrollMarginTop: "100px", pl: "3rem" }}
        {...props}
      />
    );
  },
  //change if internal then no blank
  p: (props) => <Text variant="body1" {...props} />,
  a: (props) => <StyledLink target="_blank" {...props} />,
  hr: (props) => (
    <Divider
      sx={{
        margin: "2rem 5rem 2rem 5rem",
        borderColor: "secondary",
        borderBottomWidth: 2,
      }}
      {...props}
    />
  ),
  ul: (props) => (
    <Box
      component="ul"
      sx={{
        paddingLeft: { xs: "2rem", sm: "5rem" },
      }}
      {...props}
    />
  ),
  ol: (props) => (
    <Box
      component="ol"
      sx={{
        paddingLeft: { xs: "2rem", sm: "5rem" },
      }}
      {...props}
    />
  ),
  tr: (props) => (
    <tr
      style={{
        margin: "2rem",
        padding: "2rem",
        // color: "#fbfa",
      }}
      {...props}
    />
  ),
  img: (props) => (
    <Box
      sx={{
        my: 2,
        position: "relative",
        // backgroundColor:black[300],
        width: "100%",
        // maxWidth: "100%",
        height: "60vh",
        // paddingBottom: "56.25%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CldImage
        src={props.src}
        alt={props.alt || ""}
        fill={true}
        // width={960}
        // height={400}
        sizes="100vw"
        style={{ objectFit: "contain" }}
        // sx={{ objectFit: "contain" }}
        crossOrigin="anonymous"
      />
    </Box>
  ),
  pre: ({ children }) => <>{children}</>,
  Box: Box,
  Grid: Grid,
  TextBoxContainer,
  MyButton: (props) => (
    <Button variant="contained" color="primary" {...props} />
  ),
  Divider: ContainerDivider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
};

export default function MdxContent({ source }) {
  return <MDXRemote {...source} components={muiComponents} />;
}
