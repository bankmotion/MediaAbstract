import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  appbar: {
    height: "100%",
    position: "sticky",
    top: "0",
    background: "#fff",
    zIndex: 1000,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoButton: {
    textTransform: "none",
    padding: 0,
    minWidth: "auto",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "1.25rem",
    color: "#000",
    "&:hover": {
      fontSize: "1.5rem",
    },
  },
  backButton: {
    fontWeight: 500,
  },
}));

export default styles;
