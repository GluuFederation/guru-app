import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

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
}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let filters = { ...initialFilters };
    const params = new URLSearchParams(this.props.location.search);

    const companiesString = params.get("companies");
    if (companiesString) {
      const companies: Array<any> = companiesString
        .split(",")
        .map(id => parseInt(id, 10))
        .map(id => {
          return {
            id,
            name: ""
          };
        });
      filters.companies = companies;
    }

    if (companiesString) {
      const companies: Array<any> = companiesString
        .split(",")
        .map(id => parseInt(id, 10))
        .map(id => {
          return {
            id,
            name: ""
          };
        });
      filters.companies = companies;
    }

    this.state = {
      filters
    };
  }

  componentDidMount() {}

  getSearchString = (params: {
    companies?: Array<Company>;
    creators?: Array<ShortUser>;
    assignees?: Array<ShortUser>;
    issueTypes?: Array<TicketIssueType>;
    products?: Array<GluuProduct>;
    statuses?: Array<TicketStatus>;
    categories?: Array<TicketCategory>;
    startDate?: string;
    endDate?: string;
    query?: string;
    order?: TicketFilterOrder;
    page?: number;
    pageItems?: number;
  }): string => {
    let searchString = "?";
    const {
      companies,
      creators,
      assignees,
      issueTypes,
      products,
      statuses,
      categories,
      startDate,
      endDate,
      query,
      order,
      page,
      pageItems
    } = params;
    if (companies) {
      searchString += "companies=";
      companies.forEach(item => {
        searchString += `${item.id},`;
      });
      searchString += "&";
    }
    if (creators) {
      searchString += "creators=";
      creators.forEach(item => {
        searchString += `${item.id},`;
      });
      searchString += "&";
    }
    if (assignees) {
      searchString += "assignees=";
      assignees.forEach(item => {
        searchString += `${item.id},`;
      });
      searchString += "&";
    }
    if (issueTypes) {
      searchString += "types=";
      issueTypes.forEach(item => {
        searchString += `${item.id},`;
      });
      searchString += "&";
    }
    if (products) {
      searchString += "products=";
      products.forEach(item => {
        searchString += `${item.id},`;
      });
      searchString += "&";
    }
    if (statuses) {
      searchString += "statuses=";
      statuses.forEach(item => {
        searchString += `${item.id},`;
      });
      searchString += "&";
    }
    if (categories) {
      searchString += "categories=";
      categories.forEach(item => {
        searchString += `${item.id},`;
      });
      searchString += "&";
    }
    if (startDate) {
      searchString += `start=${startDate}&`;
    }
    if (endDate) {
      searchString += `end=${endDate}&`;
    }
    if (query) {
      searchString += `q=${query}&`;
    }
    if (order) {
      searchString += `ordering=${order}&`;
    }
    if (page && pageItems) {
      searchString += `offset=${(page - 1) * pageItems}&limit=${pageItems}`;
    }
    return searchString;
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
                    search={this.getSearchString({ assignees: [user] })}
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
