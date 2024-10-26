import React from "react";
import {
  Container,
  Chip,
  Typography,
  Rating,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

type Props = {
  params: {
    id: string;
  };
};

// ダミーデータ
const task = {
  id: "1",
  language: "Python",
  technique: "for-loop",
  title: "sum1to10",
  description: "What's the sum of 1 to 10?",
  user_id: "3",
  difficulty: 2
};

const Page = ({ params }: Props) => {
  return (
    <Container>
      <h1>{task.title}</h1>
      <Chip label={task.language} />
      <Typography component="legend">難易度</Typography>
      <Rating name="difficulty" value={task.difficulty} max={3} readOnly />

      {/* とりあえず表形式で表示 */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow
              key={task.technique}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                <Typography style={{ fontWeight: "bold" }}>
                  学習内容
                </Typography>
              </TableCell>
              <TableCell>{task.technique}</TableCell>
            </TableRow>
            <TableRow
              key={task.description}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                <Typography style={{ fontWeight: "bold" }}>
                  課題内容
                </Typography>
              </TableCell>
              <TableCell>{task.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Page;
