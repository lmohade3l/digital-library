import { Autocomplete, Box, Button, TextField, Typography, useMediaQuery, Menu, MenuItem, Radio, FormControlLabel } from "@mui/material";
import { useState } from "react";
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
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState<string>("همه");
  
  const mediumScreenTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const smallTablet = useMediaQuery(theme.breakpoints.down("ssm"));
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));

  const publishers = [...new Set(bookList?.map(book => book.publisher))];

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option?: string) => {
    if (option) {
      setSortOption(option);
    }
    setAnchorEl(null);
  };

  const getSortedBooks = (books: bookType[]) => {
    switch (sortOption) {
      case "گرانترین":
        return [...books].sort((a, b) => b.price - a.price);
      case "ارزانترین":
        return [...books].sort((a, b) => a.price - b.price);
      case "بیشترین امتیاز":
        return [...books].sort((a, b) => b.rating - a.rating);
      case "کمترین امتیاز":
        return [...books].sort((a, b) => a.rating - b.rating);
      default:
        return books;
    }
  };

  const filteredBooks = selectedPublishers.length > 0
    ? bookList?.filter(book => selectedPublishers.includes(book.publisher))
    : bookList;

  const sortedBooks = getSortedBooks(filteredBooks || []);

  const skeletonCount = 8;

  return (
    <>
      {phone ? (
        <Box>
          <Typography sx={{ fontSize: "20px" }}>کتاب‌ها</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {isLoading
              ? Array.from(new Array(skeletonCount)).map((_, index) => (
                <BookCard key={`skeleton-${index}`} isLoading={true} />
              ))
              : sortedBooks?.map((book: bookType) => (
                <BookCard key={book.id} book={book} isLoading={false} />
              ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", maxWidth: "1000px", justifyContent: "center", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ fontSize: "20px" }}>کتاب‌ها</Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Autocomplete
              multiple
              options={publishers}
              value={selectedPublishers}
              onChange={(_, newValue) => setSelectedPublishers(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ناشران"
                  variant="outlined"
                />
              )}
              sx={{ flex: 1 }}
            />
            <Button variant="contained" onClick={() => setSelectedPublishers([])} sx={{}}>پاک‌کردن فیلتر</Button>
          </Box>

          <Typography
            onClick={handleSortClick}
            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            {sortOption}
          </Typography>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleSortClose()}
          >
            <Typography sx={{ p: 2, fontWeight: 'bold' }}>مرتب کردن بر اساس</Typography>
            {["همه", "گرانترین", "ارزانترین", "بیشترین امتیاز", "کمترین امتیاز"].map((option) => (
              <MenuItem key={option} onClick={() => handleSortClose(option)}>
                <FormControlLabel
                  control={<Radio checked={sortOption === option} />}
                  label={option}
                />
              </MenuItem>
            ))}
          </Menu>

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
              : sortedBooks?.map((book: bookType) => (
                <Box key={book.id} sx={{ display: "flex", justifyContent: "center" }}>
                  <BookCard book={book} isLoading={false} />
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </>
  );
}