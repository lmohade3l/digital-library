import { Autocomplete, Box, TextField, Typography, useMediaQuery } from "@mui/material";
import { bookType } from "../types/book";
import { theme } from "../theme";
import BookCard from "./BookCard";

export default function BookList({
  bookList,
  isLoading
}: {
  bookList: bookType[],
  isLoading: boolean
}) {
  const mediumScreenTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const smallTablet = useMediaQuery(theme.breakpoints.down("ssm"));
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));

  const skeletonCount = 8;

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
            {isLoading
              ? Array.from(new Array(skeletonCount)).map((_, index) => (
                <BookCard key={`skeleton-${index}`} isLoading={true} />
              ))
              : bookList?.map((book: bookType) => (
                <BookCard key={book.id} book={book} isLoading={false} />
              ))}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", maxWidth: "1000px", justifyContent: "center", flexDirection: "column" }}
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
            {isLoading
              ? Array.from(new Array(skeletonCount)).map((_, index) => (
                <Box key={`skeleton-${index}`} sx={{ display: "flex", justifyContent: "center" }}>
                  <BookCard isLoading={true} />
                </Box>
              ))
              : bookList?.map((book: bookType) => (
                <>
                  <Box key={book.id} sx={{ display: "flex", justifyContent: "center" }}>
                    <BookCard book={book} isLoading={false} />
                  </Box>
                </>
              ))}
          </Box>
        </Box>
      )}
    </>
  );
}