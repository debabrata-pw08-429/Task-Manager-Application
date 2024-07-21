import React from "react";
import { useDrag } from "react-dnd";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { convertDateTime } from "../../utils/convertDateTime";

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  console.log(task);

  return (
    <Card
      ref={drag}
      style={{ marginBottom: "16px", opacity: isDragging ? 0.5 : 1 }}
    >
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body2" sx={{ marginTop: "5px", color: "grey" }}>
          {convertDateTime(task.createdAt)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Task;
