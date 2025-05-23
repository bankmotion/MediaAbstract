import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    maxWidth: 600,
    margin: "0 auto",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      margin: theme.spacing(0, 1),
    },
  },
  question: {
    marginBottom: theme.spacing(4),
    "&:last-child": {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  questionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    fontSize: "1.1rem",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginBottom: theme.spacing(1.5),
    },
  },
  radioGroup: {
    marginTop: theme.spacing(1),
    "& .MuiFormControlLabel-root": {
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(0.5),
        "& .MuiTypography-root": {
          fontSize: "0.9rem",
        },
      },
    },
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(2),
      "& .MuiAlert-message": {
        fontSize: "0.9rem",
      },
    },
  },
  dialogContent: {
    padding: theme.spacing(3),
    "& ul": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
    },
    "& li": {
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      "& .MuiTypography-root": {
        fontSize: "0.9rem",
      },
      "& ul": {
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        paddingLeft: theme.spacing(2),
      },
      "& li": {
        marginBottom: theme.spacing(0.5),
        fontSize: "0.9rem",
      },
    },
  },
  dialogActions: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
      "& .MuiButton-root": {
        fontSize: "0.9rem",
        padding: theme.spacing(1, 2),
      },
    },
  },
  continueButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1.5),
      padding: theme.spacing(1.2),
      fontSize: "0.9rem",
    },
  },
}));

export default useStyles;
