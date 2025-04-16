import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Box, Typography, Button } from "@mui/material";
import { supabase } from "../../utils/supabase";
import { useStyles } from "./styles";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createUserAccount = async () => {
      try {
        // Get the pending registration data from localStorage
        const registrationDataStr = localStorage.getItem("pendingRegistration");
        if (!registrationDataStr) {
          throw new Error("No pending registration found");
        }

        const registrationData = JSON.parse(registrationDataStr);
        console.log("Registration data:", registrationData); // Debug log

        // 1. Sign up with Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: registrationData.email,
            password: registrationData.password,
            options: {
              data: {
                plan_type: registrationData.plan_type,
                payment_status: "active",
              },
            },
          }
        );

        if (authError) {
          console.error("Auth error:", authError); // Debug log
          throw new Error(authError.message);
        }

        if (!authData.user) {
          throw new Error("Failed to create user");
        }

        console.log("Auth successful, user:", authData.user); // Debug log

        // 2. Create user profile in custom table
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .insert([
            {
              user_id: authData.user.id,
              email: registrationData.email,
              plan_type: registrationData.plan_type,
              payment_status: "active",
            },
          ])
          .select();

        if (profileError) {
          console.error("Profile error:", profileError); // Debug log
          throw new Error(profileError.message);
        }

        console.log("Profile created:", profileData); // Debug log

        // Clear the registration data
        localStorage.removeItem("pendingRegistration");
      } catch (err) {
        console.error("Error in createUserAccount:", err); // Debug log
        setError(
          err instanceof Error ? err.message : "Failed to create user account"
        );
      }
    };

    createUserAccount();
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.successCard}>
        <Box className={classes.iconWrapper}>
          <CheckCircle size={80} />
        </Box>

        <Typography variant="h1" className={classes.title}>
          Payment Successful!
        </Typography>
        <Typography className={classes.message}>
          Thank you for your purchase. Your account is being created and you'll
          be able to access all features shortly. A confirmation email has been
          sent to your registered email address.
        </Typography>

        {error && (
          <Typography
            color="error"
            sx={{ mt: 2, p: 2, bgcolor: "error.light", borderRadius: 1 }}
          >
            Error: {error}
          </Typography>
        )}

        <Button
          className={classes.button}
          onClick={() => navigate("/onboarding")}
          disabled={!!error}
        >
          Continue
          <ArrowRight size={20} />
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
