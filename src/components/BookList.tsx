import { Autocomplete, Box, Button, TextField, Typography, useMediaQuery, Menu, MenuItem, Radio, FormControlLabel } from "@mui/material";
import { useState, useMemo } from "react";
import { bookType } from "../types/book";
import { theme } from "../theme";
import BookCard from "./BookCard";
import SortIcon from "../assets/images/sort-icon.png"

export default function BookList({
  bookList,
  isLoading,
  lastBookRef,
  selectedPublishers,
  setSelectedPublishers,
  sortOption,
  setSortOption,
  hasMore
}: {
  bookList: bookType[],
  isLoading: boolean,
  lastBookRef: (node: HTMLDivElement) => void,
  selectedPublishers: string[],
  setSelectedPublishers: (publishers: string[]) => void,
  sortOption: string,
  setSortOption: (option: string) => void,
  hasMore?: boolean
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const mediumScreenTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const smallTablet = useMediaQuery(theme.breakpoints.down("ssm"));
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));

  const publishers = useMemo(() =>
    [...new Set(bookList?.map(book => book.publisher))],
    [bookList]
  );

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option?: string) => {
    if (option) {
      setSortOption(option);
    }
    setAnchorEl(null);
  };

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...bookList];

    if (selectedPublishers.length > 0) {
      result = result.filter(book => selectedPublishers.includes(book.publisher));
    }

    switch (sortOption) {
      case "گرانترین":
        return result.sort((a, b) => b.price - a.price);
      case "ارزانترین":
        return result.sort((a, b) => a.price - b.price);
      case "بیشترین امتیاز":
        return result.sort((a, b) => b.rating - a.rating);
      case "کمترین امتیاز":
        return result.sort((a, b) => a.rating - b.rating);
      default:
        return result;
    }
  }, [bookList, selectedPublishers, sortOption]);

  const skeletonCount = 8;

  const renderBooks = (books: bookType[]) => {
    const seenIds = new Set();
    return books.map((book: bookType, index) => {
      if (seenIds.has(book.id)) return null;
      seenIds.add(book.id);

      const isLastBook = index === books.length - 1;
      const shouldAttachRef = !isLoading && hasMore && isLastBook && selectedPublishers.length === 0;

      return (
        <Box
          key={book.id}
          ref={shouldAttachRef ? lastBookRef : undefined}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <BookCard book={book} isLoading={false} />
        </Box>
      );
    }).filter(Boolean);
  };

  if (phone) {
    return (
      <Box>
        <Typography sx={{ fontSize: "20px" }}>کتاب‌ها</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {isLoading && !bookList.length ? (
            Array.from(new Array(skeletonCount)).map((_, index) => (
              <BookCard key={`skeleton-${index}`} isLoading={true} />
            ))
          ) : (
            renderBooks(filteredAndSortedBooks)
          )}
          {isLoading && bookList.length > 0 && selectedPublishers.length === 0 && (
            <BookCard isLoading={true} />
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", maxWidth: "1000px", justifyContent: "center", flexDirection: "column", gap: 2 }}>
      <Typography sx={{ fontSize: "20px" }}>کتاب‌ها</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'flex-start' }}>
        <Box onClick={handleSortClick} sx={{ display: 'flex', gap: 0.7, alignItems: 'center', cursor: 'pointer', mt:'0.5rem' }}>
          <Typography
            sx={{ '&:hover': { textDecoration: 'underline' } }}
          >
            {sortOption}
          </Typography>
          <img src={SortIcon} alt="sort" style={{ width: '18px', height: '18px' }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, }}>
          {/* <Typography>فیلتر بر اساس ناشران</Typography> */}
          <Autocomplete
            multiple
            options={publishers}
            value={selectedPublishers}
            onChange={(_, newValue) => setSelectedPublishers(newValue)}
            disableClearable
            limitTags={2}
            renderInput={(params) => (
              <TextField
                {...params}
                label="ناشران"
                variant="outlined"
              />
            )}
            sx={{
              width: "20rem",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
                minHeight: "2rem",
              },
              "& .MuiChip-root": {
                paddingLeft: "12px"
              },
              "& .MuiAutocomplete-endAdornment": {
                position: "absolute",
                insetInlineStart: "9px"
              }
            }}
          />
          <Button
            variant="contained"
            onClick={() => setSelectedPublishers([])}
            sx={{ height:"2.45rem" }}
          >
            پاک‌کردن فیلتر
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleSortClose()}
        // sx={{borderRadius:"12px"}}
      >
        <Typography sx={{ p: 2, fontWeight: 'bold' }}>مرتب کردن بر اساس</Typography>
        {["تازه‌ها", "گرانترین", "ارزانترین", "بیشترین امتیاز", "کمترین امتیاز"].map((option) => (
          <MenuItem key={option} onClick={() => handleSortClose(option)}>
            <FormControlLabel
              control={<Radio checked={sortOption === option} />}
              label={option}
              sx={{ml:'1rem'}}
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
        {isLoading && !bookList.length ? (
          Array.from(new Array(skeletonCount)).map((_, index) => (
            <Box key={`skeleton-${index}`} sx={{ display: "flex", justifyContent: "center" }}>
              <BookCard isLoading={true} />
            </Box>
          ))
        ) : (
          renderBooks(filteredAndSortedBooks)
        )}
        {isLoading && bookList.length > 0 && selectedPublishers.length === 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", gridColumn: "1/-1" }}>
            <BookCard isLoading={true} />
          </Box>
        )}
      </Box>
    </Box>
  );
}