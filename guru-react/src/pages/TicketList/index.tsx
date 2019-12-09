import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FilterList from "@material-ui/icons/FilterList";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import { colors } from "../../theme";

import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Autocomplete, {
  Suggestion,
  SearchButtonOptions
} from "../../components/Autocomplete";
import { withTicketList, WithTicketListProps } from "../../state/hocs/tickets";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import { Company, ShortUser } from "../../state/types/profiles";
import {
  TicketIssueType,
  GluuProduct,
  TicketStatus,
  TicketCategory
} from "../../state/types/info";
import {
  TicketFilterOrder,
  TicketSearchResult
} from "../../state/types/tickets";
import TicketNav from "./TicketNav";
import TicketListSidebar from "./TicketListSidebar";
import TicketListItem from "./TicketListItem";
import AllFilters from "./AllFilters";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "inherit",
      padding: "3rem 8rem 8rem 8rem",
      wordWrap: "break-word",
      [theme.breakpoints.down("md")]: {
        padding: "3rem 4rem 8rem 4rem"
      },
      [theme.breakpoints.down("xs")]: {
        padding: "3rem 1rem 30rem 1rem"
      }
    },
    ticketCount: {
      marginTop: "1.5em"
    },
    loading: {
      textAlign: "center",
      width: "100%",
      margin: "5em"
    },
    filterList: {
      height: "2rem"
    },
    modalContainer: {
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.MAIN_BACKGROUND,
      height: "90vh",
      marginTop: "10vh"
    },
    modalScrollContainer: {
      maxHeight: "73vh",
      overflowY: "scroll",
      overflowX: "hidden"
    },
    applyButton: {
      color: colors.MAIN_BACKGROUND,
      backgroundColor: colors.MAIN_COLOR,
      fontSize: "1rem"
    },
    clearButton: {
      fontSize: ".8rem"
    },
    modalButtonContainer: {
      padding: "1rem"
    },
    paginationContainer: {
      marginTop: "2em",
      listStyle: "none",
      "& li": {
        display: "inline-block",
        backgroundColor: colors.MAIN_BACKGROUND,
        marginLeft: ".7em",
        border: `1px solid ${colors.VERY_LIGHT_TEXT}`,
        borderRadius: ".2em"
      },
      "& li.selected": {
        backgroundColor: colors.MAIN_COLOR,
        color: colors.MAIN_BACKGROUND
      },
      "& li:hover": {
        border: `1px solid ${colors.MAIN_COLOR}`,
        cursor: "pointer"
      },
      "& li a": {
        padding: ".5em",
        display: "inline-block"
      },
      "& li a:focus": {
        outline: "none"
      }
    }
  });

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithTicketListProps &
  WithInfoProps;

interface State {
  isModalOpen: boolean;
  isLoading: boolean;
  isTicketsLoading: boolean;
  autocompleteResults: Array<Suggestion>;
}

