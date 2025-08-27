import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
  Pagination,
} from "@mui/material";
import { MoreVert, ExpandMore, Info, HelpOutline } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { saveSelectedOutlets } from "../../redux/slices/savePitchSlice";
import { updatePitchStatus } from "../../redux/slices/pitchSlice";

import Navbar from "../../components/Navbar/Nabvar";
import OutletDetailModal from "../../components/OutletDetailModal/OutletDetailModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import SubmissionDialog from "../../components/SubmissionDialog/SubmissionDialog";

import useStyles from "./styles";
import { supabase } from "../../utils/supabase";

const Results = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const results = useSelector((state: RootState) => state.pitch.results);
  console.log("Results:", results);
  
  // Debug: Log AI partnership values to see what's coming from database
  useEffect(() => {
    if (results.length > 0) {
      console.log("AI Partnership Values from Database:");
      results.forEach((outlet, index) => {
        console.log(`Outlet ${index + 1}: "${outlet.outlet?.ai_partnered}" (type: ${typeof outlet.outlet?.ai_partnered})`);
      });
    }
  }, [results]);
  const status = useSelector((state: RootState) => state.pitch.status);
  const abstract = useSelector((state: RootState) => state.pitch.abstract);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedOutlets, setSelectedOutlets] = useState<string[]>([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const outletsPerPage = 5;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);
  const [planType, setPlanType] = useState("basic");

  // Calculate Pagination
  const indexOfLastOutlet = currentPage * outletsPerPage;
  const indexOfFirstOutlet = indexOfLastOutlet - outletsPerPage;
  const currentOutlets = results.slice(indexOfFirstOutlet, indexOfLastOutlet);
  const totalPages = Math.ceil(results.length / outletsPerPage);

  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [selectedSubmissionOutlet, setSelectedSubmissionOutlet] = useState<{
    name: string;
    url: string;
    pitchId: string;
  } | null>(null);

  // Helper function to properly determine AI partnership status
  const getAIPartnershipStatus = (aiPartnered: string | null | undefined) => {
    if (aiPartnered === "Yes") {
      return { status: "Yes", display: "Yes", color: "#1976d2", fontWeight: 600 };
    } else if (aiPartnered === "No") {
      return { status: "No", display: "No", color: "#d32f2f", fontWeight: 600 };
    } else {
      // Handle null, undefined, empty string, or any other value as "Unconfirmed"
      return { status: "Unconfirmed", display: "Unconfirmed", color: "#666" };
    }
  };

  const handleOpenModal = (outletName: string) => {
    const outlet = results.find((o) => o.outlet.name === outletName);

    if (outlet) {
      setSelectedOutlet(outlet.outlet);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedOutlet(null);
    setModalOpen(false);
  };

  const handleCheckboxChange = (outletName: string) => {
    setSelectedOutlets((prev) =>
      prev.includes(outletName)
        ? prev.filter((name) => name !== outletName)
        : [...prev, outletName]
    );
  };

  const handleSaveOutlets = () => {
    if (selectedOutlets.length > 0 && userId) {
      setIsConfirmDialogOpen(true);
    }
  };

  const handleConfirmSave = async () => {
    if (!userId) return;
    // Save selected outlets with userId for session-based distinction
    await dispatch(
      saveSelectedOutlets({
        description: abstract,
        outlets: selectedOutlets,
        userId, // Pass userId to the action
      })
    );
    setIsConfirmDialogOpen(false);
    setShowSuccessMessage(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessMessage(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOutlets([]);
    } else {
      setSelectedOutlets(results.map((outlet) => outlet.outlet.name));
    }
    setSelectAll(!selectAll);
    handleMenuClose();
  };

  const handleGoToDashboard = async () => {
    navigate("/agencies/dashboard");
  };

  const handlePitchAgain = () => {
    navigate("/onboarding");
  };

  const handlePitchLinkClick = (
    outlet: { name: string; url: string; pitchId: string },
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    setSelectedSubmissionOutlet(outlet);
    setSubmissionDialogOpen(true);
  };

  const handleSubmissionConfirm = async () => {
    if (selectedSubmissionOutlet && userId) {
      // Open the submission URL
      window.open(selectedSubmissionOutlet.url, "_blank");

      try {
        // Update the pitch status to "Submitted"
        await dispatch(
          updatePitchStatus({
            pitchId: selectedSubmissionOutlet.pitchId,
            outletName: selectedSubmissionOutlet.name,
            userId: userId,
          })
        ).unwrap();

        setShowSuccessMessage(true);
      } catch (error) {
        console.error("Failed to update pitch status:", error);
      }
    }
    setSubmissionDialogOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Get current user session and role
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        // Fetch plan_type from user_profiles
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("plan_type")
          .eq("user_id", session.user.id)
          .single();
        if (profile?.plan_type) {
          setPlanType(profile.plan_type);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Box className={classes.body}>
        <Typography variant="h5" className={classes.title}>
          Top Matching Outlets
        </Typography>

        {status === "loading" ? (
          <Box className="flex justify-center items-center h-40">
            <CircularProgress size={50} />
          </Box>
        ) : results.length === 0 ? (
          <Box className={classes.noResultsContainer}>
            <img
              src="/no-results.svg"
              alt="No Results"
              className={classes.noResultsImage}
            />
            <Typography variant="h6" className={classes.noResultsMessage}>
              Oops! No matches found.
            </Typography>
            <Typography variant="body2" className={classes.noResultsSubtext}>
              Try refining your pitch or adjusting keywords for better matches.
            </Typography>
          </Box>
        ) : (
          <>
            {isMobile && (
              <Box sx={{ minWidth: "120px" }}>
                <Button
                  variant="outlined"
                  endIcon={<ExpandMore />}
                  onClick={handleMenuOpen}
                  sx={{
                    minWidth: "120px",
                    fontSize: "0.9rem",
                    margin: "0",
                    padding: "0,5",
                    marginBottom: "10px",
                  }}
                >
                  Select
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{ sx: { padding: 0 } }}
                  sx={{ minWidth: "120px" }}
                >
                  <MenuItem
                    onClick={handleSelectAll}
                    dense
                    sx={{
                      fontSize: "0.9rem",
                      paddingY: "0px",
                      margin: "0",
                      minWidth: "120px",
                    }}
                  >
                    {selectAll ? "Deselect All" : "Select All"}
                  </MenuItem>
                </Menu>
              </Box>
            )}

            {isMobile ? (
              // Mobile: Show stacked cards
              <Box className={classes.mobileList}>
                {currentOutlets.map((outlet, index) => (
                  <Paper key={index} className={classes.mobileCard}>
                    <>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          className={classes.name}
                          onClick={() => handleOpenModal(outlet.outlet.name)}
                          style={{ cursor: "pointer", color: "#1976d2" }}
                        >
                          {outlet.outlet.name}
                        </Typography>
                        <Checkbox
                          size="small"
                          checked={selectedOutlets.includes(outlet.outlet.name)}
                          onChange={() =>
                            handleCheckboxChange(outlet.outlet.name)
                          }
                        />
                      </Box>
                      <Typography className={classes.guide}>
                        Contact: {outlet.outlet.contact_email}
                      </Typography>
                      <a
                        href={outlet.outlet.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) =>
                          handlePitchLinkClick(
                            {
                              name: outlet.outlet.name,
                              url: outlet.outlet.url,
                              pitchId: outlet.pitch_id,
                            },
                            e
                          )
                        }
                        style={{
                          display: "block",
                          textAlign: "center",
                          marginTop: "8px",
                          color: theme.palette.primary.main,
                          textDecoration: "underline",
                        }}
                      >
                        <span>View Pitch Link</span>
                      </a>
                      {(planType === "team" || planType === "enterprise") && (
                        <>
                          <Typography className={classes.score}>
                            {outlet.match_confidence || outlet.match_percentage}{" "}
                            Match
                            <Tooltip
                              title={
                                <Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, mb: 1 }}
                                  >
                                    Why This Match?
                                  </Typography>
                                  <Typography variant="body2">
                                    {outlet.match_explanation ||
                                      "No match explanation available"}
                                  </Typography>
                                </Box>
                              }
                              arrow
                              classes={{
                                tooltip: classes.matchExplanationTooltip,
                              }}
                            >
                              <HelpOutline
                                className={classes.matchExplanationIcon}
                              />
                            </Tooltip>
                          </Typography>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            {(() => {
                              const aiStatus = getAIPartnershipStatus(outlet.outlet?.ai_partnered);
                              return (
                                <Tooltip
                                  title={
                                    <Box>
                                      <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600, mb: 1 }}
                                      >
                                        {aiStatus.status}
                                      </Typography>
                                      <Typography variant="body2">
                                        {aiStatus.status === "Yes"
                                          ? "This outlet has a confirmed partnership with an AI platform like OpenAI. Publishing here may increase your story's visibility in AI-generated search results, summaries, and tools like ChatGPT or Perplexity."
                                          : aiStatus.status === "No"
                                          ? "This outlet has confirmed they do not have an AI partnership. Status may change over time as more media organizations sign licensing agreements with AI platforms."
                                          : "Status unconfirmed per trackers. This outlet's AI partnership status is unclear based on current tracking data."}
                                      </Typography>
                                    </Box>
                                  }
                                  arrow
                                  classes={{
                                    tooltip: classes.matchExplanationTooltip,
                                  }}
                                >
                                  <span style={{ color: aiStatus.color, fontWeight: aiStatus.fontWeight }}>
                                    {aiStatus.display}
                                  </span>
                                </Tooltip>
                              );
                            })()}
                          </Box>
                        </>
                      )}
                    </>
                  </Paper>
                ))}
              </Box>
            ) : (
              // Desktop: Show table
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Select</TableCell>
                      <TableCell>
                        <strong>Outlet</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Contact Email/Online Form</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Pitch Link</strong>
                      </TableCell>
                      {(planType === "team" || planType === "enterprise") && (
                        <>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <strong>Match Confidence</strong>
                              <Tooltip
                                title={
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 600, mb: 1 }}
                                    >
                                      What does Match Confidence mean?
                                    </Typography>
                                    <Typography variant="body2">
                                      This score shows how closely your pitch
                                      aligns with a publication's audience,
                                      tone, and past contributed content. Higher
                                      = stronger fit.
                                    </Typography>
                                  </Box>
                                }
                                arrow
                                classes={{
                                  tooltip: classes.matchExplanationTooltip,
                                }}
                              >
                                <Info
                                  sx={{
                                    fontSize: "1.1rem",
                                    color: theme.palette.primary.main,
                                    ml: 0.5,
                                    cursor: "pointer",
                                  }}
                                />
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <strong>AI Partnered</strong>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentOutlets.map((outlet, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox
                            checked={selectedOutlets.includes(
                              outlet.outlet.name
                            )}
                            onChange={() =>
                              handleCheckboxChange(outlet.outlet.name)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            className={classes.tableOutletName}
                            onClick={() => handleOpenModal(outlet.outlet.name)}
                          >
                            {outlet.outlet.name}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.contactCell}>
                          {outlet.outlet.contact_email}
                        </TableCell>
                        <TableCell className={classes.pitchLinkCell}>
                          <a
                            href={outlet.outlet.url}
                            onClick={(e) =>
                              handlePitchLinkClick(
                                {
                                  name: outlet.outlet.name,
                                  url: outlet.outlet.url,
                                  pitchId: outlet.pitch_id,
                                },
                                e
                              )
                            }
                            style={{ color: theme.palette.primary.main }}
                          >
                            View Pitch Link
                          </a>
                        </TableCell>
                        {(planType === "team" || planType === "enterprise") && (
                          <>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                {outlet.match_confidence ||
                                  outlet.match_percentage}{" "}
                                Match
                                <Tooltip
                                  title={
                                    <Typography variant="body2">
                                      {outlet.match_explanation ||
                                        "No match explanation available"}
                                    </Typography>
                                  }
                                  arrow
                                  classes={{
                                    tooltip: classes.matchExplanationTooltip,
                                  }}
                                >
                                  <HelpOutline
                                    className={classes.matchExplanationIcon}
                                  />
                                </Tooltip>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center" gap={0.5}>
                                {(() => {
                                  const aiStatus = getAIPartnershipStatus(outlet.outlet?.ai_partnered);
                                  return (
                                    <Tooltip
                                      title={
                                        <Box>
                                          <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 600, mb: 1 }}
                                          >
                                            {aiStatus.status}
                                          </Typography>
                                          <Typography variant="body2">
                                            {aiStatus.status === "Yes"
                                              ? "This outlet has a confirmed partnership with an AI platform like OpenAI. Publishing here may increase your story's visibility in AI-generated search results, summaries, and tools like ChatGPT or Perplexity."
                                              : aiStatus.status === "No"
                                              ? "This outlet has confirmed they do not have an AI partnership. Status may change over time as more media organizations sign licensing agreements with AI platforms."
                                              : "Status unconfirmed per trackers. This outlet's AI partnership status is unclear based on current tracking data."}
                                          </Typography>
                                        </Box>
                                      }
                                      arrow
                                      classes={{
                                        tooltip: classes.matchExplanationTooltip,
                                      }}
                                    >
                                      <span style={{ color: aiStatus.color, fontWeight: aiStatus.fontWeight }}>
                                        {aiStatus.display}
                                      </span>
                                    </Tooltip>
                                  );
                                })()}
                              </Box>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

        <Box className={classes.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
            boundaryCount={isMobile ? 1 : 2}
            siblingCount={isMobile ? 1 : 1}
            sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }}
          />
        </Box>

        <Box className={classes.actionButtons}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveOutlets}
            disabled={selectedOutlets.length === 0}
          >
            Save to Dashboard
          </Button>
        </Box>

        <Box className={classes.actionButtons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.exportcsvButton}
            onClick={handlePitchAgain}
          >
            Pitch Again
          </Button>

          <Button
            variant="text"
            color="secondary"
            className={classes.backHomeButton}
            onClick={handleGoToDashboard}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>

      <OutletDetailModal
        open={modalOpen}
        handleClose={handleCloseModal}
        outlet={selectedOutlet}
      />

      <ConfirmationModal
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmSave}
        title="Confirm Save"
        description="Are you sure you want to save the selected outlets to your dashboard?"
        confirmText="Confirm"
        cancelText="Cancel"
      />

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Outlets saved to Dashboard!
        </Alert>
      </Snackbar>

      <SubmissionDialog
        open={submissionDialogOpen}
        onClose={() => setSubmissionDialogOpen(false)}
        onConfirm={handleSubmissionConfirm}
      />
    </>
  );
};

export default Results;
