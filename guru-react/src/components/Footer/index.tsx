import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { colors } from "../../theme";

import { paths } from "../../routes";
import NavLink from "../NavLink";
import Logo from "../../assets/images/logo.png";
import { ReactComponent as GithubLogo } from "../../assets/images/github-logo.svg";
import { ReactComponent as YoutubeLogo } from "../../assets/images/youtube-logo.svg";
import { ReactComponent as SlideshareLogo } from "../../assets/images/slideshare-logo.svg";
import { ReactComponent as TwitterLogo } from "../../assets/images/twitter-logo.svg";
import { ReactComponent as LinkedinLogo } from "../../assets/images/linkedin-logo.svg";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexGrow: 1,
    backgroundColor: colors.MAIN_BACKGROUND,
    padding: "2em",
    borderTop: `1px solid ${colors.VERY_LIGHT_TEXT}`
  },
  socialIcons: {
    height: "1em",
    marginBottom: "-.1em",
    display: "inline",
    width: "auto",
    "&:hover g": {
      fill: theme.palette.primary.main
    }
  }
}));

interface Props {
  confirmNavigation?: boolean;
}

const Footer: FunctionComponent<Props> = ({ confirmNavigation }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.root} app-container`}>
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Gluu
            </Typography>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Our story
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Team
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Events
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Press releases
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Contact us
            </NavLink>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Open a ticket
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Knowledge base
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Read the docs
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Schedule a call
            </NavLink>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Our Products
            </Typography>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Gluu Server
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Super Gluu
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              oxd
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Cluster Manager
            </NavLink>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Features
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Marketplace
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Pricing
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              EDU
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Blog
            </NavLink>
            <NavLink
              confirmNavigation={confirmNavigation}
              to={paths.HOMEPAGE}
              isFooter
            >
              Roadmap
            </NavLink>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <div>
        <Grid container spacing={4} justify="center">
          <Grid item md={5}>
            <p>
              &copy; 2009-2018 Gluu, Inc.
              <NavLink
                confirmNavigation={confirmNavigation}
                to={paths.HOMEPAGE}
              >
                Terms
              </NavLink>
              |
              <NavLink
                confirmNavigation={confirmNavigation}
                to={paths.HOMEPAGE}
              >
                Privacy Policy
              </NavLink>
            </p>
          </Grid>
          <Grid item md={3}>
            <img
              src={Logo}
              style={{
                height: "2em",
                marginTop: "0.5em",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              alt=""
            />
          </Grid>
          <Grid item md={4}>
            <p style={{ textAlign: "right" }}>
              Follow Us
              <NavLink
                confirmNavigation={confirmNavigation}
                to={paths.HOMEPAGE}
              >
                <GithubLogo className={classes.socialIcons} />
              </NavLink>
              <NavLink
                confirmNavigation={confirmNavigation}
                to={paths.HOMEPAGE}
              >
                <TwitterLogo className={classes.socialIcons} />
              </NavLink>
              <NavLink
                confirmNavigation={confirmNavigation}
                to={paths.HOMEPAGE}
              >
                <YoutubeLogo className={classes.socialIcons} />
              </NavLink>
              <NavLink
                confirmNavigation={confirmNavigation}
                to={paths.HOMEPAGE}
              >
                <LinkedinLogo className={classes.socialIcons} />
              </NavLink>
              <NavLink
                confirmNavigation={confirmNavigation}
                to={paths.HOMEPAGE}
              >
                <SlideshareLogo className={classes.socialIcons} />
              </NavLink>
            </p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
