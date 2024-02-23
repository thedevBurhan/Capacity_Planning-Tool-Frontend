import React from "react";
import image from "../../images/wallpaper.png";
import { Box } from "@mui/material";

const LoginWallpaper = () => {
    return (
        <div>
            <Box
                component="img"
                sx={{
                    height: 753,
                    width: 750,
                    
                }}
                className="mt-[50px]"
                alt="Wallpaper"
                src={image} />
        </div>
    );
}

export default LoginWallpaper;