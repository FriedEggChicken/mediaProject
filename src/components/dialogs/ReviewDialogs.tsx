import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  FormControl,
  OutlinedInput,
  Rating,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DialogBox } from "./styles";

const ReviewDialogs = ({
  open,
  onClose,
  title,
  values,
  setValues,
  onEdit,
}: any) => {
  const [alert, setAlert] = useState("");
  const [rate, setRate] = useState<number>(1);

  const handleContentChange = (e: any) => {
    const newValues = [...values];
    newValues[1] = e.target.value;
    setValues(newValues);
  };

  const handleEditClick = useCallback(() => {
    if (values[0] === undefined) {
      setAlert("모든 항목을 입력해주세요.");
      return;
    }
    if (!values[1]) {
      setAlert("모든 항목을 입력해주세요.");
      return;
    }
    onEdit(values);
    setRate(1);
    onClose();
  }, [values, onEdit, onClose]);

  const handleClose = () => {
    setValues([]);
    setRate(1);
    setAlert("");
    onClose();
  };

  useEffect(() => {
    if (open) {
      setValues([1]);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}>
      <DialogBox>
        <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
            리뷰 점수 &nbsp;
            <Rating
              name="simple-controlled"
              value={rate || 1}
              onChange={(event, score) => {
                const updatedRate = score || 1;
                if (values[1]) {
                  values[0] = updatedRate;
                  setRate(updatedRate);
                  return;
                }
                setValues([updatedRate]);
                setRate(updatedRate);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "start", mt: 4 }}>
            내용 &nbsp;
            <FormControl sx={{ width: "370px" }} variant="outlined" required>
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
                onChange={handleContentChange}
                multiline
                rows={5}
              />
            </FormControl>
          </Box>
          {alert && (
            <Alert sx={{ mt: "10px" }} severity="error">
              {alert}
            </Alert>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        >
          <Button onClick={handleEditClick}>작성</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </DialogBox>
    </Dialog>
  );
};

export default ReviewDialogs;
