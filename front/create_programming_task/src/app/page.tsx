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
  OutlinedInput,
  Button,
} from "@mui/material";
import TaskCard from "./_components/taskCard";

import type { Task } from "@/types/task";
import { PRIMARY_COLOR } from "@/constants/color";

// プログラミング言語のリスト
const languages = [
  "Bash",
  "C",
  "C#",
  "C++",
  "Clojure",
  "Cobol",
  "CoffeeScript",
  "D",
  "Elixir",
  "Erlang",
  "F#",
  "Go",
  "Haskell",
  "Java",
  "JavaScript",
  "Kotlin",
  "MySQL",
  "Nadesiko",
  "Objective-C",
  "Perl",
  "PHP",
  "Python2",
  "Python3",
  "R",
  "Ruby",
  "Rust",
  "Scala",
  "Scheme",
  "Swift",
  "TypeScript",
  "VB",
];

type FormValues = {
  language: string;
  technique: string;
};

const dummyTasks: Task[] = [
  {
    id: "1",
    language: "Python3",
    technique: "Django",
    title: "Task 1",
    description: "Task 1 description",
    user_id: "1",
    difficulty: 1,
    is_done: false,
    limit_at: new Date(),
  },
  {
    id: "2",
    language: "Ruby",
    technique: "Ruby on Rails",
    title: "Task 2",
    description: "Task 2 description",
    user_id: "1",
    difficulty: 2,
    is_done: false,
    limit_at: new Date(),
  },
  {
    id: "3",
    language: "Python3",
    technique: "Django",
    title: "Task 3",
    description: "Task 3 description",
    user_id: "1",
    difficulty: 3,
    is_done: false,
    limit_at: new Date(),
  },
];

export default function Home() {
  // タスク表示用
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const display_task_num = 3; // 直近3つのタスクを表示

  // 言語選択用
  const [language, setLanguage] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const menuItems = languages.map((language) => (
    <MenuItem value={language}>{language}</MenuItem>
  ));

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          verticalAlign: "top"
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
              m: 1
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
            {tasks.slice(-display_task_num).reverse().map((task: Task) => {
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
            // justifyContent: "center",
          }}
          component="form"
          noValidate
          // 後でやる
          // onSubmit={handleSubmit(onSubmit)}
        >
          {/* 学習したプログラミング言語の選択欄 */}
          <FormControl
            required
            sx={{
              m: 1,
              width: "80%"
            }}
          >
            <InputLabel id="select-language-label">学習言語</InputLabel>
            <Select
              labelId="select-language-label"
              id="select-language"
              value={language}
              label="Age *"
              onChange={handleChange}
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {menuItems}
            </Select>
          </FormControl>
          {/* 学習内容の入力欄 */}
          <TextField
            required
            id="outlined-required"
            label="学習内容"
            defaultValue=""
            sx={{
              width: "80%"
            }}
            multiline
            rows={3}
          />
          {/* タスク作成ボタン */}
          <Button
            variant="contained"
            sx={{
              width: "80%",
              backgroundColor: PRIMARY_COLOR,
              m: 1
            }}
            type="submit"
            >
            タスク作成
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
