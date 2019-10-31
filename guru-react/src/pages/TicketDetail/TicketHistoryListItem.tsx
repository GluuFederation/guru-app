import React, { Component } from "react";
import moment from "moment";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import Comment from "@material-ui/icons/Comment";
import {
  TicketHistoryItem,
  HistoryChangedField
} from "../../state/types/tickets";

const styles = (theme: Theme) =>
  createStyles({
    gridHistory: {
      marginTop: 8
    },
    textUser: {
      float: "left",
      marginTop: -23,
      marginLeft: 35,
      color: "#6B6B6B",
      fontSize: 14
    },
    Ticket: {
      color: "#DCDCDC",
      fontSize: 18
    },
    iconBg: {
      float: "left",
      color: "#E9E9E9",
      backgroundColor: "#F3F2F2",
      borderRadius: 20,
      width: 30,
      height: 30,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    avatarSmall: {
      width: 28,
      height: 28,
      textAlign: "left"
    }
  });

interface ExternalProps {
  historyItem: TicketHistoryItem;
}
type Props = ExternalProps & WithStyles<typeof styles>;

class TicketDetail extends Component<Props> {
  render() {
    const { classes, historyItem } = this.props;
    const actor = historyItem.changedBy;
    const affectedUser = historyItem.affectedUser;
    const time = moment(historyItem.createdOn).fromNow();
    let text = "";
    let icon = <ConfirmationNumber />;

    switch (historyItem.changedField) {
      case HistoryChangedField.Title:
      case HistoryChangedField.Category:
      case HistoryChangedField.Status:
      case HistoryChangedField.IssueType:
      case HistoryChangedField.GluuServer:
      case HistoryChangedField.Os:
      case HistoryChangedField.OsVersion:
      case HistoryChangedField.Body:
        text = `changed the ${historyItem.changedField} ${
          historyItem.afterValue ? "to " + historyItem.afterValue : ""
        }`;
        break;
      case HistoryChangedField.CreatedBy:
        text = `changed the creator to ${
          affectedUser ? "" : historyItem.afterValue
        }`;
        break;
      case HistoryChangedField.Assignee:
        text = `assigned to ${affectedUser ? "" : historyItem.afterValue}`;
        break;
      case HistoryChangedField.Privacy:
        text = `made the ticket ${historyItem.afterValue}`;
        break;
      case HistoryChangedField.Products:
        text = "changed the products";
        break;
      case HistoryChangedField.Comment:
        text = "added a comment";
        icon = <Comment />;
        break;
      case HistoryChangedField.EditComment:
        text = "edited a comment";
        icon = <Comment />;
        break;
      default:
        text = "updated the ticket";
    }

    return (
      <div>
        <Grid className={classes.gridHistory}>
          <Avatar className={classes.iconBg}>{icon}</Avatar>
          {actor.avatar ? (
            <Avatar
              alt="Avatar"
              src={actor.avatar}
              className={classes.avatarSmall}
            />
          ) : (
            <Avatar alt="Avatar" className={classes.avatarSmall}>
              {actor.firstName ? actor.firstName.charAt(0) : ""}
            </Avatar>
          )}

          <Typography className={classes.textUser}>
            {actor.firstName} {actor.otherNames} {actor.lastName} {text} {time}
          </Typography>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TicketDetail);
