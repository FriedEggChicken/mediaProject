import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  width: "100%",
  height: "1400px",
}));

export const TopSearchBox = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  marginTop: 10,
}));

export const LargeConditionBox = styled(Box)((p) => ({
  display: "flex",
  alignItems: "center",
}));

export const SmallConditionBox = styled(Box)((p) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
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
