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
import Forms from "@components/ListFormItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
        console.log(response);
        if (response.data) {
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
            console.log(response);
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

  useEffect(() => {
    getPostsForms();
  }, [getPostsForms]);

  return (
    <Container>
      <FrameBox>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 4 }}
          variant="h4"
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
          {formsData?.map((form: any, i: number) => (
            <Grid item key={i}>
              {!form.isAccept === true ? (
                <>
                  <Forms form={form}></Forms>
                  <IconButton
                    aria-label="accept"
                    size="large"
                    onClick={() => {
                      acceptForm(form.formId);
                    }}
                  >
                    <CheckIcon fontSize="inherit" />
                  </IconButton>
                </>
              ) : (
                <></>
              )}
            </Grid>
          ))}
        </Grid>
      </FrameBox>
    </Container>
  );
};

export default PostForms;
