import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { colors } from "../../theme";

import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CategoryItem from "./CategoryItem";
import { withInfo, WithInfoProps } from "../../state/hocs/info";

import HeroImg from "../../assets/images/hero.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: colors.MAIN_BACKGROUND,
      paddingBottom: "4em",
      paddingLeft: "1em",
      paddingRight: "1em"
    },
    searchHeader: {
      backgroundImage: `url(${HeroImg})`,
      backgroundSize: "cover",
      height: "23em",
      marginBottom: "4em"
    }
  });

type Props = WithStyles<typeof styles> & RouteComponentProps & WithInfoProps;

class Home extends Component<Props> {
  componentDidMount() {
    this.props.fetchInfo();
  }
  render() {
    const { classes, info } = this.props;
    const { categories } = info;

    return (
      <Page>
        <Navbar />
        <div className={classes.root}>
          <div>
            <Grid
              container
              justify="center"
              alignItems="center"
              classes={{ container: classes.searchHeader }}
            >
              <Grid item xs={10} md={6}>
                <Typography variant="h4" align="center">
                  Search for a Ticket
                  <TextField variant="filled" margin="normal" fullWidth />
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Grid container spacing={1} justify="center">
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Select the category to find the related topic
                  </Typography>
                </Grid>
                {categories.map(category => (
                  <Grid item key={category.id} xs={6} md={3}>
                    <CategoryItem category={category} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Footer />
      </Page>
    );
  }
}

export default withInfo(withRouter(withStyles(styles)(Home)));
