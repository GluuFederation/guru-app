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
import TicketHistoryListItem from "./TicketHistoryListItem";
import ResponsePost from "../../components/TicketDetail/ResponsePost";
import EditTicket from "../../components/TicketDetail/EditTicket";
import { paths } from "../../routes";
import ErrorPage from "../error/ErrorPage";

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
      height: ".795em"
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
  openAdd: boolean;
  isLoading: boolean;
}

class TicketDetail extends Component<Props, State> {
  handleOpenAdd = () => {
    this.setState({ openAdd: true });
  };

  handleCloseAdd = () => {
    this.setState({ openAdd: false });
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      openAdd: false,
      isLoading: false
    };
  }

  componentDidMount() {
    const slug = (this.props.match.params as any).slug;
    this.setState({ isLoading: true });
    this.props.fetchTicket(slug).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { classes, ticket, ticketHistory, answers } = this.props;
    const { isLoading } = this.state;

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
                <Grid container justify="flex-end" alignContent="flex-end">
                  <Grid item md={9}>
                    <Box mt={2} mb={8}>
                      <Grid container>
                        <Grid item sm={9}>
                          <Typography variant="h5">
                            {ticket.title} #{ticket.id}
                          </Typography>
                        </Grid>
                        <Grid item sm={3}>
                          <Button
                            variant="outlined"
                            classes={{ root: classes.privacyButton }}
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
                          >
                            <small>Edit</small>
                          </Button>
                        </Grid>
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
                        <TicketCard ticket={ticket} />
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
                  </Grid>

                  <Grid item md={3}>
                    <SideBar ticket={ticket} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid container item={true} md={9} xs={12} sm={12}>
                {/* <Grid item={true} md={12} xs={12} sm={12}>
                  <ResponsePost />
                </Grid> */}
              </Grid>
              <Grid container item={true} md={3} xs={12} sm={12}>
                <div />
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </div>
      </Page>
    );
  }
}

export default withRouter(
  withTicketDetail(withUser(withStyles(styles)(TicketDetail)))
);
