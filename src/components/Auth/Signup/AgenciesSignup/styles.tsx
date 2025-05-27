import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    padding: theme.spacing(15),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(8, 2),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3, 0.5),
    },
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 400,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    margin: theme.spacing(15, 3),
    marginTop: 0,
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(8, 2),
      padding: theme.spacing(3),
      maxWidth: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2, 0.5),
      padding: theme.spacing(2, 0.5),
      maxWidth: "100%",
      minWidth: 0,
    },
  },
  title: {
    fontWeight: 600,
    fontSize: "1.75rem",
    marginBottom: theme.spacing(3),
    textAlign: "center",
    color: "#333",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  email: {
    marginBottom: theme.spacing(2),
    width: "100%",
    maxWidth: 420,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
  password: {
    marginBottom: theme.spacing(2),
    width: "100%",
    maxWidth: 420,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
  plan: {
    marginBottom: theme.spacing(3),
    width: "100%",
    // maxWidth: 350,
    // minWidth: 350,
    // [theme.breakpoints.down("sm")]: {
    //   maxWidth: "100%",
    // },
    // [theme.breakpoints.down("xs")]: {
    //   maxWidth: "100%",
    // },
  },
  signupButton: {
    padding: theme.spacing(1.3),
    fontWeight: 600,
    fontSize: "1rem",
    borderRadius: 8,
    width: "100%",
    maxWidth: 420,
    textTransform: "none",
    backgroundColor: "#007BFF",
    "&:hover": {
      backgroundColor: "#0069d9",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
      maxWidth: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
      maxWidth: "100%",
    },
  },
  noteText: {
    marginTop: theme.spacing(2.5),
    fontSize: "0.95rem",
    color: "#444",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  error: {
    color: "#d32f2f",
    marginBottom: theme.spacing(2),
    textAlign: "center",
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
}));

export default styles;
