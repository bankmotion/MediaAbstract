import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import useStyles from "./styles";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const { classes } = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle
        id="confirmation-dialog-title"
        className={classes.dialogTitle}
      >
        {title}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText
          id="confirmation-dialog-description"
          className={classes.dialogContentText}
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose} className={classes.cancelButton}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} className={classes.confirmButton} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
