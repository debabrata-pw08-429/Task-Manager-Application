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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { config } from "../../utils/api";
import Header from "../Layout/Header";

const TaskBoard = () => {
  // State to store tasks and control the modal
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  // State to handle new task input
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
  });

  // State for search query and sort criteria
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("recent");

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${config.backendpoint}/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(response.data); // Update tasks state with fetched data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to handle moving a task to a different status
  const handleMoveTask = async (id, newStatus) => {
    const task = tasks.find((task) => task._id === id);
    const updatedTask = { ...task, status: newStatus };

    try {
      const updatedTaskFromBackend = await axios.put(
        `${config.backendpoint}/tasks/${task._id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks(updatedTaskFromBackend.data); // Update task list with the modified task
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Functions to control the modal's open/close state
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to handle changes in the new task form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  // Function to save the new task
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${config.backendpoint}/tasks`,
        newTask,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]); // Add new task to the list
      setNewTask({ title: "", description: "", status: "TODO" }); // Reset new task form
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Function to handle search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle sort criteria changes
  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // Filter and sort tasks based on search and sort criteria
  const filteredAndSortedTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <>
      <Header />
      <Container sx={{ padding: "21px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          onClick={handleOpen}
        >
          Add Task
        </Button>

        {/* Search and Sort Components */}
        <Box mb={2}>
          <TextField
            fullWidth
            label="Search by task name"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortCriteria}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="recent">Most Recent</MenuItem>
                <MenuItem value="older">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
            <Grid item xs={4} key={status}>
              <Column
                status={status}
                tasks={filteredAndSortedTasks.filter(
                  (task) => task.status === status
                )}
                onMoveTask={handleMoveTask}
                fetchTasks={fetchTasks} // Pass fetchTasks to Column
              />
            </Grid>
          ))}
        </Grid>

        {/* Modal for adding a new task */}
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
              borderRadius: "5px",
              bgcolor: "background.paper",
              border: "3px solid #deefff",
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
