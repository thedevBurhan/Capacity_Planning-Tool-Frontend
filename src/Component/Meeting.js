import NavBar from "../Base/NavBar";
import { useHistory } from "react-router-dom";
import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Meeting = () => {
    const history = useHistory();
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 70 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <NavBar />
            <div className=" mt-10 lg:w-[77%] md:w-[95%] mx-auto h-[74vh]">
                <div className="flex flex-row justify-between items-center py-3">
                    <div className="flex flex-row justify-center items-center ml-2 md:ml-0">
                        <ArrowBackIosIcon className="w-8 h-8 text-[#F86206] cursor-pointer" onClick={() => history.goBack()} />
                        <Typography className="font-medium text-[20px] text-[#1B1B1B]">Meeting</Typography>

                    </div>
                </div>

                <div className="flex justify-center my-[25vh] ">
                    <CircularProgressWithLabel value={progress} />
                </div>
            </div>
        </div>
    );
}

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex',color:"#F86206" }}>
            <CircularProgress variant="determinate" {...props} color="inherit"/>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <Typography variant="caption" component="div" color="#1B1B1B">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};
export default Meeting;