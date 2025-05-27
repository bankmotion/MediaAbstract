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
import { supabase } from "../../../../utils/supabase";

const planOptions = [
  {
    priceId: "basic",
    label: "Basic Plan",
    price: "$50/month",
    description: "1 user, 5 matches/day, basic media guidelines",
    value: "basic",
    checkoutUrl: "https://buy.stripe.com/test_fZe17B67waPjaRi4gk",
  },
  {
    priceId: "team",
    label: "Team Plan",
    price: "$120/month",
    description: "3 users, 15 matches/day, enhanced outreach tools",
    value: "team",
    checkoutUrl: "https://buy.stripe.com/test_5kA4jN1Rg5uZbVmfZ3",
  },
  {
    priceId: "enterprise",
    label: "Enterprise Plan",
    price: "$200/month",
    description:
      "Unlimited users and matches, premium insights, priority support",
    value: "enterprise",
    checkoutUrl: "https://buy.stripe.com/test_8wMdUn9jI6z3cZq7sy",
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

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSignup = async () => {
    if (!email || !password || !plan) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check if user profile exists
      const { data: existingUser, error: checkError } = await supabase
        .from("user_profiles")
        .select("email, password")
        .eq("email", email)
        .single();

      if (existingUser) {
        setError(
          "An account with this email already exists. Please login instead."
        );
        return;
      }

      // Create user in Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            plan_type: plan,
          },
        },
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Create user profile with email and password
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert([
          {
            email: email,
            password: password,
            plan_type: plan,
            user_id: authData.user.id,
            payment_status: "beta",
          },
        ])
        .select();

      if (profileError) {
        console.error("Profile creation error:", profileError);
        throw profileError;
      }

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
      console.error("Signup error:", err);
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
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    maxHeight: 300,
                    width: "350px",
                  },
                },
              },
            }}
          >
            {planOptions.map((opt) => (
              <MenuItem
                key={opt.value}
                value={opt.value}
                sx={{
                  whiteSpace: "normal",
                  paddingY: 1,
                  paddingX: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  "&:hover": {
                    backgroundColor: "#f0f4ff",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {opt.label}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "primary.main" }}
                  >
                    {opt.price}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {opt.description}
                </Typography>
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
              onClick={handleLoginClick}
              underline="hover"
              sx={{ color: "#007BFF", fontWeight: 500 }}
            >
              Log In
            </Link>
          </Typography>
        </Paper>
      </Box>

      {/* <WelcomeModal
        open={showWelcomeModal}
        onClose={handleCloseModal}
        onContinue={handleContinue}
      /> */}
    </>
  );
};

export default Signup;
