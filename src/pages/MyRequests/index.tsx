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
import { findByRole } from "@testing-library/react";

const MyRequests = () => {
  const navigate = useNavigate();

  const [formsData, setFormsData] = useState([]);

  const getMyPostsForms = useCallback(async () => {
    await axios
      .get(`/api/users/forms`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
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

  return (
    <Container>
      <FrameBox>
        <Typography
          sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 4 }}
          variant="h4"
        >
          내 신청서 조회
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
              <>
                <Forms form={form}></Forms>
                {form.isAccept === false ? (
                  <>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => {
                        deleteUserForms(form.formId);
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      size="large"
                      onClick={() => {
                        navigate(`/forms/edit/${form.formId}`);
                      }}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </>
                ) : (
                  <>수락 완료</>
                )}
              </>
            </Grid>
          ))}
        </Grid>
      </FrameBox>
    </Container>
  );
};

export default MyRequests;
