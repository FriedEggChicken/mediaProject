import { Box, LinearProgress } from "@mui/material";
// import { kakaoLogin } from "@utils/Api";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const getKakaoToken = useCallback(async (code: string | null) => {
    axios
      .post("/api/users/kakao-login", {
        code: code,
        redirectUrl: window.location.origin + window.location.pathname,
      })
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        if (response.data) {
          // localStorage.setItem("token", response.data.accessToken);
          // localStorage.setItem("rtoken", response.data.refreshToken);
          sessionStorage.setItem("token", response.data.accessToken);
          sessionStorage.setItem("rtoken", response.data.refreshToken);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getKakaoToken(code);
  }, [getKakaoToken]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "400px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 30,
        }}
      >
        로그인 중입니다. 잠시만 기다려 주세요.
      </Box>
      <LinearProgress />
    </>
  );
};

export default Login;
