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
import { PRIMARY_COLOR } from "@/constants/color";
import Header from "../_components/header";
import { setAccessToken } from "@/lib/actions";

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
  // endpoint: http://localhost:8000/sign_up (method: POST)
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(`data: ${JSON.stringify(data)}`);
    const response = await fetch("http://localhost:8000/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const responseJson = await response.json();
    console.log(`response: ${JSON.stringify(responseJson)}`);
    if (response.ok) {
      // ユーザー登録成功時の処理
      // ログインページにリダイレクト
      const res = await fetch("http://localhost:8000/log_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (res.ok) {
        const resJson = await res.json();
        console.log(`access_token: ${resJson.access_token}`);
        await setAccessToken(resJson.access_token);
        window.location.href = "/top";
      } else {
        alert("ユーザー登録に失敗しました。");
      }
    }
  };

  return (
    <>
      <Header />
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
            ユーザー登録
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
                color: "white",
                background: "#0ea5dc",
              }}
              type="submit"
            >
              登録
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Page;
