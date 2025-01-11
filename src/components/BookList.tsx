import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useState, useMemo } from "react";

import { bookType } from "../types/book";
import { theme } from "../theme";
import BookCard from "./BookCard";
import PublisherFilterMenu from "./PublisherFilter";
import SortIcon from "../assets/images/sort-icon.png";

export default function BookList({
  bookList,
  isLoading,
  lastBookRef,
  selectedPublishers,
  setSelectedPublishers,
  sortOption,
  setSortOption,
  hasMore,
} : {
  bookList: bookType[],
  isLoading: boolean,
  lastBookRef,
  selectedPublishers: string[],
  setSelectedPublishers :(value:string[]) => void,
  sortOption:string,
  setSortOption: (value:string) => void,
  hasMore: boolean,
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const mediumScreenTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const smallTablet = useMediaQuery(theme.breakpoints.down("ssm"));
  const phone = useMediaQuery(theme.breakpoints.down("xxs"));

  const publishers = useMemo(
    () => [...new Set(bookList.map((book) => book.publisher))],
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
    if (selectedPublishers.length) {
      result = result.filter((book) =>
        selectedPublishers.includes(book.publisher)
      );
    }
    const sortingOptions = {
      گرانترین: (a:bookType, b:bookType) => b.price - a.price,
      ارزانترین: (a:bookType, b:bookType) => a.price - b.price,
      "بیشترین امتیاز": (a:bookType, b:bookType) => b.rating - a.rating,
      "کمترین امتیاز": (a:bookType, b:bookType) => a.rating - b.rating,
    };

    return sortingOptions[sortOption]
      ? result.sort(sortingOptions[sortOption])
      : result;
  }, [bookList, selectedPublishers, sortOption]);

  const renderBooks = (books: bookType[]) => {
    const seenIds = new Set<number>();
    return books
      .map((book, index) => {
        if (seenIds.has(book.id)) {
          return null;
        }
        seenIds.add(book.id);

        const isLastBook = index === books.length - 1;
        const attachRef =
          !isLoading && hasMore && isLastBook && !selectedPublishers.length;

        return (
          <Box
            key={book.id}
            ref={attachRef ? lastBookRef : undefined}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <BookCard book={book} isLoading={false} />
          </Box>
        );
      })
      .filter(Boolean);
  };

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }, (_, index) => (
      <Box
        key={`skeleton-${index}`}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <BookCard isLoading={true} />
      </Box>
    ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1000px",
        gap: 2,
      }}
    >
      <Typography sx={{ fontSize: "20px" }}>کتاب‌ها</Typography>

      <Box sx={{ display: "flex", gap:1.5 }}>
        <Button
          onClick={handleSortClick}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: 0.7,
            border:"1px solid #000",
            color:"#000",
            borderRadius:"15px",
            "&:hover" :{
              background:"none"
            }
          }}
        >
            {sortOption}
          <img
            src={SortIcon}
            alt="sort"
            style={{ width: "18px", height: "18px" }}
          />
        </Button>

        <PublisherFilterMenu
          publishers={publishers}
          selectedPublishers={selectedPublishers}
          setSelectedPublishers={setSelectedPublishers}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleSortClose()}
      >
        <Typography sx={{ p: 2, fontWeight: "bold" }}>
          مرتب کردن بر اساس
        </Typography>
        {[
          "تازه‌ها",
          "گرانترین",
          "ارزانترین",
          "بیشترین امتیاز",
          "کمترین امتیاز",
        ].map((option) => (
          <MenuItem key={option} onClick={() => handleSortClose(option)}>
            <FormControlLabel
              control={<Radio checked={sortOption === option} />}
              label={option}
              sx={{ ml: "1rem" }}
            />
          </MenuItem>
        ))}
      </Menu>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:phone?"1fr" : smallTablet
            ? "1fr 1fr 1fr"
            : mediumScreenTablet
            ? "1fr 1fr 1fr 1fr"
            : "1fr 1fr 1fr 1fr 1fr",
          gap: 2,
        }}
      >
        {isLoading && !bookList.length
          ? renderSkeletons(8)
          : renderBooks(filteredAndSortedBooks)}
        {isLoading && bookList.length > 0 && !selectedPublishers.length && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gridColumn: "1/-1",
            }}
          >
            <BookCard isLoading={true} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
