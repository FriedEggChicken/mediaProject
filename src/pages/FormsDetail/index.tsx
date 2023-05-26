import React, { useEffect, useCallback, useState } from "react";
import {
  Container,
  FrameBox,
  TopContentBox,
  TypoBox,
  BottomContentBox,
} from "./styles";
import { Typography, Box, Divider, Button } from "@mui/material";
import MapBox from "@components/MapBox";
import { useParams } from "react-router-dom";
import axios from "axios";

const FormsDetail = () => {
  const params = useParams();
  const [data, setData] = useState<any>({});

  const getFormsData = useCallback(async () => {
    await axios
      .get(`/api/forms/${params.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
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
    getFormsData();
  }, [getFormsData]);

  return (
    <Container>
      <FrameBox>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mt: 5 }}
          variant="h4"
        >
          신청서 상세정보
        </Typography>
        <TopContentBox>
          <TypoBox>
            <Typography variant="subtitle1">
              {data?.isEnd ? "거래완료" : "거래중"}
            </Typography>
          </TypoBox>
          <TypoBox>
            <Typography variant="subtitle1" color="text.secondary">
              신청자
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {data?.isWriter === true ? "본인" : `사용자 ${data?.userId}`}
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
              가게 주소
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {data?.storeAddr}
            </Typography>
          </TypoBox>
        </TopContentBox>
        <Box sx={{ mt: 2 }}>
          <MapBox>{data?.storeAddr}</MapBox>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <BottomContentBox>{data?.content}</BottomContentBox>
        </Box>
        {/* <MapBox>{data?.arriveAddr}</MapBox> */}
      </FrameBox>
    </Container>
  );
};

export default FormsDetail;
