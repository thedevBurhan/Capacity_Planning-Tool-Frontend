import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Card, Dialog, Divider, FormControl, IconButton, InputLabel, List, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from "react";
import NavBar from "../Base/NavBar";
import { useHistory } from "react-router-dom";
import Slide from '@mui/material/Slide';
import TimeTrackingPic from "../images/TimeTracking.png"
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Paper from '@mui/material/Paper';
import Swal from "sweetalert2";
import axios from 'axios';
import dayjs from 'dayjs';

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100% !important;
    height: 5vh;
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

const TimeTracking = () => {
    const history = useHistory();
    const [opentimeSheet, setOpentimeSheet] = React.useState(false);
    const [openUpdatetimesheet, setOpenUpdatetimesheet] = React.useState(false);
    const [timeSheet, setTimeSheet] = React.useState([]);
    const [MTimeIn, setMTimeIn] = React.useState(dayjs(''));
    const [MTimeOut, setMTimeOut] = React.useState(dayjs(''));
    const [ATimeIn, setATimeIn] = React.useState(dayjs(''));
    const [ATimeOut, setATimeOut] = React.useState(dayjs(''));
    const [notes, setNotes] = React.useState("");
    const [datas, setDatas] = React.useState({});
    const [sheet, setSheet] = React.useState("");
    const timeSheetArray = Object.values(timeSheet);
    const [updateId, setUpdateId] = React.useState("");
    const [updatedMTimeIn, setUpdatedMTimeIn] = React.useState(dayjs(''));
    const [updatedMTimeOut, setUpdatedMTimeOut] = React.useState(dayjs(''));
    const [updatedATimeIn, setUpdatedATimeIn] = React.useState(dayjs(''));
    const [updatedATimeOut, setupdatedATimeOut] = React.useState(dayjs(''));
    const [updatedTimeSheet, setUpdatedTimeSheet] = React.useState("");
    const [updatedNotes, setUpdatedNotes] = React.useState("");

    useEffect(() => {
        getTimeSheet();
    }, []);

    const handleClickOpentimeSheet = () => {
        const currentDate = new Date();
        const formattedCurrentDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const existingTimeSheet = timeSheet.find(item => item.currentDate === formattedCurrentDate);
        if (existingTimeSheet) {
            alert("Time tracking data already exists for today. You can only edit/update now. ✌️");
            return;
        }
        setOpentimeSheet(true);
    };

    const handleCloseTimeSheet = () => {
        setOpentimeSheet(false);
    };

    const handleCloseUpdatedTimeSheet = () => {
        setOpenUpdatetimesheet(false);
    };

    // for alert----------
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

    // for getting the Time Sheet from specificUser
    const getTimeSheet = async () => {
        try {
            let y = window.localStorage.getItem("id");
            // console.log(y);
            let req = await axios.get(
                `https://capacity-planning-tool-backened.vercel.app/timeSheet/specificUser/${y}`,
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );
            const { data } = req;
            const { message, statusCode, allTimeSheetData } = data;
            // console.log(data);
            if (statusCode === 200) {

                setTimeSheet(allTimeSheetData);
                // console.log(allTimeSheetData);
            } else {
                setDatas({ message });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // to add the Time Sheet data
    const addTimeSheet = async (e) => {

        e.preventDefault();
        try {
            // Convert string format

            const MTimeInString = MTimeIn.format('HH:mm:ss');
            const MTimeOutString = MTimeOut.format('HH:mm:ss');
            const ATimeInString = ATimeIn.format('HH:mm:ss');
            const ATimeOutString = ATimeOut.format('HH:mm:ss');
            if (MTimeInString === 'Invalid Date' || MTimeOutString === 'Invalid Date') {
                alert("Please enter a Shift - 1 time");
            } else {
                let req = await axios.post(
                    `https://capacity-planning-tool-backened.vercel.app/timeSheet/`,
                    {
                        userid: window.localStorage.getItem("id"),
                        MTimeIn: MTimeInString,
                        MTimeOut: MTimeOutString,
                        ATimeIn: ATimeInString,
                        ATimeOut: ATimeOutString,
                        notes: notes
                    },
                    {
                        headers: {
                            authtoken: window.localStorage.getItem("token"),
                        },
                    }
                );
                const { data } = req;
                const { message, statusCode, result } = data;
                console.log(result);
                if (statusCode === 200) {
                    setTimeSheet(result);
                    setSheet("");
                    setOpentimeSheet(false);
                    Toast.fire({ icon: "success", title: "Time Added Successfully!" });
                    getTimeSheet();

                } else {
                    setOpentimeSheet(false);
                    Toast.fire({
                        icon: "error",
                        title: "Error in adding Time Sheet Data",
                    });
                    getTimeSheet();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    // for delete Time Sheet
    const delTimeSheet = async (id) => {
        // console.log(id)
        try {
            let req = await axios.delete(
                `https://capacity-planning-tool-backened.vercel.app/timeSheet/deleteTimeSheetData/${id}`,
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );
            const { data } = req;
            const { message, statusCode } = data.data;
            if (statusCode === 200) {
                getTimeSheet();
                Toast.fire({ icon: "success", title: message });
            } else {
                Toast.fire({ icon: "error", title: "Can't delete Time Sheet Data" });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // for Update TimeSheet
    const handleClickOpenUpdateTimeSheet = (timeSheetdata) => {
        setOpenUpdatetimesheet(true);
        // console.log(timeSheetdata)
        setUpdateId(timeSheetdata._id);
    };
    const editTimeSheet = async () => {
        try {
            const MTimeInString = updatedMTimeIn.format('HH:mm:ss');
            const MTimeOutString = updatedMTimeOut.format('HH:mm:ss');
            const ATimeInString = updatedATimeIn.format('HH:mm:ss');
            const ATimeOutString = updatedATimeOut.format('HH:mm:ss');
            if (MTimeInString === 'Invalid Date' || MTimeOutString === 'Invalid Date' || ATimeInString === 'Invalid Date' || ATimeOutString === 'Invalid Date') {
                alert("Please enter all time fields.");
                return
            }
            if (updatedNotes === "") {
                alert("Please fill comments.");
                return
            }
            // Calculate time differences
            const MTimeDifference = updatedMTimeOut.diff(updatedMTimeIn, 'hours', true);
            const ATimeDifference = updatedATimeOut.diff(updatedATimeIn, 'hours', true);
            // Calculate total hours worked
            const totalHours = (MTimeDifference + ATimeDifference).toFixed(2);
            const response = await axios.put(
                `https://capacity-planning-tool-backened.vercel.app/timeSheet/edit/${updateId}`,
                {
                    userid: window.localStorage.getItem("id"),
                    MTimeIn: MTimeInString,
                    MTimeOut: MTimeOutString,
                    ATimeIn: ATimeInString,
                    ATimeOut: ATimeOutString,
                    ShiftOne: MTimeDifference.toFixed(2),
                    ShiftTwo: ATimeDifference.toFixed(2),
                    TotalHours: totalHours,
                    notes: updatedNotes
                },
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );

            setMTimeIn(updatedMTimeIn);
            setMTimeOut(updatedMTimeOut);
            setATimeIn(updatedATimeIn);
            setATimeOut(updatedATimeOut);
            setTimeSheet(updatedTimeSheet);
            setNotes(updatedNotes);
            // console.log("Edit Time Sheet Response:", response.data);
            getTimeSheet();
            setUpdatedMTimeIn("");
            setUpdatedMTimeOut("");
            setUpdatedATimeIn("");
            setupdatedATimeOut("");
            setUpdatedTimeSheet("");
            Toast.fire({ icon: "success", title: "Updated Successfully" });
            setOpenUpdatetimesheet(false);

        }

        catch (error) {
            console.error("Error in editTimeSheet:", error);
            Toast.fire({ icon: "error", title: "An error occurred while updating Time Sheet" });
        }
    };

    return (
        <div>
            <NavBar />
            <div className=" mt-10 lg:w-[77%] md:w-[90%] w-[90%] mx-auto h-[74vh]">
                <div className="flex flex-row justify-between items-center py-3">
                    <div className="flex flex-row justify-center items-center">
                        <ArrowBackIosIcon className="w-8 h-8 text-[#F86206] cursor-pointer" onClick={() => history.goBack()} />
                        <Typography className="font-medium text-[20px] text-[#1B1B1B]">Time Tracking</Typography>

                    </div>
                    <div>
                        <Button variant="contained" className="bg-[#F86206]" onClick={handleClickOpentimeSheet}>Add Note</Button>
                        {/* For Add new time Sheet Dialog box */}
                        <Dialog
                            fullScreen
                            open={opentimeSheet}
                            onClose={handleCloseTimeSheet}
                            TransitionComponent={Transition}
                        >
                            <AppBar sx={{ position: 'relative', backgroundColor: "#F86206" }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label="close"
                                        onClick={handleCloseTimeSheet}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        Time Tracking
                                    </Typography>

                                </Toolbar>
                            </AppBar>
                            <List>
                                <Typography className="font-bold flex justify-start items-center md:mt-8 md:ml-14 mt-2 mx-2 md:mx-0">
                                    Elevating every moment through excellence and dedication. Committed to setting the benchmark in everything we do.
                                </Typography>
                                <form onSubmit={addTimeSheet}>
                                    <div className="h-[74vh]  mt-5 lg:w-[90%] md:w-[90%] mx-auto flex flex-row justify-between items-center ">

                                        <Card className="lg:w-[70%] md:w-[100%] w-[100%] lg:mr-10 md:h-[70vh] mx-2 md:mx-0 mt-[130px] md:mt-0 p-5 rounded-[20px] shadow-md">

                                            <div className='flex flex-row justify-between'>
                                                <Typography className='font-bold text-[#F66B0E]'>Revise</Typography>
                                                <Button type="submit" className="text-[#F86206]  border border-solid border-[#E3E7EB] px-2 py-1">
                                                    Save
                                                </Button>
                                            </div>
                                            <div className="  flex flex-col justify-start w-full ">
                                                <Typography className='font-semibold'>Shift - 1 </Typography>
                                                <div className='flex md:flex-row flex-col justify-between items-center mt-2 mb-3'>
                                                    <div className='md:w-[40%] w-[100%] mb-3'>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['TimePicker']}>
                                                                <TimePicker label="In"
                                                                    value={MTimeIn}
                                                                    onChange={(newValue) => setMTimeIn(newValue)}
                                                                    required
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </div>
                                                    <div className='md:w-[40%] w-[100%]'>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['TimePicker']}>
                                                                <TimePicker label="Out"
                                                                    value={MTimeOut}
                                                                    onChange={(newValue) => setMTimeOut(newValue)}
                                                                    required />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="mt-3 mb-3 flex flex-col justify-start w-full ">
                                                <Typography className='font-semibold'>Shift - 2 </Typography>
                                                <div className='flex md:flex-row flex-col justify-between items-center mt-2 mb-3'>
                                                    <div className='md:w-[40%] w-[100%] mb-3'>
                                                        <div className='control-pane default'>
                                                            <div className='control-section'>
                                                                <div className='timepicker-control-section'>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <DemoContainer components={['TimePicker']}>
                                                                            <TimePicker label="In" value={ATimeIn}
                                                                                onChange={(newValue) => setATimeIn(newValue)}
                                                                                required />
                                                                        </DemoContainer>
                                                                    </LocalizationProvider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='md:w-[40%] w-[100%]'>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['TimePicker']}>
                                                                <TimePicker label="Out" value={ATimeOut}
                                                                    onChange={(newValue) => setATimeOut(newValue)}
                                                                    required />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <Typography className='mb-3 font-semibold'>Comments:</Typography>
                                                <div className="h-[19vh]  overflow-y-auto ">
                                                    <Textarea aria-label="minimum height" minRows={4} placeholder="What are working at....."
                                                        type="text"
                                                        name="Notes"
                                                        required
                                                        onChange={(e) => {
                                                            setNotes(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                        </Card>

                                        <img

                                            className="w-[50%] h-[100%] animate-up-down hidden lg:block"
                                            srcSet={`${TimeTrackingPic}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${TimeTrackingPic}`}
                                            alt="TimeTracking"
                                            loading="lazy"
                                        />


                                    </div>
                                </form>
                            </List>
                        </Dialog>
                        {/*For Update Time Sheet Dialog box   */}
                        <Dialog
                            fullScreen
                            open={openUpdatetimesheet}
                            onClose={handleCloseUpdatedTimeSheet}
                            TransitionComponent={Transition}
                        >
                            <AppBar sx={{ position: 'relative', backgroundColor: "#F86206" }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label="close"
                                        onClick={handleCloseUpdatedTimeSheet}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        To Update Time Tracking
                                    </Typography>

                                </Toolbar>
                            </AppBar>
                            <List>
                                <Typography className="font-bold flex justify-start items-center md:mt-8 md:ml-14 mt-2 mx-2 md:mx-0">
                                    Elevating every moment through excellence and dedication. Committed to setting the benchmark in everything we do.
                                </Typography>

                                <div className="h-[74vh] mt-5 lg:w-[90%] md:w-[90%] mx-auto flex flex-row justify-between items-center ">

                                    <Card className="lg:w-[70%] md:w-[100%] w-[100%] lg:mr-10 md:h-[70vh] mx-2 md:mx-0 mt-[130px] md:mt-0 p-5 rounded-[20px] shadow-md">

                                        <div className='flex flex-row justify-between'>
                                            <Typography className='font-bold text-[#F66B0E]'>Revise</Typography>
                                            <Button onClick={() => editTimeSheet()} className="text-[#F86206]  border border-solid border-[#E3E7EB] px-2 py-1">
                                                Save
                                            </Button>
                                        </div>
                                        <div className="  flex flex-col justify-start w-full ">
                                            <Typography className='font-semibold'>Shift - 1 </Typography>
                                            <div className='flex md:flex-row flex-col justify-between items-center mt-2 mb-3'>
                                                <div className='md:w-[40%] w-[100%] mb-3'>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['TimePicker']}>
                                                            <TimePicker label="In"
                                                                value={updatedMTimeIn}
                                                                onChange={(newValue) => setUpdatedMTimeIn(newValue)}
                                                                required
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                                <div className='md:w-[40%] w-[100%]'>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['TimePicker']}>
                                                            <TimePicker label="Out"
                                                                value={updatedMTimeOut}
                                                                onChange={(newValue) => setUpdatedMTimeOut(newValue)}
                                                                required />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="mt-3 mb-3 flex flex-col justify-start w-full ">
                                            <Typography className='font-semibold'>Shift - 2 </Typography>
                                            <div className='flex  md:flex-row flex-col justify-between items-center mt-2 mb-3'>
                                                <div className='md:w-[40%] w-[100%] mb-3'>
                                                    <div className='control-pane default'>
                                                        <div className='control-section'>
                                                            <div className='timepicker-control-section'>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DemoContainer components={['TimePicker']}>
                                                                        <TimePicker label="In" value={updatedATimeIn}
                                                                            onChange={(newValue) => setUpdatedATimeIn(newValue)}
                                                                            required />
                                                                    </DemoContainer>
                                                                </LocalizationProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='md:w-[40%] w-[100%]'>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['TimePicker']}>
                                                            <TimePicker label="Out" value={updatedATimeOut}
                                                                onChange={(newValue) => setupdatedATimeOut(newValue)}
                                                                required />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Typography className='mb-3 font-semibold'>Comments:</Typography>
                                            <div className="h-[19vh]  overflow-y-auto ">
                                                <Textarea aria-label="minimum height" minRows={4} placeholder="What are working at....."
                                                    type="text"
                                                    name="Notes"
                                                    required
                                                    onChange={(e) => {
                                                        setUpdatedNotes(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </Card>

                                    <img

                                        className="w-[50%] h-[100%] animate-up-down  hidden lg:block"
                                        srcSet={`${TimeTrackingPic}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${TimeTrackingPic}`}
                                        alt="TimeTracking"
                                        loading="lazy"
                                    />


                                </div>

                            </List>
                        </Dialog>
                    </div>

                </div>
                <div className="h-[65vh] overflow-y-auto md:mt-7" >
                    {timeSheetArray.map((item, idx) => (
                        <Accordion key={idx}>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon className="cursor-pointer" />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <div className='flex flex-row lg:w-[98%] md:w-[95%] justify-between items-center'>

                                    <div className="flex flex-row justify-between items-center lg:w-[25%]">
                                        <Typography className="text-[15px] font-semibold md:mr-3">{item.currentDate}</Typography>
                                        <Divider orientation="vertical" variant="middle" className='mr-3' flexItem />
                                        <div onClick={() => handleClickOpenUpdateTimeSheet(item)}
                                            className="text-[#F86206] text-[14px] mr-3 font-medium cursor-pointer rounded-sm flex items-center border border-solid border-[#E3E7EB] px-2 py-1" >
                                            <EditNoteIcon className="w-6 h-5"
                                            /> Edit
                                        </div>
                                        <Divider orientation="vertical" variant="middle" className='mr-3' flexItem />
                                        <div onClick={() => delTimeSheet(item._id)}
                                            className="text-[#DC4134] text-[14px] font-medium cursor-pointer rounded-sm flex items-center border border-solid border-[#E3E7EB] px-2 py-1" >
                                            <DeleteOutlineRoundedIcon className="w-6 h-5"
                                            /> Delete
                                        </div>
                                    </div>
                                    <div className="md:flex flex-row  items-center hidden ">
                                        <Typography className="text-[15px] font-medium  mr-3">Total :</Typography>
                                        <div
                                            className="text-[#6E35ED] text-[14px] font-bold cursor-pointer rounded-sm flex items-center border border-solid border-[#E3E7EB] px-2 py-1" >
                                            <AccessTimeIcon className="w-6 h-5"
                                            /><span className='ml-1'>{!isNaN(item.TotalHours) ? item.TotalHours : "-"}</span>
                                        </div>
                                    </div>
                                </div>
                                <Divider orientation="vertical" variant="middle" className='ml-3' flexItem />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className="text-wrap mb-3 ">
                                    <span className='font-medium'>Comments :</span> {item.notes}
                                </Typography>
                                <div className="flex flex-row  items-center md:hidden mb-5">
                                        <Typography className="text-[15px] font-medium  mr-3">Total :</Typography>
                                        <div
                                            className="text-[#6E35ED] text-[14px] font-bold cursor-pointer rounded-sm flex items-center border border-solid border-[#E3E7EB] px-2 py-1" >
                                            <AccessTimeIcon className="w-6 h-5"
                                            /><span className='ml-1'>{!isNaN(item.TotalHours) ? item.TotalHours : "-"}</span>
                                        </div>
                                    </div>
                                <Paper sx={{ width: '100%' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" className='font-semibold' colSpan={2}>
                                                        Shift - 1  :<AccessTimeIcon className="w-6 h-5 ml-2 text-[#6E35ED]"
                                                        /><span className='ml-1 text-[#6E35ED]'>{item.ShiftOne}</span>
                                                    </TableCell>
                                                    <TableCell align="center" className='font-semibold' colSpan={2}>
                                                        Shift - 2 :<AccessTimeIcon className="w-6 h-5 ml-2 text-[#6E35ED]"
                                                        /><span className='ml-1 text-[#6E35ED]'>{!isNaN(item.ShiftTwo) ? item.ShiftTwo : "-"}</span>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center">
                                                        In
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Out
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        In
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Out
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow hover role="checkbox" tabIndex={-1} >
                                                    <TableCell align="center">
                                                        {item.MTimeIn}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.MTimeOut}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {!isNaN(item.ATimeIn) || item.ATimeIn !== "-" ? item.ATimeIn : "-"}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {!isNaN(item.ATimeOut) || item.ATimeOut !== "-" ? item.ATimeOut : "-"}
                                                    </TableCell>
                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </Paper>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TimeTracking;