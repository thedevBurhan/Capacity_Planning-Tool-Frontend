import NavBar from "../Base/NavBar";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Avatar,Box, Button, Divider, Menu, TextField, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import Zoom from '@mui/material/Zoom';
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";


const socket = io.connect("http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045");

const Chat = () => {
    const history = useHistory();
    const [user, setUser] = useState(localStorage.getItem('id'));
    const [menu, setMenu] = useState(null);
    const menuOpen = Boolean(menu);
    const [secondpersonName, setSecondPersonName] = useState("");
    const [secondPersonId, setSecondPersonId] = useState("");
    const [conversationId, setConversationId] = useState("");
    const [userlist, setUserList] = useState([]);
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState("");
    const messageContainerRef = useRef(null);
    console.log(message);
    useEffect(() => {
        socket.emit('addUser', user);
        socket.on('getUsers', users => {
            // console.log('activeUsers :>> ', users);
        })
        socket.on('getMessage', data => {
            // console.log(data.messages);
            setMessage(prev => ([
                ...prev,
                data
            ]))
        });
    }, [socket])

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [message]);

    const handleClickMenu = (event) => {
        setMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenu(null);
    };

    const toastMessage = () => {
        toast.success("Copied!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    // to get all users 
    const getUserList = async () => {
        try {
            let y = window.localStorage.getItem("id");
            // console.log(y)
            let req = await axios.get(
                `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/users/all`,
            );
            const { data } = req.data;
            const removingUserdata = data.filter((item) => item._id !== y);
            // console.log(removingUserdata);
            // console.log(req.data)
            setUserList(removingUserdata);
        } catch (error) {
            console.log(error);
        }
    };

    // to createOrget existing chat users 
    const createOrGetExistingChat = async (receiverId) => {
        try {
            localStorage.setItem("recevierId", receiverId);
            // console.log(receiverId);
            const getexistingChat = await axios.get(`http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/chat/allConversationData`, {
                headers: {
                    authtoken: window.localStorage.getItem("token"),
                },
            });
            const UserId = window.localStorage.getItem("id");
            const { data } = getexistingChat;
            const { conversationData } = data;
            console.log(conversationData);
            let filterExistingChat = conversationData.filter(conversation => {
                return conversation.members.some(member => member.receiverId === receiverId || member.receiverId === UserId);
            });
            if (filterExistingChat.length > 0) {
                const conversationId = filterExistingChat[0].conversationId;
                // console.log(conversationId);
                setConversationId(conversationId);
                const senderId = filterExistingChat[0].members[0].senderId;
                fetchSecondpersonName(receiverId);
                fetchSpecificUserConversation(senderId, conversationId);
            } else {
                const userId = window.localStorage.getItem("id");
                const CreateChat = await axios.post(
                    `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/chat/`,
                    {
                        userid: userId,
                        senderId: userId,
                        receiverId: receiverId,
                    },
                    {
                        headers: {
                            authtoken: window.localStorage.getItem("token"),
                        },
                    }
                );
                const { data } = CreateChat;
                const { conversationId, members } = data;
                fetchSecondpersonName(receiverId);
                fetchSpecificUserConversation(members[0].senderId, conversationId);
            }
        } catch (error) {
            console.log(error);
        }
    };


    // to fetch  specific conversation between two users
    const fetchSpecificUserConversation = async (senderId, conversationId) => {
        try {
            const response = await axios.get(
                `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/chat/specificUser/${senderId}/${conversationId}`,
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );
            const { data } = response;
            fetchSpecificMessagesBtwTwoUsers(conversationId)
            // console.log(data, "fetchSpecificUserConversation");
        } catch (error) {
            console.log(error);
        }
    }
    // to get secondpersonName
    const fetchSecondpersonName = async (id) => {
        try {
            let y = id;
            // console.log(y)
            let req = await axios.get(
                `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/users/all`,
            );
            const { data } = req.data;
            const Userdata = data.filter((item) => item._id === y);
            setSecondPersonName(Userdata[0].name);
            setSecondPersonId(Userdata[0]._id);
        } catch (error) {
            console.log(error);
        }
    };
    // to fetch specfic conversation  messages btw two users
    const fetchSpecificMessagesBtwTwoUsers = async (y) => {
        try {
            let req = await axios.get(
                `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/chat/messages/specificUser/${y}`,
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );
            const { data } = req;
            const { allConversationData, message } = data;
            setMessage(allConversationData)
            console.log(allConversationData, "allConversationData")
        } catch (error) {
            console.log(error);
        }
    };
    // start messaging
    const handleStartMessaging = async (e) => {
        e.preventDefault();
        try {
            const time = new Date().toLocaleTimeString();
            console.log(time)
            let userId = window.localStorage.getItem("id");
            socket.emit("sendMessage", {
                userid: userId,
                senderId: userId,
                receiverId: window.localStorage.getItem("recevierId"),
                messages,
                time,
                conversationId: conversationId,
            });
            // let userId = window.localStorage.getItem("id");
            // console.log(userId);
            // console.log(messages);
            // console.log(secondPersonId);
            // console.log(conversationId);
            let req = await axios.post(
                `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/chat/messages`,
                {
                    userid: userId,
                    senderId: userId,
                    messages,
                    time,
                    receiverId: secondPersonId,
                    conversationId: conversationId,
                },
                {
                    headers: {
                        authtoken: window.localStorage.getItem("token"),
                    },
                }
            );
            setMessages("");
            // fetchSpecificMessagesBtwTwoUsers(conversationId);
            const { data } = req;
            // console.log(data);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <NavBar />
            <div className=" mt-5 lg:w-[77%] md:w-[95%] mx-auto h-[74vh] p-2 md:p-0">
                <div className="flex flex-row justify-between items-center py-3">
                    <div className="flex flex-row justify-center items-center ml-2 md:ml-0">
                        <ArrowBackIosIcon className="w-8 h-8 text-[#F86206] cursor-pointer" onClick={() => history.goBack()} />
                        <Typography className="font-medium text-[20px] text-[#1B1B1B]">Chat</Typography>

                    </div>
                    <div>
                        <Typography className="text-[#f86206] bg-[#fee0cd] px-2 rounded-md  cursor-pointer" onClick={() => getUserList()} >Individuals</Typography>
                    </div>

                </div>
                {/* For smartphones the username menu */}
                {userlist.length > 0 ? (
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
                                    <div className="flex flex-row justify-between items-center rounded-lg py-3 px-5 bg-[#fff4e6] mb-2" onClick={() => createOrGetExistingChat(user._id)}>
                                        <div className="flex flex-row items-center">
                                            <Avatar sx={{ bgcolor: "#F86206" }}>{user.name.charAt(0)}</Avatar>
                                            <Typography className="ml-3 font-medium">{user.name}</Typography>
                                        </div>

                                    </div>
                                    <Divider className="mb-2" />
                                </div>
                            ))}
                        </Menu>
                    </div>
                ) : (
                    <div className="w-0"></div>
                )}
                <div className="mt-3 border border-solid border-gray-10 rounded-lg h-[67vh] flex flex-row m-3 md:m-0">
                    {userlist.length > 0 ? (
                        <div className=" border-r border-solid border-gray-10 lg:w-[90%] md:w-[80%] p-3">
                            <div className=" flex flex-row justify-between items-center rounded-lg  py-3 px-5 bg-[#fff4e6] mb-2">
                                {secondpersonName === "" ? (
                                    <Typography className="flex flex-row items-center font-semibold">No Conversation is Selected</Typography>
                                ) : (
                                    <div className="flex flex-row items-center">
                                        <Avatar sx={{ bgcolor: "#F86206" }}>{secondpersonName.charAt(0)}</Avatar>
                                        <Typography className="ml-3 font-semibold">{secondpersonName}</Typography>
                                    </div>
                                )}

                            </div>
                            <Divider />
                            <div className="h-[45vh] overflow-scroll mt-2 px-2" ref={messageContainerRef}>
                                {Array.isArray(message) && message.length > 0 ? (
                                    message.map((msg, index) => (
                                        <div key={index}>
                                            {msg.senderId === window.localStorage.getItem("id") ? (
                                                <div>
                                                    <Tooltip TransitionComponent={Zoom} placement="left" title={
                                                        <CopyToClipboard text={msg.messages}>
                                                            <ContentCopyRoundedIcon className="w-5 h-5 cursor-pointer" onClick={() => toastMessage()} />
                                                        </CopyToClipboard>} arrow >
                                                        <div className="  ml-auto max-w-[60%] mb-1 py-2 px-4 text-justify text-black font-medium bg-[#fff7e6] rounded-b-xl rounded-tl-xl">
                                                            {msg.messages}
                                                        </div>
                                                    </Tooltip>
                                                    <Typography className="text-[11px] text-[#a6a6a6] font-semibold text-right mr-2 mb-3">{msg.time}</Typography>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Tooltip TransitionComponent={Zoom} placement="right" title={
                                                        <CopyToClipboard text={msg.messages}>
                                                            <ContentCopyRoundedIcon className="w-5 h-5 cursor-pointer" onClick={() => toastMessage()} />
                                                        </CopyToClipboard>} arrow >
                                                        <div className="max-w-[60%] py-2 mb-1 px-4 text-justify text-black font-medium bg-[#ffeeee] rounded-b-xl rounded-tr-xl">
                                                            {msg.messages}
                                                        </div>
                                                    </Tooltip>
                                                    <Typography className="text-[11px] text-[#a6a6a6] font-semibold text-left ml-2 mb-3">{msg.time}</Typography>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-[45vh] overflow-scroll mt-2 flex justify-center items-center">
                                        <div className="bg-[#f0f0f5] w-[150px] px-4 py-3 rounded-lg text-center">
                                            <Typography className="font-semibold text-[20px] text-[#8585ad]">hello! <span className="text-[30px]">👋🏻</span></Typography>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Box component='form' onSubmit={(e) => handleStartMessaging(e)}>
                                <div className=" flex flex-row items-center ">

                                    <div className="w-[95%]">
                                        <TextField id="outlined-basic" required value={messages} onChange={(e) => {
                                            setMessages(e.target.value);
                                        }}
                                            size="small" label="Type a message..." fullWidth variant="outlined" />
                                    </div>
                                    <Button size="small" className=" cursor-pointer  p-0 m-0" type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="28" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff9300" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 14l11 -11" />
                                            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                                        </svg>
                                    </Button>

                                </div>
                            </Box>
                        </div>
                    ) : (
                        <div className=" border-r border-solid border-gray-10 lg:w-[100%] md:w-[100%] w-[100%] p-3">
                            <div className=" flex flex-row justify-between items-center rounded-lg  py-3 px-5 bg-[#fff4e6] mb-2">
                                <Typography className="flex flex-row items-center font-semibold">No Conversation is Selected</Typography>
                            </div>
                            <Divider />
                            <div className="lg:h-[45vh] md:h-[50vh] overflow-scroll mt-2 px-2">
                                <div className="h-[45vh] overflow-scroll mt-2 flex justify-center items-center">
                                    <div className="bg-[#f0f0f5] w-[150px] px-4 py-3 rounded-lg text-center">
                                        <Typography className="font-semibold text-[20px] text-[#8585ad]">hello! <span className="text-[30px]">👋🏻</span></Typography>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2 flex flex-row items-center ">
                                <div className="w-[100%]">
                                    <TextField id="outlined-basic"
                                        size="small" label="Type a message..." fullWidth variant="outlined" />
                                </div>

                            </div>
                        </div>
                    )}
                    {userlist.length > 0 ? (
                        <div className="lg:w-[30%] md:w-[40%] md:block hidden p-3">
                            {userlist.map((user, index) => (
                                <div key={index}>
                                    <div className="flex flex-row justify-between items-center rounded-lg py-3 px-5 bg-[#fff4e6] mb-2" onClick={() => createOrGetExistingChat(user._id)}>
                                        <div className="flex flex-row items-center">
                                            <Avatar sx={{ bgcolor: "#F86206" }}>{user.name.charAt(0)}</Avatar>
                                            <Typography className="ml-3">{user.name}</Typography>
                                        </div>

                                    </div>
                                    <Divider className="mb-2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-0"></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chat;