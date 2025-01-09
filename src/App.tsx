import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import Layout from "./layout";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
