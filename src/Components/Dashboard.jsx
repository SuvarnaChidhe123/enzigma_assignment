import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button, Select, MenuItem, TextField, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Checkbox, Dialog, Menu
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import NewTask from './NewTask';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask'; // Import DeleteTask component

// Custom Pagination Component
function CustomPagination({ totalRecords, recordsPerPage, currentPage, onPageChange, totalPages, setTotalPages }) {
    const handleFirstPage = () => onPageChange(1);
    const handlePrevPage = () => onPageChange(currentPage - 1);
    const handleNextPage = () => onPageChange(currentPage + 1);
    const handleLastPage = () => onPageChange(totalPages);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '5px 10px',
                     backgroundColor: 'white', borderRadius: '2px', height: '40px', width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    {totalPages}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', height:'38px'}}>
                    <IconButton style={{height:'20px'}} onClick={() => setTotalPages(prev => Math.min(prev + 1, Math.ceil(totalRecords / recordsPerPage)))}>
                        <span style={{ fontSize: '10px' }}>▲</span>
                    </IconButton>
                    <IconButton style={{height:'20px'}} onClick={() => setTotalPages(prev => Math.max(prev - 1, 1))}>
                        <span style={{ fontSize: '10px'}}>▼</span>
                    </IconButton>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
                <Button variant="outlined" onClick={handleFirstPage} disabled={currentPage === 1}>
                    <FirstPageIcon /> First
                </Button>
                <Button variant="outlined" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <NavigateBeforeIcon /> Prev
                </Button>
                <span style={{ margin: '0 10px' }}>{currentPage}</span>
                <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next <NavigateNextIcon />
                </Button>
                <Button variant="outlined" onClick={handleLastPage} disabled={currentPage === totalPages}>
                    Last <LastPageIcon />
                </Button>
            </div>
        </div>
    );
}

// Dashboard Component
export default function Dashboard() {


    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(4);
    const [tasks, setTasks] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [openNewTask, setOpenNewTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDeleteTask, setOpenDeleteTask] = useState(false); // State for delete dialog

    // Fetch tasks from API
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3002/tasks');
            setTasks(response.data);
            setTotalRecords(response.data.length);
            setTotalPages(Math.ceil(response.data.length / recordsPerPage));
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handlePageChange = (page, recordsPerPageValue = recordsPerPage) => {
        setCurrentPage(page);
        setRecordsPerPage(recordsPerPageValue);
    };

    const handleOpenNewTask = () => setOpenNewTask(true);
    const handleCloseNewTask = () => {
        setOpenNewTask(false);
        fetchTasks();
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setOpenNewTask(true); // Use the same dialog for editing
    };

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleDeleteTask = () => {
        setOpenDeleteTask(true); // Open delete dialog
        handleMenuClose(); // Close the menu
    };

    // on close fun
 const closefun = () => {
    setOpenDeleteTask(false)
    setSelectedTask(null)
 }

    return (
        <div style={{ margin: '30px', fontFamily: 'Arial, sans-serif', border: '1px solid #e0e0e0', borderRadius: '2px', backgroundColor: '#F0F0F0' }}>
            <div>
                <div style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px' }}>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <FontAwesomeIcon icon={faList} style={{ marginRight: '18px', backgroundColor: '#C70039', color: 'white', padding: '8px', borderRadius: '4px' }} />
                            </div>
                            <div style={{ marginTop: '-4px' }}>
                                <h2>Tasks</h2>
                                <p>All Tasks</p>
                            </div>
                        </div>
                        <div>
                            <Button variant="contained" style={{ backgroundColor: '#ffeeba', color: '#856404', borderRadius: '2px', textTransform: 'none', width: 130 }} onClick={handleOpenNewTask}>
                                New Task
                            </Button>
                            <Button variant="contained" style={{ backgroundColor: '#ffeeba', color: '#856404', borderRadius: '2px', textTransform: 'none', width: 130 }} onClick={fetchTasks}>
                                Refresh
                            </Button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <TextField
                            style={{ backgroundColor: 'white' }}
                            variant="outlined"
                            size="small"
                            placeholder="Search"
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                )
                            }}
                        />
                    </div>
                    <p style={{ marginLeft: '4px', marginTop: '-10px' }}>{totalRecords} Records</p>
                </div>

                <div style={{ backgroundColor: 'white' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>Assigned To</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Priority</TableCell>
                                <TableCell>Comments</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((task) => (
                                <TableRow key={task._id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell style={{ color: '#1E90FF' }}>{task.assignedTo}</TableCell>
                                    <TableCell>{task.status}</TableCell>
                                    <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{task.priority}</TableCell>
                                    <TableCell>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>{task.comments}</span>
                                            <IconButton onClick={handleMenuClick} style={{ border: '1px solid #e0e0e0', borderRadius: '4px', padding: '3px', backgroundColor: 'white' }}>
                                                <ArrowDropDownIcon style={{ color: '#000' }} />
                                            </IconButton>
                                        </div>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                                style: {
                                                    boxShadow: 'none',
                                                    backgroundColor: '#ffeeba'
                                                }
                                            }}
                                        >
                                            <MenuItem style={{ backgroundColor: '#ffeeba' }} onClick={() => { handleEditTask(task); handleMenuClose(); }}>Edit</MenuItem>
                                            <MenuItem style={{ backgroundColor: '#ffeeba' }} onClick={handleDeleteTask}>Delete</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Component */}
                <CustomPagination
                    totalRecords={totalRecords}
                    recordsPerPage={recordsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    totalPages={totalPages}
                    setTotalPages={setTotalPages}
                />
            </div>

            {/* Dialog for New Task or Edit Task */}
            <Dialog open={openNewTask} onClose={handleCloseNewTask}>
                {selectedTask ? <EditTask onClose={handleCloseNewTask} task={selectedTask} /> : <NewTask onClose={handleCloseNewTask} />}
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteTask} onClose={() => setOpenDeleteTask(false)}>
                <DeleteTask onClose={closefun } task={selectedTask} fetchTasks={fetchTasks} />
            </Dialog>
        </div>
    );
}
