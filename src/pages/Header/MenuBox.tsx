import React, { useState } from "react";
import { Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
import HeaderBtn from "@components/HeaderBtn";
import KaKaoButtonImg from "@images/kakao_login_medium_wide.png";

const REST_API_KEY = "dd6cf43c13cb95bebf844aa4be90db27";
const REDIRECT_URI = "http://localhost:3000/oauth";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const MenuBox = () => {
  // const [anchorE1, setAnchorE1] = useState<HTMLElement | null>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  // const open: boolean = Boolean(anchorE1);

  const handleClick: () => void = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <HeaderBtn
        isClicked={false}
        handleClick={() => {
          handleClick();
        }}
      >
        로그인
      </HeaderBtn>
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
