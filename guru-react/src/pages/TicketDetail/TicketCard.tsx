import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import moment from "moment-timezone";
import ReactMarkdown from "react-markdown";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { Ticket } from "../../state/types/tickets";
import {
  withTicketDetail,
  WithTicketDetailProps
} from "../../state/hocs/tickets";
import { withUser, WithUserProps } from "../../state/hocs/profiles";

const styles = (theme: Theme) =>
  createStyles({
    card: {}
  });

interface ExternalProps {
  ticket: Ticket;
}

type Props = WithUserProps &
  WithTicketDetailProps &
  ExternalProps &
  WithStyles<typeof styles> &
  RouteComponentProps;

interface State {
  ticketMenuElement: HTMLElement | null;
}

class TicketDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      ticketMenuElement: null
    };
  }

  closeTicketMenu = () => {
    this.setState({ ticketMenuElement: null });
  };

  openTicketMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ ticketMenuElement: event.currentTarget });
  };

  isVoted = () => {
    const { ticket, user } = this.props;
    if (ticket && user) {
      return ticket.voters.findIndex(voter => voter.id === user.id) >= 0;
    }
    return false;
  };

  toggleVote = () => {
    const { ticket, changeTicketVote } = this.props;
    if (ticket) {
      changeTicketVote(ticket.slug, !this.isVoted());
    }
  };

  render() {
    const { classes, ticket } = this.props;
    const { ticketMenuElement } = this.state;

    return (
      <Card className={classes.card} elevation={0}>
        <CardHeader
          action={
            <div>
              <IconButton onClick={this.toggleVote}>
                <ThumbUpAlt />
              </IconButton>
              <span>Upvotes | </span>
              <span>{ticket.voters.length} </span>
              <IconButton onClick={this.openTicketMenu}>
                <MoreHoriz />
              </IconButton>
            </div>
          }
          subheader={`${moment(ticket.createdOn).format("ll")} at ${moment(
            ticket.createdOn
          ).format("LT")} GMT`}
        />
        <Menu
          id="ticket-menu"
          anchorEl={ticketMenuElement}
          keepMounted
          open={Boolean(ticketMenuElement)}
          onClose={this.closeTicketMenu}
        >
          <MenuItem>Copy Link</MenuItem>
          <MenuItem>Open new ticket</MenuItem>
          <MenuItem>Delete</MenuItem>
        </Menu>

        <CardContent>
          <ReactMarkdown source={ticket.body} />
        </CardContent>
      </Card>
    );
  }
}

export default withTicketDetail(
  withUser(withRouter(withStyles(styles)(TicketDetail)))
);
