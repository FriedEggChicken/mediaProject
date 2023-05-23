import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Menu,
  Fade,
  MenuItem,
} from "@mui/material";
import HeaderBtn from "@components/HeaderBtn";
import KaKaoButtonImg from "@images/kakao_login_medium_wide.png";
import { KAKAO_AUTH_URL } from "@utils/Constants";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import MenuIcon from "@mui/icons-material/Menu";

const MenuBox = () => {
  const navigate = useNavigate();
  // const userCookie = useCookies(["userId"]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen: boolean = Boolean(anchorEl);
  const [isLogin, setIsLogin] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const menuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isLogin) setAnchorEl(event.currentTarget);
    else {
      handleClick();
    }
  };

  const menuClose = () => {
    setAnchorEl(null);
  };
  const handleClick: () => void = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {isLogin ? (
        <HeaderBtn
          isClicked={false}
          handleClick={(event) => {
            menuClick(event);
          }}
        >
          <MenuIcon />
        </HeaderBtn>
      ) : (
        <HeaderBtn
          isClicked={false}
          handleClick={() => {
            handleClick();
          }}
        >
          로그인
        </HeaderBtn>
      )}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={menuClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            navigate("/mypage");
            menuClose();
          }}
        >
          내 정보
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/delivery");
            menuClose();
          }}
        >
          배달 현황
        </MenuItem>
        <MenuItem
          onClick={() => {
            menuClose();
            Swal.fire({
              icon: "question",
              title: "로그아웃",
              text: "로그아웃 하시겠습니까?",
              showCancelButton: true,
              confirmButtonText: "네",
              cancelButtonText: "아니요",
            }).then((res) => {
              if (res.isConfirmed) {
                sessionStorage.clear();
                window.location.replace("/");
              }
            });
          }}
        >
          로그아웃
        </MenuItem>
      </Menu>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: 20,
          },
        }}
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle sx={{ backgroundColor: "background.default", pb: 3 }}>
          <Box sx={{ fontSize: 24 }}>LOGIN</Box>
          <Box sx={{ fontSize: 12, color: "primary.light" }}>
            소셜 로그인을 통해 시작할 수 있습니다
          </Box>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "background.default" }}>
          <a href={KAKAO_AUTH_URL}>
            <img src={KaKaoButtonImg} alt="kakao-login" />
          </a>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default MenuBox;
