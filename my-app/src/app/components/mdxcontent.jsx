"use client";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MDXRemote } from "next-mdx-remote";
import {
  ContainerDivider,
  StyledLink,
  Text,
  TextBoxContainer,
  Verses,
} from "./components";

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
  a: (props) => {
    const isInternalLink = props.href && props.href.startsWith("/");
    if (isInternalLink) {
      return <StyledLink {...props} />;
    } else {
      return (
        <StyledLink target="_blank" rel="noopener noreferrer" {...props} />
      );
    }
  },

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
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "120vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={`/assets/${props.src}`}
        sx={{
          position: "relative",
          width: "auto",
          maxWidth: "100%",
          height: "auto",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />

      {/* 2. Caption/Alt Text (MUI Typography) */}
      {props.alt && (
        <Typography
          variant="caption" // Use a small, standard typography variant
          sx={{
            width: "100%",
            mt: 1,
            color: "text.secondary", // Faint secondary color for caption
            textAlign: "center",
            // CRITICAL: Set height to auto so it doesn't fight the 60vh parent
            height: "auto",
          }}
        >
          {props.alt}
        </Typography>
      )}
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
  Verses,
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
