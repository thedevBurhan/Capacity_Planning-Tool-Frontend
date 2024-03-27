import NavBar from "../Base/NavBar";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, CardContent, TextField, Typography } from "@mui/material";
import reset from "../images/resetpassword.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

// form validation
export const filedValidationScheme = yup.object({
    email: yup.string().required("Please fill your email"),
    newPassword: yup.string().required("Please fill new password"),
    confirmPassword: yup.string().required("Please fill confirm password"),
});

const Settings = () => {
    const history = useHistory();
    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
        useFormik({
            initialValues: {
                email: "",
                newPassword: "",
                confirmPassword: "",
            },
            validationSchema: filedValidationScheme,
            onSubmit: (userInfo) => {
                // console.log("onsubmit", userInfo);

                handleResetPassword(userInfo);
            },
        });

    const handleResetPassword = async (userInfo) => {
        // console.log(userInfo)
        const res = await fetch(
            `http://ec2-13-235-50-78.ap-south-1.compute.amazonaws.com:9045/users/resetpassword`,
            {
                method: "POST",
                body: JSON.stringify(userInfo),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // console.log(res)
        const data = await res.json();
        // console.log(data)
        const datas = data.data.statusCode;
        // console.log(datas);
        if (datas === 400) {
            toast.error("😳Passwords do not match!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (datas === 404) {
            toast.error("Enter correct email 😳", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.success("😁❤️ Password updated!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // console.log(userInfo);
        }
    };
    return (
        <div>
            <NavBar />
            <div className=" mt-10 lg:w-[77%] mx-auto ">
                <div className="flex flex-row justify-between items-center py-3">
                    <div className="flex flex-row justify-center items-center">
                        <ArrowBackIosIcon className="w-8 h-8 text-[#F86206] cursor-pointer" onClick={() => history.goBack()} />
                        <Typography className="font-medium text-[20px] text-[#1B1B1B]">Settings</Typography>

                    </div>
                </div>

            </div>
            <div className="relative border border-solid border-gray-10 rounded-lg p-5 h-[64vh] lg:w-[50%] mx-auto flex flex-row justify-between">
                <div className="  ">
                    <img
                        className="w-[65%] absolute left-[-85px] animate-up-down "
                        srcSet={`${reset}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                        src={`${reset}`}
                        alt="reset Logo"
                        loading="lazy"
                    />

                </div>
                <div className=" w-[62%] ">

                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Typography className="font-bold ml-2  text-[20px] text-left  " >Reset Password</Typography>
                            <div className="flex flex-col mt-5">
                                <Typography className="font-bold ml-2  text-[15px] text-left  " >Email</Typography>
                                <TextField variant="outlined"

                                    id="standard-basic"
                                    className="ml-2 mt-2 "
                                    label="Enter Email"
                                    name="email"
                                    type="email"
                                    size="small"
                                    onBlur={handleBlur}
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <div style={{ color: "crimson", fontSize: "small" }}>
                                    {touched.email && errors ? errors.email : ""}
                                </div>
                            </div>
                        </CardContent>
                        <CardContent>
                            <div className="flex flex-col mt-[-15px]">
                                <Typography className="font-bold ml-2  text-[15px] text-left  " >New Password</Typography>
                                <TextField

                                    label="New Password"
                                    name="newPassword"
                                    className="ml-2 mt-2 "
                                    id="standard-basic"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    type="password"
                                    size="small"
                                />
                                <div style={{ color: "crimson", fontSize: "small" }}>
                                    {touched.newPassword && errors ? errors.newPassword : ""}
                                </div>
                            </div>
                        </CardContent>

                        <CardContent>
                            <div className="flex flex-col mt-[-15px]">
                                <Typography className="font-bold ml-2  text-[15px] text-left  " > Confirm Password</Typography>
                                <TextField

                                    id="standard-basic"
                                    variant="outlined"
                                    className="ml-2 mt-2 "
                                    type="password"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    size="small"
                                />
                                <div style={{ color: "crimson", fontSize: "small" }}>
                                    {touched.confirmPassword && errors ? errors.confirmPassword : ""}
                                </div>
                            </div>
                        </CardContent>
                        <div className="mx-5 md:mx-0">
                            <div className=" mt-3 lg:ml-5 lg:mr-4">
                                <Button
                                    className="lg:w-[100%]   bg-[#F86206] text-white font-bold cursor-pointer"
                                    type="submit">
                                    Save
                                </Button>

                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Settings;