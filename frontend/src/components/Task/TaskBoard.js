import React, { useEffect, useState } from "react";
import Column from "./Column";
import {
  Container,
  Grid,
  Button,
  Modal,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { config } from "../../utils/api";
import Header from "../Layout/Header";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`${config.backendpoint}/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const handleMoveTask = async (id, newStatus) => {
    const task = tasks.find((task) => task._id === id);
    const updatedTask = { ...task, status: newStatus };

    try {
      let updatedTaskFromBackend = await axios.put(
        `${config.backendpoint}/tasks/${task._id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setTasks(updatedTaskFromBackend.data);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value, status: "TODO" }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${config.backendpoint}/tasks`,
        newTask,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask({ title: "", description: "", status: "TODO" });
      handleClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          onClick={handleOpen}
        >
          Add Task
        </Button>
        <Grid container spacing={2}>
          {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
            <Grid item xs={4} key={status}>
              <Column
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
                onMoveTask={handleMoveTask}
              />
            </Grid>
          ))}
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Add New Task
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              label="Title"
              name="title"
              value={newTask.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Description"
              name="description"
              value={newTask.description}
              onChange={handleChange}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default TaskBoard;
