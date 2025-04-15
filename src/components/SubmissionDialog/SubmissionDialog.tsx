import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Send as SendIcon, Info } from "@mui/icons-material";
import styles from "./styles";

interface SubmissionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SubmissionDialog: React.FC<SubmissionDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const { classes } = styles();
  const [showNotYetMessage, setShowNotYetMessage] = useState(false);

  const handleClose = () => {
    onClose();
    setShowNotYetMessage(false);
  };

  const handleNotYetClick = () => {
    setShowNotYetMessage(true);
    setTimeout(() => {
      onClose();
      setShowNotYetMessage(false);
    }, 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ className: classes.dialogPaper }}
    >
      <Box className={classes.header}>
        <DialogTitle sx={{ p: 0, mb: 1 }}>
          <Typography variant="h5" component="div" className={classes.title}>
            Ready to Submit?
          </Typography>
        </DialogTitle>
      </Box>
      <DialogContent className={classes.content}>
        <Box className={classes.iconContainer}>
          <SendIcon className={classes.sendIcon} />
          <Box>
            <Typography variant="h6" className={classes.submitTitle}>
              Submit Your Pitch
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You're about to share your amazing pitch with the world!
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          className={classes.note}
        >
          You'll be directed to their submission page where you can complete the
          process.
        </Typography>
      </DialogContent>
      <DialogActions
        className={`${classes.dialogActions} ${
          showNotYetMessage
            ? classes.dialogActionsColumn
            : classes.dialogActionsRow
        }`}
      >
        {showNotYetMessage ? (
          <Box className={classes.notYetMessageBox}>
            <Typography variant="body1" className={classes.notYetMessageText}>
              <Info sx={{ fontSize: 20 }} />
              Take your time! You can always come back later.
            </Typography>
          </Box>
        ) : (
          <>
            <Button
              onClick={handleNotYetClick}
              variant="outlined"
              className={classes.notYetButton}
            >
              Not Yet
            </Button>
            <Button
              onClick={onConfirm}
              variant="contained"
              className={classes.continueButton}
            >
              Yes, Continue
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SubmissionDialog;
