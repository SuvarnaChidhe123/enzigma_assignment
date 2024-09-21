import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const DeleteTask = ({ onClose }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);

    // Fetch tasks from the server (useEffect to load tasks initially)
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3002/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    // Handle task selection
    const handleTaskSelect = (event) => {
        setSelectedTask(event.target.value);
    };

    // Open confirmation dialog
    const handleDeleteClick = () => {
        if (selectedTask) {
            setOpenConfirm(true);
        } else {
            alert('Please select a task to delete');
        }
    };

    // Close the confirmation dialog
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    // Handle task deletion
    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:3002/tasks/${selectedTask}`);
            console.log('Task deleted:', selectedTask);
            setTasks(tasks.filter((task) => task._id !== selectedTask)); // Remove deleted task from the list
            setOpenConfirm(false);
            onClose(); // Close the form after deletion
        } catch (error) {
            console.error('Error deleting task:', error.response.data);
        }
    };

    return (
        <Box display="flex" justifyContent="center">
            <Grid container  maxWidth="600px" style={{ border: '2px solid #DCDCDC' }}>
                {/* Header Section */}
                <Grid item xs={12} style={{ backgroundColor: '#C70039', color: 'white', padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h6">Delete</Typography>
                </Grid>

                {/* Confirmation Text */}
                <Grid item xs={12} style={{ padding: '20px', textAlign: 'left' }}>
                    <Typography variant="body1" style={{ fontWeight: 600 }}>
                        Are you sure you want to delete this task?
                    </Typography>
                </Grid>

                {/* Button Section */}
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'right', padding:25 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: '10px', width: '100px', backgroundColor: '#4CAF50' }}
                        onClick={handleDeleteClick}
                    >
                        No
                    </Button>
                    <Button
                        color="black"
                        style={{ width: '100px', backgroundColor: '#ffeeba' }}
                        onClick={onClose}
                    >
                        Yes
                    </Button>
                </Grid>

                {/* Confirmation Dialog */}
                <Dialog
                    open={openConfirm}
                    onClose={handleCloseConfirm}
                    aria-labelledby="confirm-dialog-title"
                    aria-describedby="confirm-dialog-description"
                >
                    <DialogTitle id="confirm-dialog-title" style={{ color: 'red', textAlign: 'center' }}>
                        {"Confirm Task Deletion"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-dialog-description" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Are you sure you want to delete this task? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'center', marginBottom: '20px' }}>
                        <Button onClick={handleCloseConfirm} variant="outlined" color="primary">
                            No
                        </Button>
                        <Button onClick={handleDeleteConfirm} variant="contained" color="secondary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Box>
    );
};

export default DeleteTask;
