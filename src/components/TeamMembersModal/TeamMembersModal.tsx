import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import { Close as CloseIcon, Person as PersonIcon } from "@mui/icons-material";
import { supabase } from "../../utils/supabase";
import useStyles from "./styles";

interface TeamMembersModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  planType: string;
  maxUsers: number;
  isAdmin: boolean;
}

const TeamMembersModal: React.FC<TeamMembersModalProps> = ({
  open,
  onClose,
  userId,
  planType,
  maxUsers,
  isAdmin,
}) => {
  const { classes } = useStyles();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddMember = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Add to user_profiles
      const { error: userProfileError } = await supabase
        .from("user_profiles")
        .upsert(
          [
            {
              email: email.toLowerCase(),
              plan_type: planType,
              payment_status: "beta",
            },
          ],
          { onConflict: "email" }
        );

      if (userProfileError) throw userProfileError;

      setSuccess("Team member added successfully");
      setEmail("");
    } catch (err) {
      console.error("Error adding team member:", err);
      setError("Failed to add team member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon />
          <Typography variant="h6">Team Members</Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {isAdmin ? (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Add a team member by email
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Button
                variant="contained"
                onClick={handleAddMember}
                disabled={loading || !email}
              >
                Add
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mb: 3 }}>
            <Alert severity="info">
              Only admins can manage team members. Contact your admin for
              access.
            </Alert>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamMembersModal;
