import React, { Component } from "react";
import axios from "axios";

import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { colors } from "../../theme";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import {
  WithCreateTicketProps,
  withCreateTicket
} from "../../state/hocs/ticket";
import { WithInfoProps, withInfo } from "../../state/hocs/info";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Autocomplete, { Suggestion } from "../../components/Autocomplete";
import { ShortCompany } from "../../state/types/profiles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "5em"
    }
  });

type Props = WithUserProps &
  WithCreateTicketProps &
  WithInfoProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

interface State {
  companies: Array<ShortCompany & Suggestion>;
  isLoading: boolean;
}

class CreateTicket extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      companies: [],
      isLoading: false
    };
  }

  searchCompanies = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/companies/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      this.setState({
        companies: [
          ...response.data.results
            .map((result: ShortCompany) => ({
              ...result,
              text: `${result.name}`
            }))
            .slice(0, 5)
        ]
      });
    });
  };

  setCompany = (selectedItem: Suggestion) => {
    const { setCreateTicketCompany } = this.props;
    const { companies } = this.state;
    const company = companies.find(item => item.id === selectedItem.id);
    if (company) {
      setCreateTicketCompany(company);
    }
  };

  render() {
    const { classes, newTicket } = this.props;
    const { companies } = this.state;
    const value = newTicket.companyAssociation
      ? newTicket.companyAssociation.name
      : "";

    const InputProps = {
      placeholder: "Search company..."
    };

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={10}>
            <p>Which organization are you creating the ticket on behalf of?</p>
          </Grid>
          <Grid item xs={12} md={10}>
            <Autocomplete
              InputProps={InputProps}
              suggestions={companies}
              updateQueryFunction={this.searchCompanies}
              selectFunction={this.setCompany}
              value={value}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  withInfo(withCreateTicket(withUser(withStyles(styles)(CreateTicket))))
);
