import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Frame from "@pages/Frame";
import reportWebVitals from "./reportWebVitals";
import { theme, ThemeProvider, CssBaseline } from "./Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "@pages/Main";
import Notice from "@pages/Notice";
import Board from "@pages/Board";
import Review from "@pages/Review";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route index element={<Main></Main>} />
            <Route path="notice" element={<Notice>공지사항</Notice>} />
            <Route path="board" element={<Board>게시판</Board>} />
            <Route path="reviews" element={<Review>이용 후기</Review>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
