import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
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
    marginTop: theme.spacing(2.5),
    fontSize: "0.95rem",
    color: "#444",
    textAlign: "center",
  },
}));

export default styles;
