import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  marginTop: "30px",
  width: "100%",
  height: "700px",
  display: "flex",
  justifyContent: "center",
}));

export const FrameBox = styled(Box)((p) => ({
  width: "1000px",
  height: "600px",
}));

export const TopContentBox = styled(Box)((p) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const TypoContent = styled(Box)((p) => ({
  backgroundColor: p.theme.palette.secondary.main,
  border: "1px solid",
  borderColor: p.theme.palette.secondary.dark,
  borderRadius: "10px",
  marginTop: "25px",
  width: "800px",
  height: "480px",

  paddingLeft: "15px",
}));

export const TypoBox = styled(Box)((p) => ({
  display: "flex",
  marginTop: "10px",
}));

export const BottomContentBox = styled(Box)((p) => ({
  lineHeight: "25px",
  paddingLeft: "10px",
  paddingTop: "15px",
  overflowWrap: "break-word",
  flex: "1",
}));
