import React from "react";
import Link from "next/link";

import Header from "./components/header";

export default function Home() {
  return (
    <div>
      {/* ヘッダーの表示 */}
      <Header />
      <h1>Top</h1>
      {/* 確認用のリンク */}
      {/* 後で削除予定 */}
      <Link href="/log_in">
        <p>log in</p>
      </Link>
      <Link href="/sign_up">
        <p>sign up</p>
      </Link>
      <Link href="/tasks">
        <p>tasks</p>
      </Link>
      <Link href="/task/1">
        <p>Task 1</p>
      </Link>
      <Link href="/task/2">
        <p>Task 2</p>
      </Link>
    </div>
  );
}
