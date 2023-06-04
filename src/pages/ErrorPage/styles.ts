import { Box, styled } from "@mui/material";

export const Container = styled(Box)((props) => ({
  width: "100%",
  height: "500px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
}));

export const ErrorBox = styled(Box)((props) => ({
  width: "300px",
  height: "350px",
}));

export const iconStyle = {
  width: "250px",
  height: "250px",
  marginLeft: "25px",
};

export const MessageBox = styled(Box)((props) => ({
  width: "300px",
  height: "50px",
  lineHeight: "50px",
  textAlign: "center",
  fontSize: "26px",
  fontWeight: "bold",
}));
