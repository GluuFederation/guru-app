import React, { Component } from "react";

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
import { getCardClass } from "../../utils/chipStyles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "5em"
    },
    isSelected: {
      backgroundColor: colors.MAIN_COLOR,
      color: colors.MAIN_BACKGROUND
    },
    issueText: {
      minHeight: "2.5em",
      wordWrap: "break-word"
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
    console.log(issueType);

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={10}>
            <p>What type of ticket are you opening?</p>
          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container spacing={2}>
              {info.issueTypes.map(item => (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Card
                    onClick={this.setIssueType(item.id)}
                    classes={{
                      root: issueType
                        ? issueType.slug === item.slug
                          ? classes.isSelected
                          : getCardClass(item.slug)
                        : getCardClass(item.slug)
                    }}
                  >
                    <CardContent classes={{ root: classes.issueText }}>
                      {item.name}
                    </CardContent>
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
