"use client";

import React, { useEffect, useState } from "react";
import Header from "../_components/header";
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
import TaskCard from "../_components/taskCard";
import AiTaskCard from "../_components/aiTaskCard";

import type { Task } from "@/types/task";
import type { AiTask } from "@/types/aitask";
import { BUTTON_COLOR, PRIMARY_COLOR } from "@/constants/color";
import { LANGUAGES } from "@/constants/languages";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { mockTasks } from "@/constants/mocks";
import { Language } from "@/types/language";
import { getAccessToken } from "@/lib/actions";

type FormValues = {
  language: string;
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

  useEffect(() => {
    const fetchTasks = async () => {
      const accessToken = await fetchAccessToken();
      const response = await fetch("http://localhost:8000/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = await response.json();
      if (response.ok) {
        console.log(`response: ${JSON.stringify(responseJson)}`);
        setTasks(responseJson.tasks);
      } else {
        console.error("error");
        console.log(JSON.stringify(responseJson));
      }
    };
    fetchTasks();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    // ここでgeminiのAPIを叩く
    // http://localhost:8000/gemini (method: POST)

    // ここでページ遷移を行う
    const query = new URLSearchParams(data);
    window.location.href = `/generate_task?${query.toString()}`;

    // const accessToken = await fetchAccessToken();

    // const response = await fetch("http://localhost:8000/gemini", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   body: JSON.stringify(data),
    // });

    // const responseJson = await response.json();
    // if (response.ok) {
    //   console.log(`response: ${JSON.stringify(responseJson)}`);
    //   // レスポンスを元にAIタスクを作成
    //   setAiTasks(responseJson.tasks);
    // } else {
    //   console.error("error");
    //   console.log(JSON.stringify(responseJson));
    // }
  };

  const fetchAccessToken = async () => {
    const accessToken = await getAccessToken();
    return accessToken.value;
  };

  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
            verticalAlign: "top",
            // justifyContent: "center",
          }}
        >
          {/* 画面左側 */}
          <Box
            sx={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
            }}
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              sx={{
                m: 2,
              }}
              variant="h4"
              gutterBottom
            >
              タスク作成
            </Typography>
            {/* 学習したプログラミング言語の選択欄 */}
            <FormControl
              sx={{
                m: 2,
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
                backgroundColor: BUTTON_COLOR,
                m: 1,
              }}
              type="submit"
            >
              タスク作成
            </Button>
            {/* // <Box
                // key={task.title}
                // sx={{
                //   display: "flex",
                //   flexDirection: "column",
                //   alignItems: "center",
                //   justifyContent: "center",
                // }}
                // >
                //   <Typography>
                //     {task.difficulty}
                //   </Typography>
                //   <Typography
                //     sx={{
                  //       m: 1,
                //     }}
                //     variant="h5"
                //     gutterBottom
                //   >
                //     {task.title}
                //   </Typography>
                //   <Typography
                //     sx={{
                  //       m: 1,
                  //     }}
                  //     variant="body1"
                  //     gutterBottom
                  //     >
                  //     {task.description}
                  //   </Typography>
                  //   <Typography
                  //     sx={{
                    //       m: 1,
                    //     }}
                    //     variant="body1"
                    //     gutterBottom
                    //     >
                    //     {task.example}
                    //   </Typography>
                    //   <Typography
                    //     sx={{
                      //       m: 1,
                      //     }}
                      //     variant="body1"
                      //     gutterBottom
                      //     >
                      //     {task.answer}
                      //   </Typography>
                      // </Box> */}
          </Box>
          {/* 画面右側 */}
          <Box
            sx={{
              width: "120%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
            }}
            component="form"
          >
            {/* 最近のタスクを表示 */}
            <Typography
              sx={{
                m: 2,
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
        </Box>
      </Container>
    </>
  );
}
