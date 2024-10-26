import React from "react";

type Props = {
  params: {
    id: string;
  };
};

// ダミーデータ
const task = {
  id: "1",
  language: "Python",
  technique: "for-loop",
  title: "sum1to10",
  description: "What's the sum of 1 to 10?",
  user_id: "3",
  difficulty: "2"
};

const Page = ({ params }: Props) => {
  return (
    <div>
      <h1>Task</h1>
      {/* 最終的には消す */}
      <p>task id: {params.id}</p>

      {/* とりあえず表形式で表示 */}
      <table>
        <tr>
          <th>プログラミング言語</th>
          <td>{task.language}</td>
        </tr>
        <tr>
          <th>学んだこと</th>
          <td>{task.technique}</td>
        </tr>
        <tr>
          <th>task名</th>
          <td>{task.title}</td>
        </tr>
        <tr>
          <th>説明</th>
          <td>{task.description}</td>
        </tr>
        <tr>
          <th>難易度</th>
          <td>{task.difficulty}</td>
        </tr>
      </table>
    </div>
  );
};

export default Page;
