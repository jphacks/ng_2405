import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <div>
      <h1>Task</h1>
      <p>task id: {params.id}</p>
    </div>
  );
};

export default Page;
