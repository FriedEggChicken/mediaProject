import React, { useEffect, useState } from "react";
import {
  Container,
  FrameBox,
  TopContentBox,
  TypoBox,
  BottomContentBox,
  TypoContent,
} from "./styles";
import { Typography, Box, Divider } from "@mui/material";

import { useParams } from "react-router-dom";

const NoticeDetail = () => {
  const params = useParams();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (params.id === "1") {
      setData({
        name: "동네 보따리에 오신 것을 환영합니다!",
        date: "2023-05-25",
        content: `
        동네 보따리를 이용해 주셔서 감사합니다!`,
        num: 24,
        idx: 1,
      });
    }
    if (params.id === "2") {
      setData({
        name: "수수료 안내",
        date: "2023-05-26",
        content: "대행비에 대한 수수료 안내입니다.",
        num: 24,
        idx: 2,
      });
    }
    if (params.id === "3") {
      setData({
        name: "파기 관련 내용 안내",
        date: "2023-05-27",
        content: "파기 관련 내용 안내입니다.",
        num: 24,
        idx: 3,
      });
    }
  }, []);

  return (
    <Container>
      <FrameBox>
        <TopContentBox>
          <TypoContent>
            <Box>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                  mb: 2,
                  fontWeight: "light",
                }}
                variant="h5"
                color="text.secondary"
              >
                공지사항
              </Typography>
            </Box>
            <Divider />
            <Typography
              sx={{ display: "flex", justifyContent: "center", mb: 5, mt: 3 }}
              variant="h5"
            >
              {data?.name}
            </Typography>
            <TypoBox sx={{ paddingLeft: "10px" }}>
              <Typography
                fontWeight={600}
                variant="subtitle1"
                color="text.secondary"
              >
                작성일
              </Typography>
              <Typography sx={{ ml: 2 }} variant="subtitle1">
                {data?.date}
              </Typography>
            </TypoBox>
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
      </FrameBox>
    </Container>
  );
};

export default NoticeDetail;
