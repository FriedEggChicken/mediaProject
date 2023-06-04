import React, { useState } from "react";
import {
  Container,
  TopSearchBox,
  SmallConditionBox,
  ListBox,
  PageBox,
} from "./styles";
import {
  Typography,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import usePagination from "@hooks/usePagination";
interface propsType {
  children: any;
}
interface RowData {
  name: string;
  date: string;
  content: string;
  num: number;
  idx: number;
}

const Notice = () => {
  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [sortValue, setSortValue] = useState("new");
  const createData = (
    name: string,
    date: string,
    content: string,
    num: number,
    idx: number
  ) => ({ name, date, content, num, idx });

  const rows = [
    createData("파기 관련 내용 안내", "2023-05-27", "hello", 24, 3),
    createData("수수료 안내", "2023-05-26", "hello", 37, 2),
    createData(
      "동네 보따리에 오신 것을 환영합니다!",
      "2023-05-25",
      "hello",
      24,
      1
    ),
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
      <TopSearchBox></TopSearchBox>
      <SmallConditionBox>
        <Typography sx={{ ml: 1 }} fontSize={18} fontWeight={600}>
          총 {rows.length}건
        </Typography>
      </SmallConditionBox>
      <ListBox>
        <TableContainer sx={{ backgroundColor: "background.default" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: 15 }}
                  align="center"
                >
                  제목
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: 15 }}
                  align="center"
                >
                  작성일
                </TableCell>
                {/* <TableCell align="center">조회수</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {_data.currentData()?.map((row: RowData) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/notice/${row.idx}`)}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  {/* <TableCell align="center">{row.num}</TableCell> */}
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
