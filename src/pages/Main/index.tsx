import { Banner, Container } from "./styles";
import { AnyMxRecord } from "dns";
import React from "react";
import Bulletin from "@components/ListItem";

interface propsType {
  children: any;
}

const Main = () => {
  return (
    <>
      <Container>
        <Banner>설명 문구</Banner>
        <Bulletin />
      </Container>
    </>
  );
};

export default Main;
