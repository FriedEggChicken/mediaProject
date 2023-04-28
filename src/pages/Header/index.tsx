import { Container, HeaderBox, MenuBtnBox, SmallBox } from "./styles";
import { NavigateFunction, useNavigate } from "react-router-dom";
import HeaderBtn from "../../components/HeaderBtn";
import React from "react";
import MenuBox from "./MenuBox";

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
          <SmallBox>🛵</SmallBox>
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
              isClicked={pathname === "/review"}
              handleClick={() => {
                navigate("/review");
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
