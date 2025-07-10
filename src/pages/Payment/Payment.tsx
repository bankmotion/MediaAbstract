import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import useStyles from "./styles";
import Navbar from "../../components/Navbar/Nabvar";

const planOptions = [
  {
    priceId: "basic",
    label: "Basic Plan",
    price: "$50",
    period: "/month",
    description:
      "Perfect for individual brands, content teams, and agencies just getting started",
    features: [
      "1 user account",
      "5 matches per day",
      "Basic media guidelines",
      "Email support",
      "Standard matching algorithm",
    ],
    value: "basic",
    checkoutUrl: "https://buy.stripe.com/test_fZe17B67waPjaRi4gk",
  },
  {
    priceId: "team",
    label: "Team Plan",
    price: "$120",
    period: "/month",
    description:
      "Ideal for growing brands, content teams, and agencies with multiple team members",
    features: [
      "3 user accounts",
      "15 matches per day",
      "Enhanced outreach tools",
      "Priority email support",
      "Advanced matching algorithm",
      "Team collaboration features",
    ],
    value: "team",
    checkoutUrl: "https://buy.stripe.com/test_5kA4jN1Rg5uZbVmfZ3",
  },
  {
    priceId: "enterprise",
    label: "Enterprise Plan",
    price: "$200",
    period: "/month",
    description:
      "For established brands, content teams, and agencies requiring maximum capabilities",
    features: [
      "Unlimited user accounts",
      "Unlimited matches",
      "Premium insights & analytics",
      "24/7 priority support",
      "Custom matching algorithm",
      "API access",
      "Dedicated account manager",
    ],
    value: "enterprise",
    checkoutUrl: "https://buy.stripe.com/test_8wMdUn9jI6z3cZq7sy",
  },
];

const Payment = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user data from location state or session storage
  const { email: stateEmail, userId: stateUserId } = location.state || {};
  const [email, setEmail] = useState(stateEmail);
  const [userId, setUserId] = useState(stateUserId);

  useEffect(() => {
    // If no data in state, try to get from session storage
    if (!stateEmail || !stateUserId) {
      const storedData = sessionStorage.getItem("signupData");
      if (storedData) {
        const { email: storedEmail, userId: storedUserId } =
          JSON.parse(storedData);
        setEmail(storedEmail);
        setUserId(storedUserId);
      } else {
        // No data found, redirect to signup
        navigate("/signup");
      }
    }
  }, [stateEmail, stateUserId, navigate]);

  const handlePlanSelect = (planValue: string) => {
    setSelectedPlan(planValue);
  };

  const handlePayment = async () => {
    if (!selectedPlan || !userId) {
      setError("Please select a plan");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Update user profile with selected plan
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          plan_type: selectedPlan,
          payment_status: "pending",
        })
        .eq("user_id", userId);

      if (updateError) {
        throw updateError;
      }

      // Store selected plan in session storage
      sessionStorage.setItem("selectedPlan", selectedPlan);

      // Redirect to Stripe checkout
      const plan = planOptions.find((opt) => opt.value === selectedPlan);
      if (!plan) {
        throw new Error("Invalid plan selection");
      }

      window.location.href = plan.checkoutUrl;
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box className={classes.root}>
        <Box className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            Choose Your Plan
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            Select the perfect plan for your brand, content team, or agency's
            needs.
          </Typography>
        </Box>

        {error && (
          <Typography color="error" className={classes.error}>
            {error}
          </Typography>
        )}

        <Grid container spacing={4} className={classes.plansGrid}>
          {planOptions.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.value}>
              <Card
                className={`${classes.planCard} ${
                  selectedPlan === plan.value ? classes.selectedPlan : ""
                }`}
                onClick={() => handlePlanSelect(plan.value)}
              >
                <CardContent className={classes.planContent}>
                  <Typography variant="h6" className={classes.planTitle}>
                    {plan.label}
                  </Typography>
                  <Typography variant="h4" className={classes.planPrice}>
                    {plan.price}
                    <span>{plan.period}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.planDescription}
                  >
                    {plan.description}
                  </Typography>
                  <Box component="ul" className={classes.featuresList}>
                    {plan.features.map((feature, index) => (
                      <Box
                        component="li"
                        key={index}
                        className={classes.featureItem}
                      >
                        <CheckCircleOutline />
                        {feature}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handlePayment}
            disabled={!selectedPlan || loading}
            className={classes.paymentButton}
          >
            {loading ? "Processing..." : "Continue to Payment"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Payment;
