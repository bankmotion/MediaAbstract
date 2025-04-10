import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Box, Typography, Button } from "@mui/material";
import { useStyles } from "./styles";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  useEffect(() => {
    // You can add any post-payment logic here
    // For example, updating order status, sending confirmation email, etc.
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
          Thank you for your purchase. Your payment has been processed
          successfully. A confirmation email has been sent to your registered
          email address.
        </Typography>

        <Button
          className={classes.button}
          onClick={() => navigate("/onboarding")}
        >
          Continue
          <ArrowRight size={20} />
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
