import React, { useState } from "react";
import { useDrag } from "react-dnd";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { convertDateTime } from "../../utils/convertDateTime";
import axios from "axios";
import { config } from "../../utils/api";

const Task = ({ task, fetchTasks }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [taskDetails, setTaskDetails] = useState(task);

  // Handle opening and closing modals
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  // Handle input change in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Save edited task
  const handleSave = async () => {
    try {
      await axios.put(
        `${config.backendpoint}/tasks/${taskDetails._id}`,
        taskDetails,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchTasks();
      handleCloseEdit();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  // Delete task
  const handleDelete = async () => {
    try {
      await axios.delete(`${config.backendpoint}/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <>
      <Card
        ref={drag}
        style={{
          marginBottom: "16px",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <CardContent>
          <Typography variant="h5">{task.title}</Typography>
          <Typography variant="body2" sx={{ color: "grey" }}>
            {task.description}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "5px", color: "grey" }}>
            Created At: {convertDateTime(taskDetails.createdAt)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="info" onClick={handleOpenEdit}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button size="small" color="success" onClick={handleOpenView}>
            View Details
          </Button>
        </CardActions>
      </Card>

      {/* View Details Modal */}
      <Modal open={openView} onClose={handleCloseView}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            borderRadius: "5px",
            bgcolor: "background.paper",
            border: "3px solid #deefff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Task Details
          </Typography>
          <hr />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Title: {taskDetails.title}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Description: {taskDetails.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "grey" }}>
            Created At: {convertDateTime(taskDetails.createdAt)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "grey" }}>
            Updated At:{" "}
            {taskDetails.updatedAt
              ? convertDateTime(taskDetails.updatedAt)
              : "N/A"}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseView}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Edit Task Modal */}
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            borderRadius: "5px",
            bgcolor: "background.paper",
            border: "3px solid #deefff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Task
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Title"
            name="title"
            value={taskDetails.title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Description"
            name="description"
            value={taskDetails.description}
            onChange={handleChange}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseEdit}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Task;
