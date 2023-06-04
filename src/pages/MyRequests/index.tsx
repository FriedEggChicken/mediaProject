import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Container, PageBox } from "./styles";
import {
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Pagination,
} from "@mui/material";
import Swal from "sweetalert2";
import Forms from "@components/ListFormItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { findByRole } from "@testing-library/react";
import usePagination from "@hooks/usePagination";
import useDialog from "@hooks/useDialog";
import ReviewDialogs from "@components/dialogs/ReviewDialogs";

const MyRequests = () => {
  const navigate = useNavigate();
  const reviewDialog = useDialog();
  const [poster, setPoster] = useState(0);

  const [formsData, setFormsData] = useState([]);

  const getMyPostsForms = useCallback(async () => {
    await axios
      .get(`/api/users/forms`, {
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

  const getPosterData = useCallback(async (postId: number) => {
    axios
      .get(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          setPoster(response.data.data.userId);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleReviewRequest = useCallback(
    async (values: Array<any>) => {
      await axios
        .post(
          `/api/reviews`,
          {
            content: values[1],
            score: values[0],
            targetUserId: poster,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          // console.log(poster);
          // console.log(response);
          if (response.data.success === true) {
            navigate("/myreviews");
          }
        })
        .catch((e) => {
          if (e.response.status === 400) {
            Swal.fire({
              icon: "info",
              title: "리뷰를 이미 작성하였습니다.",

              confirmButtonText: "네",
            });
          }
          console.log(poster);
          console.log(e);
        });
    },
    [poster]
  );

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

  const acceptReject = useCallback((formId: number) => {
    Swal.fire({
      icon: "question",
      title: "파기 수락",
      text: "파기 수락 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .post(
            `/api/deliveries/${formId}/cancel-acceptance`,
            { isAccept: true },
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
              console.log("파기 수락 완료");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }, []);

  const deleteUserForms = useCallback(async (formid: number) => {
    Swal.fire({
      icon: "warning",
      title: "신청서 삭제",
      text: "삭제 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .delete(`/api/forms/${formid}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
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
    getMyPostsForms();
  }, [getMyPostsForms]);

  const [page, setPage] = useState(1);
  const _data = usePagination(formsData.slice().reverse(), 6);

  const count = Math.ceil(formsData.length / 6);

  const handlePageChange = (e: any, p: number) => {
    setPage(p);
    _data.jump(p);
    window.scrollTo(0, 0);
  };

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
            내 신청서
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
            {_data.currentData()?.map((form: any, i: number) => (
              <Grid item key={i}>
                <>
                  {form.isAccept === false ? (
                    <>
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
                          수락 대기
                        </Typography>
                        <Tooltip title="삭제" placement="top">
                          <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => {
                              deleteUserForms(form.formId);
                            }}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="편집" placement="top">
                          <IconButton
                            aria-label="edit"
                            size="large"
                            onClick={() => {
                              navigate(`/forms/edit/${form.formId}`);
                            }}
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </>
                  ) : form.isEnd && form.isCancel && form.isAccept ? (
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
                    {form.isEnd && !form.isCancel ? (
                      <>
                        <Button
                          variant="contained"
                          onClick={() => {
                            reviewDialog.open();
                            getPosterData(form.postId);
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
                          리뷰 작성
                        </Button>
                        <ReviewDialogs
                          open={reviewDialog.isOpen}
                          onClose={reviewDialog.close}
                          title="리뷰 작성"
                          type="text"
                          values={reviewDialog.values}
                          setValues={reviewDialog.setValues}
                          onEdit={handleReviewRequest}
                        />
                      </>
                    ) : form.isCancel &&
                      !form.isAccept &&
                      form.cancelPosition === "DELIVERER" ? (
                      <>
                        <Button
                          variant="contained"
                          onClick={() => {
                            acceptReject(form.formId);
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
                </>
              </Grid>
            ))}
          </Grid>
          <PageBox>
            <Pagination
              count={count}
              variant="outlined"
              shape="rounded"
              size="large"
              showFirstButton
              showLastButton
              onChange={handlePageChange}
            />
          </PageBox>
        </>
      )}
    </Container>
  );
};

export default MyRequests;
