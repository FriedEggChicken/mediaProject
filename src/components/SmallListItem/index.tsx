import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, Box, Typography, Divider } from "@mui/material";
import { TypoBox, Container, Content, Picture } from "./styles";
import tmpImg from "@images/logo_tmp.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const SmallListItem = (post: any) => {
  const navigate = useNavigate();
  const [timeAgo, setTimeAgo] = useState("");

  const {
    arriveAddr,
    arriveTime,
    charge,
    content,
    createdDate,
    endNum,
    hopeNum,
    isEnd,
    postId,
    title,
    userId,
    wayAddr,
  } = post.post;

  const caculateTime = useCallback(() => {
    const target = moment(createdDate);
    const current = moment();

    const diffminute = current.diff(target, "minutes");
    const diffhours = current.diff(target, "hours");
    const diffdays = current.diff(target, "days");
    if (diffminute < 60) {
      setTimeAgo(`${diffminute}분 전`);
    } else if (diffhours < 24) {
      setTimeAgo(`${diffhours}시간 전`);
    } else {
      setTimeAgo(`${diffdays}일 전`);
    }
  }, [createdDate]);

  useEffect(() => {
    caculateTime();
  }, [caculateTime]);

  return (
    <>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "secondary.dark",
          borderRadius: "10px",
        }}
      >
        <Content>
          <Card sx={Container} onClick={() => navigate(`/posts/${postId}`)}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                sx={{ mb: "1rem", textAlign: "center", fontWeight: "light" }}
                variant="h6"
              >
                {title}
              </Typography>

              <TypoBox>
                <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
                  도착
                </Typography>
              </TypoBox>
              <Typography
                sx={{ mb: "1rem" }}
                variant="subtitle2"
                color="text.secondary"
              >
                {arriveAddr}
              </Typography>
              <TypoBox>
                <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
                  경유
                </Typography>
              </TypoBox>
              <Typography
                sx={{ mb: "1rem" }}
                variant="subtitle2"
                color="text.secondary"
              >
                {wayAddr}
              </Typography>
              <TypoBox>
                <TypoBox sx={{ width: "250px" }}>
                  <Typography
                    sx={{ mr: "10px", fontWeight: "bold" }}
                    variant="subtitle1"
                  >
                    대행비
                  </Typography>
                  <Typography variant="subtitle1">{charge}원</Typography>
                </TypoBox>
                <Typography variant="subtitle1" color="text.secondary">
                  {timeAgo}
                </Typography>
              </TypoBox>
            </CardContent>
          </Card>
        </Content>
      </Box>
    </>
  );
};

export default SmallListItem;
