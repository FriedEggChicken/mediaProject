import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  marginTop: "20px",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

export const FrameBox = styled(Box)((p) => ({
  border: `1px solid ${p.theme.palette.secondary.dark}`,
  width: "700px",
  height: "750px",
}));

export const ItemBox = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
}));

export const PageBox = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 50,
}));
