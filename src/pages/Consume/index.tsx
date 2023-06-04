import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import {
  Grid,
  IconButton,
  Typography,
  Button,
  Box,
  Tooltip,
  Pagination,
} from "@mui/material";
import Forms from "@components/ListFormItem";
import { Container, FrameBox, PageBox } from "./styles";
import DangerousIcon from "@mui/icons-material/Dangerous";
import Swal from "sweetalert2";
import usePagination from "@hooks/usePagination";
import useDialog from "@hooks/useDialog";

const Consume = () => {
  const [consumeData, setConsumeData] = useState<any>([]);
  const reviewDialog = useDialog();

  const [poster, setPoster] = useState(0);

  const getConsumerData = useCallback(async () => {
    axios
      .get("/api/deliveries/consumer", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          setConsumeData(response.data.pageData.content);
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

  const handleReviewRequest = useCallback(async (values: Array<any>) => {
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
        //  console.log(poster);
        // console.log(response);
        if (response.data.success === true) {
          console.log("리뷰 요청 성공");
        }
      })
      .catch((e) => {
        // console.log(poster);
        console.log(e);
      });
  }, []);

  const rejectForm = useCallback(async (formid: number) => {
    Swal.fire({
      icon: "warning",
      title: "거래 파기",
      text: "파기 신청하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .post(
            `/api/deliveries/${formid}/cancel`,
            { cancelPosition: "CONSUMER", cancelReason: "AGREEMENT" },
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

  const endDeal = useCallback(async (formid: number) => {
    Swal.fire({
      icon: "question",
      title: "거래 완료",
      text: "거래를 완료하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .post(
            `/api/deliveries/${formid}/success`,
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
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }, []);

  useEffect(() => {
    getConsumerData();
  }, [getConsumerData]);

  const [page, setPage] = useState(1);
  const _data = usePagination(consumeData.slice().reverse(), 6);

  const count = Math.ceil(consumeData.length / 6);

  const handlePageChange = (e: any, p: number) => {
    setPage(p);
    _data.jump(p);
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      {consumeData?.length === 0 ? (
        <Box
          sx={{
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mb: "2rem", ml: "1rem", fontWeight: "light" }}
            variant="h4"
            // color="secondary.main"
          >
            진행 중인 주문 내역이 없습니다.
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
            진행 중인 주문
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="파기 신청" placement="top">
                    <IconButton
                      aria-label="reject"
                      size="large"
                      onClick={() => {
                        rejectForm(form.formId);
                      }}
                    >
                      <DangerousIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Forms form={form}></Forms>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  {!form.isEnd ? (
                    <Tooltip
                      title="물건 수령시 클릭하여 거래를 완료하세요"
                      placement="bottom"
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          endDeal(form.formId);
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
                        거래 완료
                      </Button>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                  <Typography
                    sx={{
                      // color: "secondary.dark",
                      fontWeight: "bold",
                      display: "flex",
                    }}
                    variant="subtitle1"
                  >
                    거래 상태 : &nbsp;
                    {!form.isEnd ? (
                      <Typography
                        sx={
                          {
                            // color: "secondary.dark",
                          }
                        }
                        variant="subtitle1"
                      >
                        진행중
                      </Typography>
                    ) : (
                      <Typography
                        sx={
                          {
                            // color: "secondary.dark",
                          }
                        }
                        variant="subtitle1"
                      >
                        거래완료
                      </Typography>
                    )}
                    {/* {form.isCancel === true && form.isAccept === true ? (
                      <>
                        <Typography
                          sx={
                            {
                              // color: "secondary.dark",
                            }
                          }
                          variant="subtitle1"
                        >
                          파기 신청중
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => {
                            rejectAccept(form.formId);
                          }}
                          sx={{ mr: 2, ml: 1, width: 90, borderRadius: 3 }}
                        >
                          파기 수락
                        </Button>
                      </>
                    ) : (
                      <></>
                    )} */}
                    {/* {form.isCancel === true && form.isAccept === false ? (
                      <Typography
                        sx={
                          {
                            // color: "secondary.dark",
                          }
                        }
                        variant="subtitle1"
                      >
                        파기 완료
                      </Typography>
                    ) : (
                      <></>
                    )} */}
                  </Typography>
                </Box>
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

export default Consume;
