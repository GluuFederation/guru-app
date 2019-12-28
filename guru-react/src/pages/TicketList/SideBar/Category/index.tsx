import React, { FunctionComponent } from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";

import { useTicketsState, useInfoState } from "../../../../state/hooks/state";
import useTicketsActions from "../../../../state/hooks/actions/tickets";
import FilterTag, { FilterType } from "../../FilterTag";

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const Category: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { filters } = useTicketsState();
  const { categories } = useInfoState();
  const { addFilterCategory, fetchTickets } = useTicketsActions();

  const setCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    const category = categories.find(
      item => item.id === parseInt(event.target.value as string, 10)
    );
    if (category) {
      addFilterCategory(category);
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
          <span>Category:</span>
        </Grid>
        <Grid item xs={12}>
          {filters.categories.map(category => (
            <FilterTag
              key={category.id}
              tag={{
                ...category,
                text: category.name,
                type: FilterType.Category
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
              filters.categories.length
                ? filters.categories[filters.categories.length - 1].name
                : ""
            }
            onChange={setCategory}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Category;
