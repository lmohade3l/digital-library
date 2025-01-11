import React from "react";
import { Box, Typography } from "@mui/material";

interface BookRatingProps {
  rating: string | number;
  count: string | number;
  phone: boolean;
}

export const BookRating: React.FC<BookRatingProps> = ({
  rating,
  count,
  phone,
}) => {
  return (
    <Box
      sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}
    >
      <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem" }}>
        امتیاز:
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "success.main",
          px:1,
          borderRadius:"12px"
        }}
      >
        <Typography sx={{ fontSize: phone ? "0.875rem" : "1rem", color:'#FFF' }}>
          {rating}
        </Typography>
      </Box>
      <Typography
        sx={{ fontSize: phone ? "0.875rem" : "1rem" }}
      >{`از ${count} رای`}</Typography>
    </Box>
  );
};
