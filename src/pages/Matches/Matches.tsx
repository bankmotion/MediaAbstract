import React, { useState } from "react";
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
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Send as SendIcon,
  MoreVert,
  HelpOutline,
  Info,
  ExpandMore,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { updatePitchStatus } from "../../redux/slices/pitchSlice";

import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "../../redux/slices/outletsSlice";

import useStyles from "./styles";
import OutletDetailModal from "../../components/OutletDetailModal/OutletDetailModal";
import SubmissionDialog from "../../components/SubmissionDialog/SubmissionDialog";

interface Match {
  name: string;
  email: string;
  url: string;
  ai_partnered: string;
  match_percentage: number;
  match_explanation: string;
}

const Matches: React.FC = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const allOutlets = useSelector(
    (state: RootState) => state.allOutlets.outlets
  );
  // Get pitch data from location state
  const { pitchTitle, matches, pitchId } = location.state || {};

  const [selectedOutlets, setSelectedOutlets] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [selectedSubmissionOutlet, setSelectedSubmissionOutlet] = useState<{
    name: string;
    url: string;
    pitchId: string;
  } | null>(null);

  const outletsPerPage = isMobile ? 3 : 5;
  const indexOfLastOutlet = currentPage * outletsPerPage;
  const indexOfFirstOutlet = indexOfLastOutlet - outletsPerPage;

  const filteredMatches =
    matches?.filter((match: Match) =>
      match.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const currentOutlets = filteredMatches.slice(
    indexOfFirstOutlet,
    indexOfLastOutlet
  );
  //   console.log("currentOutlets:", currentOutlets);
  const totalPages = Math.ceil(filteredMatches.length / outletsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSelectOutlet = (outletName: string) => {
    setSelectedOutlets((prev) =>
      prev.includes(outletName)
        ? prev.filter((name) => name !== outletName)
        : [...prev, outletName]
    );
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
      setSelectedOutlets(filteredMatches.map((match: Match) => match.name));
    }
    setSelectAll(!selectAll);
    handleMenuClose();
  };

  const handleCloseSubmissionDialog = () => {
    setSubmissionDialogOpen(false);
  };

  const handleOpenModal = (outletName: string) => {
    const outlet = allOutlets.find((p) => p.name === outletName);

    if (outlet) {
      setSelectedOutlet(outlet);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedOutlet(null);
    setModalOpen(false);
  };

  const handlePitchLinkClick = (
    outlet: { name: string; url: string; pitchId: string },
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    setSelectedSubmissionOutlet(outlet);
    setSubmissionDialogOpen(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessMessage(false);
  };
  const handleSubmissionConfirm = async () => {
    if (selectedSubmissionOutlet) {
      // Open the submission URL
      window.open(selectedSubmissionOutlet.url);

      try {
        // Update the pitch status to "Submitted"
        await dispatch(
          updatePitchStatus({
            pitchId: selectedSubmissionOutlet.pitchId,
            outletName: selectedSubmissionOutlet.name,
          })
        ).unwrap();

        // Show success message
        setShowSuccessMessage(true);

        // Add to activity log or handle success as needed
      } catch (error) {
        // Handle error - maybe show an error message
        console.error("Failed to update pitch status:", error);
      }
    }
    setSubmissionDialogOpen(false);
  };

  if (!matches || !pitchTitle) {
    return (
      <Box className={classes.root}>
        <Typography variant="h5">No matches found</Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h4" className={classes.title}>
          Matches for: {pitchTitle}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          className={classes.backButton}
          startIcon={!isMobile && <ArrowBackIcon />}
        >
          {isMobile ? <ArrowBackIcon /> : "Back"}
        </Button>
      </Box>

      <Box className={classes.searchContainer}>
        <TextField
          placeholder="Search outlets..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {isMobile ? (
        // Mobile View
        <>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              endIcon={<ExpandMore />}
              onClick={handleMenuOpen}
              sx={{
                fontSize: "0.9rem",
                padding: "4px 8px",
                height: 32,
                [theme.breakpoints.down("sm")]: {
                  minWidth: "auto",
                  height: 32,
                  width: 100,
                  "& .MuiButton-endIcon": {
                    marginLeft: 0.5,
                  },
                },
              }}
            >
              Select
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{ sx: { padding: 0 } }}
            >
              <MenuItem
                onClick={handleSelectAll}
                dense
                sx={{
                  fontSize: "0.9rem",
                  height: 32,
                  width: 100,
                }}
              >
                {selectAll ? "Deselect All" : "Select All"}
              </MenuItem>
            </Menu>
          </Box>

          <Box className={classes.mobileList}>
            {currentOutlets.map((outlet: Match, index: number) => (
              <Paper key={index} className={classes.mobileCard}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    className={classes.name}
                    onClick={() => handleOpenModal(outlet.name)}
                    style={{ cursor: "pointer", color: "#1976d2" }}
                  >
                    {outlet.name}
                  </Typography>
                  <Checkbox
                    size="small"
                    checked={selectedOutlets.includes(outlet.name)}
                    onChange={() => handleSelectOutlet(outlet.name)}
                  />
                </Box>
                {outlet.ai_partnered === "Yes" ? (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <span className={classes.tooltip}>✓ AI Partnered</span>
                    <Tooltip
                      title="AI Partnered: May boost visibility in AI search results. 'Unknown' means unclear."
                      arrow
                      classes={{ tooltip: classes.matchExplanationTooltip }}
                    >
                      <Info className={classes.matchExplanationIcon} />
                    </Tooltip>
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <span className={classes.tooltip} style={{ color: "#666" }}>
                      Unknown
                    </span>
                    <Tooltip
                      title="AI Partnered: May boost visibility in AI search results. 'Unknown' means unclear."
                      arrow
                      classes={{ tooltip: classes.matchExplanationTooltip }}
                    >
                      <Info className={classes.matchExplanationIcon} />
                    </Tooltip>
                  </Box>
                )}
                <Typography className={classes.guide}>
                  Contact: {outlet.email}
                </Typography>
                <Typography className={classes.score}>
                  {outlet.match_percentage} Match
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
                    classes={{ tooltip: classes.matchExplanationTooltip }}
                  >
                    <HelpOutline className={classes.matchExplanationIcon} />
                  </Tooltip>
                </Typography>
                <a
                  href={outlet.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) =>
                    handlePitchLinkClick(
                      {
                        name: outlet.name,
                        url: outlet.url,
                        pitchId: pitchId,
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
                  <Tooltip
                    title="View submission guidelines for this outlet"
                    arrow
                  >
                    <span>View Pitch Link</span>
                  </Tooltip>
                </a>
              </Paper>
            ))}
          </Box>
        </>
      ) : (
        // Desktop View
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1">Select</Typography>
                    <IconButton onClick={handleMenuOpen}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleSelectAll}>
                        {selectAll ? "Deselect All" : "Select All"}
                      </MenuItem>
                    </Menu>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <strong>Outlet</strong>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <strong>Contact Email</strong>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <strong>Pitch Link</strong>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <strong>Match Confidence</strong>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <strong>AI Partnered</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOutlets.map((outlet: Match, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOutlets.includes(outlet.name)}
                      onChange={() => handleSelectOutlet(outlet.name)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      className={classes.tableOutletName}
                      onClick={() => handleOpenModal(outlet.name)}
                    >
                      {outlet.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{outlet.email}</TableCell>
                  <TableCell>
                    <Tooltip
                      title="View submission guidelines for this outlet"
                      arrow
                    >
                      <a
                        href={outlet.url}
                        onClick={(e) =>
                          handlePitchLinkClick(
                            {
                              name: outlet.name,
                              url: outlet.url,
                              pitchId: pitchId,
                            },
                            e
                          )
                        }
                        style={{ color: theme.palette.primary.main }}
                      >
                        View Pitch Link
                      </a>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {outlet.match_percentage} Match
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
                        classes={{ tooltip: classes.matchExplanationTooltip }}
                      >
                        <HelpOutline className={classes.matchExplanationIcon} />
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {outlet.ai_partnered === "Yes" ? (
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <span className={classes.tooltip}>✓ AI Partnered</span>
                        <Tooltip
                          title="AI Partnered: May boost visibility in AI search results. 'Unknown' means unclear."
                          arrow
                          classes={{ tooltip: classes.matchExplanationTooltip }}
                        >
                          <Info className={classes.matchExplanationIcon} />
                        </Tooltip>
                      </Box>
                    ) : (
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <span
                          className={classes.tooltip}
                          style={{ color: "#666" }}
                        >
                          Unknown
                        </span>
                        <Tooltip
                          title="AI Partnered: May boost visibility in AI search results. 'Unknown' means unclear."
                          arrow
                          classes={{ tooltip: classes.matchExplanationTooltip }}
                        >
                          <Info className={classes.matchExplanationIcon} />
                        </Tooltip>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {totalPages > 1 && (
        <Box className={classes.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            boundaryCount={isMobile ? 1 : 2}
            siblingCount={isMobile ? 1 : 1}
            sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }}
          />
        </Box>
      )}

      <OutletDetailModal
        open={modalOpen}
        handleClose={handleCloseModal}
        outlet={selectedOutlet}
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
          Submitted!
        </Alert>
      </Snackbar>

      <SubmissionDialog
        open={submissionDialogOpen}
        onClose={handleCloseSubmissionDialog}
        onConfirm={handleSubmissionConfirm}
      />
    </Box>
  );
};

export default Matches;
