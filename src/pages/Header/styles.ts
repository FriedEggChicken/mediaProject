import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  width: "100%",
  height: "90px",
  zIndex: 100,
  position: "sticky",
  top: 0,
  backgroundColor: p.theme.palette.background.default,
}));

export const HeaderBox = styled(Box)((p) => ({
  margin: "0 auto",
  width: "1200px",
  height: "100%",
  display: "flex",
}));

export const SmallBox = styled(Box)((p) => ({
  width: "250px",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const MenuBtnBox = styled(Box)((p) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));
