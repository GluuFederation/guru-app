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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "5em"
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

class CreateTicket extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  setIssueType = (issueTypeId: number) => () => {
    const { setCreateTicketIssueType, info } = this.props;
    const issueType = info.issueTypes.find(item => item.id === issueTypeId);
    if (issueType) {
      setCreateTicketIssueType(issueTypeId);
    }
  };

  render() {
    const { classes, newTicket, info } = this.props;
    const issueType = info.issueTypes.find(
      item => item.id === newTicket.issueType
    );

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={10}>
            <p>What type of ticket are you opening?</p>
          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container spacing={2}>
              {info.issueTypes.map(item => (
                <Grid item md={4} key={item.id}>
                  <Card onClick={this.setIssueType(item.id)}>
                    <CardContent>{item.name}</CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  withInfo(withCreateTicket(withUser(withStyles(styles)(CreateTicket))))
);
