import React, { FunctionComponent } from "react";
import { Grid } from "@material-ui/core";

import { useTicketsState } from "../../../../state/hooks/state";
import useTicketsActions from "../../../../state/hooks/actions/tickets";
import useStyles from "../styles";
import FilterTag, { FilterType } from "../../FilterTag";
import { useSearch } from "../../../../utils/hooks/tickets";
import Autocomplete, { Suggestion } from "../../../../components/Autocomplete";

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const Company: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { filters } = useTicketsState();
  const classes = useStyles();
  const { companies, searchCompanies } = useSearch();
  const { addFilterCompany, fetchTickets } = useTicketsActions();

  const setCompany = (selectedItem: Suggestion) => {
    const company = companies.find(item => item.id === selectedItem.id);
    if (company) {
      addFilterCompany(company);
      setTicketsLoading(true);
      fetchTickets(true).then(() => {
        setTicketsLoading(false);
      });
    }
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <span>Company:</span>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            suggestions={companies}
            updateQueryFunction={searchCompanies}
            selectFunction={setCompany}
            InputProps={{
              placeholder: "Select Company"
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Company;
