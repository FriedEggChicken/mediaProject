import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  marginTop: "30px",
  width: "100%",
  height: "1500px",
  display: "flex",
  justifyContent: "center",
}));

export const FrameBox = styled(Box)((p) => ({
  border: `1px solid ${p.theme.palette.secondary.dark}`,
  width: "1000px",
  height: "1000px",
}));

export const TopContentBox = styled(Box)((p) => ({
  marginTop: "35px",
}));

export const TypoBox = styled(Box)((p) => ({
  display: "flex",
  marginTop: "10px",
}));

export const BottomContentBox = styled(Box)((p) => ({
  marginTop: "35px",
  width: "800px",
  height: "300px",
  backgroundColor: p.theme.palette.secondary.main,
  border: p.theme.palette.secondary.dark,
  borderRadius: "20px",
}));
