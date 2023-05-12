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
    secondary: {
      main: "#FCF5EB",
      dark: "#E6E0D8",
    },
  },
});

export { theme, ThemeProvider, CssBaseline };
