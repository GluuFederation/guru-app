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
import { ShortCompany, ShortUser } from "../../state/types/profiles";

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
  users: Array<ShortUser & Suggestion>;
  isLoading: boolean;
}

class CreateTicket extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false
    };
  }

  searchUsers = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/users/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      this.setState({
        users: [
          ...response.data.results
            .map((result: ShortUser) => ({
              ...result,
              text: `${result.firstName} ${result.otherNames} ${result.lastName}`
            }))
            .slice(0, 5)
        ]
      });
    });
  };

  setCreatedFor = (selectedItem: Suggestion) => {
    const { setCreateTicketCreator } = this.props;
    const { users } = this.state;
    const user = users.find(item => item.id === selectedItem.id);
    console.log(user);
    if (user) {
      setCreateTicketCreator(user);
    }
  };

  render() {
    const { classes, newTicket, user } = this.props;
    const { isLoading, users } = this.state;

    const InputProps = {
      placeholder: "Search user...",
      value: newTicket.companyAssociation
        ? newTicket.companyAssociation.name
        : ""
    };

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={10}>
            <p>Who are you creating the ticket on behalf of?</p>
          </Grid>
          <Grid item xs={12} md={10}>
            <Autocomplete
              InputProps={InputProps}
              suggestions={users}
              updateQueryFunction={this.searchUsers}
              selectFunction={this.setCreatedFor}
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
