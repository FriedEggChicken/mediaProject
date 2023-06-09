import {
  Box,
  Button,
  TextField,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { ModalBox, DialogBox } from "./styles";

const FormDialogs = ({
  open,
  onClose,
  title,
  values,
  setValues,
  onEdit,
}: any) => {
  const [address, setAddress] = useState("");
  const [openPostCode, setOpenPostCode] = useState(false);
  const [alert, setAlert] = useState("");
  const handle = {
    Open: () => {
      setOpenPostCode(true);
    },

    Close: () => {
      setOpenPostCode(false);
    },
  };

  const handleSelectAddress = useCallback(
    (data: any) => {
      setAddress(data.address);
      setValues([data.address]);
      setOpenPostCode(false);
    },
    [values, onEdit, onClose]
  );

  const handleChargeChange = (e: any) => {
    const newValues = [...values];
    newValues[1] = Number(e.target.value);
    setValues(newValues);
  };

  const handleContentChange = (e: any) => {
    const newValues = [...values];
    newValues[2] = e.target.value;
    setValues(newValues);
  };

  const handleEditClick = useCallback(() => {
    if (!address || !values[2]) {
      setAlert("모든 항목을 입력해주세요.");
      return;
    }
    onEdit(values);
    onClose();
    setAddress("");
  }, [values, onEdit, onClose, address]);

  const handleClose = () => {
    setAddress("");
    setOpenPostCode(false);
    setValues([]);
    setAlert("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false}>
      <DialogBox>
        <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "450px", mt: 2 }}>
            주소 &nbsp;
            <Button
              variant="contained"
              onClick={handle.Open}
              sx={{ mr: 2, ml: 1, width: 90 }}
            >
              검색
            </Button>
            <Modal open={openPostCode} onClose={handle.Close}>
              <ModalBox>
                <DaumPostcodeEmbed
                  onComplete={handleSelectAddress}
                  autoClose={false}
                />
              </ModalBox>
            </Modal>
            <TextField
              required
              sx={{ width: "260px" }}
              variant="standard"
              name="address"
              InputProps={{
                readOnly: true,
              }}
              value={address}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 4 }}>
            대행비 &nbsp;
            <TextField
              required
              sx={{ width: "100px" }}
              variant="standard"
              size="small"
              name="costs"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">원</InputAdornment>
                ),
              }}
              onChange={handleChargeChange}
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
          <Button onClick={handleEditClick}>신청</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </DialogBox>
    </Dialog>
  );
};

export default FormDialogs;
