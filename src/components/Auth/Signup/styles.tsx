import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    padding: theme.spacing(3),
  },
  title: {
    fontWeight: 600,
    fontSize: "1.75rem",
    marginBottom: theme.spacing(3),
    textAlign: "center",
    color: "#333",
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
  },
  noteText: {
    marginTop: theme.spacing(2.5),
    fontSize: "0.95rem",
    color: "#444",
    textAlign: "center",
  },
  link: {
    color: "#007BFF",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "underline",
    "&:hover": {
      color: "#0056b3",
    },
  },
}));

export default styles;
