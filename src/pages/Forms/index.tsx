import React, { useState, useEffect, useCallback } from "react";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { Container, InputBox } from "./styles";
import DaumPostcodeEmbed from "react-daum-postcode";
import axios from "axios";

const Forms = () => {
  const [current, setCurrent] = useState(new Date().toISOString().slice(0, 16));
  const [address, setAddress] = useState("");
  const [arriveTime, setArriveTime] = useState("");
  const [charge, setCharge] = useState(3000);
  const [contactURL, setContactURL] = useState("");
  const [content, setContent] = useState("");
  const [endnum, setEndnum] = useState(0);
  const [hopenum, setHopenum] = useState(1);
  const [title, setTitle] = useState("");
  const [wayaddr, setWayaddr] = useState("");

  const [openPostcodeA, setOpenPostcodeA] = useState(false);
  const [openPostcodeB, setOpenPostcodeB] = useState(false);

  const handlePost = useCallback(async () => {
    await axios
      .post(
        "/api/posts",
        {
          arriveAddr: address,
          arriveTime: arriveTime,
          charge: charge,
          contactUrl: contactURL,
          content: content,
          endNum: 0,
          hopeNum: hopenum,
          title: title,
          wayAddr: wayaddr,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        window.location.replace("/board");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [
    address,
    arriveTime,
    charge,
    contactURL,
    content,
    hopenum,
    title,
    wayaddr,
  ]);

  const handleA = {
    Open: () => {
      setOpenPostcodeA(true);
    },

    Close: () => {
      setOpenPostcodeA(false);
    },

    selectAddress: (data: any) => {
      setWayaddr(data.address);
      setOpenPostcodeA(false);
    },
  };

  const handleB = {
    Open: () => {
      setOpenPostcodeB(true);
    },

    Close: () => {
      setOpenPostcodeB(false);
    },

    selectAddress: (data: any) => {
      setAddress(data.address);
      setOpenPostcodeB(false);
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePost();
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", mb: 5 }}
        variant="h5"
        fontWeight={500}
      >
        게시글 작성
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <InputBox>
            <Typography sx={{ mr: 2 }} variant="button">
              제목 &nbsp;&nbsp;
            </Typography>
            <FormControl sx={{ width: "350px" }} variant="outlined" required>
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
                id="title"
                aria-describedby="outlined-title-helper-text"
                inputProps={{
                  "aria-label": "title",
                }}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </FormControl>
          </InputBox>
          <InputBox>
            <Typography sx={{ mr: 2 }} variant="button">
              경유지
            </Typography>
            <FormControl sx={{ width: "350px" }} variant="outlined" required>
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
                id="wayaddress"
                aria-describedby="outlined-address-helper-text"
                inputProps={{
                  "aria-label": "wayaddress",
                }}
                value={wayaddr}
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={handleA.Open}
              sx={{ mr: 2, ml: 1, width: 90, borderRadius: 3 }}
            >
              검색
            </Button>
            <Modal open={openPostcodeA} onClose={handleA.Close}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 600,
                  p: 4,
                }}
              >
                <DaumPostcodeEmbed
                  onComplete={handleA.selectAddress}
                  autoClose={false}
                />
              </Box>
            </Modal>
          </InputBox>
          {/* <InputBox>
          <Typography sx={{ mr: 2 }} variant="button">
            경유지 상세주소
          </Typography>
          <TextField
            required
            variant="standard"
            name="waydetailAddress"
            onChange={(e) => {
              setWayaddr(e.target.value);
            }}
          />
        </InputBox> */}
          <InputBox>
            <Typography sx={{ mr: 2 }} variant="button">
              도착지
            </Typography>
            <FormControl sx={{ width: "350px" }} variant="outlined" required>
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
                id="arriveAddress"
                aria-describedby="outlined-arriveAddress-helper-text"
                inputProps={{
                  "aria-label": "arriveAddress",
                }}
                value={address}
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={handleB.Open}
              sx={{ mr: 2, ml: 1, width: 90, borderRadius: 3 }}
            >
              검색
            </Button>
            <Modal open={openPostcodeB} onClose={handleB.Close}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 600,
                  p: 4,
                }}
              >
                <DaumPostcodeEmbed
                  onComplete={handleB.selectAddress}
                  autoClose={false}
                />
              </Box>
            </Modal>
          </InputBox>
          {/* <InputBox>
          <Typography sx={{ mr: 2 }} variant="button">
            도착지 상세주소
          </Typography>
          <TextField
            required
            variant="standard"
            name="arriveDetailAddress"
            onChange={(e) => {
              setDetailAdd(e.target.value);
            }}
          />
        </InputBox> */}
          <InputBox>
            <Typography sx={{ mr: 2 }} variant="button">
              도착 예정시간
            </Typography>
            <TextField
              required
              sx={{
                width: "300px",
                "& input": {
                  textAlign: "center",
                },
              }}
              variant="standard"
              id="arrival-time"
              type="datetime-local"
              value={arriveTime}
              onChange={(e) => {
                setArriveTime(e.target.value);
              }}
              inputProps={{
                min: current,
              }}
            />
          </InputBox>
          <InputBox sx={{ alignItems: "start" }}>
            <Typography sx={{ mr: 2 }} variant="button">
              내용&nbsp;&nbsp;&nbsp;
            </Typography>
            <FormControl sx={{ width: "350px" }} variant="outlined" required>
              <OutlinedInput
                sx={{
                  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "transparent",
                    },
                  backgroundColor: "secondary.main",
                  borderRadius: 2,
                }}
                id="content"
                aria-describedby="outlined-content-helper-text"
                inputProps={{
                  "aria-label": "content",
                }}
                multiline
                rows={10}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </FormControl>
          </InputBox>
          <InputBox>
            <Typography sx={{ mr: 3 }} variant="button">
              대행비&nbsp;
            </Typography>
            <TextField
              sx={{ width: "90px" }}
              required
              variant="standard"
              name="costs"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">원</InputAdornment>
                ),
              }}
              onChange={(e) => {
                setCharge(Number(e.target.value));
              }}
            />
          </InputBox>
          <InputBox>
            <Typography sx={{ mr: 2 }} variant="button">
              희망인원
            </Typography>
            <TextField
              required
              sx={{ width: "90px" }}
              variant="standard"
              name="hopenum"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">명</InputAdornment>
                ),
              }}
              onChange={(e) => {
                setHopenum(Number(e.target.value));
              }}
            />
          </InputBox>
          <InputBox sx={{ mb: 8 }}>
            <Typography sx={{ mr: 2 }} variant="button">
              오픈채팅 URL
            </Typography>
            <TextField
              required
              sx={{ width: "300px" }}
              variant="standard"
              name="chatURL"
              onChange={(e) => {
                setContactURL(e.target.value);
              }}
            />
          </InputBox>

          <InputBox sx={{ ml: 23 }}>
            <Button
              type="submit"
              sx={{ width: 120, borderRadius: 2 }}
              variant="contained"
            >
              등록
            </Button>
          </InputBox>
        </Box>
      </Box>
    </Container>
  );
};

export default Forms;
