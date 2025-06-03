import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  dialogPaper: {
    minWidth: 300,
    [theme.breakpoints.up("sm")]: {
      minWidth: 400,
    },
  },
  dialogTitle: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  dialogContent: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  dialogContentText: {
    color: theme.palette.text.primary,
  },
  dialogActions: {
    padding: theme.spacing(1),
    justifyContent: "space-between",
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
  confirmButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default useStyles;
