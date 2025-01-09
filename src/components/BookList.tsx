import { Box, Typography, useMediaQuery } from "@mui/material";
import { bookType } from "../types/book";
import BookCard from "./BookCard";
import { theme } from "../theme";

export default function BookList({ bookList }: { bookList: bookType[] }) {
  const mediumScreenTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const smallTablet = useMediaQuery(theme.breakpoints.down("ssm"));
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));

  return (
    <>
      {phone ? (
        <Box>
          <Typography sx={{ fontSize: "20px" }}>کتاب‌ها</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {bookList?.map((book: bookType) => (
              <BookCard book={book} />
            ))}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", maxWidth: "1000px", justifyContent: "center" }}
        >
          <Typography sx={{ fontSize: "20px" }}>کتاب‌ها</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: smallTablet
                ? "1fr 1fr 1fr"
                : mediumScreenTablet
                ? "1fr 1fr 1fr 1fr"
                : "1fr 1fr 1fr 1fr 1fr",
            }}
          >
            {bookList?.map((book: bookType) => (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <BookCard book={book} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
