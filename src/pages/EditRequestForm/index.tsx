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
import { useParams } from "react-router-dom";

const EditRequestForm = () => {
  const params = useParams();
  const [charge, setCharge] = useState(3000);
  const [content, setContent] = useState("");
  const [storeAddr, setstoreAddr] = useState("");

  const [openPostcodeA, setOpenPostcodeA] = useState(false);

  const handlePost = useCallback(async () => {
    await axios
      .put(
        `/api/forms/${params.id}`,
        {
          charge: charge,
          content: content,
          storeAddr: storeAddr,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          window.location.replace("/myrequests");
          console.log(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.id, charge, content, storeAddr]);

  const handleA = {
    Open: () => {
      setOpenPostcodeA(true);
    },

    Close: () => {
      setOpenPostcodeA(false);
    },

    selectAddress: (data: any) => {
      setstoreAddr(data.address);
      setOpenPostcodeA(false);
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePost();
  };

  const getFormData = useCallback(async () => {
    await axios
      .get(`/api/forms/${params.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          const tmp = response.data.data;
          setCharge(tmp.charge);
          setContent(tmp.content);
          setstoreAddr(tmp.storeAddr);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getFormData();
  }, [getFormData]);

  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", mb: 5 }}
        variant="h5"
        fontWeight={500}
      >
        신청서 수정
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
              주소
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
                value={storeAddr}
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
          <InputBox sx={{ alignItems: "start" }}>
            <Typography sx={{ mr: 2 }} variant="button">
              내용
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
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </FormControl>
          </InputBox>
          <InputBox>
            <Typography sx={{ mr: 1 }} variant="button">
              수고비&nbsp;
            </Typography>
            <TextField
              required
              sx={{ width: "100px" }}
              variant="standard"
              name="costs"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">원</InputAdornment>
                ),
              }}
              value={charge}
              onChange={(e) => {
                setCharge(Number(e.target.value));
              }}
            />
          </InputBox>
          <InputBox sx={{ ml: 23 }}>
            <Button
              type="submit"
              sx={{ width: 120, borderRadius: 2 }}
              variant="contained"
            >
              수정
            </Button>
          </InputBox>
        </Box>
      </Box>
    </Container>
  );
};

export default EditRequestForm;
