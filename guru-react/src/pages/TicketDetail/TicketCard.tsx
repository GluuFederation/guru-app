import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import moment from "moment-timezone";
import ReactMarkdown from "react-markdown";
import { connect } from 'react-redux';
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { paths } from "../../routes";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteConfirmation from "../../components/TicketDetail/DeleteConfirmation";
import { Ticket } from "../../state/types/tickets";
import {
  withTicketDetail,
  WithTicketDetailProps
} from "../../state/hocs/tickets";
import Modal from "@material-ui/core/Modal";
import { withUser, WithUserProps } from "../../state/hocs/profiles";

const styles = (theme: Theme) =>
  createStyles({
    card: {}
  });

interface ExternalProps {
  slug: string;
  ticket: Ticket;
}

type Props = WithUserProps &
  WithTicketDetailProps &
  ExternalProps &
  WithStyles<typeof styles> &
  RouteComponentProps;

interface State {
  ticketMenuElement: HTMLElement | null;
  isModalOpen : boolean
}

class TicketDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      ticketMenuElement: null,
      isModalOpen: false
    };
  }

  closeTicketMenu = () => {
    this.setState({ ticketMenuElement: null });
  };

  openTicketMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ ticketMenuElement: event.currentTarget });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
    this.closeTicketMenu();
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
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
  copyLink = () => {
    const url = `${window.location.protocol}//${
      window.location.hostname
    }/tickets/${this.props.slug}`;
    navigator.clipboard.writeText(url);
    this.closeTicketMenu();
  };
  navigateTo = (path: string) => () => {
    this.props.history.push(path);
  };
  render() {
    const { classes, ticket, slug } = this.props;
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
          <MenuItem onClick={this.copyLink}>Copy Link</MenuItem>
          <MenuItem onClick={this.navigateTo(paths.getCreateTicketPath(NaN))} >Open new ticket</MenuItem>
          <MenuItem onClick={this.openModal}>Delete</MenuItem>
        </Menu>

        <CardContent>
          <ReactMarkdown source={ticket.body} />
          <Modal
            aria-labelledby="delete-confirmation-modal"
            open={this.state.isModalOpen}
            onClose={this.closeModal}
          >
            <div className="modal-super-container">
              <div className="modal-container">
                <DeleteConfirmation
                  closeModal={this.closeModal}
                  slug={slug}
                />
              </div>
            </div>
          </Modal>
        </CardContent>
      </Card>
    );
  }
}

export default withTicketDetail(
  withUser(withRouter(connect()(withStyles(styles)(TicketDetail))))
);
