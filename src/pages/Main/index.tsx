import { Banner, ButtonArea, Container, ListBox } from "./styles";
import { AnyMxRecord } from "dns";
import React, { useState } from "react";
import Bulletin from "@components/ListItem";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface propsType {
  children: any;
}

const Main = () => {
  const navigate = useNavigate();

  const [cards, setCards] = useState([0, 1, 2, 3]);

  return (
    <>
      <Container>
        <Banner>설명 문구</Banner>
        <Typography sx={{ mb: "2rem", ml: "4rem" }} variant="h6">
          최신 게시글
        </Typography>
        <ListBox>
          <Grid
            container
            spacing={"55px"}
            rowSpacing={"60px"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 5,
            }}
          >
            {cards?.map((i) => (
              <Grid item key={i}>
                <Bulletin />
              </Grid>
            ))}
          </Grid>
          <ButtonArea>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(`/board`);
              }}
              sx={{ width: 120, borderRadius: 40 }}
              variant="contained"
            >
              더보기
            </Button>
          </ButtonArea>
        </ListBox>
        <Banner>이용 방법</Banner>
        <ButtonArea>
          <Button
            sx={{ width: 240, height: 70, borderRadius: 20 }}
            variant="contained"
          >
            이용방법 알아보기
          </Button>
        </ButtonArea>
      </Container>
    </>
  );
};

export default Main;
