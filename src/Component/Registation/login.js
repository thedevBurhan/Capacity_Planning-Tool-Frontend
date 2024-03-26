import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Card, CardContent, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import Wallpaper from "./LoginWallpaper";
import logo from "../../images/idea.png";

// form validation
export const filedValidationScheme = yup.object({
  name: yup.string().required("Please fill your name"),
  email: yup.string().required("Please fill your email"),
  password: yup.string().required("Please fill password"),
});
const Login = () => {
  const history = useHistory();
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: filedValidationScheme,
      onSubmit: (userInfo) => {
        // console.log("onsubmit", userInfo);

        handleLogin(userInfo);
      },
    });
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // pop-up message
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    history.push("/dashboard");
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        close
      </IconButton>
    </React.Fragment>
  );
  // pop-up end------------------------------------------------------------------------------------------------------------------------
  const handleLogin = async (userInfo) => {
    // console.log(userInfo)
    const res = await fetch(
      `http://localhost:9045/users/login`,
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
    console.log(datas);
    if (datas === 404) {
      toast.success("😳User Not Found!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      history.push("/signIn");
    } else if (datas === 400) {
      toast.error("Invalid Password 😳", {
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
      toast.success("😁❤️ Success!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("id", data.data.user._id);
      localStorage.setItem("useremail", data.data.user.email);
      localStorage.setItem("username", data.data.user.name);
      // console.log(data.data.user);
      // console.log(userInfo);
      handleClick();
    }
  };
  return (
    <div>
      <body className="body-loginbackground h-[100vh] flex lg:items-center md:items-start items-center p-2">
        {/* desktop view */}
        <Card className="flex flex-row justify-between items-center md:mt-[100px] lg:mt-0 lg:w-[70%] mx-auto  lg:h-[84vh] md:h-[54vh] rounded-[20px] bg-[#FFFFFF]">
          <div className="h-[100%] lg:w-[50%] p-2">

            <div className="flex flex-row  text-left mt-5 pl-5">
              <img
                className="w-[25px]"
                srcSet={`${logo}}?w=24&fit=crop&auto=format&dpr=2 2x`}
                src={`${logo}`}
                alt="Capacity Planning Tool Logo"
                loading="lazy"
              />
              <Typography className="font-bold ml-2" >Capacity Planning Tool</Typography>
            </div>
            <form onSubmit={handleSubmit} >
              <CardContent>
                <Typography className="font-bold ml-2 text-[#504949] text-[20px] text-left  " >Log In</Typography>
                <div className="flex flex-col mt-5">
                  <Typography className="font-bold ml-2  text-[15px] text-left  " >User Name</Typography>
                  <TextField variant="outlined"
                    
                    id="standard-basic"
                    className="ml-2 mt-2 md:w-[470px] w-[300px]"
                    label="Enter Name"
                    name="name"
                    type="name"
                    size="small"
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                  />
                  <div style={{ color: "crimson", fontSize: "small" }}>
                    {touched.name && errors ? errors.name : ""}
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div className="flex flex-col mt-[-25px]">
                  <Typography className="font-bold ml-2  text-[15px] text-left  " >Email</Typography>
                  <TextField
                   
                    label="Enter Your Email"
                    name="email"
                    className="ml-2 mt-2 md:w-[470px] w-[300px]"
                    id="standard-basic"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    size="small"
                  />
                  <div style={{ color: "crimson", fontSize: "small" }}>
                    {touched.email && errors ? errors.email : ""}
                  </div>
                </div>
              </CardContent>

              <CardContent>
                <div className="flex flex-col mt-[-25px]">
                  <Typography className="font-bold ml-2  text-[15px] text-left  " >Password</Typography>
                  <TextField
                   
                    id="standard-basic"
                    variant="outlined"
                    className="ml-2 mt-2 md:w-[470px] w-[300px]"
                    type="password"
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    size="small"
                  />
                  <div style={{ color: "crimson", fontSize: "small" }}>
                    {touched.password && errors ? errors.password : ""}
                  </div>
                </div>
              </CardContent>
              <div className="mx-5 md:mx-0">
              <div className=" mt-2 lg:ml-5">
                <Button
                  className="lg:w-[95%] w-[100%] bg-[#FFA920] text-white font-bold cursor-pointer"
                  type="submit"

                >
                  Login
                </Button>

              </div>
              <Typography
                className="mt-3 text-left ml-7 mb-3 md:mb-0"
                onClick={() => history.push("/SignIn")}
  
              >
               Don't have an acount? <span className="cursor-pointer text-[#FFA920] font-bold">SignUp</span>
              </Typography>
              </div>
            </form>
          </div>
          <div className=" flex flex-col justify-between
            h-[100%] lg:w-[50%] bg-[#FFA920] rounded-[20px]">
           
            <div className="hidden lg:flex items-end  absolute right-[120px] bottom-0 ">
              <Wallpaper />
            </div>
          </div>
        </Card>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Login Successfully"
          action={action}
        />

      </body>
    </div>
  );
};

export default Login;
