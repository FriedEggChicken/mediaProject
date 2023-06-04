import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import Reviews from "@components/ReviewListItem";
import { Container, PageBox } from "./styles";

import usePagination from "@hooks/usePagination";
import useDialog from "@hooks/useDialog";

import { useParams } from "react-router-dom";

const Review = () => {
  const params = useParams();
  const [reviewData, setReviewData] = useState<any>([]);
  const reviewDialog = useDialog();

  const [poster, setPoster] = useState(0);

  const getReviewData = useCallback(async () => {
    axios
      .get(`/api/reviews/target-user/${params.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          setReviewData(response.data.pageData.content);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getReviewData();
  }, [getReviewData]);

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
            sx={{ mb: "2rem", ml: "1rem", fontWeight: "light" }}
            variant="h4"
            // color="secondary.main"
          >
            등록된 리뷰가 없습니다.
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
            등록된 리뷰
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
                <Reviews form={form}></Reviews>
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

export default Review;
