import { Box, Alert, AlertTitle } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { bookType } from "../types/book";
import EmptyMessage from "../components/EmptyMessage";
import BookList from "../components/BookList";
import { t } from "../hooks/useTranslate";

const CACHE_KEY = "taaghche_books_cache";
const CACHE_TIMESTAMP_KEY = "taaghche_books_cache_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export default function Home() {
  const [bookList, setBookList] = useState<bookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState("1-0-0-16");
  const [hasMore, setHasMore] = useState(true);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("تازه‌ها");
  const observer = useRef<IntersectionObserver>();

  const loadCachedData = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedData && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      if (!isExpired) {
        try {
          const parsedData = JSON.parse(cachedData);
          setBookList(parsedData.books);
          setOffset(parsedData.nextOffset);
          setHasMore(parsedData.hasMore);
          setIsLoading(false);
          return true;
        } catch (error) {
          console.error("Error parsing cached data:", error);
          localStorage.removeItem(CACHE_KEY);
          localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        }
      } else {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      }
    }
    return false;
  };

  const updateCache = (
    books: bookType[],
    nextOffset: string,
    moreAvailable: boolean
  ) => {
    try {
      const cacheData = {
        books,
        nextOffset,
        hasMore: moreAvailable,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error("Error caching data:", error);
    }
  };

  const fetchData = async (currentOffset: string) => {
    try {
      if (!navigator.onLine) {
        throw new Error(t("noConnectionErrorMessage"));
      }

      const response = await axios.get(
        `https://get.taaghche.com/v2/everything?filters=%7B%22list%22:%5B%7B%22type%22:21,%22value%22:0%7D,%7B%22type%22:6,%22value%22:-30000%7D,%7B%22type%22:3,%22value%22:-2925%7D,%7B%22type%22:3,%22value%22:-28%7D,%7B%22type%22:50,%22value%22:0%7D%5D%7D&offset=${currentOffset}&trackingData=110160240&order=1&sort=8`
      );

      const newBooks = response?.data?.bookList?.books || [];

      setBookList((prev) => {
        const existingIds = new Set(prev.map((book) => book.id));
        const uniqueNewBooks = newBooks.filter(
          (book: bookType) => !existingIds.has(book.id)
        );
        const updatedList = [...prev, ...uniqueNewBooks];

        if (currentOffset === "1-0-0-16") {
          updateCache(
            updatedList,
            response?.data?.nextOffset,
            response?.data?.hasMore
          );
        }

        return updatedList;
      });

      setHasMore(response?.data?.hasMore);
      setOffset(response?.data?.nextOffset);
    } catch (error) {
      console.error("Error fetching book data:", error);

      if (error instanceof AxiosError) {
        if (error.code === "ERR_NETWORK") {
          setError(t("serverErrorMessage"));
        } else if (error.response?.status === 404) {
          setError(t("notFoundErrorMessage"));
        } else {
          setError(t("getDataErrorMessage"));
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(t("unknownErrorMessage"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const lastBookElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIsLoading(true);
          fetchData(offset);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, offset]
  );

  useEffect(() => {
    const hasCachedData = loadCachedData();

    if (!hasCachedData) {
      fetchData(offset);
    } else {
      fetchData(offset);
    }

    const handleOnline = () => {
      setError(null);
      fetchData(offset);
    };

    const handleOffline = () => {
      setError(t("noConnectionErrorMessage"));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Alert
          severity="error"
          sx={{ width: "100%", maxWidth: "600px", direction: "rtl" }}
        >
          <AlertTitle>{t("error")}</AlertTitle>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!bookList?.length && isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <BookList
          bookList={[]}
          isLoading={true}
          lastBookRef={lastBookElementRef}
          selectedPublishers={selectedPublishers}
          setSelectedPublishers={setSelectedPublishers}
          sortOption={sortOption}
          setSortOption={setSortOption}
          hasMore={hasMore}
        />
      </Box>
    );
  }

  if (!bookList?.length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <EmptyMessage />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <BookList
        bookList={bookList}
        isLoading={isLoading}
        lastBookRef={lastBookElementRef}
        selectedPublishers={selectedPublishers}
        setSelectedPublishers={setSelectedPublishers}
        sortOption={sortOption}
        setSortOption={setSortOption}
        hasMore={hasMore}
      />
    </Box>
  );
}
