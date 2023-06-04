import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Menu,
  Fade,
  MenuItem,
  Button,
  Typography,
  FormControl,
  OutlinedInput,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import HeaderBtn from "@components/HeaderBtn";
import KaKaoButtonImg from "@images/kakao_login_medium_wide.png";
import { KAKAO_AUTH_URL } from "@utils/Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import MenuIcon from "@mui/icons-material/Menu";
import { ItemBox } from "./styles";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import RateReviewIcon from "@mui/icons-material/RateReview";

const MenuBox = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [money, setMoney] = useState(0);
  const [socialType, setSocialType] = useState("");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen: boolean = Boolean(anchorEl);
  const [isLogin, setIsLogin] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const getUserData = useCallback(async () => {
    await axios
      .get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          setNickname(response.data.data.nickname);
          setMoney(response.data.data.money);
          setSocialType(response.data.data.socialType);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const changeNickName = useCallback(async () => {
    await axios
      .patch(
        "/api/users/profile",
        { nickname: nickname },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        handleMyPageModal.Close();
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }, [nickname]);

  const resign = useCallback(() => {
    handleMyPageModal.Close();
    Swal.fire({
      icon: "warning",
      title: "회원탈퇴",
      text: "회원탈퇴 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .post(
            "/api/users/resign",
            {},
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.success === true) {
              sessionStorage.clear();
              window.location.replace("/");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }, []);

  const handleNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

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

  const handleMyPageModal = {
    Open: () => {
      setOpenModal(true);
      getUserData();
    },

    Close: () => {
      setOpenModal(false);
    },
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
        PaperProps={{
          style: {
            borderRadius: 10,
            backgroundColor: "#FFFBF1",
          },
        }}
      >
        <MenuItem
          sx={{ color: "#656E65", fontWeight: "light" }}
          onClick={() => {
            // navigate("/mypage");
            handleMyPageModal.Open();
            menuClose();
          }}
        >
          내 정보
        </MenuItem>
        <MenuItem
          sx={{ color: "#656E65", fontWeight: "light" }}
          onClick={() => {
            navigate("/delivery");
            menuClose();
          }}
        >
          대행 현황
        </MenuItem>
        <MenuItem
          sx={{ color: "#656E65", fontWeight: "light" }}
          onClick={() => {
            navigate("/consumer");
            menuClose();
          }}
        >
          주문 현황
        </MenuItem>
        <MenuItem
          sx={{ color: "#656E65", fontWeight: "light" }}
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
      <Dialog
        PaperProps={{
          style: {
            borderRadius: 20,
          },
        }}
        open={openModal}
        onClose={handleMyPageModal.Close}
      >
        <DialogTitle
          sx={{
            backgroundColor: "background.default",
            pb: 3,
            textAlign: "center",
          }}
        >
          <Box sx={{ fontSize: 24 }}>내 정보</Box>
          {/* <Box sx={{ fontSize: 12, color: "primary.light" }}>내 정보</Box> */}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "background.default",
          }}
        >
          <ItemBox>
            <Typography sx={{ mr: 2 }} fontWeight={600} variant="button">
              닉네임 :
            </Typography>
            <FormControl sx={{ width: "250px" }} variant="outlined">
              <OutlinedInput
                sx={{
                  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "transparent",
                    },
                  backgroundColor: "secondary.main",
                  borderRadius: 2,
                  height: 40,
                }}
                id="nickname"
                aria-describedby="outlined-title-helper-text"
                inputProps={{
                  "aria-label": "nickname",
                }}
                value={nickname}
                onChange={handleNicknameChange}
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={changeNickName}
              sx={{ mr: 2, ml: 1, width: 90, borderRadius: 3 }}
            >
              변경하기
            </Button>
          </ItemBox>
          <ItemBox>
            <Typography sx={{ mr: 2 }} fontWeight={600} variant="button">
              잔액 :
            </Typography>
            <Typography variant="button">{money} 원</Typography>
          </ItemBox>
          <ItemBox>
            <Typography sx={{ mr: 2 }} fontWeight={600} variant="button">
              로그인 방식 :
            </Typography>
            <Typography variant="button">
              {socialType === "ROLE_KAKAO" ? "카카오 로그인" : "네이버 로그인"}
            </Typography>
            <Button
              variant="contained"
              onClick={resign}
              sx={{ ml: 17, width: 90, borderRadius: 3 }}
            >
              탈퇴하기
            </Button>
          </ItemBox>
          <Divider sx={{ borderBottom: "1px solid secondary.main", mb: 3 }} />
          <ItemBox sx={{ justifyContent: "space-evenly" }}>
            <Tooltip title="내 게시글 조회" placement="bottom">
              <IconButton
                aria-label="mypost"
                size="large"
                onClick={() => {
                  handleMyPageModal.Close();
                  navigate(`/myposts`);
                }}
              >
                <ContentPasteSearchIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="내 신청서 조회" placement="bottom">
              <IconButton
                aria-label="myrequest"
                size="large"
                onClick={() => {
                  handleMyPageModal.Close();
                  navigate(`/myrequests`);
                }}
              >
                <MarkEmailReadIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="작성한 리뷰 조회" placement="bottom">
              <IconButton
                aria-label="myreview"
                size="large"
                onClick={() => {
                  handleMyPageModal.Close();
                  navigate(`/myreviews`);
                }}
              >
                <RateReviewIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </ItemBox>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default MenuBox;
