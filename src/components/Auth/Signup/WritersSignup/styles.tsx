import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    padding: theme.spacing(15, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
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
      margin: theme.spacing(15, 2),
      padding: theme.spacing(3),
      maxWidth: "90%",
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
  },
  email: {
    marginBottom: theme.spacing(2),
    width: "100%",
    maxWidth: 420,
  },
  password: {
    marginBottom: theme.spacing(2),
    width: "100%",
    maxWidth: 420,
  },
  plan: {
    marginBottom: theme.spacing(3),
    width: "100%",
    maxWidth: 420,
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
  },
  // link: {
  //   color: "#007BFF",
  //   fontWeight: 500,
  //   cursor: "pointer",
  //   textDecoration: "underline",
  //   "&:hover": {
  //     color: "#0056b3",
  //   },
  // },
  error: {
    color: "#d32f2f",
    marginBottom: theme.spacing(2),
    textAlign: "center",
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
    },
  },
}));

export default styles;
