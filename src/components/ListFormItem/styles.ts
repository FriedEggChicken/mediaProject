import { Box, styled } from "@mui/material";

export const Container = {
  // boxSizing: "border-box",
  width: "350px",
  height: "200px",
  backgroundColor: "secondary.main",
  border: "14px",
  borderColor: "secondary.dark",
  borderRadius: "10px",
  display: "flex",
  ":hover": {
    transform: "translate(0, -8px)",
    // boxShadow: "0 10px 6px",
  },
};

export const Picture = styled(Box)((p) => ({
  display: "flex",
  width: "40%",
  alignItems: "center",
  justifyContent: "center",
}));

export const Content = styled(Box)((p) => ({
  display: "flex",
  flexDirection: "column",
}));

export const Bottom = styled(Box)((p) => ({
  display: "flex",
}));
