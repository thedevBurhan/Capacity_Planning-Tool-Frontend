import { Card, Typography } from "@mui/material";
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

            <div className=" w-[77%] lg:h-[50vh] md:h-[40vh] mx-auto md:mt-[98px] mt-8 rounded">
                <div className="flex justify-evenly h-[100%] relative">
                    <div className="lg:w-[50%]  text-justify">
                        <Typography className="text-[#292929] font-bold md:text-[25px] lg:mt-8 mb-5 md:mb-0 p-5">
                            <span className="text-[#F66B0E]">"</span>Elevating the everyday with a touch of <span className="text-[#F66B0E]">
                                professionalism</span>  and <span className="text-[#F66B0E]">
                                poise</span>.<span className="text-[#F66B0E]">"</span>
                        </Typography>
                        <div className=" lg:w-[50%] md:block hidden bg-[#f77722] rounded-[15px] lg:h-[80%] absolute lg:left-16 z-10 animate-up-down ">
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
                    <div className="w-[50%] bg-[#fff4e6] rounded-[15px] h-[90%] animate-up-down lg:block hidden">
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
            <div className="flex lg:flex-row lg:justify-between flex-col  items-center lg:w-[77%]  mb-10 mx-auto lg:mt-[130px] rounded ">

                <Card className="md:w-[50%] w-[80%] h-[400px] lg:mr-5 mb-10 border border-solid border-[#fff4e6] p-5 cursor-pointer group  relative ">
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
                        className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center dashboard-card opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                        <Typography className="text-2xl  font-semibold text-black">Meeting</Typography>
                        
                    </div>
                </Card>

                <Card className="md:w-[50%] w-[80%] h-[400px] lg:mr-5 mb-10   border border-solid border-[#fff4e6] p-5 cursor-pointer  group  relative ">
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
                        className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center dashboard-card opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                        <Typography className="text-2xl font-semibold text-black">Chat</Typography>
                        
                    </div>
                </Card>
                <Card className="md:w-[50%] w-[80%] h-[400px] lg:mr-5 mb-10  border border-solid border-[#fff4e6] p-5  group  relative">
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
                        className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center dashboard-card opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                        <Typography className="text-2xl font-semibold text-black">Notes</Typography>
                        <div className="flex flex-row justify-between  rounded-full bg-white mt-5 ">
                        <Typography onClick={() => history.push("/personal")} className=" cursor-pointer w-[100px] font-bold flex items-center 
                        justify-center hover:bg-[#fff4e6] hover:rounded-[2px] ">Personal</Typography>
                    
                        <Typography onClick={() => history.push("/work")} className=" cursor-pointer w-[100px] font-bold flex items-center justify-center hover:bg-[#fff4e6] hover:rounded-[2px]">Work</Typography>
                        </div>
                    </div>
                </Card>
                <Card className="md:w-[50%] w-[80%] h-[400px] border border-solid border-[#fff4e6] p-5 cursor-pointer group  relative">
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
                        className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center dashboard-card opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                        <Typography className="text-2xl font-semibold text-black">Time Sheet</Typography>
                        
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