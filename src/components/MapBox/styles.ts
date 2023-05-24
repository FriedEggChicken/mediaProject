import { styled, Box } from "@mui/material";

export const Container = styled(Box)((props) => ({
  width: "800px",
  height: "300px",
  margin: "0 auto",
  // padding: "10px",
  boxShadow: "0 0 2px black",
}));

export const NotFoundBox = styled(Box)((props) => ({
  width: "800px",
  height: "300px",
  lineHeight: "300px",
  fontSize: "30px",
  textAlign: "center",
  userSelect: "none",
}));
