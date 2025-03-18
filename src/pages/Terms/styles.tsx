import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6, 2),
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },

  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    color: "#333333",
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },

  tabRoot: {
    width: "100%",
    maxWidth: 500,
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },

  tabLabel: {
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
}));

export default styles;
