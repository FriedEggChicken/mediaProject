import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Container, FrameBox, ItemBox } from "./styles";
import {
  Typography,
  Box,
  FormControl,
  OutlinedInput,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import Bulletin from "@components/SmallListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

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
        if (response.data) {
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
            console.log(response);
            if (response.data.success === true) {
              window.location.replace("/mypage");
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

  return (
    <Container>
      <FrameBox>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 4 }}
          variant="h4"
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
          {postData?.map((post: any, i: number) => (
            <Grid item key={i}>
              <Bulletin post={post}></Bulletin>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => {
                  deleteUserPosts(post.postId);
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                aria-label="edit"
                size="large"
                onClick={() => {
                  navigate(`/posts/edit/${post.postId}`);
                }}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <Button
                variant="contained"
                onClick={() => {
                  navigate(`/posts/forms/${post.postId}`);
                }}
                sx={{ mr: 2, ml: 1, width: 90, borderRadius: 3 }}
              >
                신청서 조회
              </Button>
            </Grid>
          ))}
        </Grid>
      </FrameBox>
    </Container>
  );
};

export default MyPosts;
