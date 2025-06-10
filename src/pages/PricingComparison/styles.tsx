import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 2, 6, 2),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(6),
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: "2.5rem",
    paddingTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  subtitle: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "0 auto",
    marginBottom: theme.spacing(4),
  },
  gridContainer: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: theme.spacing(0, 2),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 0.5),
    },
  },
  pricingCard: {
    height: "100%",
    minHeight: 480,
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease-in-out",
    position: "relative",
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0, 1),
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      minHeight: 0,
      margin: theme.spacing(2, 0),
    },
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: theme.shadows[8],
    },
  },
  popularCard: {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
  },
  popularBadge: {
    position: "absolute",
    left: "50%",
    top: 6,
    transform: "translateX(-50%)",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0.5, 2),
    borderRadius: 20,
    fontSize: "0.875rem",
    fontWeight: 600,
    boxShadow: theme.shadows[2],
    zIndex: 2,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  planName: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    fontSize: "1.5rem",
    color: theme.palette.text.primary,
  },
  price: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    fontSize: "2rem",
  },
  featureList: {
    flex: 1,
    marginBottom: theme.spacing(3),
    padding: 0,
  },
  featureItem: {
    padding: theme.spacing(1, 0),
    "& .MuiListItemText-primary": {
      fontSize: "1rem",
      color: theme.palette.text.secondary,
    },
  },
  checkIcon: {
    minWidth: 36,
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
