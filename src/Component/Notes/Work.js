import NavBar from "../../Base/NavBar";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Card, Dialog, Divider, FormControl, IconButton, InputLabel, List, MenuItem, Select, TextField, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from "react";
import Slide from '@mui/material/Slide';
import axios from "axios";
import Swal from "sweetalert2";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100% !important;
    height: 36vh;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    background:#f0f0f5;
    color:Black;
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const headingOption = [
    { id: 1, value: "Ideas", label: "Ideas" },
    { id: 2, value: "To-Do", label: "To-Do" },
    { id: 3, value: "Fun", label: "Fun" },
    { id: 4, value: "Information / Remainder", label: "Information / Remainder" },
    { id: 5, value: "Plans", label: "Plans" }
];

const Work = () => {
    const history = useHistory();
    const [openAddNote, setOpenAddNote] = React.useState(false);
    const [openUpdateNote, setOpenUpdateNote] = React.useState(false);
    const [todolist, setTodolist] = React.useState([]);
    const [type, setType] = React.useState("Work");
    const [noteHead, setNoteHead] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [datas, setDatas] = React.useState({});
    const [updateNoteHead, setUpdateNoteHead] = React.useState("");
    const [updateNotes, setUpdateNotes] = React.useState("");
    const [updateId, setUpdateId] = React.useState("");

    const MyToDoListColorMap = {
        "Ideas": { color: "text-[#ac00e6]" },
        "To-Do": { color: "text-[#ff0000]" },
        "Quotes": { color: "text-[#30cf95]" },
        "Information / Remainder": { color: "text-[#ff6600]" },
        "Plans": { color: "text-[#2f72d0]" },
        "Fun": { color: "text-[#FFA500]" },
    }

    useEffect(() => {
        getTodolist();
    }, []);

    const handleClickOpenAddNote = () => {
        setOpenAddNote(true);
    };

    const handleCloseAddNote = () => {
        setOpenAddNote(false);
    };


    const handleCloseUpdateNote = () => {
        setOpenUpdateNote(false);
    };

    //  alert Function
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    // to add the ToDoList data
    const addToDoList = async (e) => {
        // console.log(window.localStorage.getItem("id"));
        e.preventDefault();
        handleCloseAddNote();
        try {
            let req = await axios.post(
                `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/api/toDoListdata/`,
                {
                    userid: window.localStorage.getItem("id"),
                    type,
                    noteHead,
                    notes,
                },
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );
            const { data } = req;
            // console.log(data);
            const { message, statusCode } = data;
            // console.log(data);
            if (statusCode === 200) {
                setType(type);
                getTodolist();
                Toast.fire({ icon: "success", title: message });
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Error in adding To Do List Data",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // for getting the todolist from specificUser
    const getTodolist = async () => {
        try {
            let y = window.localStorage.getItem("id");
            // console.log(y);
            let req = await axios.get(
                `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/api/toDoListdata/specificUser/${y}`,
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );
            const { data } = req;
            const { message, statusCode, alltoDoListData } = data;
            // console.log(data);
            const FilterlisitDataByType = alltoDoListData.filter((data) => data.type === "Work");
            if (statusCode === 200) {
                setTodolist(FilterlisitDataByType);
                // console.log(FilterlisitDataByType);
            } else {
                setDatas({ message });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // for delete ToDoliSt
    const delToDolist = async (id) => {
        // console.log(id)
        try {
            let req = await axios.delete(
                `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/api/toDoListdata/deleteToDoListData/${id}`,
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );
            const { data } = req;
            const { message, statusCode } = data.data;
            if (statusCode === 200) {
                getTodolist();
                Toast.fire({ icon: "success", title: message });
            } else {
                Toast.fire({ icon: "error", title: "Can't delete To-Do List Data" });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // for Update ToDoliSt
    const handleClickOpenUpdateNote = (todolistdata) => {
        setOpenUpdateNote(true);
        // console.log(todolistdata)
        setUpdateId(todolistdata._id);
    };
    const editToDoList = async () => {
        try {
            // console.log(updateId, updateNoteHead, updateNotes)
            const response = await axios.put(
                `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/api/toDoListdata/edit/${updateId}`,
                {
                    userid: window.localStorage.getItem("id"),
                    type: "Work",
                    noteHead: updateNoteHead,
                    notes: updateNotes,
                },
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );
            setNoteHead(updateNoteHead);
            setNotes(updateNotes)
            getTodolist();
            setUpdateNoteHead("");
            setUpdateNotes("");
            Toast.fire({ icon: "success", title: "Updated Successfully" });
            setOpenUpdateNote(false);
            // console.log("Edit ToDoList Response:", response.data);
        }
        catch (error) {
            console.error("Error in editToDoList:", error);
            Toast.fire({ icon: "error", title: "An error occurred while updating ToDoList" });
        }
    };
    return (
        <div>
            <NavBar />
            <div className=" mt-10 lg:w-[77%] md:w-[95%] mx-auto h-[74vh]">
                <div className="flex flex-row justify-between items-center py-3">
                    <div className="flex flex-row justify-center items-center ml-2 md:ml-0">
                        <ArrowBackIosIcon className="w-8 h-8 text-[#F86206] cursor-pointer" onClick={() => history.goBack()} />
                        <Typography className="font-medium text-[20px] text-[#1B1B1B]">Work</Typography>

                    </div>
                    <div>
                        <Button variant="contained" className="bg-[#F86206] mr-2 md:mr-0" onClick={handleClickOpenAddNote}>Add Note</Button>
                        <Dialog
                            fullScreen
                            open={openAddNote}
                            onClose={handleCloseAddNote}
                            TransitionComponent={Transition}
                        >
                            <AppBar sx={{ position: 'relative', backgroundColor: "#F86206" }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label="close"
                                        onClick={handleCloseAddNote}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        Work
                                    </Typography>

                                </Toolbar>
                            </AppBar>
                            <List>

                                <Typography className="font-bold flex justify-center items-center mt-8 mx-2 md:mx-2 ">Leveraging expertise to chart new horizons and redefine excellence in every endeavor.</Typography>
                                <form onSubmit={addToDoList}>
                                    <div className="h-[74vh] mt-5 w-[90%] mx-auto flex lg:flex-row lg:justify-between items-center flex-col  ">
                                        <Card className="lg:w-[80%] w-[100%]  lg:mr-10 h-[70vh] mt-5 lg:mt-0 p-5 pt-5 rounded-[20px] shadow-md lg:order-1 md:order-2  order-2">
                                            <div className=" h-[65vh]  overflow-y-auto ">

                                                <Textarea aria-label="minimum height" minRows={15} placeholder="Type your thoughts here 😊....."
                                                    type="text"
                                                    name="Notes"
                                                    required
                                                    onChange={(e) => {
                                                        setNotes(e.target.value);
                                                    }} />



                                            </div>
                                        </Card>
                                        <Card className="lg:w-[20%] md:w-[50%] w-[100%] mb-3 md:h-[32vh] h-[70vh]  rounded-[20px] flex flex-col justify-center py-5 shadow-md lg:order-2 md:order-1 order-1">

                                            <MenuItem className="">
                                                <TextField
                                                    className="w-[100%] mb-3 lg:mb-0 "
                                                    id="outlined-basic" variant="outlined"
                                                    label="Work"
                                                    disabled
                                                />
                                            </MenuItem>
                                            <MenuItem>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={noteHead}
                                                        label="Topic"
                                                        required
                                                        onChange={(e) => {
                                                            setNoteHead(e.target.value);
                                                        }}
                                                    >
                                                        {headingOption.map((item) => (
                                                            <MenuItem key={item.id} value={item.value}>
                                                                {item.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </MenuItem>
                                            <div className=" flex justify-end mt-3 mr-4">
                                                <Button variant="contained" className="bg-[#F86206] "
                                                    type="submit" >
                                                    Save
                                                </Button>
                                            </div>

                                        </Card>
                                    </div>
                                </form>
                            </List>
                        </Dialog>
                        {/*For Update Note Dialog box   */}
                        <Dialog
                            fullScreen
                            open={openUpdateNote}
                            onClose={handleCloseUpdateNote}
                            TransitionComponent={Transition}
                        >
                            <AppBar sx={{ position: 'relative', backgroundColor: "#F86206" }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label="close"
                                        onClick={handleCloseUpdateNote}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        Update Work
                                    </Typography>

                                </Toolbar>
                            </AppBar>
                            <List>

                                <Typography className="font-bold flex justify-center items-center mt-8 mx-2 md:mx-2">Professional repository for essential information, innovative ideas, insightful reflections, and actionable tasks for personal and organizational use.</Typography>
                                <div >
                                    <div className="h-[74vh] mt-5 w-[90%] mx-auto flex lg:flex-row lg:justify-between items-center flex-col ">
                                        <Card className="lg:w-[80%] w-[100%]  lg:mr-10 h-[70vh] mt-5 lg:mt-0 p-5 pt-5 rounded-[20px] shadow-md lg:order-1 md:order-2 order-2">
                                            <div className=" h-[65vh]  overflow-y-auto ">

                                                <Textarea aria-label="minimum height" minRows={15} placeholder="Type your thoughts here 😊....."
                                                    type="text"
                                                    name="Notes"
                                                    value={updateNotes}
                                                    required
                                                    onChange={(e) => {
                                                        setUpdateNotes(e.target.value);
                                                    }} />



                                            </div>
                                        </Card>
                                        <Card className="lg:w-[20%] md:w-[50%] w-[100%] mb-3 md:h-[32vh] h-[70vh]  rounded-[20px] flex flex-col justify-center py-5 shadow-md lg:order-2 md:order-1 order-1">

                                            <MenuItem className="">
                                                <TextField
                                                    className="w-[100%] mb-3 lg:mb-0"
                                                    id="outlined-basic" variant="outlined"
                                                    label="Personal"
                                                    disabled
                                                />
                                            </MenuItem>
                                            <MenuItem>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={updateNoteHead}
                                                        label="Topic"
                                                        required
                                                        onChange={(e) => {
                                                            setUpdateNoteHead(e.target.value);
                                                        }}
                                                    >
                                                        {headingOption.map((item) => (
                                                            <MenuItem key={item.id} value={item.value}>
                                                                {item.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </MenuItem>
                                            <div className=" flex justify-end mt-3 mr-4">
                                                <Button variant="contained" className="bg-[#F86206] "
                                                    onClick={() => editToDoList()} >
                                                    Save
                                                </Button>
                                            </div>

                                        </Card>
                                    </div>
                                </div>
                            </List>
                        </Dialog>
                    </div>

                </div>
                <div className="h-[65vh] overflow-y-auto   p-2 md:p-0 mt-7 md:mt-0" >
                    {todolist.map((todolist, idx) => (
                        <Accordion
                            key={idx}>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon className="cursor-pointer" />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <div className='flex flex-row w-[98%] justify-between items-center'>
                                    <Typography className={`text-[16px] font-medium ${MyToDoListColorMap[todolist.noteHead]?.color}`}>{todolist.noteHead}</Typography>

                                    <div className="flex flex-row justify-between items-center lg:w-[25%] md:w-[40%]">
                                        <Typography className="text-[14px] mr-3 font-medium md:block hidden">{todolist.currentDate}</Typography>
                                        <div onClick={() => handleClickOpenUpdateNote(todolist)}
                                            className="text-[#F86206] text-[14px] font-medium mr-3 cursor-pointer rounded-sm flex items-center border border-solid border-[#E3E7EB] px-2 py-1" >
                                            <EditNoteIcon className="w-6 h-5"
                                            /> Edit
                                        </div>
                                        <div onClick={() => delToDolist(todolist._id)}
                                            className="text-[#DC4134] text-[14px] font-medium cursor-pointer rounded-sm flex items-center border border-solid border-[#E3E7EB] px-2 py-1" >
                                            <DeleteOutlineRoundedIcon className="w-6 h-5"
                                            /> Delete
                                        </div>
                                        <Divider orientation="vertical" variant="middle" className='ml-3' flexItem />
                                    </div>

                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className="text-[14px] mr-3 font-semibold block md:hidden">{todolist.currentDate}</Typography>
                                <Typography className="text-wrap">
                                    {todolist.notes}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Work;