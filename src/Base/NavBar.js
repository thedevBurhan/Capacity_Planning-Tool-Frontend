import { Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../images/idea.png";
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import NotesIcon from '@mui/icons-material/Notes';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

const NavBar = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    // console.log(pathname);
    const [menu, setMenu] = useState(null);
    const menuOpen = Boolean(menu);
    const [NoteNav, setNoteNav] = useState(null);
    const NoteNavOpen = Boolean(NoteNav);
    const [Notemenu, setNotemenu] = useState(null);
    const NotemenuOpen = Boolean(Notemenu);
    const [userLogout, setUserLogout] = useState(null);
    const userLogoutOpen = Boolean(userLogout);
    const username = window.localStorage.getItem("username");
    const useremail = window.localStorage.getItem("useremail");


    const handleClickMenu = (event) => {
        setMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenu(null);
    };

    const handleClickNoteNav = (event) => {
        setNoteNav(event.currentTarget);
    };

    const handleCloseNoteNav = () => {
        setNoteNav(null);
    };

    const handleClickNotemenu = (event) => {
        setNotemenu(event.currentTarget);
    };

    const handleCloseNotemenu = () => {
        setNotemenu(null);
    };
    const handleClickUserLogout = (event) => {
        setUserLogout(event.currentTarget);
    };

    const handleCloseUserLogout = () => {
        setUserLogout(null);
    };
    return (
        <div className="bg-[#ffffff]">
            {/* Menu Start here */}
            <div className="container-fluid border-b-[0.2px] border-solid border-[#ffeacc]">
                <div className="custom_color flex flex-col justify-center">
                    <div className="w-full lg:w-[80%] xl:w-[87%] md:mx-2  lg:mx-auto h-30 lg:px-5 ">
                        {/* Application logo be here */}
                        <div className="flex justify-between items-center">
                            <div className=" flex justify-center items-center">
                                <div className="flex flex-row justify-center items-center" onClick={() => history.push("/dashboard")}>
                                    <img
                                        className="w-[25px]"
                                        srcSet={`${logo}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${logo}`}
                                        alt="Capacity Planning Tool Logo"
                                        loading="lazy"
                                    />
                                    <Typography className="text-[#1B1B1B] font-bold ml-3 md:text-[25px] lg:text-[20px] ">Capacity Planning
                                        <span className="text-[#F86206]"> Tool</span></Typography>
                                </div>
                                <div className="container-fluid lg:hidden md:block">
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
                                        <div className="flex flex-col justify-start">
                                            <div className="flex justify-start ml-5 mb-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                                                <DashboardRoundedIcon className={pathname === "/dashboard" ? "w-[25px] text-[#fba26a] mr-1" : "w-[25px] text-[#6C737F] mr-1"} />
                                                <Typography className={pathname === "/dashboard" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                                    : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"}
                                                    onClick={() => history.push("/dashboard")} >DashBoard</Typography>
                                            </div>

                                            <div className="flex justify-start ml-5 mb-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                                                <GroupsRoundedIcon className={pathname === "/meeting" ? "w-[25px] text-[#fba26a] mr-2" : "w-[25px] text-[#6C737F] mr-2"} />
                                                <Typography
                                                    onClick={() => history.push("/meeting")}
                                                    className={
                                                        pathname === "/meeting"
                                                            ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                                            : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"
                                                    }
                                                >
                                                    Meeting
                                                </Typography>
                                            </div>
                                            <div className="flex justify-start ml-5 mb-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                                                <ChatRoundedIcon className={pathname === "/chat" ? "w-[25px] text-[#fba26a] mr-1" : "w-[25px] text-[#6C737F] mr-1"} />
                                                <Typography className={pathname === "/chat" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                                    : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"} onClick={() => history.push("/chat")}>Chat</Typography>
                                            </div>
                                            <div
                                                id="basic-button"
                                                aria-controls={'basic-menu'}
                                                aria-haspopup="true"
                                                aria-expanded={'true'}
                                                onClick={handleClickNotemenu} className="flex justify-start ml-5 mb-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                                                <NotesRoundedIcon className="w-[25px] text-[#6C737F] mr-2" />
                                                <Typography className="text-[15px] font-medium  text-gray-700 hover:text-[#6C737F] hover:cursor-pointer">Notes</Typography>
                                            </div>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={Notemenu}
                                                open={NotemenuOpen}

                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}

                                                onClose={handleCloseNotemenu}
                                                PaperProps={{
                                                    style: {
                                                        width: "150px",
                                                        height: "75px",

                                                        //transform: "translate(-10%, -8%)", // Default for mobile
                                                    },
                                                }}
                                            >
                                                <div className="flex flex-col justify-center px-2">
                                                    <Typography className={pathname === "/personal" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                                        : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer mb-2"}
                                                        onClick={() => history.push("/personal")}  >
                                                        <NotesIcon className={pathname === "/personal" ? "w-[25px] text-[#fba26a] mr-2" : "w-[25px] text-[#6C737F] mr-2"} />  Personal
                                                    </Typography>
                                                    <Typography className={pathname === "/work" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                                        : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"}
                                                        onClick={() => history.push("/work")}>
                                                        <PostAddIcon className={pathname === "/work" ? "w-[25px] text-[#fba26a] mr-2" : "w-[25px] text-[#6C737F] mr-2"} />Work
                                                    </Typography>

                                                </div>
                                            </Menu>
                                            <div className="flex justify-start ml-5  items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                                                <HourglassEmptyRoundedIcon className={pathname === "/timesheet" ? "w-[25px] text-[#fba26a] " : "w-[25px] text-[#6C737F] "} />
                                                <Typography onClick={() => history.push("/timesheet")} className={pathname === "/timesheet" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                                    : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"} >Time Tracking</Typography>
                                            </div>

                                        </div>
                                    </Menu>
                                </div>
                            </div>

                            <div className="flex flex-row justify-center items-center">
                                {/* UserName And settings */}
                                <div className="flex flex-row justify-center items-center bg-[#fff4e6]">
                                    <div
                                        className="custom_colors p-2 flex flex-row justify-center hover:cursor-pointer h-16"
                                        aria-controls={userLogoutOpen ? "fade-menu" : undefined}
                                        aria-expanded={userLogoutOpen ? "true" : undefined}
                                        onClick={handleClickUserLogout}
                                    >



                                        <a href className="text-[#8a949f] mt-[3px] hover:cursor-pointer">
                                            <PersonIcon className="w-10 h-10 text-[#8a949f]" />
                                        </a>

                                        <div className="flex flex-col justify-center items-start  ml-2 mr-2">
                                            <Typography className=" mt-[-5px] font-medium hidden md:block">
                                                {username}
                                            </Typography>
                                            <Typography className=" text-xs mt-[-3px] hidden md:block">
                                                {useremail}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            "aria-labelledby": "fade-button",
                                        }}
                                        anchorEl={userLogout}
                                        open={userLogoutOpen}
                                        onClose={handleCloseUserLogout}
                                        PaperProps={{
                                            style: {
                                                width: "130px",
                                                height: "100px",


                                                //transform: "translate(-10%, -8%)", // Default for mobile
                                            },
                                        }}
                                    >
                                        <div className="flex flex-col justify-center items-center">
                                            <Typography className="text-xs py-1 md:text-[15px] font-medium mb-2 text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"
                                                onClick={() => history.push("/settings")}  >
                                                <SettingsIcon className={pathname === "/settings" ? "w-[20px] text-[#fba26a]" : "w-[20px] text-[#6C737F] "} /> Settings
                                            </Typography>

                                            <Typography className="text-xs md:text-[15px] py-1 font-medium text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"
                                                onClick={() => { history.push("/") }}>
                                                <LogoutIcon className={pathname === "/" ? "w-[20px] text-[#fba26a] " : "w-[20px] text-[#6C737F] "} /> Logout
                                            </Typography>
                                        </div>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid hidden shadow-md lg:block sm:hidden bg-white ">
                <div className="lg:w-[64%] xl:w-[64%] h-15 py-3 ml-[175px] ">
                    <div className="flex justify-between">
                        <div className="flex justify-between mr-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <DashboardRoundedIcon className={pathname === "/dashboard" ? "w-[25px] text-[#fba26a] mr-1" : "w-[25px] text-[#6C737F] mr-1"} />
                            <Typography className={pathname === "/dashboard" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"}
                                onClick={() => history.push("/dashboard")} >DashBoard</Typography>
                        </div>
                        <div className="flex justify-between mr-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <GroupsRoundedIcon className={pathname === "/meeting" ? "w-[25px] text-[#fba26a] mr-2" : "w-[25px] text-[#6C737F] mr-2"} />
                            <Typography
                                onClick={() => history.push("/meeting")}
                                className={
                                    pathname === "/meeting"
                                        ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                        : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"
                                }
                            >
                                Meeting
                            </Typography>
                        </div>
                        <div className="flex justify-between mr-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <ChatRoundedIcon className={pathname === "/chat" ? "w-[25px] text-[#fba26a] mr-1" : "w-[25px] text-[#6C737F] mr-1"} />
                            <Typography className={pathname === "/chat" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"} onClick={() => history.push("/chat")}>Chat</Typography>
                        </div>



                        <div
                            id="basic-button"
                            aria-controls={'basic-menu'}
                            aria-haspopup="true"
                            aria-expanded={'true'}
                            onClick={handleClickNoteNav} className="flex flex-row justify-center items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <NotesRoundedIcon className="w-[25px] text-[#6C737F] mr-2" />
                            <Typography className="text-[15px] font-medium  text-gray-700 hover:text-[#6C737F] hover:cursor-pointer">Notes</Typography>
                        </div>

                        <Menu
                            id="basic-menu"
                            anchorEl={NoteNav}
                            open={NoteNavOpen}

                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}

                            onClose={handleCloseNoteNav}
                            PaperProps={{
                                style: {
                                    width: "150px",
                                    height: "75px",

                                    //transform: "translate(-10%, -8%)", // Default for mobile
                                },
                            }}
                        >
                            <div className="flex flex-col justify-center px-2  ">


                                <Typography className={pathname === "/personal" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                    : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer mb-2"}
                                    onClick={() => history.push("/personal")}  >
                                    <NotesIcon className={pathname === "/personal" ? "w-[25px] text-[#fba26a] mr-2" : "w-[25px] text-[#6C737F] mr-2"} />  Personal
                                </Typography>

                                <Typography className={pathname === "/work" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                    : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"}
                                    onClick={() => history.push("/work")}>
                                    <PostAddIcon className={pathname === "/work" ? "w-[25px] text-[#fba26a] mr-2" : "w-[25px] text-[#6C737F] mr-2"} />Work
                                </Typography>

                            </div>
                        </Menu>

                        <div className="flex justify-between mr-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <HourglassEmptyRoundedIcon className={pathname === "/timesheet" ? "w-[25px] text-[#fba26a] " : "w-[25px] text-[#6C737F] "} />
                            <Typography onClick={() => history.push("/timesheet")} className={pathname === "/timesheet" ? "text-[15px] font-medium text-[#F86206]  hover:cursor-pointer"
                                : "text-[15px] font-medium text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"} >Time Tracking</Typography>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    );
}

export default NavBar;