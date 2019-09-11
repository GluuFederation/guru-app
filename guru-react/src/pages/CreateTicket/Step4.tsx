import React, { Component } from "react";
import axios from "axios";

import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { colors } from "../../theme";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import {
  WithCreateTicketProps,
  withCreateTicket
} from "../../state/hocs/ticket";
import { WithInfoProps, withInfo } from "../../state/hocs/info";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getCategoryComponentFromSlug } from "../../utils/info";

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

class Step4 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  setCategory = (categoryId: number) => () => {
    const { setCreateTicketCategory, info } = this.props;
    const issueType = info.categories.find(item => item.id === categoryId);
    if (issueType) {
      setCreateTicketCategory(categoryId);
    }
  };

  render() {
    const { classes, newTicket, info } = this.props;
    const category = info.categories.find(
      item => item.id === newTicket.category
    );

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={10}>
            <p>What type of ticket are you opening?</p>
          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container spacing={2}>
              {info.categories.map(item => {
                const Icon = getCategoryComponentFromSlug(item.slug);
                return (
                  <Grid item md={4} key={item.id}>
                    <Card onClick={this.setCategory(item.id)}>
                      <CardMedia>
                        <Icon></Icon>
                      </CardMedia>
                      <CardContent>{item.name}</CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  withInfo(withCreateTicket(withUser(withStyles(styles)(Step4))))
);
