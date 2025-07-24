import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
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
  Button,
  Pagination,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Close,
  HelpOutline,
  Info,
  MoreVert,
  ExpandMore,
} from "@mui/icons-material";
import useStyles from "./styles";
import CloseIcon from "@mui/icons-material/Close";

interface Match {
  name: string;
  email: string;
  url: string;
  ai_partnered: string;
  match_percentage: number;
  match_explanation: string;
}

interface MatchesModalProps {
  open: boolean;
  handleClose: () => void;
  matches: Match[];
  pitchTitle: string;
}

const MatchesModal: React.FC<MatchesModalProps> = ({
  open,
  handleClose,
  matches,
  pitchTitle,
}) => {
  console.log("matches:", matches);
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedOutlets, setSelectedOutlets] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const outletsPerPage = 5;

  // Calculate Pagination
  const indexOfLastOutlet = currentPage * outletsPerPage;
  const indexOfFirstOutlet = indexOfLastOutlet - outletsPerPage;
  const currentOutlets = matches.slice(indexOfFirstOutlet, indexOfLastOutlet);
  const totalPages = Math.ceil(matches.length / outletsPerPage);

  const handleCheckboxChange = (outletName: string) => {
    setSelectedOutlets((prev) =>
      prev.includes(outletName)
        ? prev.filter((name) => name !== outletName)
        : [...prev, outletName]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOutlets([]);
    } else {
      setSelectedOutlets(matches.map((match) => match.name));
    }
    setSelectAll(!selectAll);
    handleMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Box className={classes.dialogTitle}>
        <Box className={classes.titleWrapper}>
          <Typography variant="h1" className={classes.title}>
            Matches for: {pitchTitle}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          className={classes.closeButton}
          aria-label="close"
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      </Box>

      <DialogContent className={classes.dialogContent}>
        {isMobile ? (
          // Mobile View
          <>
            <Box
              sx={{
                minWidth: "120px",
                mb: 2,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                endIcon={<ExpandMore />}
                onClick={handleMenuOpen}
                sx={{
                  minWidth: "120px",
                  fontSize: "0.9rem",
                  padding: "4px 8px",
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

            <Box className={classes.mobileList}>
              {currentOutlets.map((match, index) => (
                <Paper key={index} className={classes.mobileCard}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      className={classes.name}
                      style={{ cursor: "pointer", color: "#1976d2" }}
                    >
                      {match.name}
                    </Typography>
                    <Checkbox
                      size="small"
                      checked={selectedOutlets.includes(match.name)}
                      onChange={() => handleCheckboxChange(match.name)}
                    />
                  </Box>
                  {match.ai_partnered === "Yes" ? (
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <span className={classes.tooltip} style={{ color: "#1976d2", fontWeight: 600 }}>✓ AI Partnered</span>
                      <Tooltip
                        title="This outlet has a confirmed partnership with an AI platform like OpenAI. Publishing here may increase your story's visibility in AI-generated search results, summaries, and tools like ChatGPT or Perplexity."
                        arrow
                        classes={{ tooltip: classes.matchExplanationTooltip }}
                      >
                        <Info className={classes.matchExplanationIcon} />
                      </Tooltip>
                    </Box>
                  ) : match.ai_partnered === "No" ? (
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <span
                        className={classes.tooltip}
                        style={{ color: "#d32f2f", fontWeight: 600 }}
                      >
                        ✗ Not AI Partnered
                      </span>
                      <Tooltip
                        title="This outlet has confirmed they do not have an AI partnership. Status may change over time as more media organizations sign licensing agreements with AI platforms."
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
                        ? Unconfirmed
                      </span>
                      <Tooltip
                        title="Status unconfirmed per trackers. This outlet's AI partnership status is unclear based on current tracking data."
                        arrow
                        classes={{ tooltip: classes.matchExplanationTooltip }}
                      >
                        <Info className={classes.matchExplanationIcon} />
                      </Tooltip>
                    </Box>
                  )}
                  <Typography className={classes.guide}>
                    Contact: {match.email}
                  </Typography>
                  <Typography className={classes.score}>
                    {match.match_percentage}% Match
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
                            {match.match_explanation ||
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
                    href={match.url}
                    target="_blank"
                    rel="noreferrer"
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
                {currentOutlets.map((match, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOutlets.includes(match.name)}
                        onChange={() => handleCheckboxChange(match.name)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        className={classes.tableOutletName}
                      >
                        {match.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{match.email}</TableCell>
                    <TableCell>
                      <Tooltip
                        title="View submission guidelines for this outlet"
                        arrow
                      >
                        <a
                          href={match.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: theme.palette.primary.main }}
                        >
                          View Pitch Link
                        </a>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        {match.match_percentage}% Match
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
                                {match.match_explanation ||
                                  "No match explanation available"}
                              </Typography>
                            </Box>
                          }
                          arrow
                          classes={{ tooltip: classes.matchExplanationTooltip }}
                        >
                          <HelpOutline
                            className={classes.matchExplanationIcon}
                          />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {match.ai_partnered === "Yes" ? (
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <span className={classes.tooltip} style={{ color: "#1976d2", fontWeight: 600 }}>
                            ✓ AI Partnered
                          </span>
                          <Tooltip
                            title="This outlet has a confirmed partnership with an AI platform like OpenAI. Publishing here may increase your story's visibility in AI-generated search results, summaries, and tools like ChatGPT or Perplexity."
                            arrow
                            classes={{
                              tooltip: classes.matchExplanationTooltip,
                            }}
                          >
                            <Info className={classes.matchExplanationIcon} />
                          </Tooltip>
                        </Box>
                      ) : match.ai_partnered === "No" ? (
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <span
                            className={classes.tooltip}
                            style={{ color: "#d32f2f", fontWeight: 600 }}
                          >
                            ✗ Not AI Partnered
                          </span>
                          <Tooltip
                            title="This outlet has confirmed they do not have an AI partnership. Status may change over time as more media organizations sign licensing agreements with AI platforms."
                            arrow
                            classes={{
                              tooltip: classes.matchExplanationTooltip,
                            }}
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
                            ? Unconfirmed
                          </span>
                          <Tooltip
                            title="Status unconfirmed per trackers. This outlet's AI partnership status is unclear based on current tracking data."
                            arrow
                            classes={{
                              tooltip: classes.matchExplanationTooltip,
                            }}
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
      </DialogContent>
    </Dialog>
  );
};

export default MatchesModal;
