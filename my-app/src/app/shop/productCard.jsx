import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import * as React from "react";

const ProductCard= ()=>{
  return (
    <Card sx={{ width: "22vw", height: "25rem", borderRadius: "2rem" }}>
      <CardActionArea onClick={"/ProductPage"}>
        <CardMedia
          component="img"
          height="200"
          image="/shop.jpg"
          alt="ram singhji"
          sx={{
            borderBottomLeftRadius: "2rem",
            borderBottomRightRadius: "2rem",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            परम तपस्वी श्री रामसिंहजी * Param Tapsvi Shrii Ramsinghji
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="subtitle2">
              Paperback
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              Marathi
            </Typography>
          </Box>

          <Typography gutterBottom variant="h4">
            $85.00
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductCard;