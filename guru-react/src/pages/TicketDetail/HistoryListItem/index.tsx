import React, { FunctionComponent } from "react";
import moment from "moment";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import Comment from "@material-ui/icons/Comment";

import {
  TicketHistoryItem,
  HistoryChangedField
} from "../../../state/types/tickets";
import Avatar from "../../../components/Avatar";
import { colors } from "../../../theme";

const useStyles = makeStyles({
  gridHistory: {
    marginTop: 8
  },
  textUser: {
    color: "#6B6B6B"
  },
  Ticket: {
    color: "#DCDCDC",
    fontSize: 18
  },
  root: {
    position: "relative",
    "&::before": {
      content: '"\u00A0"',
      position: "absolute",
      borderLeft: `1px solid ${colors.LIGHT_BORDER}`,
      top: "-8px",
      left: "15px",
      height: "8px"
    }
  }
});

interface Props {
  historyItem: TicketHistoryItem;
}

const TicketDetail: FunctionComponent<Props> = props => {
  const { historyItem } = props;
  const classes = useStyles();
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
    <div className={classes.root}>
      <Grid container className={classes.gridHistory} spacing={1}>
        <Grid item>
          <Avatar size="sm">{icon}</Avatar>
        </Grid>
        <Grid item>
          {actor.avatar ? (
            <Avatar alt="Avatar" src={actor.avatar} size="sm" />
          ) : (
            <Avatar alt="Avatar" size="sm">
              {actor.firstName ? actor.firstName.charAt(0) : ""}
            </Avatar>
          )}
        </Grid>
        <Grid item>
          <Typography className={classes.textUser}>
            {actor.firstName} {actor.otherNames} {actor.lastName} {text} {time}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default TicketDetail;
