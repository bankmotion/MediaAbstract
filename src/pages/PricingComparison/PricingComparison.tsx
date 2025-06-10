import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../../components/Navbar/Nabvar";
import useStyles from "./styles";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$50/mo",
    features: [
      "1 user",
      "5 matches/day",
      "Media info (name, email/form, pitch link)",
      "Smart reminders (no badge)",
    ],
  },
  {
    name: "Team",
    price: "$120/mo",
    features: [
      "3 users",
      "15 matches/day",
      "Match confidence + AI tags",
      "Upgraded pitch tracking (submitted, accepted, etc.)",
      "Saved notes",
      "Smart reminders (with badge)",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "$200/mo",
    features: [
      "Unlimited users",
      "Unlimited matches/day",
      "Everything in Team",
      "Premium insights (placeholder active)",
      "Priority support",
      "Shared pitch dashboard (future)",
      "Tagging/commenting (future)",
    ],
  },
];

interface PricingComparisonProps {
  isStandalonePage?: boolean;
}

const PricingComparison: React.FC<PricingComparisonProps> = ({
  isStandalonePage = false,
}) => {
  const { classes } = useStyles();

  const content = (
    <Container maxWidth="lg" className={classes.root}>
      {isStandalonePage && (
        <>
          <Typography variant="h4" className={classes.title}>
            Compare Plans
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Find the perfect plan for your needs
          </Typography>
        </>
      )}

      <Grid container spacing={4} className={classes.gridContainer}>
        {pricingPlans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Card
              className={`${classes.pricingCard} ${
                plan.isPopular ? classes.popularCard : ""
              }`}
              elevation={plan.isPopular ? 8 : 2}
            >
              {plan.isPopular && (
                <Box className={classes.popularBadge}>Most Popular</Box>
              )}
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" className={classes.planName}>
                  {plan.name}
                </Typography>
                <Typography variant="h4" className={classes.price}>
                  {plan.price}
                </Typography>
                <List className={classes.featureList}>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} className={classes.featureItem}>
                      <ListItemIcon className={classes.checkIcon}>
                        <CheckCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  if (isStandalonePage) {
    return (
      <>
        <Navbar />
        {content}
      </>
    );
  }

  return content;
};

export default PricingComparison;
