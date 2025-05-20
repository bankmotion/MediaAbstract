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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Get the current user from Supabase Auth
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error("No user found after payment.");
        }

        // Optionally, check user_profiles table for profile
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profileError || !profile) {
          throw new Error("No user profile found after payment.");
        }

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to verify user after payment"
        );
      } finally {
        setLoading(false);
      }
    };

    checkUser();
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
          onClick={() => navigate("/login")}
          disabled={!!error || loading}
        >
          Continue
          <ArrowRight size={20} />
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
