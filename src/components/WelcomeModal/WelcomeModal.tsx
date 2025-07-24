import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
  Divider,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./style";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({
  open,
  onClose,
  onContinue,
}) => {
  const { classes } = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      scroll="body"
      TransitionComponent={Slide}
      transitionDuration={400}
      className={classes.modalBody}
    >
      <Box className={classes.modalContainer}>
        <DialogTitle className={classes.modalTitle}>
          <Box className={classes.closeButton}>
            <IconButton onClick={onClose}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>
          Welcome to WriteFor.co!
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.modalText}>
            Let’s get started with your first pitch.
          </Typography>
        </DialogContent>

        <Divider sx={{ marginY: 2 }} />

        <DialogActions className={classes.action}>
          <Button
            variant="contained"
            onClick={onContinue}
            className={classes.modalButton}
          >
            Let’s Go →
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default WelcomeModal;
