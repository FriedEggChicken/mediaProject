import React from "react";
import {
  Container,
  FrameBox,
  TopContentBox,
  TypoBox,
  BottomContentBox,
} from "./styles";
import { Typography, Box } from "@mui/material";
import MapBox from "@components/MapBox";
const Bulletin = () => {
  return (
    <Container>
      <FrameBox>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mt: 5 }}
          variant="h4"
        >
          천안 심부름 대행합니다
        </Typography>
        <TopContentBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              작성자
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              배달원 1
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              수고비
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              5,000원
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              작성일
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              2022-12-25 18:00
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              오픈채팅 URL
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              https://open.kakao.com/
            </Typography>
          </TypoBox>
        </TopContentBox>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <BottomContentBox></BottomContentBox>
        </Box>
        <Box sx={{ mt: 2 }}>
          <MapBox></MapBox>
        </Box>
      </FrameBox>
    </Container>
  );
};

export default Bulletin;
