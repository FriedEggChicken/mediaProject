import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Rating,
  Box,
  Typography,
} from "@mui/material";
import { Bottom, Container, Content, Picture } from "./styles";
import tmpImg from "@images/logo_tmp.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ListFormItem = (form: any) => {
  const navigate = useNavigate();
  const [timeAgo, setTimeAgo] = useState("");

  const {
    cancelPosition,
    cancelReason,
    charge,
    content,
    createdDate,
    formId,
    isAccept,
    isCancel,
    isEnd,
    postId,
    storeAddr,
    userId,
  } = form.form;

  const caculateTime = useCallback(() => {
    const target = moment(createdDate);
    const current = moment();
    // console.log(current);
    // console.log(target);
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
      <Card sx={Container} onClick={() => navigate(`/forms/${formId}`)}>
        <Content>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography sx={{ mb: "1rem" }} variant="h6">
              {content}
            </Typography>
            <Typography
              sx={{ mb: "1rem" }}
              variant="subtitle1"
              color="text.secondary"
            >
              {storeAddr}
            </Typography>
            <Bottom>
              <Typography variant="subtitle1">{charge}원</Typography>
              <Typography variant="subtitle1" color="text.secondary" ml={20}>
                {timeAgo}
              </Typography>
            </Bottom>
          </CardContent>
        </Content>
      </Card>
      {/* <Container>
        <Picture>
          <img alt="tmp_img" src={tmpImg} width="50%" height="50%" />
        </Picture>
        <Content>
          <Medium>심부름 대행합니다.</Medium>
          <Light>충남 천안시 동남구</Light>
          <Bottom>
            <Medium>5000원</Medium>
            <Light sx={{ ml: "160px" }}>12분 전</Light>
          </Bottom>
        </Content>
      </Container> */}
    </>
  );
};

export default ListFormItem;
