import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";

import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import PersonOutline from "@material-ui/icons/PersonOutline";
import ThumbUpOutlined from "@material-ui/icons/ThumbUpOutlined";

import { colors } from "../../../theme";
import { paths } from "../../../routes";
import { Ticket } from "../../../state/types/tickets";
import { setTicketAssignee } from "../../../state/actions/tickets";
import { closedStatus, otherCategory } from "../../../state/preloaded/info";
import Autocomplete, { Suggestion } from "../../../components/Autocomplete";
import { ShortUser } from "../../../state/types/profiles";
import { useSearch } from "../../../utils/hooks/tickets";
import Chips from "../../../components/Chips";
import Avatar from "../../../components/Avatar";
import { useTicketPermissions } from "../../TicketDetail/hooks";
import UserName from "./UserName";
import TicketInfo from "./TicketInfo";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

interface Props {
  ticket: Ticket;
}

const TicketListItem: FunctionComponent<Props> = ({ ticket }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { staff, searchStaff } = useSearch();
  const { isStaff } = useTicketPermissions(ticket);

  const goToTicket = () => {
    history.push(paths.getTicketDetailPath(ticket.slug));
  };

  const setAssignee = (selectedItem: Suggestion) => {
    const staffMember = staff.find(item => item.id === selectedItem.id);
    if (staffMember) {
      setTicketAssignee(ticket.slug, staffMember.id)(dispatch);
    }
  };

  const owner = ticket.createdFor || ticket.createdBy;

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
            onClick={goToTicket}
          >
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
              onClick={goToTicket}
              classes={{ root: classes.userGrid }}
            >
              <Grid item>
                <Avatar user={owner} />
              </Grid>
              <UserName user={owner} />
            </Grid>
          </Grid>
          <Grid
            item
            md={8}
            lg={7}
            className={classes.ticket}
            onClick={goToTicket}
          >
            <Chips ticket={ticket} />
            <TicketInfo ticket={ticket} />
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs={12} onClick={goToTicket}>
            <Chips ticket={ticket} />
          </Grid>
          <Grid item xs={12} onClick={goToTicket}>
            <TicketInfo ticket={ticket} />
          </Grid>
          <Grid item xs={12} onClick={goToTicket}>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              alignContent="center"
            >
              <Grid item>
                <Box mr={2}>
                  <Avatar user={owner} />
                </Box>
              </Grid>
              <Grid item>
                <Box marginTop=".3rem">
                  <Grid container direction="column">
                    <UserName user={owner} />
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
                  {ticket.responseNumber} <Hidden smDown>responses</Hidden>
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} lg={12}>
            <Grid container justify="flex-start" spacing={4}>
              <Grid item xs={12}>
                <ThumbUpOutlined className={classes.actionIcon} />
                <span className={classes.actionText}>
                  {ticket.voters.length} <Hidden smDown>votes</Hidden>
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
                {isStaff ? (
                  <Autocomplete
                    suggestions={staff}
                    updateQueryFunction={searchStaff}
                    selectFunction={setAssignee}
                    InputProps={{
                      placeholder: "Select Company",
                      className: classes.selectType
                    }}
                    value={
                      ticket.assignee
                        ? `${ticket.assignee.firstName} ${ticket.assignee.lastName}`
                        : undefined
                    }
                    variant="standard"
                    isAbsolute={true}
                  />
                ) : ticket.assignee ? (
                  `${ticket.assignee.firstName} ${ticket.assignee.lastName}`
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TicketListItem;
