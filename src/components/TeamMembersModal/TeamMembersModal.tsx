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
  teamId: string;
}

const TeamMembersModal: React.FC<TeamMembersModalProps> = ({
  open,
  onClose,
  userId,
  planType,
  maxUsers,
  isAdmin,
  teamId,
}) => {
  const { classes } = useStyles();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<
    { email: string; team_role: string }[]
  >([]);

  // Fetch team members on open or teamId change
  React.useEffect(() => {
    if (!teamId) return;
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("email, team_role")
        .eq("team_id", teamId);
      if (!error && data) setTeamMembers(data);
    };
    fetchMembers();
  }, [teamId, open]);

  const handleAddMember = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Upsert with team_id
      const { error: userProfileError } = await supabase
        .from("user_profiles")
        .upsert(
          [
            {
              email: email.toLowerCase(),
              plan_type: planType,
              payment_status: "beta",
              team_id: teamId,
              team_role: "member",
            },
          ],
          { onConflict: "email" }
        );

      if (userProfileError) throw userProfileError;

      setSuccess("Team member added successfully");
      setEmail("");
      // Refresh team members list
      const { data } = await supabase
        .from("user_profiles")
        .select("email, team_role")
        .eq("team_id", teamId);
      if (data) setTeamMembers(data);
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
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Current Team Members:
          </Typography>
          {teamMembers.length === 0 ? (
            <Typography color="textSecondary">No team members yet.</Typography>
          ) : (
            <Box>
              {teamMembers.map((member) => (
                <Box
                  key={member.email}
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <PersonIcon fontSize="small" />
                  <Typography>{member.email}</Typography>
                  {member.team_role === "admin" && (
                    <Typography color="primary" sx={{ ml: 1, fontWeight: 600 }}>
                      (Admin)
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>
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
