import React from 'react';
import { Box, Typography } from "@mui/material";

interface BookRatingProps {
  rating: string | number;
  count: string | number;
  phone: boolean;
}

export const BookRating: React.FC<BookRatingProps> = ({ rating, count, phone }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
      <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem" }}>امتیاز:</Typography>
      <Box>
        <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem" }}>{rating}</Typography>
      </Box>
      <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem" }}>{`از ${count} رای`}</Typography>
    </Box>
  );
};