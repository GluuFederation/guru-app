import React, { Component, FunctionComponent } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { Grid, Hidden, Menu, MenuItem } from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { colors } from "../../../theme";
import { paths } from "../../../routes";
import NavLink from "../../../components/NavLink";
import * as infoData from "../../../state/preloaded/info";
import { ShortUser } from "../../../state/types/profiles";
import { TicketStatus } from "../../../state/types/info";
import useMenu from "../../../utils/hooks/menu";
import useTicketsActions from "../../../state/hooks/actions/tickets";
import { useTicketPermissions } from "../../TicketDetail/hooks";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: colors.MAIN_BACKGROUND,
    paddingLeft: "8rem",
    paddingRight: "8rem",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem"
    }
  },
  navLink: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
    display: "inline-block"
  },
  menuPaper: {
    top: "7em !important"
  },
  caretIcon: {
    marginBottom: "-.2em",
    height: ".8em"
  }
}));

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const TicketNav: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const history = useHistory();
  const classes = useStyles();
  const { user } = useTicketPermissions(null);
  const {
    addFilterAssignee,
    addFilterStatus,
    clearAllFilters,
    fetchTickets
  } = useTicketsActions();
  const {
    element: myAssignmentsElement,
    setElement: setMyAssignmentsElement,
    open: openMyAssignmentsMenu,
    close: closeMyAssignmentsMenu
  } = useMenu();

  const {
    element: allTicketsElement,
    setElement: setAllTicketsElement,
    open: openAllTicketsMenu,
    close: closeAllTicketsMenu
  } = useMenu();

  const {
    element: myTicketsElement,
    setElement: setMyTicketsElement,
    open: openMyTicketsMenu,
    close: closeMyTicketsMenu
  } = useMenu();

  const navigateTo = (path: string) => () => {
    history.push(path);
  };

  const setTickets = (assignment?: ShortUser, status?: TicketStatus) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    clearAllFilters();
    if (assignment) {
      addFilterAssignee(assignment);
    }
    if (status) {
      addFilterStatus(status);
    }
    setTicketsLoading(true);
    fetchTickets(true).then(() => {
      setTicketsLoading(false);
    });
    setMyAssignmentsElement(null);
    setAllTicketsElement(null);
    setMyTicketsElement(null);
  };

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
              onClick={openMyAssignmentsMenu}
            >
              My assignment <ExpandMore classes={{ root: classes.caretIcon }} />
            </NavLink>
            <Menu
              id="my-assignments-menu"
              anchorEl={myAssignmentsElement}
              keepMounted
              open={Boolean(myAssignmentsElement)}
              onClose={closeMyAssignmentsMenu}
              classes={{ paper: classes.menuPaper }}
            >
              <MenuItem onClick={setTickets(user, infoData.inProgressStatus)}>
                In Progress
              </MenuItem>
              <MenuItem onClick={setTickets(user, infoData.pendingStatus)}>
                Pending
              </MenuItem>
            </Menu>{" "}
            &emsp;
            <NavLink
              to={paths.TICKET_LIST}
              extraClasses={classes.navLink}
              onClick={setTickets(infoData.unassigned)}
            >
              Unassigned
            </NavLink>{" "}
            &emsp;
            <NavLink
              to={paths.TICKET_LIST}
              extraClasses={classes.navLink}
              onClick={openAllTicketsMenu}
            >
              All tickets <ExpandMore classes={{ root: classes.caretIcon }} />
            </NavLink>
            <Menu
              id="all-tickets-menu"
              anchorEl={allTicketsElement}
              keepMounted
              open={Boolean(allTicketsElement)}
              onClose={closeAllTicketsMenu}
              classes={{ paper: classes.menuPaper }}
            >
              <MenuItem onClick={setTickets(undefined, infoData.newStatus)}>
                New
              </MenuItem>
              <MenuItem
                onClick={setTickets(undefined, infoData.assignedStatus)}
              >
                Assigned
              </MenuItem>
              <MenuItem
                onClick={setTickets(undefined, infoData.inProgressStatus)}
              >
                In progress
              </MenuItem>
              <MenuItem onClick={setTickets(undefined, infoData.pendingStatus)}>
                Pending
              </MenuItem>
              <MenuItem onClick={setTickets(undefined, infoData.closedStatus)}>
                Closed
              </MenuItem>
            </Menu>{" "}
            &emsp;
            <NavLink
              to={paths.TICKET_LIST}
              extraClasses={classes.navLink}
              onClick={openMyAssignmentsMenu}
            >
              My tickets <ExpandMore classes={{ root: classes.caretIcon }} />
            </NavLink>
            <Menu
              id="my-tickets-menu"
              anchorEl={myTicketsElement}
              keepMounted
              open={Boolean(myTicketsElement)}
              onClose={closeMyTicketsMenu}
              classes={{ paper: classes.menuPaper }}
            >
              <MenuItem onClick={setTickets(user, infoData.assignedStatus)}>
                Assigned
              </MenuItem>
              <MenuItem onClick={setTickets(user, infoData.closedStatus)}>
                Closed
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
};

export default TicketNav;
