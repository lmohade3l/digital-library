import { Box, Alert, AlertTitle } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { bookType } from "../types/book";
import EmptyMessage from "../components/EmptyMessage";
import BookList from "../components/BookList";

export default function Home() {
  const [bookList, setBookList] = useState<bookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!navigator.onLine) {
          throw new Error("اتصال به اینترنت برقرار نیست. لطفاً اتصال خود را بررسی کنید.");
        }

        const response = await axios.get(
          "https://get.taaghche.com/v2/everything?filters=%7B%22list%22:%5B%7B%22type%22:21,%22value%22:0%7D,%7B%22type%22:6,%22value%22:-30000%7D,%7B%22type%22:3,%22value%22:-2925%7D,%7B%22type%22:3,%22value%22:-28%7D,%7B%22type%22:50,%22value%22:0%7D%5D%7D&offset=1-0-0-16&trackingData=110160240&order=1"
        );
        
        setBookList(response?.data?.bookList?.books);
      } catch (error) {
        console.error("Error fetching book data:", error);
        
        if (error instanceof AxiosError) {
          if (error.code === "ERR_NETWORK") {
            setError("خطا در ارتباط با سرور. لطفاً بعداً دوباره امتحان کنید.");
          } else if (error.response?.status === 404) {
            setError("اطلاعات مورد نظر یافت نشد.");
          } else {
            setError("خطایی در دریافت اطلاعات رخ داد. لطفاً دوباره تلاش کنید.");
          }
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("خطای ناشناخته رخ داد. لطفاً دوباره تلاش کنید.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const handleOnline = () => {
      setError(null);
      fetchData();
    };

    const handleOffline = () => {
      setError("اتصال به اینترنت برقرار نیست. لطفاً اتصال خود را بررسی کنید.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show error alert if there's an error
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Alert 
          severity="error" 
          sx={{ 
            width: "100%", 
            maxWidth: "600px",
            direction: "rtl"
          }}
        >
          <AlertTitle>خطا</AlertTitle>
          {error}
        </Alert>
      </Box>
    );
  }

  // Always render BookList while loading to show skeletons
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <BookList bookList={[]} isLoading={true} />
      </Box>
    );
  }

  // Show empty message if no books and not loading
  if (!bookList?.length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <EmptyMessage />
      </Box>
    );
  }

  // Show books if we have them
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <BookList bookList={bookList} isLoading={false} />
    </Box>
  );
}