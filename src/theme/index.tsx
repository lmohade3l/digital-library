import { createTheme } from "@mui/material/styles";
import { direction } from "html2canvas/dist/types/css/property-descriptors/direction";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    ssm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

export const theme = createTheme({
  direction: "rtl",
  breakpoints: {
    values: {
      xs: 0,
      xxs: 600,
      sm: 700,
      ssm: 800,
      md: 900,
      lg: 1200,
      xl: 1500,
      xxl: 1800,
    },
  },
  palette: {
    primary: {
      main: "#00A2A4",
      light: "#FCFCFA",
      dark: "#1565c0",
    },
    secondary: {
      main: "#F2F2EE",
      dark: "#0000001A",
    },
  },
  typography: {
    fontFamily: ['Vazirmatn', 'sans-serif'].join(','),
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 16px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: ({_ }) => ({
          zIndex: 888,
          "& .MuiInputBase-root": {
            padding: "2px",
            direction:"rtl"
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root": {
            top: "-5px",
            direction:'rtl'
          }
        }
      }
    },


  },
});
