"use client";

import React from "react";
import {
  SelectChangeEvent,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Input,
  TextField,
  OutlinedInput,
  Button,
} from "@mui/material";
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

export default function Home() {
  const [language, setLanguage] = React.useState("");

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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
            width: "50%",
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
            width: "50%",
          }}
          multiline
          rows={3}
        />
        {/* タスク作成ボタン */}
        <Button
          variant="contained"
          sx={{
            width: "50%",
            backgroundColor: PRIMARY_COLOR,
            m: 1,
          }}
          type="submit"
        >
          タスク作成
        </Button>
      </Box>
    </Container>
  );
}
