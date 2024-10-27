"use client";

import React, { useState } from "react";
import {
  SelectChangeEvent,
  Container,
  Box,
  Typography,
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import TaskCard from "./_components/taskCard";

import type { Task } from "@/types/task";
import { PRIMARY_COLOR } from "@/constants/color";
import { LANGUAGES } from "@/constants/languages";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { mockTasks } from "@/constants/mocks";
import { Language } from "@/types/language";
import { getAccessToken } from "@/lib/actions";

type FormValues = {
  language: string;
  technique: string;
};

type AiTask = {
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  example: string;
  answer: string;
  language: Language;
  technique: string;
};

export default function Home() {
  // タスク表示用
  // TODO ここはAPIから取得するように変更する
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [aiTasks, setAiTasks] = useState<AiTask[]>([]);
  const displayTaskNum = 3; // 直近3つのタスクを表示

  const { control, handleSubmit } = useForm<FormValues>();

  // 言語選択用
  const [language, setLanguage] = useState<Language>("Python3");
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as Language);
  };

  const menuItems = LANGUAGES.map((language) => (
    <MenuItem key={language} value={language}>
      {language}
    </MenuItem>
  ));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    // ここでgeminiのAPIを叩く
    // http://localhost:8000/gemini (method: POST)
    const accessToken = await fetchAccessToken();

    const response = await fetch("http://localhost:8000/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    if (response.ok) {
      console.log(`response: ${JSON.stringify(responseJson)}`);
      // レスポンスを元にAIタスクを作成
      setAiTasks(responseJson.tasks);
    } else {
      console.error("error");
      console.log(JSON.stringify(responseJson));
    }
  };

  const fetchAccessToken = async () => {
    const accessToken = await getAccessToken();
    return accessToken.value;
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          verticalAlign: "top",
          // justifyContent: "center",
        }}
      >
        {/* 画面左側 */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          component="form"
        >
          {/* 最近のタスクを表示 */}
          <Typography
            sx={{
              m: 1,
            }}
            variant="h4"
            gutterBottom
          >
            最近のタスク
          </Typography>
          <Grid2
            container
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ marginTop: "20px", padding: "0 5%" }}
          >
            {tasks
              .slice(-displayTaskNum)
              .reverse()
              .map((task: Task) => {
                return (
                  <Grid2 key={task.id} size={{ xs: 4, sm: 8, md: 12 }}>
                    <TaskCard task={task} />
                  </Grid2>
                );
              })}
          </Grid2>
        </Box>
        {/* 画面右側 */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          component="form"
          noValidate
          // 後でやる
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* 学習したプログラミング言語の選択欄 */}
          <FormControl
            sx={{
              m: 1,
              width: "80%",
            }}
          >
            <Controller
              name="language"
              control={control}
              defaultValue={language}
              render={({ field }) => (
                <>
                  <InputLabel id="select-language-label">学習言語</InputLabel>
                  <Select
                    {...field}
                    labelId="select-language-label"
                    id="select-language"
                  >
                    {menuItems}
                  </Select>
                </>
              )}
            />
          </FormControl>
          {/* 学習内容の入力欄 */}
          <FormControl sx={{ m: 1, width: "80%" }}>
            <Controller
              name="technique"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="outlined-required"
                  label="学習内容"
                  defaultValue=""
                  sx={{
                    width: "80%",
                  }}
                  multiline
                  rows={3}
                />
              )}
            />
          </FormControl>
          {/* タスク作成ボタン */}
          <Button
            variant="contained"
            sx={{
              width: "80%",
              backgroundColor: PRIMARY_COLOR,
              m: 1,
            }}
            type="submit"
          >
            タスク作成
          </Button>
        </Box>
      </Box>
      {aiTasks.length > 0 &&
        aiTasks.map((task) => {
          return (
            <Box
              key={task.title}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  m: 1,
                }}
                variant="h4"
                gutterBottom
              >
                AIタスク
              </Typography>
              <Typography
                sx={{
                  m: 1,
                }}
                variant="h5"
                gutterBottom
              >
                {task.title}
              </Typography>
              <Typography
                sx={{
                  m: 1,
                }}
                variant="body1"
                gutterBottom
              >
                {task.description}
              </Typography>
              <Typography
                sx={{
                  m: 1,
                }}
                variant="body1"
                gutterBottom
              >
                {task.example}
              </Typography>
              <Typography
                sx={{
                  m: 1,
                }}
                variant="body1"
                gutterBottom
              >
                {task.answer}
              </Typography>
            </Box>
          );
        })}
    </Container>
  );
}
