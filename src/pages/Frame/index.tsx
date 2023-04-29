import React from "react";
import Header from "@pages/Header";
import Main from "@pages/Main";
import { Box, styled } from "@mui/material";
import { Routes, Route } from "react-router-dom";

const HeaderSpace = styled(Box)((p) => ({
  height: "160px",
}));

const Body = styled(Box)((p) => ({
  width: "1200px",
  margin: "0 auto",
}));

/**
 * 헤더의 위치를 잡아주고 바디의 페이지를 라우팅해주는 페이지
 */
const Frame = () => {
  return (
    <>
      <Header />
      <HeaderSpace />

      <Body>
        <Routes>
          <Route path="/" element={<Main>메인</Main>} />
          <Route path="/notice" element={<Main>공지사항</Main>} />
          <Route path="/board" element={<Main>게시판</Main>} />
          <Route path="/review" element={<Main>이용 후기</Main>} />
        </Routes>
      </Body>
    </>
  );
};

export default Frame;
