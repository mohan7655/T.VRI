"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import FlexSearch from "flexsearch";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Chip,
  Stack,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchComponent({ onResultClick }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchIndex, setSearchIndex] = useState(null);
  const inputRef = useRef(null);
  const [rawData, setRawData] = useState(null); // New state for raw data
  // Load pre-built FlexSearch index
  useEffect(() => {
    let isMounted = true;

    fetch("/flexsearch-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load search index");
        return res.json();
      })
      .then((exportedData) => {
        if (!isMounted) return;

        setRawData(exportedData);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    if (!rawData) return;

    const flexIndex = new FlexSearch.Document({
      document: {
        id: "slug",
        index: ["titleNormalized", "bodyNormalized", "category"],
        store: [
          "slug",
          "title",
          "description",
          "excerpt",
          "category",
          "tags",
          "date",
          "author",
          "body",
        ],
      },
      tokenize: "forward",
      context: { resolution: 5, depth: 3 },
      optimize: true,
      cache: true,
    });

    rawData.forEach(({ key, data }) => {
      flexIndex.import(key, data);
    });

    setSearchIndex(flexIndex);
  }, [rawData]); // Triggered when rawData loads OR when the query changes

  // Focus input after loading
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Normalize Pali text
  const normalizePali = (text) => {
    if (!text) return "";
    return text
      .replace(/ā/g, "a")
      .replace(/ī/g, "i")
      .replace(/ū/g, "u")
      .replace(/ñ/g, "n")
      .replace(/ṃ/g, "m")
      .replace(/ṁ/g, "m")
      .replace(/ṭ/g, "t")
      .replace(/ḍ/g, "d")
      .replace(/ṇ/g, "n")
      .replace(/ḷ/g, "l")
      .replace(/ṛ/g, "r")
      .replace(/ṝ/g, "r")
      .replace(/ś/g, "s")
      .replace(/ṣ/g, "s")
      .replace(/Ā/g, "A")
      .replace(/Ī/g, "I")
      .replace(/Ū/g, "U")
      .replace(/Ñ/g, "N")
      .replace(/Ṃ/g, "M")
      .replace(/Ṁ/g, "M")
      .replace(/Ṭ/g, "T")
      .replace(/Ḍ/g, "D")
      .replace(/Ṇ/g, "N")
      .replace(/Ḷ/g, "L")
      .replace(/Ṛ/g, "R")
      .replace(/Ṝ/g, "R")
      .replace(/Ś/g, "S")
      .replace(/Ṣ/g, "S");
  };

  // Search results with excerpts from body
  const results = useMemo(() => {
    if (!query || !searchIndex) return [];

    try {
      const normalizedQuery = normalizePali(query);
      const searchResults = searchIndex.search(normalizedQuery, {
        limit: 100,
        enrich: true,
      });

      const seen = new Set();
      const docs = [];

      searchResults.forEach((group) => {
        if (!group || !group.result) return;

        group.result.forEach((item) => {
          const doc = item.doc || item;

          if (doc && doc.slug && !seen.has(doc.slug)) {
            seen.add(doc.slug);

            // Find matching excerpt from body
            const normalizedBody = normalizePali(doc.body || "");
            const queryIndex = normalizedBody
              .toLowerCase()
              .indexOf(normalizedQuery.toLowerCase());

            let matchExcerpt = doc.excerpt;
            if (queryIndex !== -1 && doc.body) {
              const start = Math.max(0, queryIndex - 60);
              const end = Math.min(doc.body.length, queryIndex + 100);
              matchExcerpt =
                (start > 0 ? "..." : "") +
                doc.body.substring(start, end) +
                (end < doc.body.length ? "..." : "");
            }

            docs.push({
              ...doc,
              matchExcerpt,
            });
          }
        });
      });

      return docs;
    } catch (err) {
      console.error("Search error:", err);
      return [];
    }
  }, [query, searchIndex]);

  //   Highlight matching text
  const highlightText = (text, searchQuery) => {
    if (!text || !searchQuery) return text;

    const normalizedQuery = normalizePali(searchQuery.toLowerCase());
    const normalizedText = normalizePali(text.toLowerCase());
    const index = normalizedText.indexOf(normalizedQuery);

    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <mark style={{ backgroundColor: "#fff59d", padding: "0 2px" }}>
          {text.substring(index, index + searchQuery.length)}
        </mark>
        {text.substring(index + searchQuery.length)}
      </>
    );
  };

  if (error) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Error loading search: {error}
      </Typography>
    );
  }
  const isIndexReady = Boolean(searchIndex);

  // If we are initializing the index or have no query, show the initial state.

  return (
    <Box sx={{ p: 2, borderRadius: 4 }}>
      <TextField
        fullWidth
        label={isIndexReady ? "Search..." : "Initializing search..."}
        inputRef={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        size="medium"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 5,
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        placeholder="Try searching for topics, titles, or keywords..."
      />

      {query && isIndexReady && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {results.length > 0
            ? `Found ${results.length} result${results.length !== 1 ? "s" : ""}`
            : "No results found"}
        </Typography>
      )}

      <List sx={{ maxHeight: {xs:"75vh",md:"60vh"}, overflowY: "auto", borderRadius: 5 ,}}>
        {!isIndexReady && query && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress size={24} />
            <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
              Finalizing search engine... please wait.
            </Typography>
          </Box>
        )}
        {isIndexReady && results.length > 0 ? (
          results.map((item) => (
            <ListItem
              key={item.slug}
              component={Link}
              href={`/${item.slug}`}
              onClick={onResultClick}
              sx={{
                textDecoration: "none",
                mb: 2,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.main",
                borderRadius: 5,
                "&:hover": {
                  backgroundColor: "action.hover",
                  borderColor: "primary.main",
                },
                display: "block",
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" component="div" sx={{ mb: 0.5 }}>
                    {highlightText(item.title, query)}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {/* {extractParagraphSnippet(item.body, query)} */}
                      {highlightText(item.matchExcerpt, query)}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{ mt: 1 }}
                    >
                      {item.category && (
                        <Chip
                          label={item.category}
                          size="small"
                          variant="outlined"
                          sx={{ mb: 0.5 }}
                        />
                      )}
                    </Stack>
                  </Box>
                }
              />
            </ListItem>
          ))
        ) : isIndexReady && query ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary" variant="h6" gutterBottom>
              No results found for "{query}"
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Try using different keywords or check your spelling
            </Typography>
          </Box>
        ) : null}
      </List>
    </Box>
  );
}
