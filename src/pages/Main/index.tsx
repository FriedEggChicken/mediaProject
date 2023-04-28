import { Container } from "./styles";
import { AnyMxRecord } from "dns";
import React from "react";

interface propsType {
  children: any;
}

const Main = (props: propsType) => {
  return (
    <>
      <Container>{props.children}</Container>
    </>
  );
};

export default Main;
