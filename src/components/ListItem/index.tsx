import React from "react";
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

const ListItem = () => {
  const navigate = useNavigate();

  return (
    <>
      <Card sx={Container} onClick={() => navigate(`/posts`)}>
        <Picture>
          <CardMedia
            component="img"
            sx={{ width: 131 }}
            image={tmpImg}
            alt="tmp_img"
          />
        </Picture>
        <Content>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography sx={{ mb: "1rem" }} variant="h6">
              심부름 대행합니다.
            </Typography>
            <Typography
              sx={{ mb: "1rem" }}
              variant="subtitle1"
              color="text.secondary"
            >
              충남 천안시 동남구
            </Typography>
            <Bottom>
              <Typography variant="subtitle1">5000원</Typography>
              <Typography variant="subtitle1" color="text.secondary" ml={20}>
                12분 전
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

export default ListItem;
