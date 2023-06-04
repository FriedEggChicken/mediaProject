import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Container, PageBox } from "./styles";
import {
  Typography,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Pagination,
} from "@mui/material";
import Swal from "sweetalert2";
import Bulletin from "@components/SmallListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useNavigate } from "react-router-dom";
import usePagination from "@hooks/usePagination";

const MyPosts = () => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState([]);

  const getUserPosts = useCallback(async () => {
    await axios
      .get("/api/users/posts", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          // console.log(response.data);
          setPostData(response.data.pageData.content);
          // console.log(postData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteUserPosts = useCallback(async (formid: number) => {
    Swal.fire({
      icon: "warning",
      title: "게시글 삭제",
      text: "삭제 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .delete(`/api/posts/${formid}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            // console.log(response);
            if (response.data.success === true) {
              window.location.replace("/myposts");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }, []);

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  const [page, setPage] = useState(1);
  const _data = usePagination(postData, 6);

  const count = Math.ceil(postData.length / 6);

  const handlePageChange = (e: any, p: number) => {
    setPage(p);
    _data.jump(p);
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      {postData?.length === 0 ? (
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
            등록된 게시글이 없습니다.
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
            내 게시글
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
            {_data.currentData()?.map((post: any, i: number) => (
              <Grid item key={i}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  {/* <Button
                  variant="contained"
                  onClick={() => {
                    navigate(`/posts/forms/${post.postId}`);
                  }}
                  sx={{ mr: 2, ml: 1, width: 130, borderRadius: 3 }}
                >
                  신청서 조회
                </Button> */}
                  <Tooltip title="신청서 조회" placement="top">
                    <IconButton
                      aria-label="accept"
                      size="large"
                      onClick={() => {
                        navigate(`/posts/forms/${post.postId}`);
                      }}
                    >
                      <DraftsIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="삭제" placement="top">
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => {
                        deleteUserPosts(post.postId);
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
                        navigate(`/posts/edit/${post.postId}`);
                      }}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Bulletin post={post}></Bulletin>
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

export default MyPosts;
