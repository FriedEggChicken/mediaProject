import { Box, styled } from "@mui/material";

export const Container = {
  width: "350px",
  backgroundColor: "secondary.main",
  borderRadius: "10px",
  display: "flex",
  ":hover": {
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.3)",
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
  alignItems: "center",
  justifyContent: "center",
}));

export const Bottom = styled(Box)((p) => ({
  display: "flex",
}));

export const TypoBox = styled(Box)((p) => ({
  display: "flex",
}));
