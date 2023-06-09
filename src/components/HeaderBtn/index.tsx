import { Button } from "@mui/material";
import React from "react";

interface propsType {
  children: any;
  isClicked: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}
const HeaderBtn = (props: propsType) => {
  return (
    <>
      <Button
        sx={{
          fontSize: 20,
          fontWeight: props.isClicked ? "bold" : "lighter",
          letterSpacing: "0.25px",
          p: 0,
          mx: 3,
          color: props.isClicked ? "primary" : "primary.light",
        }}
        variant="text"
        onClick={props.handleClick}
      >
        {props.children}
      </Button>
    </>
  );
};

export default HeaderBtn;
