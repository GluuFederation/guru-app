import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";

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
import Autocomplete, { Suggestion } from "../../components/Autocomplete";
import { ShortUser } from "../../state/types/profiles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "0 1em 0 1rem",
      cursor: "pointer",
      marginBottom: ".5rem",
      marginTop: "1rem",
      "&:hover h5": {
        color: colors.MAIN_COLOR
      }
    },
    owner: {
      textAlign: "center",
      borderRight: `1px solid ${colors.VERY_LIGHT_TEXT}`,
      padding: "1rem"
    },
    ticket: {
      padding: "1rem"
    },
    ticketMeta: {
      color: colors.LIGHTER_TEXT,
      fontSize: ".7em",
      verticalAlign: "text-bottom",
      lineHeight: "1.2rem"
    },
    ticketId: {
      color: colors.MAIN_COLOR
    },
    avatar: {
      height: 50,
      width: 50,
      marginBottom: "1em"
    },
    selectType: {
      fontSize: "1rem",
      color: colors.LIGHTER_TEXT,
      marginTop: "-.2rem",
      [theme.breakpoints.down("md")]: {
        marginTop: "-.3rem"
      },
      [theme.breakpoints.up("sm")]: {
        marginLeft: "-.8rem"
      }
    },
    actions: {
      [theme.breakpoints.down("sm")]: {
        borderTop: `1px solid ${colors.LIGHT_BORDER}`
      }
    },
    chips: {
      [theme.breakpoints.down("sm")]: {
        marginTop: ".8rem"
      }
    },
    heading: {
      marginBottom: ".5rem"
    },
    lightText: {
      color: colors.LIGHTER_TEXT
    },
    userGrid: {
      marginTop: ".5rem",
      marginBottom: ".5rem"
    },
    actionIcon: {
      height: "1.5rem",
      marginRight: "1rem"
    },
    actionText: {
      fontSize: ".8rem",
      verticalAlign: "super"
    }
  });

interface ExternalProps {
  shortTicket: Ticket;
}

interface State {
  staff: Array<ShortUser & Suggestion>;
}

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithInfoProps &
  WithTicketDetailProps &
  ExternalProps;

