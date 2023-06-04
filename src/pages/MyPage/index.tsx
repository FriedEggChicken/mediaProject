import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Container, FrameBox, ItemBox } from "./styles";
import { Typography, FormControl, OutlinedInput, Button } from "@mui/material";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [money, setMoney] = useState(0);
  const [socialType, setSocialType] = useState("");

  const getUserData = useCallback(async () => {
    await axios
      .get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setNickname(response.data.data.nickname);
          setMoney(response.data.data.money);
          setSocialType(response.data.data.socialType);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

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
        window.location.replace("/mypage");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [nickname]);

  const resign = useCallback(() => {
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

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Container>
      <FrameBox>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 4 }}
          variant="h4"
        >
          내 정보
        </Typography>
        <ItemBox>
          <Typography sx={{ mr: 2 }} variant="button">
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
          <Typography sx={{ mr: 2 }} variant="button">
            잔액 :
          </Typography>
          <Typography variant="button">{money} 원</Typography>
        </ItemBox>
        <ItemBox>
          <Typography sx={{ mr: 2 }} variant="button">
            로그인 방식 :
          </Typography>
          <Typography variant="button">
            {socialType === "ROLE_KAKAO" ? "카카오 로그인" : "네이버 로그인"}
          </Typography>
        </ItemBox>
        <ItemBox>
          <Button
            variant="contained"
            onClick={resign}
            sx={{ width: 100, borderRadius: 3 }}
          >
            탈퇴하기
          </Button>
        </ItemBox>
        <ItemBox>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/mypage/myposts`);
            }}
            sx={{ width: 130, borderRadius: 3 }}
          >
            내 게시글 조회
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/mypage/myrequests`);
            }}
            sx={{ ml: 10, width: 130, borderRadius: 3 }}
          >
            내 신청서 조회
          </Button>
        </ItemBox>
      </FrameBox>
    </Container>
  );
};

export default MyPage;
