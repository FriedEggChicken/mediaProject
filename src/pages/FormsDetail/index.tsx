import React, { useEffect, useCallback, useState } from "react";
import {
  Container,
  FrameBox,
  TopContentBox,
  TypoBox,
  BottomContentBox,
  TypoContent,
} from "./styles";
import { Typography, Box, Divider } from "@mui/material";
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
        console.log(response);
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
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            fontWeight: "light",
          }}
          variant="h4"
        >
          신청서 상세정보
        </Typography>
        <TopContentBox>
          <TypoContent>
            <Box sx={{ flex: 1 }}>
              <TypoBox>
                <Typography
                  fontWeight={600}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  거래 상태
                </Typography>
                <Typography sx={{ ml: 2 }} variant="subtitle1">
                  {data?.isEnd && !data?.isCancel
                    ? "거래완료"
                    : data?.isCancel && data?.isCancel && data?.isAccept
                    ? "파기완료"
                    : !data?.isAccept
                    ? "신청서 확인중"
                    : "거래중"}
                </Typography>
              </TypoBox>
              <TypoBox>
                <Typography
                  fontWeight={600}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  신청자
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  {data?.isWriter === true ? "본인" : `사용자 ${data?.userId}`}
                </Typography>
              </TypoBox>
              <TypoBox>
                <Typography
                  fontWeight={600}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  대행비
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  {data?.charge}원
                </Typography>
              </TypoBox>
              <TypoBox>
                <Typography
                  fontWeight={600}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  작성일
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  {data?.createdDate}
                </Typography>
              </TypoBox>
            </Box>
            <Divider orientation="vertical" flexItem />
            <BottomContentBox>
              <Typography
                sx={{ mb: 1 }}
                fontWeight={600}
                variant="subtitle1"
                color="text.secondary"
              >
                내용
              </Typography>
              <Typography variant="subtitle1" lineHeight={1.2}>
                {data?.content}
              </Typography>
            </BottomContentBox>
          </TypoContent>
        </TopContentBox>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TypoBox>
            <Typography
              fontWeight={600}
              variant="h6"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              가게 주소
            </Typography>
          </TypoBox>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {data?.storeAddr}
          </Typography>
          <MapBox>{data?.storeAddr}</MapBox>
        </Box>
      </FrameBox>
    </Container>
  );
};

export default FormsDetail;
