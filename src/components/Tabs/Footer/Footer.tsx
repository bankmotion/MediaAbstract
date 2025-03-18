import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Footer = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.body}>
      <p className={classes.letter}>
        © {new Date().getFullYear()} WriteFor.co. All rights reserved. |{" "}
        <Link to="/terms" className={classes.link}>
          Terms of Use
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
