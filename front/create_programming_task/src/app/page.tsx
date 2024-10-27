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
import AiTaskCard from "./_components/aiTaskCard";

import type { Task } from "@/types/task";
import type { AiTask } from "@/types/aitask";
import { BUTTON_COLOR, PRIMARY_COLOR } from "@/constants/color";
import { LANGUAGES } from "@/constants/languages";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { mockTasks } from "@/constants/mocks";
import { Language } from "@/types/language";
import { getAccessToken } from "@/lib/actions";
import LogoImage from "./public/Logo.png";
import Link from "next/link";
import Image from "next/image";

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
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{padding: "50px;"}}>
          <Image src={LogoImage} alt='Logo' width={500} height={500} />
        </div>

        <div id="descript_appli" style={{fontSize: "20px"}}>このサイトではあなたに合わせた問題を作成することができます．
        
        <p><Link href='/log_in'>サービスへはこちらから</Link></p>
        </div>
      </Box>
    </Container>
  );
}
