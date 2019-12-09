import React, { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import { colors } from "../../../theme";
import { Ticket } from "../../../state/types/tickets";
import { User } from "../../../state/types/profiles";
import { changeTicketSubscription } from "../../../state/actions/tickets";
import TicketDetailSideBarItem, {
  MenuType
} from "../../../components/TicketDetail/TicketDetailSideBarItem";
import { useTicketPermissions } from "../hooks";

const useStyles = makeStyles({
  root: {
    paddingLeft: "0em"
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

interface Props {
  ticket: Ticket;
  user: User | null;
}

const TicketSideBar: FunctionComponent<Props> = ({ ticket, user }) => {
  const isSubscribed =
    user &&
    ticket.subscribers.findIndex(subscriber => subscriber.id === user.id) !==
      -1;
  const dispatch = useDispatch();
  const { subscribers } = ticket;
  const classes = useStyles();

  const toggleSubscription = () => {
    changeTicketSubscription(ticket.slug, !isSubscribed)(dispatch);
  };

  let menuTypes = Object.values(MenuType);
  const { isCommunity, isStaff, canEdit } = useTicketPermissions(ticket);

  if (isCommunity) {
    menuTypes = menuTypes.filter(
      type => !["creator", "assignee", "issueType"].includes(type)
    );
  } else if (!isStaff) {
    menuTypes = menuTypes.filter(
      type => !["creator", "assignee"].includes(type)
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {menuTypes
          .filter(menuType => menuType !== MenuType.CompanyAssociation)
          .map(key => (
            <TicketDetailSideBarItem
              key={key}
              menuType={key}
              ticket={ticket}
              canEdit={canEdit}
            />
          ))}
        <Grid item xs={12}>
          <Card classes={{ root: classes.notificationArea }} elevation={0}>
            <CardContent>
              <Typography variant="h6">Notifications</Typography> <br />
              {user ? (
                <React.Fragment>
                  <div>
                    <Button
                      classes={{ root: classes.subscribeButton }}
                      fullWidth
                      onClick={toggleSubscription}
                    >
                      {isSubscribed ? "Unsubscribe" : "Subscribe"}
                    </Button>
                  </div>{" "}
                  <br />
                  {isSubscribed
                    ? "You are receiving notifications on this ticket because you are watching it"
                    : "Receive notifications on this ticket by hitting subscribe"}
                  <br />
                </React.Fragment>
              ) : null}
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
};

export default TicketSideBar;
