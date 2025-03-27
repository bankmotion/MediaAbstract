import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface PublicationDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  outlet: {
    name: string;
    guidelines: string;
    pitchTips: string;
    editorContact: string;
  } | null;
}

const PublicationDetailsModal: React.FC<PublicationDetailsModalProps> = ({
  open,
  handleClose,
  outlet,
}) => {
  if (!outlet) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{outlet.name} - Submission Guidelines</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" fontWeight="bold">
          Pitch Guidelines:
        </Typography>
        <Typography>{outlet.guidelines}</Typography>

        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
          Pitch Tips:
        </Typography>
        <Typography>{outlet.pitchTips}</Typography>

        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
          Editor Contact:
        </Typography>
        <Typography>{outlet.editorContact}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublicationDetailsModal;
