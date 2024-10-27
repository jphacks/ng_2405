"use client";

import React, { useState, useEffect } from "react";
import { deleteAccessToken, getAccessToken } from "../../lib/actions";

import Link from "next/link";
import { Typography, Box } from "@mui/material";
import styles from "./headerLink.module.css";
import "../globals.css";
import { TERTIARY_COLOR } from "@/constants/color";
import { FONT } from "@/constants/font";

// ログインしている場合はログアウトリンクを表示
// ログインしていない場合はログインリンクを表示
const HeaderLink = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token.value);
    };
    fetchAccessToken();
  }, []);

  const handleLogout = async () => {
    // ログアウト処理
    // http://localhost:8000/log_out にPOSTリクエストを送信
    // ログアウト成功時、Cookieのaccess_tokenを削除
    const response = await fetch("http://localhost:8000/log_out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    // ログアウト成功時、Cookieのaccess_tokenを削除
    if (response.ok) {
      // cookieからaccess_tokenを削除
      deleteAccessToken();
      setAccessToken("");
      alert("ログアウトしました");
    } else {
      alert("ログアウトに失敗しました");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Link href="/top" className={styles.link}>
        <Typography
          sx={[
            {
              "&:hover": {
                color: TERTIARY_COLOR,
              },
            },
            {
              color: "white",
              whiteSpace: "nowrap",
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginRight: "1.5rem",
              // fontFamily: FONT,
            },
          ]}
        >
          トップページ
        </Typography>
      </Link>
      <Link href="/tasks" className={styles.link}>
        <Typography
          sx={[
            {
              "&:hover": {
                color: TERTIARY_COLOR,
              },
            },
            {
              color: "white",
              whiteSpace: "nowrap",
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginRight: "1.5rem",
              // fontFamily: FONT,
            },
          ]}
        >
          タスク一覧
        </Typography>
      </Link>
      {accessToken !== "" ? (
        <Typography
          sx={[
            {
              "&:hover": {
                color: TERTIARY_COLOR,
              },
            },
            {
              color: "white",
              whiteSpace: "nowrap",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.5rem",
              // fontFamily: FONT,
            },
          ]}
          onClick={handleLogout}
        >
          ログアウト
        </Typography>
      ) : (
        <Link href="/log_in" className={styles.link}>
          <Typography
            sx={[
              {
                "&:hover": {
                  color: TERTIARY_COLOR,
                },
              },
              {
                color: "white",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                fontSize: "1.5rem",
                // fontFamily: FONT,
              },
            ]}
          >
            ログイン
          </Typography>
        </Link>
      )}
    </Box>
  );
};

export default HeaderLink;
