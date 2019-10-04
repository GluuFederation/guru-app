import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
// import ExpandMore from "@material-ui/icons/ExpandMore";

import { colors } from "../../theme";
import { withUser, WithUserProps } from "../../state/hocs/profiles";
import { withTicketList, WithTicketListProps } from "../../state/hocs/tickets";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import { ShortUser, Company } from "../../state/types/profiles";
import { emptyUser } from "../../state/preloaded/profiles";
import Autocomplete, { Suggestion } from "../../components/Autocomplete";
import FilterTag, { FilterType } from "./FilterTag";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: colors.MAIN_BACKGROUND,
      paddingLeft: "1em",
      paddingRight: "1em"
    },
    caretIcon: {
      marginBottom: "-.2em",
      height: ".8em"
    },
    inputSet: {
      marginTop: ".8em"
    }
  });

interface ExternalProps {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithUserProps &
  WithTicketListProps &
  WithInfoProps &
  ExternalProps;

interface State {
  companies: Array<Company & Suggestion>;
  users: Array<ShortUser & Suggestion>;
}

class TicketSidebar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      companies: [],
      users: []
    };
  }

  navigateTo = (path: string) => () => {
    this.props.history.push(path);
  };

  searchCreators = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/users/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      this.setState({
        users: response.data.results
          .map((result: ShortUser) => ({
            ...result,
            text: `${result.firstName} ${result.lastName}`
          }))
          .slice(0, 5)
      });
    });
  };

  searchAssignees = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/users/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      this.setState({
        users: [
          ...response.data.results
            .map((result: ShortUser) => ({
              ...result,
              text: `${result.firstName} ${result.lastName}`
            }))
            .slice(0, 5),
          { ...emptyUser, id: -1, text: "Assigned" },
          { ...emptyUser, id: -2, text: "Unassigned" }
        ]
      });
    });
  };

  searchCompanies = (q: string) => {
    const url = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/access-list/companies/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      this.setState({
        companies: [
          ...response.data.results
            .map((result: Company) => ({
              ...result,
              text: `${result.name}`
            }))
            .slice(0, 5)
        ]
      });
    });
  };

  setCompany = (selectedItem: Suggestion) => {
    const { addFilterCompany, fetchTickets, setTicketsLoading } = this.props;
    const { companies } = this.state;
    const company = companies.find(item => item.id === selectedItem.id);
    if (company) {
      addFilterCompany(company);
      setTicketsLoading(true);
      fetchTickets(true).then(() => {
        setTicketsLoading(false);
      });
    }
  };

  setCreator = (selectedItem: Suggestion) => {
    const { addFilterCreator, fetchTickets, setTicketsLoading } = this.props;
    const { users } = this.state;
    const user = users.find(item => item.id === selectedItem.id);
    if (user) {
      addFilterCreator(user);
      setTicketsLoading(true);
      fetchTickets(true).then(() => {
        setTicketsLoading(false);
      });
    }
  };

  setAssignee = (selectedItem: Suggestion) => {
    const { addFilterAssignee, fetchTickets, setTicketsLoading } = this.props;
    const { users } = this.state;
    const user = users.find(item => item.id === selectedItem.id);
    if (user) {
      addFilterAssignee(user);
      setTicketsLoading(true);
      fetchTickets(true).then(() => {
        setTicketsLoading(false);
      });
    }
  };

  setCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { addFilterCategory, fetchTickets, setTicketsLoading } = this.props;
    const { info } = this.props;
    const { categories } = info;
    const category = categories.find(
      item => item.id === parseInt(event.target.value as string, 10)
    );
    if (category) {
      addFilterCategory(category);
      setTicketsLoading(true);
      fetchTickets(true).then(() => {
        setTicketsLoading(false);
      });
    }
  };

  setProduct = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { addFilterProduct, fetchTickets, setTicketsLoading } = this.props;
    const { info } = this.props;
    const { products } = info;
    const product = products.find(
      item => item.id === parseInt(event.target.value as string, 10)
    );
    if (product) {
      addFilterProduct(product);
      setTicketsLoading(true);
      fetchTickets(true).then(() => {
        setTicketsLoading(false);
      });
    }
  };

  setIssueType = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { addFilterIssueType, fetchTickets, setTicketsLoading } = this.props;
    const { info } = this.props;
    const { issueTypes } = info;
    const issueType = issueTypes.find(
      item => item.id === parseInt(event.target.value as string, 10)
    );
    if (issueType) {
      addFilterIssueType(issueType);
      setTicketsLoading(true);
      fetchTickets(true).then(() => {
        setTicketsLoading(false);
      });
    }
  };

  setStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { addFilterStatus, fetchTickets, setTicketsLoading } = this.props;
    const { info } = this.props;
    const { statuses } = info;
    const status = statuses.find(
      item => item.id === parseInt(event.target.value as string, 10)
    );
    if (status) {
      addFilterStatus(status);
      setTicketsLoading(true);
      fetchTickets(true).then(() => {
        setTicketsLoading(false);
      });
    }
  };

  setStartDate = (startDate: Date | null) => {
    const { setFilterStartDate, fetchTickets, setTicketsLoading } = this.props;
    let dateString = "";
    if (startDate) {
      const date = moment(startDate);
      dateString = date.format("YYYY-MM-DD");
    }
    setFilterStartDate(dateString);
    setTicketsLoading(true);
    fetchTickets(true).then(() => {
      setTicketsLoading(false);
    });
  };

  setEndDate = (endDate: Date | null) => {
    const { setFilterEndDate, fetchTickets, setTicketsLoading } = this.props;
    let dateString = "";
    if (endDate) {
      const date = moment(endDate);
      dateString = date.format("YYYY-MM-DD");
    }
    setFilterEndDate(dateString);
    setTicketsLoading(true);
    fetchTickets(true).then(() => {
      setTicketsLoading(false);
    });
  };

  render() {
    const { classes, user, info, filters, setTicketsLoading } = this.props;
    const { companies, users } = this.state;
    const { statuses, categories, issueTypes, products } = info;
    const isStaff = user
      ? user.role
        ? user.role.name === "staff"
        : false
      : false;
    const isCommunity = user
      ? user.role
        ? user.role.name === "community"
        : true
      : true;

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <br />
            <Typography variant="h6">Advanced Filter</Typography>
            <br />
            <Divider />
            {isStaff ? (
              <React.Fragment>
                <Box className={classes.inputSet}>
                  <Box mb={1}>
                    <span>Company:</span>
                  </Box>
                  <Box>
                    {filters.companies.map(company => (
                      <FilterTag
                        key={company.id}
                        tag={{
                          ...company,
                          text: `${company.name}`,
                          type: FilterType.Company
                        }}
                        setTicketsLoading={setTicketsLoading}
                      />
                    ))}
                  </Box>
                  <Autocomplete
                    suggestions={companies}
                    updateQueryFunction={this.searchCompanies}
                    selectFunction={this.setCompany}
                    InputProps={{
                      placeholder: "Select Company"
                    }}
                  />
                </Box>
                <Box className={classes.inputSet}>
                  <Box mb={1}>
                    <span>Created By:</span>
                  </Box>
                  <Box>
                    {filters.creators.map(creator => (
                      <FilterTag
                        key={creator.id}
                        tag={{
                          ...creator,
                          text: `${creator.firstName} ${creator.lastName}`,
                          type: FilterType.Creator
                        }}
                        setTicketsLoading={setTicketsLoading}
                      />
                    ))}
                  </Box>
                  <Autocomplete
                    suggestions={users}
                    updateQueryFunction={this.searchCreators}
                    selectFunction={this.setCreator}
                    InputProps={{
                      placeholder: "Select Creator"
                    }}
                  />
                </Box>
                <Box className={classes.inputSet}>
                  <Box mb={1}>
                    <span>Assigned To:</span>
                  </Box>
                  <Box>
                    {filters.assignees.map(assignee => (
                      <FilterTag
                        key={assignee.id}
                        tag={{
                          ...assignee,
                          text: `${assignee.firstName} ${assignee.lastName}`,
                          type: FilterType.Assignee
                        }}
                        setTicketsLoading={setTicketsLoading}
                      />
                    ))}
                  </Box>
                  <Autocomplete
                    suggestions={users}
                    updateQueryFunction={this.searchAssignees}
                    selectFunction={this.setAssignee}
                    InputProps={{
                      placeholder: "Select Assignee"
                    }}
                  />
                </Box>
              </React.Fragment>
            ) : null}

            <div className={classes.inputSet}>
              <div>
                <span>Category:</span>
              </div>
              <div>
                {filters.categories.map(category => (
                  <FilterTag
                    key={category.id}
                    tag={{
                      ...category,
                      text: category.name,
                      type: FilterType.Category
                    }}
                    setTicketsLoading={setTicketsLoading}
                  />
                ))}
              </div>
              <TextField
                select
                fullWidth
                variant="outlined"
                margin="dense"
                value={
                  filters.categories.length
                    ? filters.categories[filters.categories.length - 1].name
                    : ""
                }
                onChange={this.setCategory}
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.inputSet}>
              <div>
                <span>Product:</span>
              </div>
              <div>
                {filters.products.map(product => (
                  <FilterTag
                    key={product.id}
                    tag={{
                      ...product,
                      text: product.name,
                      type: FilterType.Product
                    }}
                    setTicketsLoading={setTicketsLoading}
                  />
                ))}
              </div>
              <TextField
                select
                fullWidth
                variant="outlined"
                margin="dense"
                value={
                  filters.products.length
                    ? filters.products[filters.products.length - 1].name
                    : ""
                }
                onChange={this.setProduct}
              >
                {products.map(product => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {isCommunity ? null : (
              <div className={classes.inputSet}>
                <div>
                  <span>Issue Type:</span>
                </div>
                <div>
                  {filters.issueTypes.map(issueType => (
                    <FilterTag
                      key={issueType.id}
                      tag={{
                        ...issueType,
                        text: issueType.name,
                        type: FilterType.IssueType
                      }}
                      setTicketsLoading={setTicketsLoading}
                    />
                  ))}
                </div>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  value={
                    filters.issueTypes.length
                      ? filters.issueTypes[filters.issueTypes.length - 1].name
                      : ""
                  }
                  onChange={this.setIssueType}
                >
                  {issueTypes.map(issueType => (
                    <MenuItem key={issueType.id} value={issueType.id}>
                      {issueType.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            )}

            <div className={classes.inputSet}>
              <div>
                <span>Status:</span>
              </div>
              <div>
                {filters.statuses.map(status => (
                  <FilterTag
                    key={status.id}
                    tag={{
                      ...status,
                      text: status.name,
                      type: FilterType.Status
                    }}
                    setTicketsLoading={setTicketsLoading}
                  />
                ))}
              </div>
              <TextField
                select
                fullWidth
                variant="outlined"
                margin="dense"
                value={
                  filters.statuses.length
                    ? filters.statuses[filters.statuses.length - 1].name
                    : ""
                }
                onChange={this.setStatus}
              >
                {statuses.map(status => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.inputSet}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div>
                  <span>Created Date:</span>
                </div>
                <div>
                  <span>
                    <small>From:</small>
                  </span>
                </div>
                <KeyboardDatePicker
                  margin="dense"
                  value={
                    moment(filters.startDate).isValid()
                      ? moment(filters.startDate).toDate()
                      : null
                  }
                  onChange={this.setStartDate}
                  maxDate={
                    moment(filters.endDate).isValid()
                      ? moment(filters.endDate).toDate()
                      : null
                  }
                  inputVariant="outlined"
                  clearable={true}
                />
                <div>
                  <span>
                    <small>To:</small>
                  </span>
                </div>
                <KeyboardDatePicker
                  margin="dense"
                  value={
                    moment(filters.endDate).isValid()
                      ? moment(filters.endDate).toDate()
                      : null
                  }
                  onChange={this.setEndDate}
                  minDate={
                    moment(filters.startDate).isValid()
                      ? moment(filters.startDate).toDate()
                      : null
                  }
                  inputVariant="outlined"
                  clearable={true}
                />
              </MuiPickersUtilsProvider>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTicketList(
  withInfo(withUser(withRouter(withStyles(styles)(TicketSidebar))))
);
