import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  TopSearchBox,
  LargeConditionBox,
  SmallConditionBox,
  ListBox,
  PageBox,
} from "./styles";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Modal,
  Box,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Bulletin from "@components/SmallListItem";
import { useNavigate } from "react-router-dom";
import usePagination from "@hooks/usePagination";
import DaumPostcodeEmbed from "react-daum-postcode";
import axios from "axios";

interface propsType {
  children: any;
}

const Board = () => {
  const [postData, setPostData] = useState([]);
  const history = useNavigate();
  const [openPostCode, setOpenPostcode] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [sortType, setSortType] = useState("최신순");

  const getPostsData = useCallback(async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const queryTitle = queryParams.get("title") || "";
    const queryAddress = queryParams.get("addr") || "";

    let apiUrl = `/api/posts?title=${queryTitle}`;

    if (queryAddress) {
      apiUrl += `&addr=${queryAddress}`;
      setAddress(queryAddress);
    }

    apiUrl += `&type=${sortType}`;

    await axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          setPostData(response.data.pageData.content);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [sortType]);

  const getSearchData = useCallback(async () => {
    let apiUrl = `/api/posts?`;
    let queryString = `title=${title}`;

    if (address) {
      // apiUrl += `&addr=${address}`;
      queryString += `&addr=${address}`;
    }

    apiUrl += queryString + `&type=${sortType}`;

    await axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          setPostData(response.data.pageData.content);
          history(`/board?${queryString}`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [title, address, sortType]);

  useEffect(() => {
    getPostsData();
  }, [getPostsData]);

  const [page, setPage] = useState(1);
  const _data = usePagination(postData.slice().reverse(), 9);

  const count = Math.ceil(postData.length / 9);

  // const [itemOffset, setItemOffset] = useState(0);
  const navigate = useNavigate();

  const handleSortType = (e: SelectChangeEvent) => {
    setSortType(e.target.value);
  };

  const handlePageChange = (e: any, p: number) => {
    setPage(p);
    _data.jump(p);
    window.scrollTo(0, 0);
  };
  // const handlePageClick = (event: any) => {
  //   const newOffset = (event.selected * 8) % cards.length;
  //   setItemOffset(newOffset);
  // };

  const handleAddress = {
    Open: () => {
      setOpenPostcode(true);
    },

    Close: () => {
      setOpenPostcode(false);
    },

    selectAddress: (data: any) => {
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  return (
    <Container>
      <TopSearchBox>
        <FormControl sx={{ width: "350px", ml: 5 }} variant="outlined">
          <OutlinedInput
            sx={{
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "transparent",
                },
              backgroundColor: "secondary.main",
              borderRadius: 5,
              height: 40,
              width: "400px",
              pl: 2,
            }}
            id="search"
            placeholder="제목을 입력하세요"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search_button"
                  edge="end"
                  onClick={() => {
                    getSearchData();
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            aria-describedby="outlined-search-helper-text"
            inputProps={{
              "aria-label": "search",
            }}
          />
        </FormControl>
        {sessionStorage.getItem("token") === null ? (
          <></>
        ) : (
          <Box sx={{ ml: 80 }}>
            <Button
              onClick={() => {
                navigate(`/forms`);
              }}
              sx={{
                width: 160,
                height: 50,
                borderRadius: 50,
                fontWeight: "bold",
              }}
              variant="contained"
            >
              게시글 작성
            </Button>
          </Box>
        )}
      </TopSearchBox>
      <TopSearchBox sx={{ mt: 3 }}>
        <SmallConditionBox sx={{ ml: 6 }}>
          <Typography fontSize={18} fontWeight={600}>
            총 {postData?.length}건
          </Typography>
          <FormControl variant="standard" sx={{ width: 200, ml: 7 }}>
            <Select
              sx={{ width: "120px" }}
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortType}
              label="sortType"
              onChange={handleSortType}
            >
              <MenuItem value={"최신순"}>최신등록순</MenuItem>
              <MenuItem value={"대행비순"}>대행비순</MenuItem>
            </Select>
          </FormControl>
        </SmallConditionBox>

        <LargeConditionBox>
          <TextField
            sx={{ width: "300px" }}
            variant="standard"
            name="address"
            value={address}
            placeholder="도착지 주소를 선택해주세요"
            InputProps={{
              readOnly: true,
              sx: {
                "& .MuiInputBase-input::placeholder": {
                  textAlign: "center",
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  {address !== "" ? (
                    <IconButton>
                      <ClearIcon
                        onClick={() => {
                          setAddress("");
                        }}
                      />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddress.Open}
            sx={{
              mr: 2,
              ml: 1,
              width: 90,
              borderRadius: 3,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            주소 선택
          </Button>
          <Modal open={openPostCode} onClose={handleAddress.Close}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                p: 4,
              }}
            >
              <DaumPostcodeEmbed
                onComplete={handleAddress.selectAddress}
                autoClose={false}
              />
            </Box>
          </Modal>
        </LargeConditionBox>
      </TopSearchBox>
      <ListBox>
        {postData?.length !== 0 ? (
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
                <Bulletin post={post}></Bulletin>
              </Grid>
            ))}
          </Grid>
        ) : (
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
              게시글이 존재하지 않습니다.
            </Typography>
          </Box>
        )}
      </ListBox>
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
    </Container>
  );
};

export default Board;
