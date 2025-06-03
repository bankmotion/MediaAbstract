import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Navbar/Nabvar";
import useStyles from "./styles";
import { supabase } from "../../../../utils/supabase";

const Signup = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check if user profile exists
      const { data: existingUser, error: checkError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("email", email)
        .single();

      if (existingUser) {
        // If the user was pre-added by admin and has a valid plan and payment_status
        if (
          (existingUser.plan_type === "basic" ||
            existingUser.plan_type === "team" ||
            existingUser.plan_type === "enterprise" ||
            existingUser.plan_type === "writer") &&
          (existingUser.payment_status === "beta" ||
            existingUser.payment_status === "active")
        ) {
          // Create user in Supabase auth
          const { data: authData, error: authError } =
            await supabase.auth.signUp({
              email,
              password,
            });

          if (authError) {
            throw authError;
          }

          if (!authData.user) {
            throw new Error("Failed to create user account");
          }

          // Update user_profiles with user_id and password
          const { error: profileError } = await supabase
            .from("user_profiles")
            .update({
              user_id: authData.user.id,
              password: password,
            })
            .eq("email", email);

          if (profileError) {
            console.error("Profile creation error:", profileError);
            throw profileError;
          }

          // Redirect to dashboard based on plan_type
          if (existingUser.plan_type === "writer") {
            navigate("/writers/dashboard");
          } else {
            navigate("/agencies/dashboard");
          }
          return;
        } else {
          setError(
            "An account with this email already exists. Please login instead."
          );
          return;
        }
      }

      // Create user in Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Create user profile with email and password ONLY
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert([
          {
            email: email,
            password: password,
            user_id: authData.user.id,
          },
        ])
        .select();

      if (profileError) {
        console.error("Profile creation error:", profileError);
        throw profileError;
      }

      // Store user data in session storage for payment page
      sessionStorage.setItem(
        "signupData",
        JSON.stringify({
          email,
          userId: authData.user.id,
        })
      );

      // Navigate to payment page
      navigate("/payment", {
        state: {
          email,
          userId: authData.user.id,
        },
        replace: true, // Replace the current route to prevent going back to signup
      });
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
    </>
  );
};

export default Signup;
