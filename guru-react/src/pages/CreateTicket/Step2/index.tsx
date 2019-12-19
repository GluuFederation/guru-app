import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";

import Autocomplete, { Suggestion } from "../../../components/Autocomplete";
import { setTicketCreator } from "../../../state/actions/ticket";
import { CreateTicketState } from "../../../state/types/state";
import { useSearch } from "../../../utils/hooks/tickets";
import { useDefaultStyles } from "../styles";

interface Props {
  ticket: CreateTicketState;
}

const Step2: FunctionComponent<Props> = ({ ticket }) => {
  const { users, searchUsers } = useSearch();
  const dispatch = useDispatch();
  const classes = useDefaultStyles();

  const searchCompanyUsers = (q: string) => {
    searchUsers(
      q,
      ticket.companyAssociation ? ticket.companyAssociation.id : undefined
    );
  };

  const setCreatedFor = (selectedItem: Suggestion) => {
    const user = users.find(item => item.id === selectedItem.id);
    if (user) {
      dispatch(setTicketCreator(user));
    }
  };

  const value = ticket.createdFor
    ? `${ticket.createdFor.firstName} ${ticket.createdFor.otherNames} ${ticket.createdFor.lastName}`
    : "";

  const InputProps = {
    placeholder: "Search user..."
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
            updateQueryFunction={searchCompanyUsers}
            selectFunction={setCreatedFor}
            value={value}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Step2;