class TicketList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isLoading: false,
      isTicketsLoading: true,
      autocompleteResults: []
    };
  }

  componentDidMount() {
    this.syncStateWithPath();
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  clearAll = () => {
    const { clearAllFilters, fetchTickets } = this.props;
    clearAllFilters();
    this.closeModal();
    this.setTicketsLoading(true);

    fetchTickets(true).then(() => {
      this.setTicketsLoading(false);
    });
  };

  searchTickets = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/tickets/search/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      this.setState({
        autocompleteResults: response.data.results
          .map((result: TicketSearchResult) => ({
            ...result,
            text: result.title
          }))
          .slice(0, 5)
      });
    });
  };

  setSearchQuery = (selectedItem: Suggestion) => {
    const { setFilterQuery, fetchTickets } = this.props;
    setFilterQuery(selectedItem.text);
    this.setTicketsLoading(true);
    fetchTickets(true).then(() => {
      this.setTicketsLoading(false);
    });
  };

  setPageItems = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { setFilterPageItems, fetchTickets } = this.props;
    const pageItems = parseInt(event.target.value as string, 10);
    if (!isNaN(pageItems)) {
      setFilterPageItems(pageItems);
      this.setTicketsLoading(true);
      fetchTickets(true).then(() => {
        this.setTicketsLoading(false);
      });
    }
  };

  setPage = ({ selected }: { selected: number }) => {
    const { setFilterPage, fetchTickets } = this.props;
    if (!isNaN(selected)) {
      setFilterPage(selected + 1);
      this.setTicketsLoading(true);
      fetchTickets(true).then(() => {
        this.setTicketsLoading(false);
      });
    }
  };

  setOrder = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { setFilterOrder, fetchTickets } = this.props;
    const order = event.target.value as TicketFilterOrder;
    setFilterOrder(order);
    this.setTicketsLoading(true);
    fetchTickets(true).then(() => {
      this.setTicketsLoading(false);
    });
  };

  syncStateWithPath = () => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/tickets/get-params-data/`;
    const searchParams = new URLSearchParams(this.props.location.search);
    const companies = searchParams.get("companies");
    const creators = searchParams.get("creators");
    const assignees = searchParams.get("assignees");
    const issueTypes = searchParams.get("types");
    const products = searchParams.get("products");
    const statuses = searchParams.get("statuses");
    const categories = searchParams.get("categories");
    const params = {
      companies: companies ? companies : undefined,
      creators: creators ? creators : undefined,
      assignees: assignees ? assignees : undefined,
      issueTypes: issueTypes ? issueTypes : undefined,
      products: products ? products : undefined,
      statuses: statuses ? statuses : undefined,
      categories: categories ? categories : undefined
    };

    const startDate = searchParams.get("start");
    const endDate = searchParams.get("end");
    const query = searchParams.get("q");
    const order = searchParams.get("order");
    const pageItemsStr = searchParams.get("limit");
    const pageStr = searchParams.get("offset");
    this.setState({ isLoading: true });
    axios.get(url, { params }).then(response => {
      const results = response.data.results;
      const {
        addFilterCompany,
        addFilterAssignee,
        addFilterCategory,
        addFilterCreator,
        addFilterIssueType,
        addFilterProduct,
        addFilterStatus,
        clearAllFilters,
        setFilterEndDate,
        setFilterStartDate,
        setFilterOrder,
        setFilterPage,
        setFilterPageItems,
        setFilterQuery,
        fetchTickets,
        filters
      } = this.props;
      clearAllFilters();
      let pageItems = filters.pageItems;
      if (results.companies) {
        results.companies.forEach((company: Company) => {
          addFilterCompany(company);
        });
      }
      if (results.creators) {
        results.creators.forEach((creator: ShortUser) => {
          addFilterCreator(creator);
        });
      }
      if (results.assignees) {
        results.assignees.forEach((assignee: ShortUser) => {
          addFilterAssignee(assignee);
        });
      }
      if (results.issueTypes) {
        results.issueTypes.forEach((issueType: TicketIssueType) => {
          addFilterIssueType(issueType);
        });
      }
      if (results.products) {
        results.products.forEach((product: GluuProduct) => {
          addFilterProduct(product);
        });
      }
      if (results.statuses) {
        results.statuses.forEach((status: TicketStatus) => {
          addFilterStatus(status);
        });
      }
      if (results.categories) {
        results.categories.forEach((category: TicketCategory) => {
          addFilterCategory(category);
        });
      }
      if (pageItemsStr) {
        pageItems = parseInt(pageItemsStr, 10);
        if (!isNaN(pageItems)) {
          setFilterPageItems(pageItems);
        }
      }
      if (pageStr) {
        const page = Math.round(parseInt(pageStr, 10) / pageItems) + 1;
        if (!isNaN(page)) {
          setFilterPage(page);
        }
      }
      if (startDate && moment(startDate).isValid()) {
        setFilterStartDate(startDate);
      }
      if (endDate && moment(endDate).isValid()) {
        setFilterEndDate(endDate);
      }
      if (query) {
        setFilterQuery(query);
      }
      if (order) {
        setFilterOrder(
          order === TicketFilterOrder.LeastRecent
            ? TicketFilterOrder.LeastRecent
            : order === TicketFilterOrder.UserAZ
            ? TicketFilterOrder.UserAZ
            : order === TicketFilterOrder.UserZA
            ? TicketFilterOrder.UserZA
            : TicketFilterOrder.MostRecent
        );
      }

      this.setState({ isLoading: false, isTicketsLoading: true });
      fetchTickets().then(() => {
        this.setState({ isLoading: false, isTicketsLoading: false });
      });
    });
  };

  setTicketsLoading = (isTicketsLoading: boolean) => {
    this.setState({ isTicketsLoading });
  };

  render() {
    const { classes, tickets, filters } = this.props;
    const { isTicketsLoading, autocompleteResults, isModalOpen } = this.state;
    const InputProps = {
      placeholder: "Type the keyword"
    };

    return (
      <Page>
        <Navbar />
        <TicketNav setTicketsLoading={this.setTicketsLoading} />
        <div className={`app-body ${classes.root}`}>
          <Grid container spacing={4}>
            <Hidden smDown>
              <Grid item xs={12} md={4} lg={3} xl={2}>
                <TicketListSidebar setTicketsLoading={this.setTicketsLoading} />
              </Grid>
            </Hidden>

            <Grid item xs={12} md={8} lg={9} xl={10}>
              <Grid container spacing={1}>
                <Grid item xs={10} md={6}>
                  <Autocomplete
                    suggestions={autocompleteResults}
                    updateQueryFunction={this.searchTickets}
                    selectFunction={this.setSearchQuery}
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
                      onClick={this.openModal}
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
                          onChange={this.setOrder}
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
                  <AllFilters setTicketsLoading={this.setTicketsLoading} />
                </Grid>
                {isTicketsLoading ? (
                  <div className={classes.loading}>
                    <CircularProgress />
                  </div>
                ) : (
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {tickets.map(ticket => (
                        <Grid item xs={12} key={ticket.id}>
                          <TicketListItem shortTicket={ticket} />
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
                        value={
                          !isNaN(filters.pageItems) ? filters.pageItems : ""
                        }
                        onChange={this.setPageItems}
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
                    onPageChange={this.setPage}
                    containerClassName={classes.paginationContainer}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Modal open={isModalOpen} onClose={this.closeModal}>
            <div className={classes.modalContainer}>
              <div className={classes.modalScrollContainer}>
                <TicketListSidebar
                  setTicketsLoading={this.setTicketsLoading}
                ></TicketListSidebar>
              </div>
              <div className={classes.modalButtonContainer}>
                <Button
                  classes={{ root: classes.applyButton }}
                  fullWidth
                  onClick={this.closeModal}
                >
                  Apply filters
                </Button>
                <Button
                  classes={{ root: classes.clearButton }}
                  fullWidth
                  onClick={this.clearAll}
                >
                  Clear filters
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <Footer />
      </Page>
    );
  }
}

export default withInfo(
  withTicketList(withStyles(styles)(withRouter(TicketList)))
);
