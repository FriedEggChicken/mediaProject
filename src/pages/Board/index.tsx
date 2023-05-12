import React from "react";
import { Container } from "./styles";

interface propsType {
  children: any;
}

const Board = (props: propsType) => {
  return <Container>{props.children}</Container>;
};

export default Board;
