"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { TextBoxContainer } from "./components";

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Only mount on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extract headings - this runs after mount
  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll("h3, h4, h5, h6"));
      const headingData = elements.map((elem) => ({
        id: elem.id,
        text: elem.textContent,
        level: elem.tagName.toLowerCase(),
      }));
      setHeadings(headingData);
    }, 0);

    return () => clearTimeout(timer);
  }, [isMounted]);

  // Set up intersection observer
  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: 1.0,
      }
    );

    elements.forEach((elem) => {
      intersectionObserver.observe(elem);
    });

    return () => intersectionObserver.disconnect();
  }, [headings]);

  const scrollToHeading = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  if (!isMounted || headings.length === 0) return null;

  return (
    <TextBoxContainer
      sx={{
        py: 1,
        position: { sm: "sticky" },
        top: "10vh",
        maxHeight: "calc(100vh - 150px)",
        overflowY: "auto",
        minWidth: "20vw",
        display: { xs: "none", sm: "block" },
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Table of Contents
      </Typography>
      <List dense disablePadding>
        {headings.map((heading) => (
          <ListItem
            key={heading.id}
            disablePadding
            sx={{
              paddingLeft:
                heading.level === "h3"
                  ? 0
                  : heading.level === "h4"
                  ? "1rem" // 1 rem indent
                  : heading.level === "h5"
                  ? "2rem" // 2 rem indent (1rem + 1rem)
                  : heading.level === "h6"
                  ? "3rem" // 3 rem indent
                  : 0,
            }}
          >
            <ListItemButton
              onClick={() => scrollToHeading(heading.id)}
              sx={{
                py: 0.5,
                px: 1,
                borderRadius: 1,
                borderLeft: activeId === heading.id ? "4px solid" : "none",
                borderColor: "primary.main",
                bgcolor:
                  activeId === heading.id ? "action.selected" : "transparent",
                "&:hover": {
                  bgcolor: "action.hover",
                },
                transition: "all 0.2s ease",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color:
                    activeId === heading.id ? "primary.main" : "text.secondary",
                  fontWeight: activeId === heading.id ? 500 : 300,
                }}
              >
                {heading.text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </TextBoxContainer>
  );
}

// // "use client";
// // import { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   List,
// //   ListItem,
// //   ListItemButton,
// //   Paper,
// // } from "@mui/material";
// // import Link from "next/link";
// // import { TextBoxContainer } from "./components";

// // export default function TableOfContents() {
// //   const [headings, setHeadings] = useState([]);
// //   const [activeId, setActiveId] = useState("");

// //   useEffect(() => {
// //     // Extract all h2 and h3 headings from the page
// //     const elements = Array.from(document.querySelectorAll("h3, h4, h5, h6"));

// //     const headingData = elements.map((elem) => ({
// //       id: elem.id,
// //       text: elem.textContent,
// //       level: elem.tagName.toLowerCase(),
// //     }));

// //     setHeadings(headingData);

// //     // Intersection Observer to track active heading
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             setActiveId(entry.target.id);
// //           }
// //         });
// //       },
// //       {
// //         rootMargin: "0px 0px -60% 0px",
// //         threshold: 1.0,
// //       }
// //     );

// //     elements.forEach((elem) => {
// //       if (elem.id) observer.observe(elem);
// //     });

// //     return () => observer.disconnect();
// //   }, []);

// //   const scrollToHeading = (id) => {
// //     const element = document.getElementById(id);
// //     if (element) {
// //       const yOffset = -80;
// //       const y =
// //         element.getBoundingClientRect().top + window.pageYOffset + yOffset;
// //       window.scrollTo({ top: y, behavior: "smooth" });
// //     }
// //   };

// //   if (headings.length === 0) return null;

// //   return (
// //     <TextBoxContainer
// //       elevation={2}
// //       sx={{
// //         p: 2,
// //         position: "sticky",
// //         top: 100,
// //         maxHeight: "calc(100vh - 120px)",
// //         overflowY: "auto",
// //         minWidth: "20vw",
// //       }}
// //     >
// //       <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
// //         Table of Contents
// //       </Typography>

// //       <List dense disablePadding>
// //         {headings.map((heading) => (
// //           <ListItem
// //             key={heading.id}
// //             disablePadding
// //             sx={{
// //               pl: heading.level === "h4" ? 2 : 0,
// //             }}
// //           >
// //             <ListItemButton
// //               onClick={() => scrollToHeading(heading.id)}
// //               sx={{
// //                 py: 0.5,
// //                 px: 1,
// //                 borderRadius: 1,
// //                 borderLeft: activeId === heading.id ? "3px solid" : "none",
// //                 borderColor: "primary.main",
// //                 bgcolor:
// //                   activeId === heading.id ? "action.selected" : "transparent",
// //                 "&:hover": {
// //                   bgcolor: "action.hover",
// //                 },
// //                 transition: "all 0.2s ease",
// //               }}
// //             >
// //               <Typography
// //                 variant="body1"
// //                 sx={{
// //                   color:
// //                     activeId === heading.id ? "primary.main" : "text.secondary",
// //                   fontWeight: activeId === heading.id ? 600 : 400,
// //                   // fontSize: heading.level === "h4" ? "0.8rem" : "0.875rem",
// //                 }}
// //               >
// //                 {heading.text}
// //               </Typography>
// //             </ListItemButton>
// //           </ListItem>
// //         ))}
// //       </List>
// //     </TextBoxContainer>
// //   );
// // }
