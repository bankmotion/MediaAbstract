import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    padding: theme.spacing(2),
  },

  content: {
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },

  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: "#333",
  },

  subnotice: {
    textAlign: "center",
    color: "#666",
    marginBottom: theme.spacing(3),
    fontSize: "0.95rem",
  },

  email: {
    marginBottom: theme.spacing(2),
  },

  password: {
    marginBottom: theme.spacing(2),
  },

  loginButton: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.2),
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: 8,
  },

  noteText: {
    textAlign: "center",
    marginTop: theme.spacing(2.5),
    color: "#444",
  },
}));

export default styles;
