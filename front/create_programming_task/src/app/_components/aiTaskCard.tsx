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

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from "@/constants/color";
import type { AiTask } from "@/types/aitask";

type Props = {
    task: AiTask;
};

const AiTaskCard = ({ task }: Props) => {
    return (
        <Card sx={{
        boxShadow: "10px 5px 5px lightGray",
        backgroundColor: "whitesmoke"
        }}>
        <CardContent>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        padding: "4px"
                    }}
                >
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
            <Typography>
                {task.example}
            </Typography>
            <Button
            variant="contained"
            sx={{
                backgroundColor: SECONDARY_COLOR,
                color: "black",
            }}
            // TODO: 変える！！
            // onClick={() => {
            //     window.location.href = `/task/${task.id}`;
            // }}
            >
            Save
            </Button>
        </CardContent>
        </Card>
    );
};

export default AiTaskCard;
