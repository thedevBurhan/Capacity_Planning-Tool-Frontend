import { Button, Card, Divider, Typography } from "@mui/material";
import NavBar from "../Base/NavBar";
import teamwork from "../images/teamwork.png";
import { TypeAnimation } from "react-type-animation";
import videoConference from "../images/video-conference.gif";
import chat from "../images/bubble-chat.gif";
import notes from "../images/notebook.gif";
import timesheet from "../images/upcoming.gif";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const history = useHistory();

    return (
        <div>

            <NavBar />

            <div className=" w-[77%] h-[50vh] mx-auto mt-[98px] rounded">
                <div className="flex justify-evenly h-[100%] relative">
                    <div className="w-[50%]  text-justify">
                        <Typography className="text-[#292929] font-bold text-[25px] mt-8 p-5">
                            <span className="text-[#F66B0E]">"</span>Elevating the everyday with a touch of <span className="text-[#F66B0E]">
                                professionalism</span>  and <span className="text-[#F66B0E]">
                                poise</span>.<span className="text-[#F66B0E]">"</span>
                        </Typography>
                        <div className=" w-[50%] bg-[#f77722] rounded-[15px] h-[80%] absolute left-16 z-10 animate-up-down ">
                            <TypeAnimation
                                className="text-white font-bold text-justify m-8 text-[18px]"
                                sequence={[
                                    ' Capacity planning tools are essential for organizations to effectively manage their resources and workload. One such tool incorporates features like meetings, chats, time sheets, and notes to streamline operations and optimize productivity. It integrates meetings, chats, time sheets, and notes provides organizations with a comprehensive solution for managing resources and workload effectively.',
                                    3000,
                                    '',
                                ]}
                                speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
                                omitDeletionAnimation={true}
                                style={{ fontSize: '1em', display: 'block', minHeight: '200px' }}
                                repeat={Infinity}
                            />
                        </div>
                    </div>
                    <div className="w-[50%] bg-[#fff4e6] rounded-[15px] h-[90%] animate-up-down">
                        <img
                            className="w-[100%]"
                            srcSet={`${teamwork}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                            src={`${teamwork}`}
                            alt="Team work"
                            loading="lazy"
                        />
                    </div>

                </div>

            </div>
            <div className="flex flex-row justify-between items-center w-[77%]  mb-10 mx-auto mt-[130px] rounded ">

                <Card className="w-[50%] h-[400px] mr-5 border border-solid border-[#fff4e6] p-5 cursor-pointer group  relative ">
                    <video
                        className="h-[150px] mx-auto"
                        autoPlay
                        loop
                        muted
                        poster={videoConference}
                    >
                        <source src={videoConference} type="video/mp4" />
                    </video>
                    <div className="flex h-[220px] overflow-y-auto">
                        <Typography className="flex justify-center text-justify">
                            Meetings are a fundamental aspect of any business, allowing teams to collaborate, discuss progress, and make decisions. It provides features such as agenda creation, and attendance tracking, enabling teams to coordinate effectively and maximize their time.
                        </Typography>
                    </div>
                    <div onClick={() => history.push("/meeting")}
                        className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-[#F66B0E] opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                        <Typography className="text-2xl text-white">Meeting</Typography>
                        
                    </div>
                </Card>

                <Card className="w-[50%]  h-[400px] mr-5  border border-solid border-[#fff4e6] p-5 cursor-pointer  group  relative ">
                    <video
                        className="h-[150px] mx-auto"
                        autoPlay
                        loop
                        muted
                        poster={chat}
                    >
                        <source
                            src={chat}
                            type="video/mp4"
                        />
                    </video>
                    <div className="flex h-[220px] overflow-y-auto">
                        <Typography className="flex justify-center text-justify">
                            Chats are another integral component of modern workplaces, enabling real-time communication among team members.
                           It's includes chat functionalities that allow teams to engage in discussions, share updates, and seek clarification instantly.
                           
                        </Typography>
                    </div>
                    <div onClick={() => history.push("/chat")}
                        className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-[#F66B0E] opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                        <Typography className="text-2xl text-white">Chat</Typography>
                        
                    </div>
                </Card>
                <Card className="w-[50%]  h-[400px] mr-5 border border-solid border-[#fff4e6] p-5  group  relative">
                    <video
                        className="h-[150px] mx-auto"
                        autoPlay
                        loop
                        muted
                        poster={notes}
                    >
                        <source
                            src={notes}
                            type="video/mp4"
                        />
                    </video>
                    <div className="flex h-[220px] overflow-y-auto">
                        <Typography className="flex justify-center text-justify ">
                            Notes serve as a repository for important information, ideas, and insights.
                            The capacity planning tool includes features for creating, organizing, and sharing notes,
                            ensuring that valuable knowledge is captured and accessible to relevant stakeholders.
                           
                        </Typography>
                    </div>
                    <div 
                        className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-[#F66B0E] opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                        <Typography className="text-2xl text-white">Notes</Typography>
                        <div className="flex flex-row justify-between  rounded-full bg-white mt-5 ">
                        <Typography onClick={() => history.push("/personal")} className=" cursor-pointer w-[100px] font-bold flex items-center 
                        justify-center hover:bg-[#F66B0E] hover:rounded-[2px] hover:text-white">Personal</Typography>
                    
                        <Typography onClick={() => history.push("/work")} className=" cursor-pointer w-[100px] font-bold flex items-center justify-center hover:text-white hover:bg-[#F66B0E] hover:rounded-[2px]">Work</Typography>
                        </div>
                    </div>
                </Card>
                <Card className="w-[50%]  h-[400px] border border-solid border-[#fff4e6] p-5 cursor-pointer group  relative">
                    <video
                        className="h-[150px] mx-auto"
                        autoPlay
                        loop
                        muted
                        poster={timesheet}
                    >
                        <source
                            src={timesheet}
                            type="video/mp4"
                        />
                    </video>
                    <div className="flex h-[220px] overflow-y-auto">
                        <Typography className="flex justify-center text-justify ">
                         Time sheet functionality, allowing employees to log their hours spent on
                            various tasks and projects accurately. This data can be used to analyze resource utilization,
                            track project budgets, and make informed decisions to optimize efficiency and productivity.
                        </Typography>
                    </div>
                    <div onClick={() => history.push("/timesheet")}
                        className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-[#F66B0E] opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                        <Typography className="text-2xl text-white">Time Sheet</Typography>
                        
                    </div>
                </Card>
            </div>
            <footer className="flex justify-center items-center h-20 border-t-2 border-solid border-[#fff4e6]">
                <Typography>Made with &hearts; by <span className="text-[#F66B0E] font-bold ">Mohammed Burhan</span></Typography>
            </footer>
        </div>
    );
}

export default Dashboard;