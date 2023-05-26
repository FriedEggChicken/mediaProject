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
import Login from "@pages/Login";
import Forms from "@pages/Forms";
import MyPage from "@pages/MyPage";
import Delivery from "@pages/Delivery";
import Bulletin from "@pages/Bulletin";
import EditForm from "@pages/EditForm";
import MyPosts from "@pages/MyPosts";
import PostForms from "@pages/PostForms";
import FormsDetail from "@pages/FormsDetail";
import MyRequests from "@pages/MyRequests";
import EditRequestForm from "@pages/EditRequestForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/auth/kakao-callback" element={<Login></Login>} />
        <Route path="/" element={<Frame />}>
          <Route index element={<Main></Main>} />
          <Route path="notice" element={<Notice></Notice>} />
          <Route path="board" element={<Board></Board>} />
          <Route path="posts/:id" element={<Bulletin></Bulletin>} />
          <Route path="forms" element={<Forms></Forms>} />
          <Route path="posts/edit/:id" element={<EditForm></EditForm>} />
          <Route path="reviews" element={<Review></Review>} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="mypage/myposts" element={<MyPosts />} />
          <Route path="mypage/myrequests" element={<MyRequests />} />
          <Route path="forms/edit/:id" element={<EditRequestForm />} />
          <Route path="posts/forms/:id" element={<PostForms />} />
          <Route path="forms/:id" element={<FormsDetail />} />
          <Route path="delivery" element={<Delivery />} />
        </Route>
      </Routes>
    </Router>
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
