import React from "react";
import Header from "@pages/Header";

import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

const Body = styled(Box)((p) => ({
  width: "1200px",
  margin: "0 auto",
}));

const Frame = () => {
  return (
    <>
      <Header />

      <Body>
        <Outlet />
      </Body>
    </>
  );
};

export default Frame;
