"use client";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

import { Link } from "@mui/material";
"use client";

// Layout & Components

// TreeView (from @mui/x-tree-view)

// Icons

import { Search } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaymentIcon from "@mui/icons-material/Payment";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { CenterIcon, DhammaIcon, VipassanaIcon } from "../customicons";

const drawerWidth = "75vw";



const renderTree = ({ nodes }) => {
  const childrenCount = nodes.children ? nodes.children.length : 0;

  const labelContent = (
    <Box sx={{ display: "flex", alignItems: "center", pr: 0 }}>
      <Typography variant="body1" sx={{ flexGrow: 1 }}>
        {nodes.label}
      </Typography>

      {childrenCount > 0 && (
        <Typography
          variant="caption"
          sx={{
            ml: 1,
            p: "2px 6px",
            color: "text.secondary",
            fontWeight: "bold",
          }}
        >
          {childrenCount}
        </Typography>
      )}
    </Box>
  );

  if (nodes.href) {
    return (
      <TreeItem
        key={nodes.id}
        sx={{
          [`& .${treeItemClasses.content}`]: { p: 0.5, borderRadius: 4 },
        }}
        itemId={nodes.id}
        label={
          <Link
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: "4px 0",
            }}
            href={nodes.href}
            target={nodes.external ? "_blank" : undefined}
            rel={nodes.external ? "noopener noreferrer" : undefined}
          >
            {nodes.label}
          </Link>
        }
      />
    );
  }
  if (Array.isArray(nodes.children)) {
    return (
      <TreeItem
        key={nodes.id}
        itemId={nodes.id}
        label={labelContent}
        sx={{
          [`& .${treeItemClasses.content}`]: { p: 1, borderRadius: 5 },
        }}
      >
        {nodes.children.map((node) => renderTree(node))}
      </TreeItem>
    );
  }
  return (
    <TreeItem
      key={nodes.id}
      itemId={nodes.id}
      label={nodes.label}
      sx={{
        [`& .${treeItemClasses.content}`]: { p: 0.5, borderRadius: 5 },
      }}
    />
  );
};

export default renderTree;
