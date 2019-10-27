import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import PersonOutline from "@material-ui/icons/PersonOutline";
import ThumbUpOutlined from "@material-ui/icons/ThumbUpOutlined";
import { colors } from "../../theme";
import { getChipClass } from "../../utils/chipStyles";
import { paths } from "../../routes";
import { Ticket } from "../../state/types/tickets";
import { closedStatus, otherCategory } from "../../state/preloaded/info";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import {
  withTicketDetail,
  WithTicketDetailProps
} from "../../state/hocs/tickets";

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
    },
    selectType: {
      fontSize: "12px",
      fontWeight: 600
    }
  });

interface ExternalProps {
  shortTicket: Ticket;
  staff: any;
}

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithInfoProps &
  WithTicketDetailProps &
  ExternalProps;

class TicketNav extends Component<Props> {
  goToTicket = () => {
    this.props.history.push(
      paths.getTicketDetailPath(this.props.shortTicket.slug)
    );
  };

  handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const { shortTicket, setTicketAssignee } = this.props;
    setTicketAssignee(shortTicket.slug, event.target.value as number, true);
  }
  render() {
    const { classes, shortTicket, info, staff } = this.props;
    const owner = shortTicket.createdFor
      ? shortTicket.createdFor
      : shortTicket.createdBy;

    const tempStatus = info.statuses.find(
      item => item.id === shortTicket.status
    );
    const status = tempStatus ? tempStatus : closedStatus;

    const tempCategory = info.categories.find(
      item => item.id === shortTicket.category
    );
    const category = tempCategory ? tempCategory : otherCategory;

    const issueType = info.issueTypes.find(
      item => item.id === shortTicket.issueType
    );

    return (
      <div className={classes.root}>
        <Grid container style={{ padding: 10 }} alignItems="center">
          <Grid item md={3} sm={12} xs={12} lg={2} className={classes.owner}>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
            >
              <Grid item>
                {owner.avatar ? (
                  <Avatar
                    alt="Image"
                    src={owner.avatar}
                    className={classes.avatar}
                  ></Avatar>
                ) : (
                  <Avatar alt="Image" className={classes.avatar}>
                    {owner.firstName.charAt(0)}
                  </Avatar>
                )}
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
                  <small>{owner.company ? owner.company.name : ""}</small>
                </div>
              </Grid>
              <Grid item>
                <div style={{ textTransform: "capitalize" }}>
                  {owner.company ? owner.company.plan : ""}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            lg={7}
            className={classes.ticket}
            onClick={this.goToTicket}
          >
            <div>
              <Chip label={status.name} className={getChipClass(status.slug)} />
              {issueType ? (
                <Chip
                  label={issueType.name}
                  className={getChipClass(issueType.slug)}
                />
              ) : null}

              <Chip
                label={category.name}
                className={getChipClass(category.slug)}
              />
            </div>
            <Typography variant="h6">{shortTicket.title}</Typography>
            <div>
              <span className={classes.ticketId}># {shortTicket.id}</span>&emsp;
              <span className={classes.ticketMeta}>
                Created: <em>{moment(shortTicket.createdOn).format("ll")}</em>
              </span>
              &emsp;
              <span className={classes.ticketMeta}>
                Last updated:{" "}
                <em>
                  {moment(shortTicket.updatedOn).fromNow()}{" "}
                  {shortTicket.updatedBy
                    ? ` by ${shortTicket.updatedBy.firstName} ${shortTicket.updatedBy.lastName}`
                    : ""}
                </em>
              </span>
            </div>
          </Grid>
          <Grid item md={3} xs={12} sm={12} lg={3} container direction="column">
            <Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={2}>
                    <ChatBubbleOutline />
                  </Grid>
                  <Grid item xs={9} className={classes.ticketActivity}>
                    {shortTicket.responseNumber} responses
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                  <Grid item xs={2} md={2}>
                    <ThumbUpOutlined />
                  </Grid>
                  <Grid item xs={9} md={9} className={classes.ticketActivity}>
                    {shortTicket.voters.length} votes
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={2} md={2}>
                    <PersonOutline />
                  </Grid>
                  <Grid item xs={9} md={9} className={classes.ticketActivity}>
                    <Select
                      className={classes.selectType}
                      value={
                        shortTicket.assignee ? shortTicket.assignee.id : ""
                      }
                      onChange={this.handleChange.bind(this)}
                    >
                      {staff.map((staff: any) => (
                        <MenuItem value={staff.id} key={staff.id}>
                          {staff.firstName + " " + staff.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTicketDetail(
  withInfo(withStyles(styles)(withRouter(TicketNav)))
);
