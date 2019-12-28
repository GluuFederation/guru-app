import React, { FunctionComponent } from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";

import { useTicketsState } from "../../../../state/hooks/state";
import useTicketsActions from "../../../../state/hooks/actions/tickets";
import { TicketFilterOrder } from "../../../../state/types/tickets";

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const Order: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { filters } = useTicketsState();
  const { setFilterOrder, fetchTickets } = useTicketsActions();

  const setOrder = (event: React.ChangeEvent<{ value: unknown }>) => {
    const order = event.target.value as TicketFilterOrder;
    setFilterOrder(order);
    setTicketsLoading(true);
    fetchTickets(true).then(() => {
      setTicketsLoading(false);
    });
  };

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <span>Order by:</span>
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            variant="outlined"
            margin="dense"
            value={filters.order ? filters.order : ""}
            onChange={setOrder}
          >
            <MenuItem value={TicketFilterOrder.MostRecent}>
              Most recent
            </MenuItem>
            <MenuItem value={TicketFilterOrder.LeastRecent}>
              Least recent
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Order;
