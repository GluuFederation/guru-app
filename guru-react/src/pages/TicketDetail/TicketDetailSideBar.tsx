import React, { Component } from "react";
import axios from "axios";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import { colors } from "../../theme";
import { Ticket, TicketProduct } from "../../state/types/tickets";
import { withUser, WithUserProps } from "../../state/hocs/profiles";
import {
  withTicketDetail,
  WithTicketDetailProps
} from "../../state/hocs/tickets";
import TicketDetailSideBarItem, {
  MenuType
} from "../../components/TicketDetail/TicketDetailSideBarItem";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: "3em"
    },
    notificationArea: {
      backgroundColor: colors.TERTIARY_BACKGROUND
    },
    subscribeButton: {
      backgroundColor: colors.LIGHT_BUTTON,
      border: `1px solid ${colors.LIGHT_BORDER}`
    },
    subscriberAvatar: {
      display: "inline-block"
    }
  });

interface ExternalProps {
  ticket: Ticket;
}

type Props = ExternalProps &
  WithUserProps &
  WithTicketDetailProps &
  WithStyles<typeof styles>;

interface State {
  isOsModalOpen: boolean;
  isProductModalOpen: boolean;
  currentProduct: TicketProduct | null;
}

class TicketSideBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOsModalOpen: false,
      isProductModalOpen: false,
      currentProduct: null
    };
  }

  isSubscribed = () => {
    const subscribers = this.props.ticket.subscribers;
    const user = this.props.user;
    if (!user) return false;
    return (
      subscribers.findIndex(subscriber => subscriber.id === user.id) !== -1
    );
  };

  toggleSubscription = () => {
    const subbed = this.isSubscribed();
    this.props.changeTicketSubscription(this.props.ticket.slug, !subbed);
  };

  render() {
    const { ticket, classes } = this.props;
    const { subscribers } = ticket;
    const subbed = this.isSubscribed();

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          {Object.values(MenuType).map(key => (
            <TicketDetailSideBarItem key={key} menuType={key} ticket={ticket} />
          ))}
          <Grid item>
            <Card classes={{ root: classes.notificationArea }} elevation={0}>
              <CardContent>
                <Typography variant="h6">Notifications</Typography> <br />
                <div>
                  <Button
                    classes={{ root: classes.subscribeButton }}
                    fullWidth
                    onClick={this.toggleSubscription}
                  >
                    {subbed ? "Unsubscribe" : "Subscribe"}
                  </Button>
                </div>{" "}
                <br />
                {subbed
                  ? "You are receiving notifications on this ticket because you are watching it"
                  : "Receive notifications on this ticket by hitting subscribe"}
                <br />
                <Typography variant="h6">
                  <small>
                    {subscribers.length} subscriber
                    {subscribers.length === 1 ? "" : "s"}
                  </small>
                </Typography>{" "}
                <br />
                <div>
                  {subscribers.map(subscriber => (
                    <Avatar
                      key={subscriber.id}
                      src={subscriber.avatar}
                      classes={{ root: classes.subscriberAvatar }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTicketDetail(withUser(withStyles(styles)(TicketSideBar)));
