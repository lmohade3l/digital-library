import { Box, Typography } from "@mui/material";
import { bookType } from "../types/book";
import { getAuthorsNames } from "../utils/getAuthorsNames";
import { getRartingAndCount } from "../utils/getRatingAndCount";
import { priceSeparator } from "../utils/priceSeparator";

export default function BookCard({ book }: { book: bookType }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 1.5,
        px: 3,
        bgcolor: "#FFF",
        mt: 2,
        border: "1px solid #F2F2EE",
        borderRadius: "10px",
        mx: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src={book.coverUri}
          alt=""
          style={{
            width: "95%",
            boxShadow:
              "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "110px",
          mt: 1,
          height: "110px",
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>{book?.title}</Typography>
        <Typography>{getAuthorsNames(book?.authors)}</Typography>
        <Typography sx={{ fontSize: "12px" }}>
          {getRartingAndCount(book)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography sx={{ fontSize: "13px" }}>
          {priceSeparator(book?.price)} ت
        </Typography>
      </Box>
    </Box>
  );
}
