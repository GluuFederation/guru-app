import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { connect } from 'react-redux';
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { colors } from "../../theme";

import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Autocomplete, { Suggestion } from "../../components/Autocomplete";
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

import { ReactComponent as SearchImg } from "../../assets/images/search.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "inherit",
      padding: "4em 4em 10em 4em",
      wordWrap: "break-word"
    },
    ticketCount: {
      marginTop: "1.5em"
    },
    loading: {
      textAlign: "center",
      width: "100%",
      margin: "5em"
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
  isLoading: boolean;
  isTicketsLoading: boolean;
  autocompleteResults: Array<Suggestion>;
  staffName: Array<String>;
}

class Home extends Component<Props, State> {
  private Ref: React.RefObject<Autocomplete>;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      isTicketsLoading: true,
      autocompleteResults: [],
      staffName: []
    };

    this.Ref = React.createRef();
  }

  componentDidMount() {
    this.syncStateWithPath();
    this.staffMembers();
  }

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

  staffMembers = () => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/users/staffs/`;
    axios.get(url).then(response => {
      this.setState({
        staffName:response.data.results
      })
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

  handleSearchButton = () => {
    let searchQuery = this.Ref.current ? this.Ref.current.state.searchQuery : '';
    const { setFilterQuery, fetchTickets } = this.props;
    setFilterQuery(searchQuery);
    this.setTicketsLoading(true);
    fetchTickets(true).then(() => {
      this.setTicketsLoading(false);
    });
  };
  handleSearchOnSubmit = (event: React.KeyboardEvent<any>) => {
    if (event.key == "Enter") {
      let searchQuery = this.Ref.current ? this.Ref.current.state.searchQuery : '';
      const { setFilterQuery, fetchTickets } = this.props;
      setFilterQuery(searchQuery);
      this.setTicketsLoading(true);
      fetchTickets(true).then(() => {
        this.setTicketsLoading(false);
      });
    }
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
    const url = `${
      process.env.REACT_APP_API_BASE
      }/api/v1/tickets/get-params-data/`;
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
    const { isTicketsLoading, autocompleteResults } = this.state;
    const InputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <Button onClick={this.handleSearchButton}>
            <SearchImg />
          </Button>
        </InputAdornment>
      ),
      onKeyPress: this.handleSearchOnSubmit,
      placeholder: "Type the keyword"
    };

    return (
      <Page>
        <Navbar />
        <TicketNav setTicketsLoading={this.setTicketsLoading} />
        <div className={`app-body ${classes.root}`}>
          <Grid container spacing={2}>
            <Hidden smDown>
              <Grid item xs={12} md={4} lg={3} xl={2}>
                <TicketListSidebar setTicketsLoading={this.setTicketsLoading} />
              </Grid>
            </Hidden>

            <Grid item xs={12} md={8} lg={9} xl={10}>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <Autocomplete
                    suggestions={autocompleteResults}
                    updateQueryFunction={this.searchTickets}
                    selectFunction={this.setSearchQuery}
                    InputProps={InputProps}
                    ref={this.Ref}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
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
                <Grid item xs={12}>
                  <AllFilters setTicketsLoading={this.setTicketsLoading} />
                </Grid>
                {isTicketsLoading ? (
                  <div className={classes.loading}>
                    <CircularProgress />
                  </div>
                ) : (
                    <React.Fragment>
                      {tickets.map(ticket => (
                        <Grid item xs={12} key={ticket.id}>
                          <TicketListItem ticket={ticket} staff={this.state.staffName}  />
                        </Grid>
                      ))}
                    </React.Fragment>
                  )}
              </Grid>
              <Grid container>
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
        </div>
        <Footer />
      </Page>
    );
  }
}

export default withInfo(withTicketList(withRouter(connect()(withStyles(styles)(Home)))));
