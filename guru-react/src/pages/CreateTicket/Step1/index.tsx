import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { colors } from "../../../theme";
import Autocomplete, { Suggestion } from "../../../components/Autocomplete";
import { setTicketCompany } from "../../../state/actions/ticket";
import { useSearch } from "../../../utils/hooks/tickets";
import { CreateTicketState } from "../../../state/types/state";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: colors.MAIN_BACKGROUND,
    padding: "2rem",
    [theme.breakpoints.down("sm")]: {
      padding: ".5rem"
    }
  }
}));

interface Props {
  ticket: CreateTicketState;
}

const Step1: FunctionComponent<Props> = ({ ticket }) => {
  const { companies, searchCompanies } = useSearch();
  const dispatch = useDispatch();
  const classes = useStyles();

  const setCompany = (selectedItem: Suggestion) => {
    const company = companies.find(item => item.id === selectedItem.id);
    if (company) {
      dispatch(setTicketCompany(company));
    }
  };

  const value = ticket.companyAssociation ? ticket.companyAssociation.name : "";
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
            updateQueryFunction={searchCompanies}
            selectFunction={setCompany}
            value={value}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Step1;
