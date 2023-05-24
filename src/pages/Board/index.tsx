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
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Bulletin from "@components/ListItem";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import usePagination from "@hooks/usePagination";
import axios from "axios";

interface propsType {
  children: any;
}

const Board = () => {
  const getPostsData = useCallback(async () => {
    await axios
      .get("/api/posts?type=createdDate", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          // console.log(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getPostsData();
    // axios
    //   .get("/api/posts")
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data) {
    //       console.log(response.data);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });"
  }, [getPostsData]);

  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [sortValue, setSortValue] = useState("new");
  const [cards, setCards] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 90, 1, 2, 3, 4, 5,
    6, 7, 8, 9,
  ]);
  const [page, setPage] = useState(1);
  let data = [
    { num: 1 },
    { num: 2 },
    { num: 3 },
    { num: 4 },
    { num: 4 },
    { num: 4 },
    { num: 4 },
    { num: 4 },
    { num: 4 },
  ];
  const _data = usePagination(data, 8);

  const count = Math.ceil(data.length / 8);

  // const [itemOffset, setItemOffset] = useState(0);
  const navigate = useNavigate();

  const handleChangeRegion = (e: SelectChangeEvent) => {
    setRegion(e.target.value);
  };
  const handleChangeTown = (e: SelectChangeEvent) => {
    setTown(e.target.value);
  };
  const handleSortValue = (e: SelectChangeEvent) => {
    setSortValue(e.target.value);
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

  return (
    <Container>
      <TopSearchBox>
        <FormControl sx={{ width: "350px" }} variant="outlined">
          <OutlinedInput
            sx={{
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "transparent",
                },
              backgroundColor: "secondary.main",
              borderRadius: 5,
              height: 40,
              pl: 2,
            }}
            id="search"
            placeholder="검색"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="search_button" edge="end">
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
        <LargeConditionBox>
          <FormControl variant="standard" sx={{ width: 200 }}>
            <InputLabel variant="standard">지역을 선택해주세요</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={region}
              label="region"
              onChange={handleChangeRegion}
            >
              <MenuItem value={"서울특별시"}>서울특별시</MenuItem>
              <MenuItem value={"경기도"}>경기도</MenuItem>
              <MenuItem value={"인천광역시"}>인천광역시</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ ml: 5, width: 200 }}>
            <InputLabel variant="standard">동네를 선택해주세요</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={town}
              label="town"
              onChange={handleChangeTown}
            >
              <MenuItem value={"동네1"}>동네1</MenuItem>
              <MenuItem value={"동네2"}>동네2</MenuItem>
              <MenuItem value={"동네3"}>동네3</MenuItem>
            </Select>
          </FormControl>
        </LargeConditionBox>
      </TopSearchBox>
      <SmallConditionBox>
        <Typography>총 123건</Typography>
        <FormControl variant="standard" sx={{ width: 200 }}>
          <InputLabel variant="standard">정렬 기준</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={sortValue}
            label="sortValue"
            onChange={handleSortValue}
          >
            <MenuItem value={"new"}>최신등록순</MenuItem>
            <MenuItem value={"money"}>급여순</MenuItem>
          </Select>
        </FormControl>
        {sessionStorage.getItem("token") === null ? (
          <></>
        ) : (
          <Button
            onClick={() => {
              navigate(`/forms`);
            }}
            sx={{ width: 160, borderRadius: 20 }}
            variant="contained"
          >
            게시글 작성
          </Button>
        )}
      </SmallConditionBox>
      <ListBox>
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
          {_data.currentData()?.map((i: number) => (
            <Grid item key={i}>
              <Bulletin />
            </Grid>
          ))}
        </Grid>
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
