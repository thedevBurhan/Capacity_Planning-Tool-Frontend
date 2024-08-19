import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, Card, CardContent, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import Signlogo from "../../images/Signuplogo.png";
import logo from "../../images/idea.png";

// form validation
export const filedValidationScheme = yup.object({
  name: yup.string().required("Please fill your name"),
  email: yup.string().required("Please fill your email"),
  password: yup.string().required("Please fill password"),
});
const Register = () => {
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
        // console.log("onsubmit",userInfo)
        handleSignIn(userInfo);
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
    history.push("/");
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

  // fetch
  const handleSignIn = async (userInfo) => {
    const res = await fetch(
      `https://capacity-planning-tool-backened.onrender.com/api/users/signup`,
      {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    localStorage.setItem("token", data.token);
    // console.log(data);
    // console.log(localStorage.setItem("token", data.token));
    handleClick();
  };


  return (
    <div>
      <body className="body-Signbackground h-[100vh] flex lg:items-center md:items-start items-center p-2">
        {/* desktop view */}
        <Card className="flex flex-row justify-between items-center md:mt-[100px] lg:mt-0 lg:w-[70%] mx-auto  lg:h-[84vh] md:h-[54vh] rounded-[20px] bg-[#FFFFFF]">
          <div className=" lg:flex flex-col justify-between
            h-[100%] lg:w-[50%] bg-[#FFA920] rounded-[20px] hidden">


            <img
              className="w-[100%] mt-[50px]"
              srcSet={`${Signlogo}}?w=24&fit=crop&auto=format&dpr=2 2x`}
              src={`${Signlogo}`}
              alt="Capacity Planning Tool Logo"
              loading="lazy"
            />

          </div>
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
                <Typography className="font-bold ml-2 text-[#504949] text-[20px] text-left  " >Sign Up</Typography>
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
                <div className="mx-5  lg:mx-0 mt-2 lg:ml-5">
                  <Button
                    className="lg:w-[95%] w-[100%] bg-[#FFA920] text-white font-bold cursor-pointer"
                    type="submit"

                  >
                    Sign Up
                  </Button>

                </div>
                <Typography
                  className="mt-3 text-left ml-7 mb-3 md:mb-0"
                  onClick={() => history.push("/")}

                >
                  Already have an acount? <span className="cursor-pointer text-[#FFA920] font-bold">Login</span>
                </Typography>
              </div>
            </form>
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
export default Register;
