import NavBar from "../Base/NavBar";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Avatar, Badge, Divider, Input, Menu, TextField, Typography } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
    const history = useHistory();
    const [menu, setMenu] = useState(null);
    const menuOpen = Boolean(menu);
    const [userlist, setUserList] = useState([]);

    const handleClickMenu = (event) => {
        setMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenu(null);
    };

    useEffect(() => {
        getUserList();
    }, []);
    // to get all users 
    const getUserList = async () => {
        try {
            let req = await axios.get(
                `https://capacity-planning-tool-backened.vercel.app/users/all`,
            );
            const { data } = req.data;
            setUserList(data);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div>
            <NavBar />
            <div className=" mt-5 lg:w-[77%] md:w-[95%] mx-auto h-[74vh] p-2 md:p-0">
                <div className="flex flex-row justify-between items-center py-3">
                    <div className="flex flex-row justify-center items-center ml-2 md:ml-0">
                        <ArrowBackIosIcon className="w-8 h-8 text-[#F86206] cursor-pointer" onClick={() => history.goBack()} />
                        <Typography className="font-medium text-[20px] text-[#1B1B1B]">Chat</Typography>

                    </div>
                    {/* For smartphones the username menu */}
                    <div className="container-fluid md:hidden block ">
                        <a href
                            className=" text-[#8a949f]  ml-4 hover:cursor-pointer"
                            aria-controls={menuOpen ? "fade-menu" : undefined}
                            aria-expanded={menuOpen ? "true" : undefined}
                            onClick={handleClickMenu}
                        >
                            {menuOpen ? (
                                <CloseIcon className="w-8 h-16" />
                            ) : (
                                <MenuIcon className="w-8 h-16" />
                            )}
                        </a>
                        <Menu
                            className="container-fluid   lg:hidden md:block"
                            id="fade-menu"
                            MenuListProps={{
                                "aria-labelledby": "fade-button",
                            }}
                            anchorEl={menu}
                            open={menuOpen}
                            onClose={handleCloseMenu}
                            PaperProps={{
                                style: {
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "10px",
                                    width: "100%",
                                    height: "auto",
                                    padding: "5px",
                                    transform: "translate(0%, 4.5%)", // Default for mobile
                                },
                            }}
                        >
                            {userlist.map((user, idx) => (
                                <div key={idx}>
                                    <div className="flex flex-row justify-between items-center rounded-lg py-3 px-5 bg-[#fff4e6] mb-2">
                                        <div className="flex flex-row items-center">
                                            <Avatar sx={{ bgcolor: "#F86206" }}>{user.name.charAt(0)}</Avatar>
                                            <Typography className="ml-3 font-medium">{user.name}</Typography>
                                        </div>
                                        <Badge color="secondary" badgeContent={1} max={999}>
                                            <MessageIcon className="text-[#505152]" />
                                        </Badge>
                                    </div>
                                    <Divider className="mb-2" />
                                </div>
                            ))}
                        </Menu>
                    </div>
                </div>
                <div className="mt-3 border border-solid border-gray-10 rounded-lg h-[67vh] flex flex-row m-3 md:m-0">
                    <div className=" border-r border-solid border-gray-10 lg:w-[70%] md:w-[60%] p-3">
                        <div className=" flex flex-row justify-between items-center rounded-lg  py-3 px-5 bg-[#fff4e6] mb-2">
                            <div className=" flex flex-row  items-center">
                                <Avatar sx={{ bgcolor: "#F86206" }}>M</Avatar>
                                <Typography className="ml-3">UserName</Typography>
                            </div>
                        </div>
                        <Divider />
                        <div className="h-[45vh] overflow-scroll mt-2 ">
                            <div className=" max-w-[60%] mb-5 py-2 px-4 text-justify text-black font-medium bg-[#ffeeee] rounded-b-xl rounded-tr-xl">
                                Time sheet functionality, allowing employees to log their hours spent on
                                various tasks and projects accurately. This data can be used to analyze resource utilization,
                                track project budgets, and make informed decisions to optimize efficiency and productivity.
                            </div>
                            <div className=" ml-auto max-w-[60%] mb-5 py-2 px-4 text-justify text-black font-medium  bg-[#fff7e6] rounded-b-xl rounded-tl-xl">
                                Time sheet functionality, allowing employees to log their hours spent on

                            </div>
                            <div className=" max-w-[60%] mb-5 py-2 px-4 text-justify text-black font-medium bg-[#ffeeee] rounded-b-xl rounded-tr-xl">
                                Time sheet functionality, allowing employees to log their hours spent on

                            </div>
                            <div className=" ml-auto max-w-[60%] mb-5 py-2 px-4 text-justify text-black font-medium  bg-[#fff7e6] rounded-b-xl rounded-tl-xl">
                                Time sheet functionality, allowing employees to log their hours spent on
                                various tasks and projects accurately. This data can be used to analyze resource utilization,
                                track project budgets, and make informed decisions to optimize efficiency and productivity.
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center">
                            <div className="w-[88%]">
                                <TextField id="outlined-basic"
                                    size="small" label="Type a message..." fullWidth variant="outlined" />
                            </div>
                            <div className="ml-5 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="24" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff9300" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M10 14l11 -11" />
                                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                                </svg>
                            </div>
                            <div className="ml-5 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                    <path d="M9 12h6" />
                                    <path d="M12 9v6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="  lg:w-[30%] md:w-[40%] md:block hidden p-3">
                        {userlist.map((user, idx) => (
                            <div key={idx}>
                                <div className="flex flex-row justify-between items-center rounded-lg py-3 px-5 bg-[#fff4e6] mb-2">
                                    <div className="flex flex-row items-center">
                                        <Avatar sx={{ bgcolor: "#F86206" }}>{user.name.charAt(0)}</Avatar>
                                        <Typography className="ml-3">{user.name}</Typography>
                                    </div>
                                    <Badge color="secondary" badgeContent={1} max={999}>
                                        <MessageIcon className="text-[#505152]" />
                                    </Badge>
                                </div>
                                <Divider className="mb-2" />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Chat;