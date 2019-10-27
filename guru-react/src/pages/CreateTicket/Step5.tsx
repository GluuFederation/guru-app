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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "5em"
    },
    isSelected: {
      color: colors.MAIN_BACKGROUND,
      backgroundColor: colors.MAIN_COLOR
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

  setVersion = (gluuServer: string) => () => {
    const { setCreateTicketGluuServer } = this.props;
    if (gluuServer) {
      setCreateTicketGluuServer(gluuServer);
    }
  };

  render() {
    const { classes, newTicket, info } = this.props;
    const gluuServerProduct = info.products.find(item => item.id === 1);
    if (!gluuServerProduct) return <div>Skip</div>;
    const gluuServer = newTicket.gluuServer;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={10}>
            <p>What version of Gluu Server do you use?</p>
          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container spacing={2}>
              {gluuServerProduct.version.map(item => {
                return (
                  <Grid item md={4} key={item}>
                    <Card
                      onClick={this.setVersion(item)}
                      classes={{
                        root: gluuServer === item ? classes.isSelected : ""
                      }}
                    >
                      <CardContent>{item}</CardContent>
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
