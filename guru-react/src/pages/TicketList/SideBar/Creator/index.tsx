import React, { FunctionComponent } from "react";
import { Grid } from "@material-ui/core";

import { useTicketsState } from "../../../../state/hooks/state";
import useTicketsActions from "../../../../state/hooks/actions/tickets";
import FilterTag, { FilterType } from "../../FilterTag";
import { useSearch } from "../../../../utils/hooks/tickets";
import Autocomplete, { Suggestion } from "../../../../components/Autocomplete";

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const Creator: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { filters } = useTicketsState();
  const { users, searchUsers } = useSearch();
  const { addFilterCreator, fetchTickets } = useTicketsActions();

  const setCreator = (selectedItem: Suggestion) => {
    const user = users.find(item => item.id === selectedItem.id);
    if (user) {
      addFilterCreator(user);
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
          <span>Created By:</span>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            suggestions={users}
            updateQueryFunction={searchUsers}
            selectFunction={setCreator}
            InputProps={{
              placeholder: "Select Creator"
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Creator;
