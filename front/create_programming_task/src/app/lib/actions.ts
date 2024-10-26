"use server";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

// Cookieからアクセストークンを取得
export const getAccessToken = async (): Promise<RequestCookie> => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("access_token");
  if (cookie === undefined) {
    return {
      name: "access_token",
      value: "",
    };
  } else {
    return cookie;
  }
};

// Cookieからアクセストークンを削除
export const deleteAccessToken = async () => {
  const cookieStore = cookies();
  cookieStore.set({
    name: "access_token",
    value: "",
    maxAge: 0,
  });
};

// Cookieにアクセストークンを保存
export const setAccessToken = async (accessToken: string) => {
  const cookieStore = cookies();
  cookieStore.set({
    name: "access_token",
    value: accessToken,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
  });
};
