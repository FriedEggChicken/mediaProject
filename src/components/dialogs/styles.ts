import { Box, styled } from "@mui/material";

export const ModalBox = styled(Box)((p) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  p: 4,
}));

export const DialogBox = styled(Box)((p) => ({
  backgroundColor: p.theme.palette.background.default,
}));
