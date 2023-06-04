import { Box, styled } from "@mui/material";

export const Container = styled(Box)((p) => ({
  width: "100%",
  height: "1200px",
}));

export const Banner = styled(Box)((p) => ({
  display: "flex",
  // width: "100%",
  // height: "400px",
  // backgroundColor: p.theme.palette.secondary.dark,
  justifyContent: "center",
  alignItems: "center",
  // flexDirection: "column",
  // marginBottom: 30,\
}));

export const ListBox = styled(Box)((p) => ({
  width: "100%",
  marginBottom: 30,
}));

export const ButtonArea = styled(Box)((p) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const IntroBox = styled(Box)((p) => ({
  width: "100%",
  height: "500px",
  position: "relative",
  "::after": {
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: `#00000080`,
    zIndex: 10,
  },
}));

export const IntroMessage = styled(Box)((p) => ({
  width: "100%",
  height: "100%",

  color: "white",
}));
