import { Box, styled } from "@mui/material";

export const Container = {
  width: "516px",
  height: "160px",
  backgroundColor: "secondary.main",
  border: "secondary.dark",
  borderRadius: "30px",
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
