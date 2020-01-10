import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FilterList from "@material-ui/icons/FilterList";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import Page from "../../components/EmptyPage";
import Autocomplete, {
  Suggestion,
  SearchButtonOptions
} from "../../components/Autocomplete";
import { TicketFilterOrder } from "../../state/types/tickets";
import TicketNav from "./TicketNav";
import TicketListSidebar from "./TicketListSidebar";
import TicketListItem from "./TicketListItem";
import AllFilters from "./AllFilters";
import { useStatePathSync } from "./hooks";
import useStyles from "./styles";
import { useTicketPermissions } from "../TicketDetail/hooks";
import useModal from "../../utils/hooks/modal";
import { useSearch } from "../../utils/hooks/tickets";
import { AppState } from "../../state/types/state";

const TicketList = () => {
  const { isUserAuthenticated } = useTicketPermissions(null);
  const { isOpen, open: openModal, close: closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const {
    syncStateWithPath,
    clearAllFilters,
    fetchTickets,
    setFilterQuery,
    setFilterPageItems,
    setFilterPage,
    setFilterOrder
  } = useStatePathSync();
  const dispatch = useDispatch();
  const { tickets: searchedTickets, searchTickets } = useSearch();
  const classes = useStyles();
  const { filters, tickets } = useSelector((state: AppState) => state.tickets);

  useEffect(() => {
    setIsLoading(true);
    syncStateWithPath().then(() => {
      setIsLoading(false);
    });
  }, []);

  const clearAll = () => {
    dispatch(clearAllFilters());
    closeModal();
    setIsLoading(true);
    fetchTickets(true).then(() => {
      setIsLoading(false);
    });
  };

  const setSearchQuery = (selectedItem: Suggestion) => {
    dispatch(setFilterQuery(selectedItem.text));
    setIsLoading(true);
    fetchTickets(true).then(() => {
      setIsLoading(false);
    });
  };

  const setPageItems = (event: React.ChangeEvent<{ value: unknown }>) => {
    const pageItems = parseInt(event.target.value as string, 10);
    if (!isNaN(pageItems)) {
      dispatch(setFilterPageItems(pageItems));
      setIsLoading(true);
      fetchTickets(true).then(() => {
        setIsLoading(false);
      });
    }
  };

  const setPage = ({ selected }: { selected: number }) => {
    if (!isNaN(selected)) {
      dispatch(setFilterPage(selected + 1));
      setIsLoading(true);
      fetchTickets(true).then(() => {
        setIsLoading(false);
      });
    }
  };

  const setOrder = (event: React.ChangeEvent<{ value: unknown }>) => {
    const order = event.target.value as TicketFilterOrder;
    dispatch(setFilterOrder(order));
    setIsLoading(true);
    fetchTickets(true).then(() => {
      setIsLoading(false);
    });
  };

  const InputProps = {
    placeholder: "Type the keyword"
  };

  return (
    <Page removeRootStyle>
      {isUserAuthenticated ? (
        <TicketNav setTicketsLoading={setIsLoading} />
      ) : null}

      <div className={`app-body ${classes.root}`}>
        <Grid container spacing={4}>
          <Hidden smDown>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <TicketListSidebar setTicketsLoading={setIsLoading} />
            </Grid>
          </Hidden>

          <Grid item xs={12} md={8} lg={9} xl={10}>
            <Grid container spacing={1}>
              <Grid item xs={10} md={6}>
                <Autocomplete
                  suggestions={searchedTickets}
                  updateQueryFunction={searchTickets}
                  selectFunction={setSearchQuery}
                  InputProps={InputProps}
                  searchButton={SearchButtonOptions.End}
                  isAbsolute={true}
                />
              </Grid>
              <Hidden mdUp>
                <Grid item xs={2}>
                  <FilterList
                    fontSize="large"
                    className={classes.filterList}
                    onClick={openModal}
                  />
                </Grid>
              </Hidden>
              <Hidden smDown>
                <Grid item md={6}>
                  <Grid container justify="flex-end" alignItems="center">
                    <Grid item>Order by: &emsp;</Grid>
                    <Grid item>
                      <TextField
                        select
                        variant="outlined"
                        margin="dense"
                        value={filters.order ? filters.order : ""}
                        onChange={setOrder}
                      >
                        <MenuItem value={TicketFilterOrder.MostRecent}>
                          Most recent
                        </MenuItem>
                        <MenuItem value={TicketFilterOrder.LeastRecent}>
                          Least recent
                        </MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>

              <Grid item xs={12}>
                <AllFilters setTicketsLoading={setIsLoading} />
              </Grid>
              {isLoading ? (
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
              ) : (
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {tickets.map(ticket => (
                      <Grid item xs={12} key={ticket.id}>
                        <TicketListItem ticket={ticket} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid justify="space-between" container>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  className={classes.ticketCount}
                >
                  <Grid item>Show: &emsp;</Grid>
                  <Grid item>
                    <TextField
                      select
                      variant="outlined"
                      margin="dense"
                      value={!isNaN(filters.pageItems) ? filters.pageItems : ""}
                      onChange={setPageItems}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={15}>15</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item>&emsp; of {filters.totalCount} tickets.</Grid>
                </Grid>
              </Grid>
              <Grid item>
                <ReactPaginate
                  previousLabel="Previous"
                  pageCount={filters.totalCount / filters.pageItems}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={3}
                  onPageChange={setPage}
                  containerClassName={classes.paginationContainer}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Modal open={isOpen} onClose={closeModal}>
          <div className={classes.modalContainer}>
            <div className={classes.modalScrollContainer}>
              <TicketListSidebar
                setTicketsLoading={setIsLoading}
              ></TicketListSidebar>
            </div>
            <div className={classes.modalButtonContainer}>
              <Button
                classes={{ root: classes.applyButton }}
                fullWidth
                onClick={closeModal}
              >
                Apply filters
              </Button>
              <Button
                classes={{ root: classes.clearButton }}
                fullWidth
                onClick={clearAll}
              >
                Clear filters
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Page>
  );
};

export default TicketList;
