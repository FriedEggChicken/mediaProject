import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Container, FrameBox, ItemBox, PageBox } from "./styles";
import {
  Typography,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Pagination,
} from "@mui/material";
import Swal from "sweetalert2";
import Review from "@components/ReviewListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";

import usePagination from "@hooks/usePagination";
import useDialog from "@hooks/useDialog";
import ReviewDialogs from "@components/dialogs/ReviewDialogs";

const MyReviews = () => {
  const navigate = useNavigate();
  const reviewDialog = useDialog();

  const [reviewData, setReviewData] = useState([]);

  const getMyReviews = useCallback(async () => {
    await axios
      .get(`/api/users/reviews`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          // console.log(response.data);
          setReviewData(response.data.pageData.content);
          // console.log(postData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleReviewChange = useCallback(
    async (values: Array<any>, reviewId: number) => {
      await axios
        .put(
          `/api/reviews/${reviewId}`,
          {
            content: values[1],
            score: values[0],
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success === true) {
            console.log("수정 성공");
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    []
  );

  const deleteReview = useCallback(async (reviewid: number) => {
    Swal.fire({
      icon: "warning",
      title: "리뷰 삭제",
      text: "삭제 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .delete(`/api/reviews/${reviewid}`, {
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
    getMyReviews();
  }, [getMyReviews]);

  const [page, setPage] = useState(1);
  const _data = usePagination(reviewData.slice().reverse(), 6);

  const count = Math.ceil(reviewData.length / 6);

  const handlePageChange = (e: any, p: number) => {
    setPage(p);
    _data.jump(p);
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      {reviewData?.length === 0 ? (
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
            등록한 리뷰가 없습니다.
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
            작성한 리뷰
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
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        height: "50px",
                      }}
                    >
                      <Tooltip title="삭제" placement="top">
                        <IconButton
                          aria-label="delete"
                          size="large"
                          onClick={() => {
                            deleteReview(form.reviewId);
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
                            reviewDialog.open();
                          }}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                      <ReviewDialogs
                        open={reviewDialog.isOpen}
                        onClose={reviewDialog.close}
                        title="리뷰 수정"
                        type="text"
                        values={reviewDialog.values}
                        setValues={reviewDialog.setValues}
                        onEdit={() => {
                          handleReviewChange(
                            reviewDialog.values,
                            form.reviewId
                          );
                        }}
                      />
                    </Box>
                  </>
                  <Review form={form}></Review>
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

export default MyReviews;
