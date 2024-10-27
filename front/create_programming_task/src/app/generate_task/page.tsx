"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const language = searchParams.get("language");
  const technique = searchParams.get("technique");

  return (
    <div>
      <h1>Generate Task</h1>
      <p>language: {language}</p>
      <p>technique: {technique}</p>
    </div>
  );
};

export default Page;
