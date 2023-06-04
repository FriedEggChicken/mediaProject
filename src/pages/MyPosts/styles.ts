import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  marginTop: "20px",
  width: "100%",
  height: "900px",
  display: "flex",

  flexDirection: "column",
}));

export const PageBox = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 50,
}));

export const ItemBox = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
}));
