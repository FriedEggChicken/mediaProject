import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  marginTop: "20px",
  width: "100%",
  height: "1500px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

export const FrameBox = styled(Box)((p) => ({
  border: `1px solid ${p.theme.palette.secondary.dark}`,
  width: "500px",
  height: "350px",
}));

export const ItemBox = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
}));
