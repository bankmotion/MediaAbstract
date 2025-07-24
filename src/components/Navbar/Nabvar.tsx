import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";

const Navbar = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const location = useLocation();

  const showHome = location.pathname !== "/"; // Hide on home page if needed

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className={classes.appbar}
    >
      <Toolbar className={classes.toolbar}>
        <Button
          onClick={() => navigate("/")}
          className={classes.logoButton}
          disableRipple
        >
          <Typography
            variant="h6"
            style={{ fontWeight: 600 }}
            className={classes.logoText}
          >
            WriteFor.co
          </Typography>
        </Button>
        {showHome && (
          <>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{ fontWeight: 500 }}
              className={classes.backButton}
            >
              Back
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
