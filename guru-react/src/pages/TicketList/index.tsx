import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { colors } from "../../theme";

import { paths } from "../../routes";
import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import NavLink from "../../components/NavLink";
import Footer from "../../components/Footer";
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
import { TicketFilterOrder } from "../../state/types/tickets";
import { TicketsFilterState } from "../../state/types/state";
import { initialFilters } from "../../state/reducers/tickets";
import { getSearchString } from "./filterQueries";

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithTicketListProps &
  WithUserProps &
  WithInfoProps;

interface State {
  filters: TicketsFilterState;
  isLoading: boolean;
  isTicketsLoading: boolean;
}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filters: initialFilters,
      isLoading: false,
      isTicketsLoading: false
    };
  }

  componentDidMount() {
    this.syncStateWithPath();
  }

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

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
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
        fetchTickets,
        filters
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
      fetchTickets(filters).then(tickets => {
        this.setState({ isLoading: false, isTicketsLoading: false });
      });
    });
  };

  render() {
    const { user } = this.props;
    return (
      <Page>
        <Navbar />
        <div className={`app-body`}>
          {user !== null ? (
            <Hidden smDown>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <NavLink
                    to={paths.TICKET_LIST}
                    search={getSearchString({ assignees: [user] })}
                  >
                    My assignment
                  </NavLink>
                </Grid>
              </Grid>
            </Hidden>
          ) : null}
        </div>
        <Footer />
      </Page>
    );
  }
}

export default withInfo(
  withUser(withTicketList(withRouter(withStyles(styles)(Home))))
);
