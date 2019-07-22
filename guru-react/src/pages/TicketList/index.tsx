import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { colors } from "../../theme";

import { paths } from "../../routes";
import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Autocomplete, { Suggestion } from "../../components/Autocomplete";
import { withTicketList, WithTicketListProps } from "../../state/hocs/tickets";
import { withUser, WithUserProps } from "../../state/hocs/profiles";
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
import { TicketsFilterState } from "../../state/types/state";
import { initialFilters } from "../../state/reducers/tickets";
import TicketNav from "./TicketNav";
import TicketSidebar from "./TicketSidebar";
import TicketListItem from "./TicketListItem";

import { ReactComponent as SearchImg } from "../../assets/images/search.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "inherit",
      padding: "4em 4em 10em 4em"
    },
    tickets: {},
    loading: {
      textAlign: "center",
      width: "100%",
      margin: "5em"
    }
  });

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithTicketListProps &
  WithUserProps &
  WithInfoProps;

interface State {
  isLoading: boolean;
  isTicketsLoading: boolean;
  autocompleteResults: Array<Suggestion>;
}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      isTicketsLoading: false,
      autocompleteResults: []
    };
  }

  componentDidMount() {
    this.syncStateWithPath();
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

  setSearchQuery = (selectedItem: Suggestion) => {
    const { setFilterQuery, fetchTickets } = this.props;
    setFilterQuery(selectedItem.text);
    this.setTicketsLoading(true);
    fetchTickets(true).then(() => {
      this.setTicketsLoading(false);
    });
  };

  handleSearchButton = () => {};

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

  setPage = (page: number) => () => {
    const { setFilterPage, fetchTickets } = this.props;
    if (!isNaN(page)) {
      setFilterPage(page);
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
    const query = searchParams.get("query");
    const order = searchParams.get("order");
    const pageItemsStr = searchParams.get("pageItems");
    const pageStr = searchParams.get("page");
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
        fetchTickets
      } = this.props;
      clearAllFilters();
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
        const pageItems = parseInt(pageItemsStr, 10);
        if (!isNaN(pageItems)) {
          setFilterPageItems(pageItems);
        }
      }
      if (pageStr) {
        const page = parseInt(pageStr, 10);
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
    const { user, classes, tickets } = this.props;
    const { isTicketsLoading, autocompleteResults } = this.state;
    const InputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <Button>
            <SearchImg />
          </Button>
        </InputAdornment>
      )
    };
    return (
      <Page>
        <Navbar />
        <TicketNav setTicketsLoading={this.setTicketsLoading} />
        <div className={`app-body ${classes.root}`}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <TicketSidebar setTicketsLoading={this.setTicketsLoading} />
            </Grid>
            <Grid item xs={12} md={8} lg={9} xl={10}>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <Autocomplete
                    suggestions={autocompleteResults}
                    updateQueryFunction={this.searchTickets}
                    selectFunction={this.setSearchQuery}
                    InputProps={InputProps}
                  />
                </Grid>
                <Grid item xs={12} lg={6} />
                {isTicketsLoading ? (
                  <div className={classes.loading}>
                    <CircularProgress />
                  </div>
                ) : (
                  <React.Fragment>
                    {tickets.map(ticket => (
                      <Grid item xs={12} key={ticket.id}>
                        <TicketListItem ticket={ticket} />
                      </Grid>
                    ))}
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </Page>
    );
  }
}

export default withInfo(
  withUser(withTicketList(withRouter(withStyles(styles)(Home))))
);
