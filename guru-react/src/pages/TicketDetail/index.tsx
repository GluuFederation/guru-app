import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Modal from "@material-ui/core/Modal";

import { colors } from "../../theme";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Page from "../../components/Page";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import {
  WithTicketDetailProps,
  withTicketDetail
} from "../../state/hocs/tickets";
import { withRouter, RouteComponentProps } from "react-router-dom";
import TicketCard from "./TicketCard";
import TicketUserInfo from "./TicketUserInfo";
import ResponseCard from "./ResponseCard";
import SideBar from "./TicketDetailSideBar";
import EditTicket from "./EditTicket";
import TicketHistoryListItem from "./TicketHistoryListItem";
import ResponsePost from "./ResponsePost";
import { paths } from "../../routes";
import ErrorPage from "../error/ErrorPage";

import "easymde/dist/easymde.min.css";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    privacyButton: {
      borderColor: colors.MAIN_COLOR,
      color: colors.MAIN_COLOR
    },
    privacyIcon: {
      height: "1.283rem"
    },
    editButton: {
      backgroundColor: colors.LIGHT_BUTTON
    }
  });

type Props = WithUserProps &
  WithTicketDetailProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

interface State {
  isModalOpen: boolean;
  isLoading: boolean;
}

class TicketDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isLoading: true
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  togglePrivacy = () => {
    const { ticket, updateTicket } = this.props;
    if (ticket) {
      updateTicket({ ...ticket, isPrivate: !ticket.isPrivate });
    }
  };

  componentDidMount() {
    const slug = (this.props.match.params as any).slug;
    this.setState({ isLoading: true });
    this.props.fetchTicket(slug).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { classes, ticket, ticketHistory, answers, user } = this.props;
    const { isLoading, isModalOpen } = this.state;

    if (isLoading) {
      return (
        <Page>
          <Navbar />
          <div className="app-body">
            <div className={classes.root}>
              <CircularProgress />
            </div>
          </div>
          <Footer />
        </Page>
      );
    }

    const slug = (this.props.match.params as any).slug;

    if (!ticket) {
      return (
        <ErrorPage
          errorTitle="Ticket not found"
          errorMessage={`The ticket"${slug}" could not be found.`}
          errorActionText="View all tickets"
          errorAction={paths.TICKET_LIST}
        />
      );
    }

    const isCommunity = user
      ? user.role
        ? user.role.name === "community"
        : true
      : true;
    const isStaff = user
      ? user.role
        ? user.role.name === "staff"
        : false
      : false;
    const isUserCompany = user
      ? user.company
        ? !!ticket.companyAssociation &&
          user.company.id === ticket.companyAssociation.id
        : false
      : false;
    const canEdit = (isUserCompany && !isCommunity) || isStaff;
    return (
      <Page>
        <Navbar />
        <div className="app-body">
          <Container fixed>
            <Grid container>
              <Grid item>
                <Box mt={6}>
                  <Breadcrumbs>
                    <Link component={RouterLink} to={paths.NOTIFICATIONS}>
                      Dashboard
                    </Link>
                    <Link component={RouterLink} to={paths.TICKET_LIST}>
                      Tickets
                    </Link>
                    <Typography>#{ticket.id}</Typography>
                  </Breadcrumbs>
                </Box>
              </Grid>
              <Grid item>
                <Grid
                  spacing={3}
                  container
                  direction="row"
                  justify="flex-end"
                  alignContent="flex-end"
                >
                  <Grid item md={9}>
                    <Box mt={2} mb={8}>
                      <Grid container>
                        <Grid item sm={9}>
                          <Typography variant="h5">
                            {ticket.title} #{ticket.id}
                          </Typography>
                        </Grid>
                        {canEdit ? (
                          <Grid
                            item
                            container
                            justify="flex-end"
                            alignItems="flex-end"
                            alignContent="flex-end"
                            sm={3}
                          >
                            <Button
                              variant="outlined"
                              classes={{ root: classes.privacyButton }}
                              onClick={this.togglePrivacy}
                            >
                              {ticket.isPrivate ? (
                                <Lock
                                  height="10"
                                  classes={{ root: classes.privacyIcon }}
                                />
                              ) : (
                                <LockOpen
                                  height="10"
                                  classes={{ root: classes.privacyIcon }}
                                />
                              )}
                            </Button>
                            &emsp;
                            <Button
                              variant="outlined"
                              classes={{ root: classes.editButton }}
                              onClick={this.openModal}
                            >
                              <small>Edit</small>
                            </Button>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Box>
                    <Grid container>
                      <Grid item md={2}>
                        <Box mr={3}>
                          <TicketUserInfo
                            createdBy={ticket.createdBy}
                            createdFor={ticket.createdFor}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={10}>
                        <TicketCard ticket={ticket} slug={ticket.slug} />
                        {ticketHistory.map(item => (
                          <TicketHistoryListItem
                            key={item.id}
                            historyItem={item}
                          />
                        ))}
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12}>
                        <Box mt={6} mb={4}>
                          <Typography>
                            {answers.length} Response
                            {answers.length === 1 ? "" : "s"}
                          </Typography>
                          <Divider />
                        </Box>
                      </Grid>
                    </Grid>
                    {answers.map(answer => (
                      <Grid key={answer.id} container spacing={8}>
                        <Grid item md={2}>
                          <TicketUserInfo createdBy={answer.createdBy} />
                        </Grid>
                        <Grid item md={10}>
                          <ResponseCard answer={answer} slug={ticket.slug} />
                        </Grid>
                      </Grid>
                    ))}
                    {canEdit ? (
                      <Grid container spacing={8}>
                        <Grid item xs={12}>
                          <ResponsePost />
                        </Grid>
                      </Grid>
                    ) : null}
                  </Grid>

                  <Grid item md={3} xs={12}>
                    <SideBar ticket={ticket} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Modal open={isModalOpen} onClose={this.closeModal}>
              <div className="modal-super-container">
                <div className="modal-container">
                  <EditTicket closeModal={this.closeModal} />
                </div>
              </div>
            </Modal>
          </Container>
        </div>
        <Footer />
      </Page>
    );
  }
}

export default withRouter(
  withTicketDetail(withUser(withStyles(styles)(TicketDetail)))
);
