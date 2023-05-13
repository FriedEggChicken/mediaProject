import { Container, HeaderBox, MenuBtnBox, SmallBox } from "./styles";
import { NavigateFunction, useNavigate } from "react-router-dom";
import HeaderBtn from "@components/HeaderBtn";
import React from "react";
import MenuBox from "./MenuBox";
import { Box, Button } from "@mui/material";
import logoImg from "@images/logo_tmp.png";

/**
 * 화면 상단 위치에 고정된 헤더
 */
const Header = () => {
  const pathname: string = window.location.pathname;
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <Container>
        <HeaderBox>
          <SmallBox>
            <Button
              sx={{
                "&:hover": {
                  background: "none",
                },
              }}
              onClick={() => navigate("/")}
            >
              <img alt="tmp_logo" src={logoImg} height="50px" />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  ml: "0.35rem",
                  fontWeight: 800,
                }}
              >
                <span>동네</span>
                <span>보따리</span>
              </Box>
            </Button>
          </SmallBox>
          <MenuBtnBox>
            <HeaderBtn
              isClicked={pathname === "/notice"}
              handleClick={() => {
                navigate("/notice");
              }}
            >
              공지사항
            </HeaderBtn>
            <HeaderBtn
              isClicked={pathname === "/board"}
              handleClick={() => {
                navigate("/board");
              }}
            >
              게시판
            </HeaderBtn>
            <HeaderBtn
              isClicked={pathname === "/reviews"}
              handleClick={() => {
                navigate("/reviews");
              }}
            >
              이용 후기
            </HeaderBtn>
            <MenuBox />
          </MenuBtnBox>
        </HeaderBox>
      </Container>
    </>
  );
};

export default Header;
