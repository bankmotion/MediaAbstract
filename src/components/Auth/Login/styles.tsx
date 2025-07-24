import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f4f6f8",
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",

    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(15),
    // marginTop: theme.spacing(10),
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
    margin: theme.spacing(15, 2),

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
      margin: theme.spacing(15, 1),
    },
  },

  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: "#333",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },

  subnotice: {
    textAlign: "center",
    color: "#666",
    marginBottom: theme.spacing(3),
    fontSize: "0.95rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
    },
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
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
      padding: theme.spacing(1),
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
}));

export default styles;
