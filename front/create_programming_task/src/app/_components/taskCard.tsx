import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Box,
  Chip,
} from "@mui/material";

import { SECONDARY_COLOR } from "@/constants/color";
import type { Task } from "@/types/task";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <Card sx={{ boxShadow: "10px 5px 5px lightGray" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="div" sx={{ padding: "4px" }}>
            {task.title}
            <Chip label={task.language} sx={{ marginLeft: "10px" }} />
          </Typography>
          <Rating name="difficulty" value={task.difficulty} max={3} readOnly />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ padding: "4px" }}
        >
          {task.description}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: SECONDARY_COLOR,
            color: "black",
          }}
          onClick={() => {
            window.location.href = `/task/${task.id}`;
          }}
        >
          詳細を確認する
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
