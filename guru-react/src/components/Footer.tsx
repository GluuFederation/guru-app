import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { colors } from "../theme";

import { paths } from "../routes";
import NavLink from "./NavLink";

import Logo from "../assets/images/logo.png";
import { ReactComponent as GithubLogo } from "../assets/images/github-logo.svg";
import { ReactComponent as YoutubeLogo } from "../assets/images/youtube-logo.svg";
import { ReactComponent as SlideshareLogo } from "../assets/images/slideshare-logo.svg";
import { ReactComponent as TwitterLogo } from "../assets/images/twitter-logo.svg";
import { ReactComponent as LinkedinLogo } from "../assets/images/linkedin-logo.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: "absolute",
      backgroundColor: colors.MAIN_BACKGROUND,
      bottom: 0,
      left: 0,
      right: 0,
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
  });

type Props = RouteComponentProps & WithStyles<typeof styles>;

class Footer extends Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Grid container spacing={4}>
            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                About Gluu
              </Typography>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Our story
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Team
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Events
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Press releases
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Contact us
              </NavLink>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Support
              </Typography>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Open a ticket
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Knowledge base
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Read the docs
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Schedule a call
              </NavLink>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Our Products
              </Typography>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Gluu Server
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Super Gluu
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                oxd
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Cluster Manager
              </NavLink>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Features
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Marketplace
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Pricing
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                EDU
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
                Blog
              </NavLink>
              <NavLink to={paths.HOMEPAGE} isFooter>
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
                <NavLink to={paths.HOMEPAGE}>Terms</NavLink>|
                <NavLink to={paths.HOMEPAGE}>Privacy Policy</NavLink>
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
                <NavLink to={paths.HOMEPAGE}>
                  <GithubLogo className={classes.socialIcons} />
                </NavLink>
                <NavLink to={paths.HOMEPAGE}>
                  <TwitterLogo className={classes.socialIcons} />
                </NavLink>
                <NavLink to={paths.HOMEPAGE}>
                  <YoutubeLogo className={classes.socialIcons} />
                </NavLink>
                <NavLink to={paths.HOMEPAGE}>
                  <LinkedinLogo className={classes.socialIcons} />
                </NavLink>
                <NavLink to={paths.HOMEPAGE}>
                  <SlideshareLogo className={classes.socialIcons} />
                </NavLink>
              </p>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Footer));
