import React, { FunctionComponent } from "react";
import moment from "moment";
import { Grid, TextField, MenuItem } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useTicketsState } from "../../../../state/hooks/state";
import useTicketsActions from "../../../../state/hooks/actions/tickets";

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const CreatedDate: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { filters } = useTicketsState();
  const {
    setFilterStartDate,
    setFilterEndDate,
    fetchTickets
  } = useTicketsActions();

  const setStartDate = (startDate: Date | null) => {
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

  const setEndDate = (endDate: Date | null) => {
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

  return (
    <Grid item xs={12}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
          <Grid item xs={12}>
            <span>Created Date:</span>
          </Grid>
          <Grid item xs={12}>
            <span>
              <small>From:</small>
            </span>
          </Grid>
          <Grid item xs={12}>
            <KeyboardDatePicker
              fullWidth
              margin="dense"
              value={
                moment(filters.startDate).isValid()
                  ? moment(filters.startDate).toDate()
                  : null
              }
              onChange={setStartDate}
              maxDate={
                moment(filters.endDate).isValid()
                  ? moment(filters.endDate).toDate()
                  : null
              }
              inputVariant="outlined"
              clearable={true}
            />
          </Grid>
          <Grid item xs={12}>
            <span>
              <small>To:</small>
            </span>
          </Grid>
          <Grid item xs={12}>
            <KeyboardDatePicker
              fullWidth
              margin="dense"
              value={
                moment(filters.endDate).isValid()
                  ? moment(filters.endDate).toDate()
                  : null
              }
              onChange={setEndDate}
              minDate={
                moment(filters.startDate).isValid()
                  ? moment(filters.startDate).toDate()
                  : null
              }
              inputVariant="outlined"
              clearable={true}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default CreatedDate;
