import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#FFFBF2",
    },
    primary: {
      main: "#1B352F",
      light: "#616462",
    },
  },
});

export { theme, ThemeProvider, CssBaseline };
