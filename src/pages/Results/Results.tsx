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
import { MoreVert } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
// import { fetchResults } from "../../services/api";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  // saveOutlets,
  saveSelectedOutlets,
} from "../../redux/slices/savePitchSlice";

import Navbar from "../../components/Navbar/Nabvar";
import OutletDetailModal from "../../components/OutletDetailModal/OutletDetailModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

import useStyles from "./styles";

const Results = () => {
  const { classes } = useStyles();
  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const results = useSelector((state: RootState) => state.pitch.results);
  console.log("Results:", results);
  const status = useSelector((state: RootState) => state.pitch.status);
  const abstract = useSelector((state: RootState) => state.pitch.abstract);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [role, setRole] = useState("");

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedOutlets, setSelectedOutlets] = useState<string[]>([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const outletsPerPage = 5;

  // Dropdown menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Calculate Pagination
  const indexOfLastOutlet = currentPage * outletsPerPage;
  const indexOfFirstOutlet = indexOfLastOutlet - outletsPerPage;
  const currentOutlets = results.slice(indexOfFirstOutlet, indexOfLastOutlet);
  const totalPages = Math.ceil(results.length / outletsPerPage);

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

  // const handleExportCSV = () => {
  //   const headers = [
  //     "Outlet",
  //     "Contact Email",
  //     "Pitch Link",
  //     "Match Confidence",
  //   ];
  //   const rows = results.map((outlet) => [
  //     outlet.name,
  //     outlet.contact_email,
  //     outlet.url,
  //     `${outlet.match_confidence}%`,
  //   ]);

  //   const footer = [
  //     [],
  //     [
  //       `Generated by WriteFor.co—Submit your next pitch idea at https://media-abstract.vercel.app/ to get fresh matches!`,
  //     ],
  //   ];

  //   const csvContent =
  //     "data:text/csv;charset=utf-8," +
  //     [headers, ...rows, ...footer].map((e) => e.join(",")).join("\n");

  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", "matched_outlets.csv");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleCheckboxChange = (outletName: string) => {
    setSelectedOutlets((prev) =>
      prev.includes(outletName)
        ? prev.filter((name) => name !== outletName)
        : [...prev, outletName]
    );
  };

  const handleSaveOutlets = () => {
    if (selectedOutlets.length > 0) {
      setIsConfirmDialogOpen(true);
    }
  };

  const handleConfirmSave = () => {
    dispatch(
      saveSelectedOutlets({
        description: abstract,
        outlets: selectedOutlets,
      })
    );
    // navigate("/writers/dashboard");
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

  const handleGoToDashboard = () => {
    //if (role === "writers") {
    //  navigate("/writers/dashboard");
    //} else if (role === "agencies") {
    navigate("/writers/dashboard");
    //} else {
    //  navigate("/");
    //}
  };

  // useEffect(() => {
  //   if (location.state?.role) {
  //     setRole(location.state.role);
  //   }
  // }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
            {/* Mobile: Dropdown at the top */}
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
                    {outlet.outlet.ai_partnered === "Yes" && (
                      <Tooltip title="Cited by AI tools for extra reach." arrow>
                        <span className={classes.tooltip}>✓ AI Partnered</span>
                      </Tooltip>
                    )}
                    <Typography className={classes.guide}>
                      Contact: {outlet.outlet.contact_email}
                    </Typography>
                    <Typography className={classes.score}>
                      {outlet.match_confidence}% Match
                    </Typography>
                    <a
                      href={outlet.outlet.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Pitch Link
                    </a>
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
                      <TableCell>
                        {/* Desktop: Dropdown in "Select" Header */}
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
                        <strong>Contact Email (C)</strong>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <strong>Pitch Link (B)</strong>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <strong>Match Confidence</strong>
                      </TableCell>
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
                          <Box display="flex" flexDirection="column">
                            <Typography
                              style={{
                                cursor: "pointer",
                                color: "#1976d2",
                                textDecoration: "underline",
                              }}
                              className={classes.name}
                              onClick={() =>
                                handleOpenModal(outlet.outlet.name)
                              }
                            >
                              {outlet.outlet.name}
                            </Typography>
                            {outlet.outlet.ai_partnered === "Yes" && (
                              <Tooltip
                                title="Cited by AI tools for extra reach."
                                arrow
                                componentsProps={{
                                  tooltip: { className: classes.customTooltip },
                                }}
                              >
                                <span className={classes.tooltip}>
                                  {" "}
                                  ✓ AI Partnered
                                </span>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>{outlet.outlet.contact_email}</TableCell>
                        <TableCell>
                          <a
                            href={outlet.outlet.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Pitch Link
                          </a>
                        </TableCell>
                        <TableCell>{outlet.match_confidence}% Match</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

        {/* <Box className={classes.actionButtons}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.exportcsvButton}
            onClick={handleExportCSV}
          >
            Export as CSV
          </Button>
        </Box> */}

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
            onClick={() => navigate("/onboarding")}
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
    </>
  );
};

export default Results;
