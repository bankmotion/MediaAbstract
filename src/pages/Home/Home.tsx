import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Fab,
  Zoom,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  BusinessCenter,
  PersonAdd,
  Description,
  Verified,
  Login,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import useStyles from "./styles";
import AboutModal from "../../components/AboutModal/AboutModal";
import Cookies from "js-cookie";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { supabase } from "../../utils/supabase";

const Home = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tab, setTab] = React.useState(0);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showScrollToSaved, setShowScrollToSaved] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };

    checkSession();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = async () => {
    if (user) {
      // Fetch user's plan type from Supabase
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("plan_type")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        if (profile.plan_type === "writer") {
          navigate("/writers/dashboard");
        } else if (
          ["basic", "team", "enterprise"].includes(profile.plan_type)
        ) {
          navigate("/agencies/dashboard");
        } else {
          // Fallback to writers dashboard if plan type is unknown
          navigate("/writers/dashboard");
        }
      } else {
        // Fallback to writers dashboard if no profile found
        navigate("/writers/dashboard");
      }
    } else {
      navigate("/login");
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleGetStarted = () => {
    if (tab === 1) {
      navigate("/writerintro");
    } else {
      navigate("/agenciesintro");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSavedOutlets = () => {
    const element = document.getElementById("saved-outlets");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }

    const savedOutletsElement = document.getElementById("saved-outlets");
    if (savedOutletsElement) {
      const rect = savedOutletsElement.getBoundingClientRect();
      setShowScrollToSaved(rect.top < 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Only show about modal if cookie is not set
    if (!Cookies.get("aboutModalShown")) {
      setShowAboutModal(true);
    }
  }, []);

  return (
    <Box className={classes.wrapper} sx={{ pt: isMobile ? "56px" : "64px" }}>
      <AboutModal
        open={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        className={classes.appbar}
      >
        <Toolbar
          className={classes.toolbar}
          sx={{
            minHeight: isMobile ? "56px" : "64px",
            height: isMobile ? "56px" : "64px",
          }}
        >
          <Button
            onClick={handleLogoClick}
            className={classes.logoButton}
            disableRipple
          >
            <Typography
              variant="h6"
              style={{ fontWeight: 600 }}
              className={classes.logoText}
            >
              WriteFor.co
            </Typography>
          </Button>

          <>
            <Button
              startIcon={<Login />}
              color="primary"
              variant="outlined"
              onClick={handleLoginClick}
              sx={{ fontWeight: 500 }}
              className={classes.loginButton}
            >
              {user ? "Dashboard" : "Login"}
            </Button>
          </>
        </Toolbar>
      </AppBar>
      <Box className={classes.heroSection}>
        <Typography variant="h4" className={classes.title}>
          {/* Pitch Your Content with WriteFor.co to Top Outlets */}
          Get Your Ideas in Front of the Right Outlets
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {/* <p>Get Your Ideas in Front of the Right Outlets</p> */}
          <p>Match your bylines, op-eds, and articles with vetted publications—fast and smart.</p>
        </Typography>
        <Tabs
          className={classes.tabRoot}
          value={tab}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            icon={<BusinessCenter className={classes.tabIcon} />}
            iconPosition="start"
            label="Brands, Content Teams, and Agencies"
            className={classes.tabLabel}
          />
          <Tab
            icon={<Lightbulb className={classes.tabIcon} />}
            iconPosition="start"
            label="Writers"
            className={classes.tabLabel}
          />
        </Tabs>

        <Button
          variant="contained"
          color="primary"
          className={classes.startButton}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Pitch Smarter with WriteFor.co
        </Typography>
      </Box>

      <Box className={classes.howItWorksSection}>
        <Typography variant="h5" className={classes.howItWorksHeader}>
          How It Works
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card className={classes.howCard}>
              <CardContent className={classes.howCardContent}>
                <PersonAdd className={classes.howIcon} />
                <Typography variant="h6" className={classes.howTitle}>
                  1. Sign Up
                </Typography>
                <Typography className={classes.howText}>
                  Create an account in seconds and select your role.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className={classes.howCard}>
              <CardContent className={classes.howCardContent}>
                <Description className={classes.howIcon} />
                <Typography variant="h6" className={classes.howTitle}>
                  2. Create a Pitch
                </Typography>
                <Typography className={classes.howText}>
                  Enter your pitch concept and preferences in our smart form.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className={classes.howCard}>
              <CardContent className={classes.howCardContent}>
                <Verified className={classes.howIcon} />
                <Typography variant="h6" className={classes.howTitle}>
                  3. Get Matched
                </Typography>
                <Typography className={classes.howText}>
                  See AI-assisted matches with vetted media outlets, prioritized by fit.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {isMobile && (
        <>
          <Zoom in={showScrollButton}>
            <Fab
              color="primary"
              size="medium"
              onClick={scrollToTop}
              sx={{
                position: "fixed",
                bottom: 60,
                right: 40,
                zIndex: 1000,
              }}
            >
              <KeyboardArrowUp />
            </Fab>
          </Zoom>
          <Zoom in={showScrollToSaved}>
            <Fab
              color="secondary"
              size="medium"
              onClick={scrollToSavedOutlets}
              sx={{
                position: "fixed",
                bottom: 60,
                right: 100,
                zIndex: 1000,
              }}
            >
              <Description />
            </Fab>
          </Zoom>
        </>
      )}
    </Box>
  );
};

export default Home;
