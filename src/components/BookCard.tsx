import { Box, Typography, useMediaQuery } from "@mui/material";
import { bookType } from "../types/book";
import { getAuthorsNames } from "../utils/getAuthorsNames";
import { getRartingAndCount } from "../utils/getRatingAndCount";
import { priceSeparator } from "../utils/priceSeparator";
import { theme } from "../theme";

export default function BookCard({ book }: { book: bookType }) {
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));

  return (
    <>
      {phone ? (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            py: 1.5,
            px: 3,
            bgcolor: "#FFF",
            mt: 2,
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: "10px",
          }}
        >
          <img
            src={book.coverUri}
            alt=""
            style={{
              width: "100px",
              boxShadow: `0 2px 4px 0 ${theme.palette.secondary.main}, 0 3px 10px 0 ${theme.palette.secondary.main}`,
              cursor: "pointer",
              borderRadius: "4px",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width:"100%"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 1,
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>{book?.title}</Typography>
              <Typography>{getAuthorsNames(book?.authors)}</Typography>
              <Typography sx={{ fontSize: "12px" }}>
                {getRartingAndCount(book)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography sx={{ fontSize: "13px" }}>
                {priceSeparator(book?.price)} ت
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            py: 1.5,
            px: 3,
            bgcolor: "#FFF",
            mt: 2,
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: "10px",
            mx: 1,
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={book.coverUri}
                alt=""
                style={{
                  width: "95%",
                  boxShadow: `0 2px 4px 0 ${theme.palette.secondary.main}, 0 3px 10px 0 ${theme.palette.secondary.main}`,
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
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography sx={{ fontSize: "13px" }}>
              {priceSeparator(book?.price)} ت
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
