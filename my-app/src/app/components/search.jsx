"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  const [index, setIndex] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchIndex, setSearchIndex] = useState(null);

  // Fetch the index file once on component mount
  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load search index");
        return res.json();
      })
      .then((data) => {
        setIndex(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Initialize FlexSearch index
  useEffect(() => {
    if (!index || index.length === 0) return;

    const newIndex = new FlexSearch.Document({
      document: {
        id: "slug",
        index: [
          {
            field: "title",
            tokenize: "forward",
            optimize: true,
            resolution: 9,
          },
          {
            field: "body",
            tokenize: "forward",
            optimize: true,
            resolution: 5,
          },
          {
            field: "headings",
            tokenize: "forward",
            optimize: true,
            resolution: 7,
          },
        ],
        store: true, // Store the entire document for retrieval
      },
      tokenize: "forward",
      context: true,
    });

    index.forEach((doc) => newIndex.add(doc));
    setSearchIndex(newIndex);
  }, [index]);

  // Flatten FlexSearch enriched results into pure docs
  const results = useMemo(() => {
    if (!query || !searchIndex) return [];

    try {
      const searchResults = searchIndex.search(query, {
        limit: 20,
        enrich: true,
      });

      // Deduplicate and extract docs
      const seen = new Set();
      const docs = [];

      searchResults.forEach((group) => {
        if (!group || !group.result) return;

        group.result.forEach((item) => {
          const doc = item.doc || item;

          if (doc && doc.slug && !seen.has(doc.slug)) {
            seen.add(doc.slug);
            docs.push(doc);
          }
        });
      });

      return docs.slice(0, 10); // Return top 10
    } catch (err) {
      console.error("Search error:", err);
      return [];
    }
  }, [query, searchIndex]);

  // Simple highlighting function for FlexSearch
  const highlightText = (text, searchQuery) => {
    if (!text || !searchQuery) return text;

    const query = searchQuery.toLowerCase();
    const textLower = text.toLowerCase();
    const index = textLower.indexOf(query);

    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <mark style={{ backgroundColor: "#fff59d", padding: "0 2px" }}>
          {text.substring(index, index + query.length)}
        </mark>
        {text.substring(index + query.length)}
      </>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Error loading search: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2, borderRadius:4 }}>
      <TextField
        fullWidth
        label="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        size="medium"
        sx={{ mb: 2 ,borderRadius:'5px', '& .MuiOutlinedInput-root': {
            borderRadius: 5,
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },}}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Try searching for topics, titles, or keywords..."
      />

      {/* Results count */}
      {query && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {results.length > 0
            ? `Found ${results.length} result${results.length !== 1 ? "s" : ""}`
            : "No results found"}
        </Typography>
      )}

      {/* Display Results */}
      <List sx={{ maxHeight: 500, overflowY: "auto",borderRadius:5 }}>
        {results.length > 0 ? (
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
                borderRadius: 5,
                "&:hover": {
                  backgroundColor: "action.hover",
                  borderColor: "secondary.main",
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
                      sx={{ mb: 1,borderRadius:5 }}
                    >
                      {item.description || item.excerpt}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))
        ) : query ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary" variant="h6" gutterBottom>
              No results found for "{query}"
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Try using different keywords or check your spelling
            </Typography>
          </Box>
        ) : (
          null
        )}
      </List>
    </Box>
  );
}
