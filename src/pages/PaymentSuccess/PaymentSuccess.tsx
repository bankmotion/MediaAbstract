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
    const updateUserAfterPayment = async () => {
      try {
        // Get the current user from Supabase Auth
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) throw new Error("No user found after payment.");

        // Get plan type from session storage
        const planType = sessionStorage.getItem("selectedPlan");
        if (!planType) throw new Error("No plan type found after payment.");

        // Fetch current user profile to check for existing team_id
        const { data: existingProfile, error: profileError } = await supabase
          .from("user_profiles")
          .select("team_id")
          .eq("user_id", user.id)
          .single();
        if (profileError) throw profileError;

        let teamId = existingProfile?.team_id;
        if (!teamId) {
          // Use admin's userId as team_id if not present
          teamId = user.id;
        }

        // Update user profile with plan_type, payment_status, team_role as 'admin', and team_id
        const { error: updateError } = await supabase
          .from("user_profiles")
          .update({
            plan_type: planType,
            payment_status: "beta",
            team_role: "admin",
            team_id: teamId,
          })
          .eq("user_id", user.id);

        if (updateError) throw updateError;

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to update user after payment"
        );
      } finally {
        setLoading(false);
      }
    };

    updateUserAfterPayment();
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
