import { createBrowserRouter } from "react-router-dom";
import BooksList from "../pages/BooksList";
import BookDetail from "../pages/BookDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BooksList />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetail />,
  },
]);
