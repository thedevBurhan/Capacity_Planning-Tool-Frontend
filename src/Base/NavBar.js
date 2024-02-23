import { Button, ListItemText, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PostAddIcon from '@mui/icons-material/PostAdd';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../images/idea.png";
import workspace from "../images/workspace.png"
import dashboard from "../images/dashboard.png";
import chat from "../images/voice-chat.png"
import note from "../images/note.png"
import NotesIcon from '@mui/icons-material/Notes';
import timesheet from "../images/schedule.png"

const NavBar = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    console.log(pathname);
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
                                    <Typography className="text-[#1B1B1B] font-bold ml-3 md:text-[25px] text-[23px] ">Capacity Planning
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
                                            <Typography
                                                onClick={() => history.push("/dashboard")}
                                                className= 
                                                       "flex justify-between items-center mx-5 text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"
                                            >
                                                <AvTimerIcon className="w-4 h-5" />
                                                <ListItemText onClick={() => history.push("/dashboard")} primary="Dashboard" className="pl-1 sans" />
                                            </Typography>

                                            <Typography onClick={() => history.push("/meeting")} className={pathname === "/meeting" ?
                                                "flex justify-between items-center mx-5   text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"
                                                : "flex justify-between items-center mx-5  text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"}>
                                                <RssFeedIcon className="w-4 h-5" />

                                                <ListItemText primary="Meeting" className="pl-1" />
                                            </Typography>
                                            <Typography onClick={() => history.push("/chat")} className={pathname === "/chat" ?
                                                "flex justify-between items-center mx-5   text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"
                                                : "flex justify-between items-center mx-5   text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"}>
                                                <PersonIcon className="w-4 h-5" />

                                                <ListItemText primary="Chat" className="pl-1" />
                                            </Typography>
                                            <div
                                                id="basic-button"
                                                aria-controls={'basic-menu'}
                                                aria-haspopup="true"
                                                aria-expanded={'true'}
                                                onClick={handleClickNotemenu} className=" mb-1 mt-1 flex flex-row justify-start items-center mx-5 text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                                                <EmailIcon className="w-4 h-5" />
                                                <Typography className=" pl-1 ">Notes </Typography>
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
                                                    <Typography className={pathname === "/personal" ? "text-[15px] mb-2 font-medium  text-gray-700  hover:cursor-pointer" : "text-[15px] mb-2 font-medium  text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"}
                                                        onClick={() => history.push("/personal")}  >
                                                        <NotesIcon className="w-5 h-5" /> Personal
                                                    </Typography>
                                                    <Typography className={pathname === "/work" ? "text-[15px]  font-medium  text-gray-700  hover:cursor-pointer" : "text-[15px]  font-medium  text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"}
                                                        onClick={() => history.push("/work")}>
                                                        <PostAddIcon className="w-5 h-5" />Work
                                                    </Typography>

                                                </div>
                                            </Menu>
                                            <Typography onClick={() => history.push("/timesheet")} className={pathname === "/timesheet" ? "flex justify-between items-center mx-5   text-gray-700 hover:text-[#6C737F] hover:cursor-pointer" : "flex justify-between items-center mx-5   text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"}>
                                                <SearchIcon className="w-4 h-5" />

                                                <ListItemText

                                                    primary="Time Tracking"
                                                    className="pl-1"
                                                />
                                            </Typography>

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
                                            <AccountCircleIcon className="w-10 h-10" />
                                        </a>

                                        <div className="flex flex-col justify-center items-start  ml-2">
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
                                                height: "130px",


                                                //transform: "translate(-10%, -8%)", // Default for mobile
                                            },
                                        }}
                                    >
                                        <div className="flex flex-col justify-center items-center">
                                            <Typography className="text-xs py-1 md:text-[15px] font-medium mb-2 text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"
                                                onClick={() => history.push("/settings")}  >
                                                <SettingsIcon className="w-5 h-5" /> Settings
                                            </Typography>
                                            <Typography className="text-xs py-1 md:text-[15px] font-medium mb-2 text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"
                                                onClick={() => history.push("/invoices")}>
                                                <ReceiptLongIcon className="w-5 h-5" /> Invoices
                                            </Typography>
                                            <Typography className="text-xs md:text-[15px] py-1 font-medium text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer"
                                                onClick={() => {

                                                    history.push("/login")
                                                }}>
                                                <LogoutIcon className="w-5 h-5" /> Logout
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
                <div className="lg:w-[64%] xl:w-[68%] h-15 py-3 ml-[175px]  ">
                    <div className="flex justify-between">
                        <div className="flex justify-between mr-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <img
                                className="w-[25px] mr-2"
                                srcSet={`${dashboard}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                                src={`${dashboard}`}
                                alt="dashboard Logo"
                                loading="lazy"
                            />
                            <Typography className={pathname === "/dashboard" ? "text-[15px] font-bold text-[#F86206]  hover:cursor-pointer"
                                : "text-[15px] font-bold text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"}
                                onClick={() => history.push("/dashboard")} >DashBoard</Typography>
                        </div>
                        <div className="flex justify-between mr-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <img
                                className="w-[25px] mr-2"
                                srcSet={`${workspace}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                                src={`${workspace}`}
                                alt="workspace Logo"
                                loading="lazy"
                            />
                            <Typography
                                onClick={() => history.push("/meeting")}
                                className={
                                    pathname === "/meeting"
                                        ? "text-[15px] font-bold text-[#F86206]  hover:cursor-pointer"
                                        : "text-[15px] font-bold text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"
                                }
                            >
                                Meeting
                            </Typography>
                        </div>
                        <div className="flex justify-between mr-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <img
                                className="w-[25px] mr-2"
                                srcSet={`${chat}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                                src={`${chat}`}
                                alt="chat Logo"
                                loading="lazy"
                            />
                            <Typography className={pathname === "/chat" ? "text-[15px] font-bold text-[#F86206]  hover:cursor-pointer"
                                : "text-[15px] font-bold text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"} onClick={() => history.push("/chat")}>Chat</Typography>
                        </div>



                        <div
                            id="basic-button"
                            aria-controls={'basic-menu'}
                            aria-haspopup="true"
                            aria-expanded={'true'}
                            onClick={handleClickNoteNav} className="flex flex-row justify-center items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <img
                                className="w-[30px] mr-2"
                                srcSet={`${note}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                                src={`${note}`}
                                alt="notes Logo"
                                loading="lazy"
                            />
                            <Typography className="text-[15px] font-bold  text-gray-700 hover:text-[#6C737F] hover:cursor-pointer">Notes</Typography>
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


                                <Typography className={pathname === "/personal" ? "text-[15px] font-bold text-[#F86206]  hover:cursor-pointer"
                                    : "text-[15px] font-bold text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"}
                                    onClick={() => history.push("/personal")}  >
                                    <NotesIcon className="w-5 h-5" />  Personal
                                </Typography>

                                <Typography className={pathname === "/work" ? "text-[15px] font-bold text-[#F86206]  hover:cursor-pointer"
                                    : "text-[15px] font-bold text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"}
                                    onClick={() => history.push("/work")}>
                                    <PostAddIcon className="w-5 h-5" />Work
                                </Typography>

                            </div>
                        </Menu>

                        <div className="flex justify-between mr-3 items-center text-[#8a949f] hover:text-[#6C737F] hover:cursor-pointer">
                            <img
                                className="w-[25px] mr-2"
                                srcSet={`${timesheet}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                                src={`${timesheet}`}
                                alt="timesheet Logo"
                                loading="lazy"
                            />
                            <Typography onClick={() => history.push("/timesheet")} className={pathname === "/timesheet" ? "text-[15px] font-bold text-[#F86206]  hover:cursor-pointer"
                                : "text-[15px] font-bold text-gray-700 hover:text-[#6C737F] hover:cursor-pointer"} >Time Tracking</Typography>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    );
}

export default NavBar;