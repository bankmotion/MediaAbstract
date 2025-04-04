import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Navbar/Nabvar";
import WelcomeModal from "../../../WelcomeModal/WelcomeModal";
import useStyles from "./styles";
import { createCheckSeesion } from "../../../../services/auth";

const planOptions = [
  //{ label: "Writer - $15/month", value: "writer" },
  {
    priceId: "1",
    label: "Agency & Team - $75: 1 user, 5 matches",
    value: "agency75",
  },
  {
    priceId: "2",
    label: "Agency & Team - $150: 3 users, 15 matches",
    value: "agency150",
  },
  {
    priceId: "3",
    label: "Agency & Team - $250: unlimited, priority",
    value: "agency250",
  },
];

const Signup = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setShowWelcomeModal(true);
    if (!email || !password || !plan) {
      alert("Please fill in all fields before processing.");
      return;
    }

    try {
      setLoading(true);
      const selectedPlan = planOptions.find((opt) => opt.value === plan);
      if (!selectedPlan) {
        alert("Invalid plan selection");
        return;
      }

      await createCheckSeesion(email, password, selectedPlan.priceId);
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    setShowWelcomeModal(false);
    navigate("/onboarding", { state: { role: "agencies" } });
  };

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <>
      <Navbar />
      <Box className={classes.body}>
        <Paper elevation={3} className={classes.content}>
          <Typography variant="h5" className={classes.title}>
            Sign Up
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
          <TextField
            select
            label="Select Plan"
            fullWidth
            className={classes.plan}
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            {planOptions.map((opt) => (
              <MenuItem
                key={opt.value}
                value={opt.value}
                sx={{
                  whiteSpace: "normal", // Allows wrapping
                  fontSize: {
                    xs: "0.8rem",
                    sm: "0.95rem",
                  },
                  lineHeight: 1.4,
                  paddingY: 1,
                  "&:hover": {
                    backgroundColor: "#f0f4ff", // light blue or any preferred tone
                    transform: "scale(1.015)", // subtle zoom
                    fontWeight: 500,
                  },
                }}
              >
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
            {loading ? "Processing..." : "Sign Up & Pay"}
          </Button>

          <Typography className={classes.noteText}>
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/login")}
              underline="hover"
              sx={{ color: "#007BFF", fontWeight: 500 }}
            >
              Log In
            </Link>
          </Typography>
        </Paper>
      </Box>

      <WelcomeModal
        open={showWelcomeModal}
        onClose={handleCloseModal}
        onContinue={handleContinue}
      />
    </>
  );
};

export default Signup;
