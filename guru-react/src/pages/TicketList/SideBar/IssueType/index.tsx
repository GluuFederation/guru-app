import React, { FunctionComponent } from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";

import { useTicketsState, useInfoState } from "../../../../state/hooks/state";
import useTicketsActions from "../../../../state/hooks/actions/tickets";
import FilterTag, { FilterType } from "../../FilterTag";

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const IssueType: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { filters } = useTicketsState();
  const { issueTypes } = useInfoState();
  const { addFilterIssueType, fetchTickets } = useTicketsActions();

  const setIssueType = (event: React.ChangeEvent<{ value: unknown }>) => {
    const issueType = issueTypes.find(
      item => item.id === parseInt(event.target.value as string, 10)
    );
    if (issueType) {
      addFilterIssueType(issueType);
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
          <span>Issue Type:</span>
        </Grid>
        <Grid item xs={12}>
          {filters.issueTypes.map(issueType => (
            <FilterTag
              key={issueType.id}
              tag={{
                ...issueType,
                text: issueType.name,
                type: FilterType.IssueType
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
              filters.issueTypes.length
                ? filters.issueTypes[filters.issueTypes.length - 1].name
                : ""
            }
            onChange={setIssueType}
          >
            {issueTypes.map(issueType => (
              <MenuItem key={issueType.id} value={issueType.id}>
                {issueType.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IssueType;
