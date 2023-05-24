import React, { useEffect, useCallback, useState } from "react";
import {
  Container,
  FrameBox,
  TopContentBox,
  TypoBox,
  BottomContentBox,
} from "./styles";
import { Typography, Box, Divider } from "@mui/material";
import MapBox from "@components/MapBox";
import { useParams } from "react-router-dom";
import axios from "axios";

const Bulletin = () => {
  const params = useParams();
  const [data, setData] = useState<any>({});

  const getPostData = useCallback(async () => {
    await axios
      .get(`/api/posts/${params.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data) {
          // console.log(response.data);
          setData(response.data.data);
          // console.log(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  return (
    <Container>
      <FrameBox>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mt: 5 }}
          variant="h4"
        >
          {data?.title}
        </Typography>
        <TopContentBox>
          <TypoBox>
            <Typography variant="subtitle1">
              {data?.isEnd ? "거래완료" : "거래중"}
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              작성자
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              사용자 {data?.userId}
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              수고비
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {data?.charge}원
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              작성일
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {data?.createdDate}
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              희망 인원
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2, mr: 4 }}>
              {data?.hopeNum} 명
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              거래완료 인원
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {data?.endNum} 명
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              오픈채팅 URL
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {data?.contactUrl}
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              도착지
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {data?.arriveAddr}
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              도착 예정 시간
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {data?.arriveTime}
            </Typography>
          </TypoBox>
        </TopContentBox>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <BottomContentBox>{data?.content}</BottomContentBox>
        </Box>
        <Box sx={{ mt: 2 }}>
          <MapBox>{data?.wayAddr}</MapBox>
        </Box>
        {/* <MapBox>{data?.arriveAddr}</MapBox> */}
      </FrameBox>
    </Container>
  );
};

export default Bulletin;
