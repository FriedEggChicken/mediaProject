import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  width: "100%",
  height: "150px",
  position: "fixed",
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
  border: "0.5px solid gray",
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
