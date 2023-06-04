import React, { useEffect, useCallback, useState } from "react";
import {
  Container,
  FrameBox,
  TopContentBox,
  TypoBox,
  BottomContentBox,
  TypoContent,
} from "./styles";
import { Typography, Box, Divider, Button } from "@mui/material";
import MapBox from "@components/MapBox";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FormDialogs from "@components/dialogs/FormDialogs";
import useDialog from "@hooks/useDialog";
import MapBoxx from "@components/MapBoxx";
import Swal from "sweetalert2";

const Bulletin = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>({});
  const formDialogs = useDialog();

  const getPostData = useCallback(async () => {
    await axios
      .get(`/api/posts/${params.id}`, {
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

  const handleRequest = useCallback(async (values: Array<any>) => {
    await axios
      .post(
        `/api/forms`,
        {
          charge: values[1],
          content: values[2],
          postId: params.id,
          storeAddr: values[0],
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          console.log("요청 성공");
          Swal.fire({
            icon: "info",
            title: "신청 하였습니다",
            text: "내 신청서에서 확인하세요",
            confirmButtonText: "네",
          });
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
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            fontWeight: "light",
          }}
          variant="h4"
        >
          {data?.title}
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
                  {data?.isEnd ? "거래완료" : "신청서 접수중"}
                </Typography>
              </TypoBox>
              <TypoBox sx={{ alignItems: "center" }}>
                <Typography
                  fontWeight={600}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  작성자
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  사용자 {data?.userId}
                </Typography>
                <Box sx={{ ml: 1 }} />
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(`/reviews/${data?.userId}`);
                  }}
                  sx={{
                    mr: 2,
                    ml: 1,
                    width: 80,
                    borderRadius: 3,
                    fontSize: 9,
                    fontWeight: "bold",
                  }}
                >
                  리뷰 조회
                </Button>
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
              <TypoBox>
                <Typography
                  fontWeight={600}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  희망 인원
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 2, mr: 4 }}>
                  {data?.hopeNum} 명
                </Typography>
                <Typography
                  fontWeight={600}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  거래완료 인원
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  {data?.endNum} 명
                </Typography>
              </TypoBox>
              <TypoBox>
                <Typography
                  fontWeight={600}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  오픈채팅 URL
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  {data?.contactUrl}
                </Typography>
              </TypoBox>
              <TypoBox>
                <Typography
                  fontWeight={600}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  도착 예정 시간
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 2 }}>
                  {data?.arriveTime}
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
              경유지
            </Typography>
          </TypoBox>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {data?.wayAddr}
          </Typography>
          <MapBox>{data?.wayAddr}</MapBox>
          <TypoBox>
            <Typography
              fontWeight={600}
              variant="h6"
              color="text.secondary"
              sx={{ mb: 1, mt: 1 }}
            >
              도착지
            </Typography>
          </TypoBox>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {data?.arriveAddr}
          </Typography>
          <MapBoxx>{data?.arriveAddr}</MapBoxx>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data?.isWriter === false ? (
            <>
              <Button
                variant="contained"
                onClick={formDialogs.open}
                sx={{ mt: 2, width: 160, borderRadius: 3 }}
              >
                신청서 작성
              </Button>

              <FormDialogs
                open={formDialogs.isOpen}
                onClose={formDialogs.close}
                title="신청서 작성"
                type="text"
                values={formDialogs.values}
                setValues={formDialogs.setValues}
                onEdit={handleRequest}
              />
            </>
          ) : (
            <></>
          )}
        </Box>
      </FrameBox>
    </Container>
  );
};

export default Bulletin;
