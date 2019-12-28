import React, { FunctionComponent } from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";

import { useTicketsState, useInfoState } from "../../../../state/hooks/state";
import useTicketsActions from "../../../../state/hooks/actions/tickets";
import FilterTag, { FilterType } from "../../FilterTag";

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const Status: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { filters } = useTicketsState();
  const { statuses } = useInfoState();
  const { addFilterStatus, fetchTickets } = useTicketsActions();

  const setStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
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

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <span>Status:</span>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
            onChange={setStatus}
          >
            {statuses.map(status => (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Status;