class TicketNav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      staff: []
    };
  }

  goToTicket = () => {
    this.props.history.push(
      paths.getTicketDetailPath(this.props.shortTicket.slug)
    );
  };

  handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const { shortTicket, setTicketAssignee } = this.props;
    setTicketAssignee(shortTicket.slug, event.target.value as number, true);
  }

  searchStaff = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/users/`;
    const params = { q, staff: "true" };

    axios.get(url, { params }).then(response => {
      this.setState({
        staff: response.data.results
          .map((result: ShortUser) => ({
            ...result,
            text: `${result.firstName} ${result.lastName}`
          }))
          .slice(0, 5)
      });
    });
  };

  setAssignee = (selectedItem: Suggestion) => {
    const { shortTicket, setTicketAssignee } = this.props;
    const { staff } = this.state;
    const staffMember = staff.find(item => item.id === selectedItem.id);
    if (staffMember) {
      setTicketAssignee(shortTicket.slug, staffMember.id);
    }
  };

  render() {
    const { classes, shortTicket, info } = this.props;
    const { staff } = this.state;
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

    const avatar = owner.avatar ? (
      <Avatar
        alt="Image"
        src={owner.avatar}
        className={classes.avatar}
      ></Avatar>
    ) : (
      <Avatar alt="Image" className={classes.avatar}>
        {owner.firstName.charAt(0)}
      </Avatar>
    );

    const userName = (
      <>
        <Grid item xs={12}>
          <div>
            <strong>
              <small>
                {owner.firstName} {owner.otherNames} {owner.lastName}
              </small>
            </strong>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.lightText}>
            <small>{owner.company ? owner.company.name : ""}</small>
          </div>
        </Grid>
        <Hidden xsDown>
          <Grid item xs={12}>
            <div style={{ textTransform: "capitalize" }}>
              <small>{owner.company ? owner.company.plan : ""}</small>
            </div>
          </Grid>
        </Hidden>
      </>
    );

    const chips = (
      <div className={classes.chips}>
        <Chip label={status.name} className={getChipClass(status.slug)} />
        {issueType ? (
          <Chip
            label={issueType.name}
            className={getChipClass(issueType.slug)}
          />
        ) : null}

        <Chip label={category.name} className={getChipClass(category.slug)} />
      </div>
    );

    const ticketInfo = (
      <>
        <Typography variant="h5" classes={{ root: classes.heading }}>
          {shortTicket.title}
        </Typography>
        <div>
          <span className={classes.ticketId}># {shortTicket.id}</span>&emsp;
          <span className={classes.ticketMeta}>
            Created: <em>{moment(shortTicket.createdOn).format("ll")}</em>
          </span>
          &emsp;
          <Hidden xsDown>
            <span className={classes.ticketMeta}>
              Last updated:{" "}
              <em>
                {moment(shortTicket.updatedOn).fromNow()}{" "}
                {shortTicket.updatedBy
                  ? ` by ${shortTicket.updatedBy.firstName} ${shortTicket.updatedBy.lastName}`
                  : ""}
              </em>
            </span>
          </Hidden>
        </div>
      </>
    );

    return (
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center">
          <Hidden smDown>
            <Grid
              item
              md={4}
              sm={12}
              xs={12}
              lg={2}
              className={classes.owner}
              onClick={this.goToTicket}
            >
              <Grid
                container
                justify="center"
                direction="column"
                alignItems="center"
                onClick={this.goToTicket}
                classes={{ root: classes.userGrid }}
              >
                <Grid item>{avatar}</Grid>
                {userName}
              </Grid>
            </Grid>
            <Grid
              item
              md={8}
              lg={7}
              className={classes.ticket}
              onClick={this.goToTicket}
            >
              {chips}
              {ticketInfo}
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={12} onClick={this.goToTicket}>
              {chips}
            </Grid>
            <Grid item xs={12} onClick={this.goToTicket}>
              {ticketInfo}
            </Grid>
            <Grid item xs={12} onClick={this.goToTicket}>
              <Grid
                container
                alignItems="flex-start"
                justify="flex-start"
                alignContent="center"
              >
                <Grid item>
                  <Box mr={2}>{avatar}</Box>
                </Grid>
                <Grid item>
                  <Box marginTop=".3rem">
                    <Grid container direction="column">
                      {userName}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            lg={3}
            container
            classes={{ root: classes.actions }}
            className={classes.lightText}
          >
            <Grid item xs={3} lg={12}>
              <Grid container justify="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <ChatBubbleOutline className={classes.actionIcon} />
                  <span className={classes.actionText}>
                    {shortTicket.responseNumber}{" "}
                    <Hidden smDown>responses</Hidden>
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} lg={12}>
              <Grid container justify="flex-start" spacing={4}>
                <Grid item xs={12}>
                  <ThumbUpOutlined className={classes.actionIcon} />
                  <span className={classes.actionText}>
                    {shortTicket.voters.length} <Hidden smDown>votes</Hidden>
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} lg={12}>
              <Grid container justify="flex-start" spacing={2}>
                <Grid item xs={2} md={2}>
                  <PersonOutline className={classes.actionIcon} />
                </Grid>
                <Grid item xs={9} md={9}>
                  <Autocomplete
                    suggestions={staff}
                    updateQueryFunction={this.searchStaff}
                    selectFunction={this.setAssignee}
                    InputProps={{
                      placeholder: "Select Company",
                      className: classes.selectType
                    }}
                    value={
                      shortTicket.assignee
                        ? `${shortTicket.assignee.firstName} ${shortTicket.assignee.lastName}`
                        : undefined
                    }
                    variant="standard"
                    isAbsolute={true}
                  />
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
