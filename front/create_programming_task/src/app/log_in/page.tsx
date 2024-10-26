"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Container,
  Box,
  FormControl,
  Button,
  Typography,
  TextField,
} from "@mui/material";

type FormValues = {
  username: string;
  password: string;
};

// validation rules of the form
const validationRules = {
  username: {
    required: "名前を入力してください。",
  },
  password: {
    required: "パスワードを入力してください。",
    minLength: {
      value: 6,
      message: "パスワードは6文字以上で入力してください。",
    },
  },
};

const Page = () => {
  // フォームの状態管理
  const { control, handleSubmit } = useForm<FormValues>();

  // submitされた情報でログイン処理を行う
  // endpoint: http://localhost:8000/log_in (method: POST)
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(`data: ${JSON.stringify(data)}`);
    try {
      const response = await fetch("http://localhost:8000/log_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const responseJson = await response.json();
      console.log(`response: ${JSON.stringify(responseJson)}`);

      if (response.status === 200) {
        // ログイン成功時の処理
        // ログイン後のページにリダイレクト
        // cookieにaccess_tokenを保存
        document.cookie = `access_token=${responseJson.access_token}; path=/; secure`;
        window.location.href = "/";
      } else if (response.status === 401) {
        // ログイン失敗時の処理
        alert("ログインに失敗しました。");
      }
    } catch (error) {
      console.error(`error: ${error}`);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          ログイン
        </Typography>
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
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* 名前の入力欄 */}
          <FormControl sx={{ width: "80%", marginBottom: "16px" }}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={validationRules.username}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="username"
                  type="text"
                  autoComplete="username"
                  required={true}
                  placeholder="名前"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </FormControl>
          {/* パスワードの入力欄 */}
          <FormControl sx={{ width: "80%", marginBottom: "16px" }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={validationRules.password}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required={true}
                  placeholder="パスワード"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              width: "80%",
            }}
            type="submit"
          >
            ログイン
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
