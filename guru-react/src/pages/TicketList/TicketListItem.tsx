import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import { connect } from 'react-redux';
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
import {
  closedStatus,
  otherCategory,
  minorIssueType
} from "../../state/preloaded/info";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import { TicketIssueType } from "../../state/types/info";
import axios from "axios";
import { fontStyle } from "@material-ui/system";

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
      fontWeight: 600,
      
    },
  });

interface ExternalProps {
  ticket: Ticket;
  staff: any;
}

interface State {
  staffValue: number;
}

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithInfoProps &
  ExternalProps;

class TicketNav extends Component<Props, State> {
  goToTicket = () => {
    this.props.history.push(paths.getTicketDetailPath(this.props.ticket.slug));
  };

  state = {
    staffValue: this.props.ticket.assignee ? this.props.ticket.assignee.id : 0 
  };

  handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    this.setState({
      staffValue: event.target.value as number
    });
    let assignee_id =  event.target.value as number;
    let ticketSlug = this.props.ticket.slug;
    const URL = `${
      process.env.REACT_APP_API_BASE
      }/api/v1/tickets/${ticketSlug}/assign/`;
    const data = { ticket: { assignee:  assignee_id} };
    return axios.post(URL, { ...data }).then(response => {
      
    });
  };
  render() {
    const { classes, ticket, info, staff } = this.props;
    const owner = ticket.createdFor ? ticket.createdFor : ticket.createdBy;

    const tempStatus = info.statuses.find(item => item.id === ticket.status);
    const status = tempStatus ? tempStatus : closedStatus;
    
    const tempCategory = info.categories.find(
      item => item.id === ticket.category
    );
    const category = tempCategory ? tempCategory : otherCategory;

    const issueType = info.issueTypes.find(
      item => item.id === ticket.issueType
    );

    return (
      <div className={classes.root}>
        <Grid container style={{ padding: 10 }}  alignItems="center">
          <Grid item md={3} sm={12} xs={12} lg={2} className={classes.owner}>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
            >
              <Grid item>
                { owner.avatar ?
                  <Avatar alt="Image" src={owner.avatar} className={classes.avatar} ></Avatar>
                  : <Avatar alt="Image" className={classes.avatar} >{owner.firstName.charAt(0)}</Avatar>
                }
                
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
                <div style={{textTransform:'capitalize'}}>{owner.company ? owner.company.plan : ""}</div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} lg={7} className={classes.ticket} onClick={this.goToTicket}>
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
          <Grid item md={3} xs={12} sm={12} lg={3} container direction="column">
            <Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={2}>
                    <ChatBubbleOutline />
                  </Grid>
                  <Grid item xs={9} className={classes.ticketActivity}>
                    {ticket.responseNumber} responses
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                  <Grid item xs={2} md={2}>
                    <ThumbUpOutlined />
                  </Grid>
                  <Grid item xs={9} md={9} className={classes.ticketActivity}>
                    {ticket.voters.length} votes
                  </Grid>
                </Grid>
              </Grid>
              {/* {ticket.assignee ? ( */}
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={2} md={2}>
                      <PersonOutline />
                    </Grid>
                    <Grid item xs={9} md={9} className={classes.ticketActivity}>
                      <Select
                        className={classes.selectType}
                        value={this.state.staffValue}
                        onChange={this.handleChange.bind(this)}
                      >
                        {staff.map((staf: any) => (
                          <MenuItem value={staf.id}>
                            {staf.firstName + " " + staf.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
               {/* ) : null} */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withInfo(withRouter(connect()(withStyles(styles)(TicketNav))));
