// src/pages/Login.tsx
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const Login = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Placeholder login logic
    alert("Login successful (mock)");
    navigate("/");
  };

  return (
    <Box className={classes.body}>
      <Paper elevation={3} className={classes.content}>
        <Typography variant="h5" className={classes.title}>
          Welcome Back
        </Typography>
        <Typography variant="body2" className={classes.subnotice}>
          Login to continue to WriteFor.co
        </Typography>

        <TextField
          label="Email Address"
          type="email"
          fullWidth
          className={classes.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          className={classes.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          className={classes.loginButton}
          sx={{
            backgroundColor: "#007BFF",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#0069d9" },
            mt: 1,
          }}
        >
          Login
        </Button>

        <Typography variant="body2" className={classes.noteText}>
          Don’t have an account?{" "}
          <Link
            component="button"
            onClick={() => navigate("/signup")}
            underline="hover"
            sx={{ color: "#007BFF", fontWeight: 500 }}
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
