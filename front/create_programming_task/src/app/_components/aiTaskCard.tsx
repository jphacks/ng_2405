import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Box,
  Chip,
} from "@mui/material";

import { getAccessToken } from "@/lib/actions";

import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
} from "@/constants/color";
import type { AiTask } from "@/types/aitask";

type Props = {
  task: AiTask;
};

const fetchAccessToken = async () => {
  const accessToken = await getAccessToken();
  return accessToken.value;
};

const AiTaskCard = ({ task }: Props) => {
  const fetchSaveTask = async (task: AiTask) => {
    const accessToken = await fetchAccessToken();
    if (accessToken === "") {
      return;
    }

    // idからタスクを取得
    // http://localhost:8000/task/:id (method: GET)
    const url = "http://localhost:8000/task";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        difficulty: task.difficulty,
        example: task.example,
        answer: task.answer,
        language: task.language,
        technique: task.technique,
      }),
    });
    if (response.ok) {
      console.log("タスクの追加に成功しました。");
    }
  };

  return (
    <Card
      sx={{
        boxShadow: "10px 5px 5px lightGray",
        backgroundColor: "whitesmoke",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              padding: "4px",
            }}
          >
            {task.title}
            <Chip label={task.language} sx={{ marginLeft: "10px" }} />
          </Typography>
          <Rating name="difficulty" value={task.difficulty} max={3} readOnly />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ padding: "4px" }}
        >
          {task.description}
        </Typography>
        <Typography>{task.example}</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: SECONDARY_COLOR,
            color: "black",
          }}
          // TODO: 変える！！
          onClick={() => {
            fetchSaveTask(task);
          }}
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default AiTaskCard;
