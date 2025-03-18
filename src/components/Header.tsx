// src/components/Header.tsx
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" color="default" className="shadow-sm">
      <Toolbar>
        <Typography variant="h6" className="text-gray-800 font-bold">
          Abstract Matcher
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// 👇 This line fixes the TS1208 error
export {};
