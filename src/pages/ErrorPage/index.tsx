import React from "react";
import { useLocation } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Container, ErrorBox, MessageBox, iconStyle } from "./styles";

const ErrorPage = () => {
  const location = useLocation();
  const urlState = location.state;

  return (
    <Container>
      <ErrorBox>
        <WarningAmberIcon sx={iconStyle} />
        <MessageBox>
          {urlState ? urlState.msg : "비정상적인 접근입니다."}
        </MessageBox>
        {urlState && <MessageBox>이용에 불편을 드려 죄송합니다.</MessageBox>}
      </ErrorBox>
    </Container>
  );
};

export default ErrorPage;
