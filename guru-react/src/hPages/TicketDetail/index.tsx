import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Hidden from "@material-ui/core/Hidden";

import { paths } from "../../routes";
import { AppState } from "../../state/types/state";
import FullPageLoader from "../../components/loaders/FullPageLoader";
import Page from "../../components/EmptyPage";
import ErrorPage from "../../pages/error/ErrorPage";
import TicketHistoryListItem from "./HistoryListItem";
import { fetchTicket } from "../../state/actions/tickets";

import TicketCard from "./TicketCard";
import TicketUserInfo from "./UserInfo";
import SideBar from "./SideBar";
import EditTicket from "./EditTicket";
import Responses from "./Responses";
import TicketDetailBreadcrumbs from "./Breadcrumbs";
import TicketDetailHeader from "./Header";
import ResponsiveTicketCard from "./TicketCard/Responsive";

import { useTicketPermissions } from "./hooks";

const TicketDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ticket, answers, ticketHistory } = useSelector(
    (state: AppState) => state.tickets.ticketDetail
  );
  const { user } = useSelector((state: AppState) => state.profiles);
  const dispatch = useDispatch();
  const params: any = useParams();
  const slug: string = params.slug;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { canEdit } = useTicketPermissions(ticket);

  useEffect(() => {
    setIsLoading(true);
    fetchTicket(slug)(dispatch).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <FullPageLoader />;
  }

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
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box mt={8}>
              <TicketDetailBreadcrumbs ticket={ticket} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid spacing={2} container>
              <Grid item md={9}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TicketDetailHeader
                      ticket={ticket}
                      editTicket={openModal}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Hidden smDown>
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
                          <Grid container>
                            <Grid item xs={12}>
                              <TicketCard ticket={ticket} user={user} />
                            </Grid>
                            <Grid item xs={12}>
                              {ticketHistory.map(item => (
                                <TicketHistoryListItem
                                  key={item.id}
                                  historyItem={item}
                                />
                              ))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Hidden>
                    <Hidden mdUp>
                      <ResponsiveTicketCard ticket={ticket} user={user} />
                    </Hidden>
                  </Grid>
                </Grid>
                <Responses
                  canEdit={canEdit}
                  ticket={ticket}
                  answers={answers}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <Hidden smDown>
                  <Box ml={6}>
                    <SideBar ticket={ticket} user={user} />
                  </Box>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Modal open={isModalOpen} onClose={closeModal}>
          <div className="modal-super-container">
            <div className="modal-container">
              <EditTicket ticket={ticket} closeModal={closeModal} />
            </div>
          </div>
        </Modal>
      </Container>
    </Page>
  );
};

export default TicketDetail;
