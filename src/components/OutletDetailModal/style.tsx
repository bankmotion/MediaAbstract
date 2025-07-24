import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  closeButton: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      right: theme.spacing(2),
      top: theme.spacing(2),
    },
  },
  content: {
    padding: theme.spacing(3),
    backgroundColor: "#fafafa",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  section: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  sectionTitle: {
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
  },
  text: {
    paddingLeft: theme.spacing(4),
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      fontSize: "0.9rem",
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  iconBlue: {
    color: "#0073e6",
  },
  iconOrange: {
    color: "#ff9800",
  },
  iconGreen: {
    color: "#4caf50",
  },
  footer: {
    padding: theme.spacing(2, 3),
    backgroundColor: "#f5f5f5",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  button: {
    textTransform: "none",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      padding: theme.spacing(1.5),
    },
  },
  matchExplanationTooltip: {
    backgroundColor: "#f5faff",
    color: "#1a1a1a",
    border: "1px solid rgba(25, 118, 210, 0.1)",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: theme.spacing(2),
    maxWidth: 300,
    "& p": {
      margin: 0,
      lineHeight: 1.6,
      fontSize: "0.95rem",
    },
  },
  matchExplanationIcon: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontSize: "1.1rem",
    verticalAlign: "middle",
    "&:hover": {
      opacity: 0.8,
    },
  },
}));

export default useStyles;
