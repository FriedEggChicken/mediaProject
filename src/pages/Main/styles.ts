import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  width: "100%",
  height: "1500px",
}));

export const Banner = styled(Box)((p) => ({
  display: "flex",
  width: "100%",
  height: "300px",
  backgroundColor: p.theme.palette.secondary.dark,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 30,
}));

export const ListBox = styled(Box)((p) => ({
  width: "100%",
  marginBottom: 30,
}));

export const ButtonArea = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
