import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import ExpandMore from "@material-ui/icons/ExpandMore";

import { colors } from "../../theme";
import { paths } from "../../routes";
import { withUser, WithUserProps } from "../../state/hocs/profiles";
import { withTicketList, WithTicketListProps } from "../../state/hocs/tickets";
import NavLink from "../../components/NavLink";
import { getSearchString } from "./filterQueries";
import * as infoData from "../../state/preloaded/info";
import { ShortUser } from "../../state/types/profiles";
import { TicketStatus } from "../../state/types/info";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: colors.MAIN_BACKGROUND,
      paddingLeft: "4em",
      paddingRight: "4em"
    },
    navLink: {
      paddingTop: "1em",
      paddingBottom: "1em",
      display: "inline-block"
    },
    menuPaper: {
      top: "7em !important"
    },
    caretIcon: {
      marginBottom: "-.2em",
      height: ".8em"
    }
  });

interface ExternalProps {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithUserProps &
  WithTicketListProps &
  ExternalProps;

interface State {
  myAssignmentsElement: HTMLElement | null;
  allTicketsElement: HTMLElement | null;
  myTicketsElement: HTMLElement | null;
}

class TicketNav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      myAssignmentsElement: null,
      allTicketsElement: null,
      myTicketsElement: null
    };
  }

  openMyAssignmentsMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    this.setState({ myAssignmentsElement: event.currentTarget });
  };

  openAllTicketsMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    this.setState({ allTicketsElement: event.currentTarget });
  };

  openMyTicketsMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    this.setState({ myTicketsElement: event.currentTarget });
  };

  closeMyAssignmentsMenu = () => {
    this.setState({ myAssignmentsElement: null });
  };

  closeAllTicketsMenu = () => {
    this.setState({ allTicketsElement: null });
  };

  closeMyTicketsMenu = () => {
    this.setState({ myTicketsElement: null });
  };

  navigateTo = (path: string) => () => {
    this.props.history.push(path);
  };

  setTickets = (assignment?: ShortUser, status?: TicketStatus) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    const {
      addFilterAssignee,
      addFilterStatus,
      clearAllFilters,
      filters,
      fetchTickets,
      setTicketsLoading
    } = this.props;
    clearAllFilters();
    if (assignment) {
      addFilterAssignee(assignment);
    }
    if (status) {
      addFilterStatus(status);
    }
    setTicketsLoading(true);
    fetchTickets(filters).then(() => {
      setTicketsLoading(false);
    });
    this.props.history.push(
      `${paths.TICKET_LIST}${getSearchString({
        ...filters,
        assignees: assignment ? [assignment] : undefined,
        statuses: status ? [status] : undefined
      })}`
    );
    this.setState({
      myAssignmentsElement: null,
      allTicketsElement: null,
      myTicketsElement: null
    });
  };

  render() {
    const { classes, user } = this.props;
    const {
      myAssignmentsElement,
      myTicketsElement,
      allTicketsElement
    } = this.state;

    if (!user) {
      return <div />;
    }

    return (
      <div className={classes.root}>
        <Hidden xsDown>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <NavLink
                to={paths.TICKET_LIST}
                extraClasses={classes.navLink}
                onClick={this.openMyAssignmentsMenu}
              >
                My assignment{" "}
                <ExpandMore classes={{ root: classes.caretIcon }} />
              </NavLink>
              <Menu
                id="my-assignments-menu"
                anchorEl={myAssignmentsElement}
                keepMounted
                open={Boolean(myAssignmentsElement)}
                onClose={this.closeMyAssignmentsMenu}
                classes={{ paper: classes.menuPaper }}
              >
                <MenuItem
                  onClick={this.setTickets(user, infoData.inProgressStatus)}
                >
                  In Progress
                </MenuItem>
                <MenuItem
                  onClick={this.setTickets(user, infoData.pendingStatus)}
                >
                  Pending
                </MenuItem>
              </Menu>{" "}
              &emsp;
              <NavLink
                to={paths.TICKET_LIST}
                extraClasses={classes.navLink}
                onClick={this.setTickets(infoData.unassigned)}
              >
                Unassigned
              </NavLink>{" "}
              &emsp;
              <NavLink
                to={paths.TICKET_LIST}
                extraClasses={classes.navLink}
                onClick={this.openAllTicketsMenu}
              >
                All tickets <ExpandMore classes={{ root: classes.caretIcon }} />
              </NavLink>
              <Menu
                id="all-tickets-menu"
                anchorEl={allTicketsElement}
                keepMounted
                open={Boolean(allTicketsElement)}
                onClose={this.closeAllTicketsMenu}
                classes={{ paper: classes.menuPaper }}
              >
                <MenuItem
                  onClick={this.setTickets(undefined, infoData.newStatus)}
                >
                  New
                </MenuItem>
                <MenuItem
                  onClick={this.setTickets(undefined, infoData.assignedStatus)}
                >
                  Assigned
                </MenuItem>
                <MenuItem
                  onClick={this.setTickets(
                    undefined,
                    infoData.inProgressStatus
                  )}
                >
                  In progress
                </MenuItem>
                <MenuItem
                  onClick={this.setTickets(undefined, infoData.pendingStatus)}
                >
                  Pending
                </MenuItem>
                <MenuItem
                  onClick={this.setTickets(undefined, infoData.closedStatus)}
                >
                  Closed
                </MenuItem>
              </Menu>{" "}
              &emsp;
              <NavLink
                to={paths.TICKET_LIST}
                extraClasses={classes.navLink}
                onClick={this.openMyAssignmentsMenu}
              >
                My tickets <ExpandMore classes={{ root: classes.caretIcon }} />
              </NavLink>
              <Menu
                id="my-tickets-menu"
                anchorEl={myTicketsElement}
                keepMounted
                open={Boolean(myTicketsElement)}
                onClose={this.closeMyTicketsMenu}
                classes={{ paper: classes.menuPaper }}
              >
                <MenuItem
                  onClick={this.setTickets(user, infoData.assignedStatus)}
                >
                  Assigned
                </MenuItem>
                <MenuItem
                  onClick={this.setTickets(user, infoData.closedStatus)}
                >
                  Closed
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Hidden>
      </div>
    );
  }
}

export default withTicketList(
  withUser(withRouter(withStyles(styles)(TicketNav)))
);
