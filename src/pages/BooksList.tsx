import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { bookType } from "../types/book";
import EmptyMessage from "../components/EmptyMessage";
import BookCard from "../components/BookCard";

export default function BooksList() {
  const [bookList, setBookList] = useState<bookType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://get.taaghche.com/v2/everything?filters=%7B%22list%22:%5B%7B%22type%22:21,%22value%22:0%7D,%7B%22type%22:6,%22value%22:-30000%7D,%7B%22type%22:3,%22value%22:-2925%7D,%7B%22type%22:3,%22value%22:-28%7D,%7B%22type%22:50,%22value%22:0%7D%5D%7D&offset=0-0-0-16&trackingData=110160240&order=1"
        );
        setBookList(response?.data?.bookList?.books);
        console.log({ response });
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      {bookList ? (
        <>
          <Typography sx={{ fontSize: "20px" }}>کتاب‌ها</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            {bookList?.map((book: bookType) => (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <BookCard book={book} />
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <EmptyMessage />
      )}
    </Box>
  );
}
