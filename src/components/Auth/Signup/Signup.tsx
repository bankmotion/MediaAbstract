import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const planOptions = [
  { label: "Writer - $15/month", value: "writer" },
  { label: "Agency - $75/month", value: "agency75" },
  { label: "Agency - $150/month", value: "agency150" },
  { label: "Agency - $250/month", value: "agency250" },
];

const Signup = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("");

  const handleSignup = () => {
    // Placeholder signup logic
    alert(`Signed up as ${plan}`);
    navigate("/home");
  };

  return (
    <Box className={classes.body}>
      <Typography variant="h5" className={classes.title}>
        Sign Up
      </Typography>
      <TextField
        label="Email"
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
      <TextField
        select
        label="Select Plan"
        fullWidth
        className={classes.plan}
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
      >
        {planOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignup}
        className={classes.signupButton}
      >
        Sign Up
      </Button>

      <Typography className={classes.noteText}>
        Already have an account?{" "}
        <Link
          component="button"
          onClick={() => navigate("/")}
          underline="hover"
          sx={{ color: "#007BFF", fontWeight: 500 }}
        >
          Log In
        </Link>
      </Typography>
    </Box>
  );
};

export default Signup;
