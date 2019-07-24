import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import moment from "moment";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import PersonOutline from "@material-ui/icons/PersonOutline";
import ThumbUpOutlined from "@material-ui/icons/ThumbUpOutlined";

import { colors } from "../../theme";
import { getChipClass } from "../../utils/chipStyles";
import { paths } from "../../routes";
import { Ticket } from "../../state/types/tickets";
import {
  closedStatus,
  otherCategory,
  minorIssueType
} from "../../state/preloaded/info";
import { withInfo, WithInfoProps } from "../../state/hocs/info";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "0 1em 0 1em",
      cursor: "pointer"
    },
    owner: {
      textAlign: "center",
      borderRight: `1px solid ${colors.VERY_LIGHT_TEXT}`,
      padding: "1em"
    },
    ticket: {
      padding: "1em"
    },
    ticketMeta: {
      color: colors.LIGHTER_TEXT,
      fontSize: ".7em",
      fontWeight: 300
    },
    ticketId: {
      color: colors.MAIN_COLOR
    },
    avatar: {
      height: 50,
      width: 50,
      marginBottom: "1em"
    },
    ticketActivity: {
      fontSize: ".9em"
    }
  });

interface ExternalProps {
  ticket: Ticket;
}

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithInfoProps &
  ExternalProps;

class TicketNav extends Component<Props> {
  goToTicket = () => {
    this.props.history.push(paths.getTicketDetailPath(this.props.ticket.slug));
  };
  render() {
    const { classes, ticket, info } = this.props;
    const owner = ticket.createdFor ? ticket.createdFor : ticket.createdBy;

    const tempStatus = info.statuses.find(item => item.id === ticket.status);
    const status = tempStatus ? tempStatus : closedStatus;

    const tempCategory = info.categories.find(
      item => item.id === ticket.category
    );
    const category = tempCategory ? tempCategory : otherCategory;

    const tempIssueType = info.issueTypes.find(
      item => item.id === ticket.issueType
    );
    const issueType = tempIssueType ? tempIssueType : minorIssueType;
    return (
      <div className={classes.root} onClick={this.goToTicket}>
        <Grid container alignItems="center">
          <Grid item md={3} lg={2} className={classes.owner}>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
            >
              <Grid item>
                <Avatar src={owner.avatar} className={classes.avatar} />
              </Grid>
              <Grid item>
                <div>
                  <strong>
                    {owner.firstName} {owner.otherNames} {owner.lastName}
                  </strong>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <small>{owner.companyName}</small>
                </div>
              </Grid>
              <Grid item>
                <div>{owner.role ? owner.role.name : ""}</div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} lg={8} className={classes.ticket}>
            <div>
              <Chip label={status.name} className={getChipClass(status)} />
              <Chip
                label={issueType.name}
                className={getChipClass(issueType)}
              />
              <Chip label={category.name} className={getChipClass(category)} />
            </div>
            <Typography variant="h6">{ticket.title}</Typography>
            <div>
              <span className={classes.ticketId}># {ticket.id}</span>&emsp;
              <span className={classes.ticketMeta}>
                Created: <em>{moment(ticket.createdOn).format("ll")}</em>
              </span>
              &emsp;
              <span className={classes.ticketMeta}>
                Last updated:{" "}
                <em>
                  {moment(ticket.updatedOn).fromNow()}{" "}
                  {ticket.updatedBy
                    ? ` by ${ticket.updatedBy.firstName} ${
                        ticket.updatedBy.lastName
                      }`
                    : ""}
                </em>
              </span>
            </div>
          </Grid>
          <Grid item md={3} lg={2}>
            <Grid
              container
              justify="center"
              alignItems="baseline"
              direction="column"
              spacing={1}
            >
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={3}>
                    <ChatBubbleOutline />
                  </Grid>
                  <Grid item xs={9} className={classes.ticketActivity}>
                    {ticket.responseNumber} responses
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                  <Grid item xs={3}>
                    <ThumbUpOutlined />
                  </Grid>
                  <Grid item xs={9} className={classes.ticketActivity}>
                    {ticket.voters.length} votes
                  </Grid>
                </Grid>
              </Grid>
              {ticket.assignee ? (
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={3}>
                      <PersonOutline />
                    </Grid>
                    <Grid item xs={9} className={classes.ticketActivity}>
                      {ticket.assignee.firstName} {ticket.assignee.otherNames}{" "}
                      {ticket.assignee.lastName}
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withInfo(withRouter(withStyles(styles)(TicketNav)));
