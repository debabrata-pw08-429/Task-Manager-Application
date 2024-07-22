import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import { Paper, Typography, Box } from "@mui/material";

/**
 * Column component represents a column in a task board.
 * It handles drag-and-drop functionality for tasks and displays tasks within the column.
 *
 * @param {Object} props - The component props.
 * @param {string} props.status - The status/category of the column.
 * @param {Array} props.tasks - Array of task objects to be displayed in the column.
 * @param {Function} props.onMoveTask - Callback function to handle moving a task to this column.
 * @param {Function} props.fetchTasks - Function to fetch tasks (if needed).
 *
 * @returns {JSX.Element} The rendered column component.
 */

const Column = ({ status, tasks, onMoveTask, fetchTasks }) => {
  // Set up drag-and-drop functionality using react-dnd
  const [{ isOver }, drop] = useDrop({
    accept: "TASK", // Accepts items of type 'TASK'
    drop: (item) => onMoveTask(item.id, status), // Handle task drop
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Track if the column is being dragged over
    }),
  });

  return (
    <Paper
      ref={drop} // Reference for the drop target
      style={{
        padding: "16px",
        backgroundColor: isOver ? "#f0f0f0" : "#fff",
      }}
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
        {status} {/* Display the column's status */}
      </Typography>
      <Box>
        {tasks.map((task) => (
          <Task key={task._id} task={task} fetchTasks={fetchTasks} /> // Render each task
        ))}
      </Box>
    </Paper>
  );
};

export default Column;
