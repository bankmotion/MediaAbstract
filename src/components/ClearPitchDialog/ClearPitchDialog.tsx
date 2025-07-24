import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ClearPitchDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ClearPitchDialog: React.FC<ClearPitchDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
        Clear Current Pitch?
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to clear this pitch? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="text"
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
          }}
        >
          Clear Pitch
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClearPitchDialog;
