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
import useStyles from "./styles";

const planOptions = [
  {
    priceId: "writer",
    label: "Writer - $15/month",
    value: "writer",
    checkoutUrl: "https://buy.stripe.com/test_cN2dUneE2g9D5wY6or",
  },
];

const Signup = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    if (!email || !password || !plan) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Store registration data in localStorage
      const registrationData = {
        email,
        password,
        plan_type: plan,
      };
      localStorage.setItem(
        "pendingRegistration",
        JSON.stringify(registrationData)
      );

      // Redirect to Stripe
      const selectedPlan = planOptions.find((opt) => opt.value === plan);
      if (!selectedPlan) {
        throw new Error("Invalid plan selection");
      }

      window.location.href = selectedPlan.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box className={classes.body}>
        <Paper elevation={3} className={classes.content}>
          <Typography variant="h5" className={classes.title}>
            Sign Up
          </Typography>
          {error && (
            <Typography color="error" className={classes.error}>
              {error}
            </Typography>
          )}
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
                  whiteSpace: "normal",
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.95rem",
                  },
                  lineHeight: 1.4,
                  paddingY: 1,
                  "&:hover": {
                    backgroundColor: "#f0f4ff",
                    transform: "scale(1.015)",
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
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
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
    </>
  );
};

export default Signup;
