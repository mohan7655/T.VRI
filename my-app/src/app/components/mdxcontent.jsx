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
import { ContainerDivider, Text, TextBoxContainer } from "./components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";
import remarkFootnotes from "remark-footnotes";
import rehypeSlug from "rehype-slug";

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
        sx={{ scrollMarginTop: "100px" }}
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
        sx={{ scrollMarginTop: "100px" }}
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
        sx={{ scrollMarginTop: "100px" }}
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
        sx={{ scrollMarginTop: "100px" }}
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
        sx={{ scrollMarginTop: "100px" }}
        {...props}
      />
    );
  },
  p: (props) => <Text variant="body1" {...props} />,
  a: (props) => <Link target="_blank" {...props} />,

  ul: (props) => (
    <ul
      style={{
        paddingLeft: "5rem",
      }}
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      style={{
        paddingLeft: "5rem",
      }}
      {...props}
    />
  ),
  img: (props) => (
    <Box sx={{ my: 2, position: "relative", width: "100%", height: "400px" }}>
      <Image
        src={props.src}
        alt={props.alt || ""}
        layout="fill"
        objectFit="cover"
      />
    </Box>
  ),
  code: ({ className, children, ...props }) => {
    if (!className) {
      return (
        <code
          style={{
            background: "#f5f5f5",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.9em",
            fontFamily: "monospace",
          }}
          {...props}
        >
          {children}
        </code>
      );
    }
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
  pre: ({ children }) => <>{children}</>,
  CodeBlock: CodeBlock,
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
