import React, { Component } from "react";
import axios from "axios";

import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { colors } from "../../theme";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import {
  WithCreateTicketProps,
  withCreateTicket
} from "../../state/hocs/ticket";
import { WithInfoProps, withInfo } from "../../state/hocs/info";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { paths } from "../../routes";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "5em"
    },
    card: {
      "&:hover": {
        color: colors.MAIN_BACKGROUND,
        backgroundColor: colors.MAIN_COLOR
      }
    }
  });

type Props = WithUserProps &
  WithCreateTicketProps &
  WithInfoProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

interface State {
  isLoading: boolean;
}

class Step7 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  setHasProducts = (hasProducts: boolean) => () => {
    const {
      setCreateTicketHasProducts,
      setCreateTicketStep,
      history
    } = this.props;
    setCreateTicketHasProducts(hasProducts);
    if (hasProducts) {
      setCreateTicketStep(8);
      history.push(paths.getCreateTicketPath(8));
    } else {
      setCreateTicketStep(9);
      history.push(paths.getCreateTicketPath(9));
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={10}>
            <p>Are any other Gluu products relevant to this support ticket?</p>
          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Card
                  onClick={this.setHasProducts(false)}
                  classes={{ root: classes.card }}
                >
                  <CardContent>No</CardContent>
                </Card>
              </Grid>
              <Grid item md={6}>
                <Card
                  onClick={this.setHasProducts(true)}
                  classes={{ root: classes.card }}
                >
                  <CardContent>Yes</CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  withInfo(withCreateTicket(withUser(withStyles(styles)(Step7))))
);
