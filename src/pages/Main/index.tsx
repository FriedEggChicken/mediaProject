import { Banner, ButtonArea, Container, IntroMessage, ListBox } from "./styles";
import React, { useState, useCallback, useEffect } from "react";
import Bulletin from "@components/SmallListItem";
import { Button, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import mainImg from "@images/realrealmain.png";
import useScrollFadeIn from "@hooks/useScrollFadeIn";

interface propsType {
  children: any;
}

const Main = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [tmp, setTmp] = useState([
    {
      postId: 16,
      userId: 7,
      title: "대행가요",
      content: "대행합니다",
      isEnd: false,
      arriveAddr: "서울 강남구 가로수길 5",
      wayAddr: "경기 고양시 덕양구 수원문산고속도로 49",
      arriveTime: "2023-05-31 22:08:00",
      hopeNum: 3,
      endNum: 0,
      charge: 5000,
      createdDate: "2023-05-30 13:42:59",
    },
    {
      postId: 6,
      userId: 7,
      title: "심부름 대행 해용",
      content: "대행합니다",
      isEnd: false,
      arriveAddr: "경기 수원시 영통구 월드컵로 164",
      wayAddr: "충북 충주시 수안보면 발화동길 11",
      arriveTime: "2023-05-31 21:40:00",
      hopeNum: 3,
      endNum: 0,
      charge: 7000,
      createdDate: "2023-05-30 13:42:26",
    },
    {
      postId: 17,
      userId: 7,
      title: "대행빨리가요",
      content: "가요",
      isEnd: false,
      arriveAddr: "경기 성남시 분당구 경부고속도로 409",
      wayAddr: "충북 보은군 속리산면 백현길 13-3",
      arriveTime: "2023-06-28 22:08:00",
      hopeNum: 2,
      endNum: 0,
      charge: 10000,
      createdDate: "2023-05-30 13:09:05",
    },
    {
      postId: 7,
      userId: 7,
      title: "대행해유",
      content: "대행합니다",
      isEnd: false,
      arriveAddr: "제주특별자치도 서귀포시 가가로 14",
      wayAddr: "충북 괴산군 감물면 감물로 7",
      arriveTime: "2023-06-28 18:42:00",
      hopeNum: 5,
      endNum: 0,
      charge: 10000,
      createdDate: "2023-05-30 13:41:20",
    },
    {
      postId: 18,
      userId: 7,
      title: "대행가요",
      content: "가요",
      isEnd: false,
      arriveAddr: "서울 광진구 군자로 1",
      wayAddr: "경기 연천군 청산면 백궁길 7",
      arriveTime: "2023-05-31 22:09:00",
      hopeNum: 2,
      endNum: 0,
      charge: 10000,
      createdDate: "2023-05-30 13:41:59",
    },
    {
      postId: 13,
      userId: 8,
      title: "대행합니다",
      content: "가요ㅇ",
      isEnd: false,
      arriveAddr: "경남 거제시 아주1길 5",
      wayAddr: "세종특별자치시 연동면 내송길 5",
      arriveTime: "2023-05-30 23:52:00",
      hopeNum: 3,
      endNum: 0,
      charge: 10000,
      createdDate: "2023-05-29 15:19:51",
    },
    {
      postId: 15,
      userId: 7,
      title: "대행대행",
      content: "대행 가요\n대행 가요\n대행 가요\n대행 가요\n대행 가요",
      isEnd: false,
      arriveAddr: "경기 성남시 분당구 경부고속도로 409",
      wayAddr: "충북 보은군 속리산면 백현길 13-3",
      arriveTime: "2023-06-21 21:48:00",
      hopeNum: 2,
      endNum: 0,
      charge: 10000,
      createdDate: "2023-05-30 12:48:22",
    },
  ]);
  const animatedItem = useScrollFadeIn();
  const beforeLoginAnimate = useScrollFadeIn();
  const getPostsData = useCallback(async () => {
    await axios
      .get(`/api/posts?type=최신순`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          setPostData(response.data.pageData.content);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getPostsData();
  }, [getPostsData]);

  return (
    <>
      <Container>
        <Banner>
          <IntroMessage sx={{ flex: 1 }} {...animatedItem}>
            <Typography
              sx={{ textAlign: "center", mt: 5, fontWeight: "light" }}
              variant="h4"
              color="primary.main"
              gutterBottom
            >
              멀리 가지 마세요
            </Typography>
            <Typography
              sx={{ textAlign: "center", mt: 5, fontWeight: "light" }}
              variant="h4"
              color="primary.main"
              gutterBottom
            >
              동네 이웃에게 보따리를 받으세요
            </Typography>
          </IntroMessage>
          <Box sx={{ flex: 1 }}>
            <a href="http://www.freepik.com">
              <img
                style={{
                  objectFit: "cover",
                  cursor: "default",
                }}
                src={mainImg}
                width="100%"
                height="100%"
                alt="Designed by slidesgo / Freepik"
              />
            </a>
          </Box>
        </Banner>
        {sessionStorage.getItem("token") === null && (
          <Box
            sx={{
              position: "absolute",
              top: "890px",
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontWeight: "bolder", fontSize: 30 }}
              color="primary.main"
              gutterBottom
            >
              로그인 후 확인할 수 있어요
            </Typography>
          </Box>
        )}
        <Typography
          sx={{ mb: "2rem", ml: "4rem", mt: 10, fontWeight: "bold" }}
          variant="h6"
        >
          최신 게시글
        </Typography>
        {sessionStorage.getItem("token") === null ? (
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
              {tmp
                ?.slice(0, 6)
                .reverse()
                .map((post: any, i: number) => (
                  <Grid item key={i}>
                    <Bulletin post={post} />
                  </Grid>
                ))}
            </Grid>

            <Box
              sx={{
                position: "absolute",

                top: "570px",
                height: "100%",
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: "blur(3px)",
              }}
            />
          </ListBox>
        ) : (
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
              {postData
                ?.slice(0, 6)
                .reverse()
                .map((post: any, i: number) => (
                  <Grid item key={i}>
                    <Bulletin post={post} />
                  </Grid>
                ))}
            </Grid>
            <ButtonArea>
              <Button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/board`);
                }}
                sx={{ width: 100, borderRadius: 40, fontWeight: "bold" }}
                variant="contained"
              >
                더보기
              </Button>
            </ButtonArea>
          </ListBox>
        )}
        {/* <Banner>이용 방법</Banner>
        <ButtonArea>
          <Button
            sx={{ width: 240, height: 70, borderRadius: 20 }}
            variant="contained"
          >
            이용방법 알아보기
          </Button>
        </ButtonArea> */}
      </Container>
    </>
  );
};

export default Main;
