"use client";

import React, { useState, useEffect } from "react";
import { getAccessToken } from "@/lib/actions";
import {
  Grid2,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import TaskCard from "../_components/taskCard";
import LanguageSelect from "./_components/languageSelect";

import type { Language } from "@/types/language";
import type { Task } from "@/types/task";

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

const dummyLanguages: Language[] = ["Python3", "Ruby"];

const Page: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [selectedLanguage, setSelectedLanguage] = useState<Language | "All">(
    "All"
  );
  const [languages, setLanguages] = useState<Language[]>(dummyLanguages);

  useEffect(() => {
    const fetchTasks = async () => {
      const accessToken = await fetchAccessToken();

      if (accessToken === "") {
        // ログインしていない場合の処理
        // このままだと結構やばいので、ログインページへの導線を考える
        window.location.href = "/log_in";
      } else {
        // ログインしている場合の処理
        // タスクの取得処理を書く
        // http://localhost:8000/tasks (method: GET)
        const response = await fetch("http://localhost:8000/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const responseJson = await response.json();

        if (response.ok) {
          // タスク追加の処理ができたらコメントアウトを外して機能を確認する
          setTasks(responseJson.tasks);
          // 言語の一覧を取得
          const languages: Language[] = responseJson.tasks.map(
            (task: Task) => task.language
          );
          const uniqueLanguages = Array.from(new Set(languages));
          setLanguages(uniqueLanguages);
        } else {
          alert("タスクの取得に失敗しました。");
        }
      }
    };

    fetchTasks();
  }, []);

  // アクセストークンの取得
  const fetchAccessToken = async () => {
    const accessToken = await getAccessToken();
    return accessToken.value;
  };

  return (
    <>
      <LanguageSelect
        languages={languages}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Grid2
        container
        spacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ marginTop: "20px", padding: "0 5%" }}
      >
        {tasks.map((task: Task) => {
          if (
            selectedLanguage !== "All" &&
            task.language !== selectedLanguage
          ) {
            return null;
          }

          return (
            <Grid2 key={task.id} size={{ xs: 4, sm: 8, md: 6 }}>
              <TaskCard task={task} />
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
};

export default Page;
