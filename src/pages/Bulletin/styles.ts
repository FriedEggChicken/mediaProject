import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  marginTop: "30px",
  width: "100%",
  height: "1400px",
  display: "flex",
  justifyContent: "center",
}));

export const FrameBox = styled(Box)((p) => ({
  border: `1px solid ${p.theme.palette.secondary.dark}`,
  width: "1000px",
  height: "1300px",
}));

export const TopContentBox = styled(Box)((p) => ({
  display: "flex",
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
  height: "280px",
  display: "flex",
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
