import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  width: "100%",
  height: "100%",
}));

export const TopSearchBox = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: 25,
}));

export const SmallConditionBox = styled(Box)((p) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  marginTop: 25,
}));

export const ListBox = styled(Box)((p) => ({
  width: "100%",
  marginTop: 35,
}));

export const PageBox = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 60,
}));
