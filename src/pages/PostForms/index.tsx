import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Container } from "./styles";
import {
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import Swal from "sweetalert2";
import Forms from "@components/ListFormItem";

import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams } from "react-router-dom";

const PostForms = () => {
  const navigate = useNavigate();

  //postId
  const params = useParams();

  const [formsData, setFormsData] = useState([]);

  const getPostsForms = useCallback(async () => {
    await axios
      .get(`/api/posts/${params.id}/forms`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          // console.log(response.data);
          setFormsData(response.data.pageData.content);
          // console.log(postData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const acceptForm = useCallback((formId: number) => {
    Swal.fire({
      icon: "question",
      title: "신청서 수락",
      text: "수락 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .post(
            `/api/forms/${formId}/acceptance`,
            {},
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            // console.log(response);
            if (response.data.success === true) {
              window.location.reload();
              console.log("신청 수락 완료");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }, []);

  const rejectAccept = useCallback(async (formid: number) => {
    Swal.fire({
      icon: "question",
      title: "거래 파기 수락",
      text: "파기 수락하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .post(
            `/api/deliveries/${formid}/cancel-acceptance`,
            { isAccept: "false" },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            // console.log(response);
            if (response.data.success === true) {
              window.location.reload();
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }, []);

  useEffect(() => {
    getPostsForms();
  }, [getPostsForms]);

  return (
    <Container>
      {formsData?.length === 0 ? (
        <Box
          sx={{
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mb: "2rem", ml: "1rem" }}
            variant="h4"
            // color="secondary.main"
          >
            등록된 신청서가 없습니다.
          </Typography>
        </Box>
      ) : (
        <>
          <Typography
            sx={{
              textAlign: "center",
              mb: "2rem",
              ml: "1rem",
              fontWeight: "bold",
            }}
            variant="h5"
          >
            신청서 조회
          </Typography>
          <Grid
            container
            spacing={"55px"}
            rowSpacing={"60px"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 5,
            }}
          >
            {formsData
              ?.slice()
              .reverse()
              .map((form: any, i: number) => (
                <Grid item key={i}>
                  {!form.isAccept === true ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          height: "50px",
                        }}
                      >
                        <Tooltip title="수락" placement="top">
                          <IconButton
                            aria-label="accept"
                            size="large"
                            onClick={() => {
                              acceptForm(form.formId);
                            }}
                          >
                            <CheckIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </>
                  ) : form.isEnd ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        height: "50px",
                      }}
                    >
                      <Typography
                        sx={{
                          // color: "secondary.dark",
                          fontWeight: "bold",
                          pr: 2,
                        }}
                        variant="subtitle1"
                      >
                        거래 완료
                      </Typography>
                    </Box>
                  ) : form.isCancel && !form.isAccept ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        height: "50px",
                      }}
                    >
                      <Typography
                        sx={{
                          // color: "secondary.dark",
                          fontWeight: "bold",
                          pr: 2,
                        }}
                        variant="subtitle1"
                      >
                        파기 완료
                      </Typography>
                    </Box>
                  ) : form.isCancel ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        height: "50px",
                      }}
                    >
                      <Typography
                        sx={{
                          // color: "secondary.dark",
                          fontWeight: "bold",
                          pr: 2,
                        }}
                        variant="subtitle1"
                      >
                        파기 신청
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        height: "50px",
                      }}
                    >
                      <Typography
                        sx={{
                          // color: "secondary.dark",
                          fontWeight: "bold",
                          pr: 2,
                        }}
                        variant="subtitle1"
                      >
                        수락 완료
                      </Typography>
                    </Box>
                  )}
                  <Forms form={form}></Forms>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1,
                      height: "50px",
                    }}
                  >
                    {form.isCancel && form.cancelPosition === "CONSUMER" ? (
                      <>
                        <Button
                          variant="contained"
                          onClick={() => {
                            rejectAccept(form.formId);
                          }}
                          sx={{
                            mr: 2,
                            ml: 1,
                            width: 90,
                            borderRadius: 3,
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          파기 수락
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default PostForms;
