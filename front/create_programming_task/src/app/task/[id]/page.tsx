"use client";

import React, { useEffect, useState } from "react";
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
  TableCell,
  Button,
  Box,
} from "@mui/material";
import { getAccessToken } from "@/lib/actions";
import type { Task } from "@/types/task";
import { PRIMARY_COLOR } from "@/constants/color";

type Props = {
  params: {
    id: string;
  };
};

// ダミーデータ
const dummyTask = {
  id: "1",
  language: "Python",
  technique: "for-loop",
  title: "sum1to10",
  description: "What's the sum of 1 to 10?",
  user_id: "3",
  difficulty: 2,
};

const Page = ({ params }: Props) => {
  const [task, setTask] = useState<Task>({
    id: "",
    language: "",
    technique: "",
    title: "",
    description: "",
    user_id: "",
    difficulty: 1,
    is_done: false,
    limit_at: new Date(),
  });

  const [taskIds, setTaskIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchTask = async () => {
      const accessToken = await fetchAccessToken();

      // idからタスクを取得
      // http://localhost:8000/task/:id (method: GET)
      if (accessToken === "") {
        // ログインしていない場合の処理
        // このままだと結構やばいので、ログインページへの導線を考える
        window.location.href = "/log_in";
      } else {
        // ログインしている場合の処理

        // タスクの取得処理を書く
        // http://localhost:8000/task/:id (method: GET)
        const url = `http://localhost:8000/task/${params.id}`;
        console.log(url);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });

        const responseJson = await response.json();

        if (response.ok) {
          setTask(responseJson);
        } else {
          alert("タスクの取得に失敗しました。");
        }
      }
    };

    const fetchTaskIds = async () => {
      // タスク一覧を取得してidだけを取り出す
      // 昇順でソートする
      const accessToken = await fetchAccessToken();
      const response = await fetch("http://localhost:8000/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const responseJson = await response.json();
        const taskIds = responseJson.tasks.map((task: Task) => task.id);
        taskIds.sort((a: string, b: string) => parseInt(a) - parseInt(b));
        setTaskIds(taskIds);
      } else {
        alert("タスクの取得に失敗しました。");
      }
    };

    fetchTask();
    fetchTaskIds();
  }, []);

  // アクセストークンの取得
  const fetchAccessToken = async () => {
    const accessToken = await getAccessToken();
    return accessToken.value;
  };

  const handleClick = async (isNext: boolean) => {
    const accessToken = await fetchAccessToken();
    console.log(taskIds);
    console.log(taskIds.indexOf(task.id));

    let id = "";
    if (isNext) {
      if (taskIds.indexOf(task.id) === taskIds.length - 1) {
        alert("次のタスクがありません。");
        return;
      }
      id = taskIds[taskIds.indexOf(task.id) + 1];
    } else {
      if (taskIds.indexOf(task.id) === 0) {
        alert("前のタスクがありません。");
        return;
      }
      id = taskIds[taskIds.indexOf(task.id) - 1];
    }

    const response = await fetch(`http://localhost:8000/task/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = `/task/${id}`;
    } else {
      isNext
        ? alert("次のタスクがありません。")
        : alert("前のタスクがありません。");
    }
  };

  return (
    <Container>
      {task.id !== "" && (
        <>
          <h1>{task.title}</h1>
          <Chip label={task.language} />
          <Typography component="legend">難易度</Typography>
          <Rating
            name="difficulty"
            value={task.difficulty ? task.difficulty : 0}
            max={3}
            readOnly
          />
          {/* とりあえず表形式で表示 */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow
                  key={task.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography style={{ fontWeight: "bold" }}>
                      タスク内容
                    </Typography>
                  </TableCell>
                  <TableCell>{task.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* TODO 今の実装は激重 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleClick(false);
              }}
              sx={{ backgroundColor: PRIMARY_COLOR }}
            >
              前へ
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleClick(true);
              }}
              sx={{ backgroundColor: PRIMARY_COLOR }}
            >
              次へ
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Page;
