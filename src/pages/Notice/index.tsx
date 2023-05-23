import React, { useState } from "react";
import {
  Container,
  TopSearchBox,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Bulletin from "@components/ListItem";
import { useNavigate } from "react-router-dom";
import usePagination from "@hooks/usePagination";
interface propsType {
  children: any;
}
interface RowData {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}
const Notice = () => {
  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [sortValue, setSortValue] = useState("new");
  const createData = (
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) => ({ name, calories, fat, carbs, protein });

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("f", 305, 3.7, 67, 4.3),
    createData("e", 356, 16.0, 49, 3.9),
    createData("d", 305, 3.7, 67, 4.3),
    createData("c", 356, 16.0, 49, 3.9),
    createData("b", 305, 3.7, 67, 4.3),
    createData("a", 356, 16.0, 49, 3.9),
  ];
  const [page, setPage] = useState(1);

  const _data = usePagination(rows, 8);

  const count = Math.ceil(rows.length / 8);

  // const [itemOffset, setItemOffset] = useState(0);
  const navigate = useNavigate();

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
      </TopSearchBox>
      <SmallConditionBox>
        <Typography>총 123건</Typography>
      </SmallConditionBox>
      <ListBox>
        <TableContainer
          sx={{ backgroundColor: "background.default" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>제목</TableCell>
                <TableCell align="right">작성일</TableCell>
                <TableCell align="right">조회수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_data.currentData()?.map((row: RowData) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => navigate(`/posts/${row.name}`)}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default Notice;
