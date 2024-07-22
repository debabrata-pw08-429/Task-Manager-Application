import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import { Paper, Typography, Box } from "@mui/material";

const Column = ({ status, tasks, onMoveTask, fetchTasks }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onMoveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Paper
      ref={drop}
      style={{ padding: "16px", backgroundColor: isOver ? "#f0f0f0" : "#fff" }}
    >
      <Typography
        variant="h6"
        sx={{
          border: "1px solid black",
          backgroundColor: "#deefff",
          textAlign: "center",
          marginBottom: "12px",
        }}
      >
        {status}
      </Typography>
      <Box>
        {tasks.map((task) => (
          <Task key={task._id} task={task} fetchTasks={fetchTasks} />
        ))}
      </Box>
    </Paper>
  );
};

export default Column;
