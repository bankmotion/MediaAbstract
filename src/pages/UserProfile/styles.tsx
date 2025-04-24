import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    minHeight: "100vh",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(2),
      alignItems: "flex-start",
    },
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  backButton: {
    color: theme.palette.primary.main,
    backgroundColor: "rgba(25, 118, 210, 0.05)",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.1)",
      transform: "translateX(-4px)",
    },
    transition: "all 0.3s ease",
  },
  title: {
    fontWeight: 700,
    background: "linear-gradient(45deg, #1976d2, #64b5f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -4,
      left: 0,
      width: "100%",
      height: "2px",
      background: "linear-gradient(90deg, #1976d2, #64b5f6)",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.3s ease",
    },
    "&:hover::after": {
      transform: "scaleX(1)",
    },
  },
  editButton: {
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "8px",
    padding: theme.spacing(1, 2),
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
  },
  content: {
    maxWidth: "800px",
    margin: "0 auto",
    width: "100%",
  },
  profileCard: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    },
  },
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    border: "4px solid #fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    },
  },
  editActions: {
    display: "flex",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  actionButton: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
  },
  profileInfo: {
    padding: theme.spacing(3),
  },
  infoSection: {
    marginBottom: theme.spacing(3),
  },
  label: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },
  value: {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  divider: {
    margin: theme.spacing(3, 0),
    opacity: 0.1,
  },
  subscriptionInfo: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  subscriptionStatus: {
    fontWeight: 600,
    fontSize: "1.1rem",
  },
  subscriptionDate: {
    color: theme.palette.text.secondary,
  },
  upgradeButton: {
    marginTop: theme.spacing(2),
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "8px",
    padding: theme.spacing(1, 2),
    background: "linear-gradient(45deg, #1976d2, #64b5f6)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
    },
  },
  upgradeDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "16px",
      padding: theme.spacing(2),
    },
  },
  dialogTitle: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    fontWeight: 600,
  },
  dialogIcon: {
    color: theme.palette.primary.main,
  },
  dialogContent: {
    marginBottom: theme.spacing(3),
  },
  plansContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  planCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    },
  },
  price: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    margin: theme.spacing(1, 0),
  },
  period: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  featuresList: {
    listStyle: "none",
    padding: 0,
    margin: theme.spacing(2, 0),
    "& li": {
      padding: theme.spacing(0.5, 0),
      color: theme.palette.text.secondary,
      "&::before": {
        content: '"✓"',
        color: theme.palette.primary.main,
        marginRight: theme.spacing(1),
      },
    },
  },
  selectPlanButton: {
    marginTop: theme.spacing(2),
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "8px",
    padding: theme.spacing(1, 2),
    background: "linear-gradient(45deg, #1976d2, #64b5f6)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
    },
  },
}));

export default useStyles;
