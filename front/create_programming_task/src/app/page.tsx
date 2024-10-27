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
import Image from 'next/image';
import Link from "next/link";
import LogoImage from "./public/Logo.png"

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
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
        <Image src={LogoImage} alt='Logo' width={500} height={500} />
        <div id="descript_appli">このサイトではあなたに合わせた問題を作成することができます．
        </div>
        <Link href='/log_in'>サービスへはこちらから</Link>
      </Box>
    </Container>
  );
}
