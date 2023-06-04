import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, Rating, Box, Typography } from "@mui/material";
import { Container, Content, TypoBox } from "./styles";
import tmpImg from "@images/logo_tmp.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ReviewListItem = (form: any) => {
  const navigate = useNavigate();
  const [timeAgo, setTimeAgo] = useState("");
  const labels: { [index: string]: string } = {
    0.5: "Useless",
    1: "매우 나쁨",
    1.5: "Poor",
    2: "나쁨",
    2.5: "Ok",
    3: "보통",
    3.5: "Good",
    4: "만족",
    4.5: "Excellent",
    5: "매우 만족",
  };
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const [hover, setHover] = React.useState(-1);
  const {
    content,
    createdDate,
    isWriter,
    reviewId,
    score,
    targetUserId,
    writerId,
  } = form.form;

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
          <Card sx={Container}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Box
                sx={{ width: "320px", height: "100px", wordBreak: "break-all" }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "light",
                  }}
                  variant="h6"
                >
                  {content}
                </Typography>
              </Box>
              <TypoBox
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <TypoBox>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="subtitle1"
                    color="text.secondary"
                  >
                    대행자:&nbsp;
                  </Typography>

                  {isWriter ? (
                    <Typography variant="subtitle1">
                      사용자 {targetUserId}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1">나</Typography>
                  )}
                  {/* <Typography variant="subtitle1">{charge}원</Typography> */}
                </TypoBox>
                <TypoBox sx={{ alignItems: "center" }}>
                  <Rating
                    name="read-only"
                    value={score}
                    getLabelText={getLabelText}
                    readOnly
                  />
                  {score !== null && (
                    <Typography
                      color="text.secondary"
                      sx={{ ml: 1, fontSize: 10, fontWeight: "bold" }}
                    >
                      {labels[hover !== -1 ? hover : score]}
                    </Typography>
                  )}
                </TypoBox>
              </TypoBox>
              <Typography
                sx={{ mb: "1rem" }}
                variant="subtitle2"
                color="text.secondary"
              >
                {/* {storeAddr} */}
              </Typography>
              <TypoBox
                sx={{
                  alignItems: "space-between",
                  justifyContent: "space-between",
                }}
              >
                <TypoBox>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="subtitle1"
                    color="text.secondary"
                  >
                    작성자:&nbsp;
                  </Typography>

                  {!isWriter ? (
                    <Typography variant="subtitle1">
                      사용자 {writerId}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1">나</Typography>
                  )}
                  {/* <Typography variant="subtitle1">{charge}원</Typography> */}
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

export default ReviewListItem;
