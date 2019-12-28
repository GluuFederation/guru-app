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

const Assignee: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { filters } = useTicketsState();
  const { staff, searchStaff } = useSearch();
  const { addFilterAssignee, fetchTickets } = useTicketsActions();

  const setAssignee = (selectedItem: Suggestion) => {
    const assignee = staff.find(item => item.id === selectedItem.id);
    if (assignee) {
      addFilterAssignee(assignee);
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
          <span>Assigned To:</span>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            suggestions={staff}
            updateQueryFunction={searchStaff}
            selectFunction={setAssignee}
            InputProps={{
              placeholder: "Select Assignee"
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Assignee;
