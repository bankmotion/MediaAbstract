// src/pages/Login.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";

import Navbar from "../../Navbar/Nabvar";

import useStyles from "./styles";

const Login = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        // Check if user exists in user_profiles table
        const { data: profileExists } = await supabase
          .from("user_profiles")
          .select("user_id")
          .eq("email", email)
          .single();

        if (profileExists) {
          setError("Incorrect password. Please try again.");
        } else {
          setError("No account found with this email. Please sign up first.");
        }
        return;
      }

      if (data?.user) {
        // Check if user has a profile
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", data.user.id)
          .single();

        if (profileError) {
          setError(
            "No profile found. Please contact support or sign up again."
          );
          await supabase.auth.signOut();
          return;
        }

        // Check if user is a beta tester or has active subscription
        if (
          profileData?.payment_status === "beta" ||
          profileData?.payment_status === "active"
        ) {
          navigate("/writers/dashboard");
        } else {
          // If not a beta tester or active user, sign them out
          await supabase.auth.signOut();
          setError("Your account is not active. Please sign up first.");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
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
            Log In
          </Typography>
          <Typography variant="body2" className={classes.subnotice}>
            Login to continue to WriteFor.co
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Email Address"
            type="email"
            fullWidth
            className={classes.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            className={classes.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            className={classes.loginButton}
            disabled={loading}
            sx={{
              backgroundColor: "#007BFF",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#0069d9" },
              mt: 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography variant="body2" className={classes.noteText}>
            Don't have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/")}
              underline="hover"
              sx={{ color: "#007BFF", fontWeight: 500 }}
            >
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
