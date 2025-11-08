import * as React from "react";
import ProductCard from "./productCard";
import { Box } from "@mui/system";

const ProductList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "1.5rem",
        p: "2rem",
      }}
    >
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Box>
  );
};
export default ProductList;
