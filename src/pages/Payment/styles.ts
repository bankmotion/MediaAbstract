import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  root: {
    padding: theme.spacing(6),
    paddingTop: theme.spacing(10),
    maxWidth: 1200,
    margin: "0 auto",
    minHeight: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  header: {
    textAlign: "center",
    maxWidth: 600,
    margin: "0 auto",
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    color: theme.palette.text.primary,
    fontSize: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    lineHeight: 1.6,
  },
  error: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.error.light + "20",
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.error.main,
  },
  plansGrid: {
    marginBottom: theme.spacing(2),
  },
  planCard: {
    height: "100%",
    minHeight: 380,
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid",
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius * 2,
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: theme.shadows[8],
    },
  },
  selectedPlan: {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + "08",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      backgroundColor: theme.palette.primary.main,
    },
  },
  planContent: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2.5),
  },
  planTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1.2),
    fontSize: "1.2rem",
    color: theme.palette.text.primary,
  },
  planPrice: {
    fontWeight: 800,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    fontSize: "2rem",
    "& span": {
      fontSize: "1rem",
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
  },
  planDescription: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
    flexGrow: 1,
  },
  featuresList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    "& svg": {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1),
      fontSize: "1.2rem",
    },
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
  paymentButton: {
    minWidth: 240,
    height: 48,
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: "none",
    boxShadow: theme.shadows[4],
    "&:hover": {
      boxShadow: theme.shadows[8],
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default styles;
