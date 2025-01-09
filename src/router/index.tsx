import { createBrowserRouter } from "react-router-dom";
import BookDetail from "../pages/BookDetail";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetail />,
  },
]);
