import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    backgroundColor: "#f8f9fa",
    padding: theme.spacing(1.5),
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
    marginTop: "auto",
    position: "fixed",
    bottom: "0px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  letter: {
    fontSize: "0.95rem",
    color: "#6c757d",
    margin: 0,
    lineHeight: 1.6,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
    },
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#0056b3",
      textDecoration: "underline",
    },
  },
}));

export default styles;
