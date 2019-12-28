import React, { FunctionComponent } from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";

import { useTicketsState, useInfoState } from "../../../../state/hooks/state";
import useTicketsActions from "../../../../state/hooks/actions/tickets";
import FilterTag, { FilterType } from "../../FilterTag";

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const Product: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { filters } = useTicketsState();
  const { products } = useInfoState();
  const { addFilterProduct, fetchTickets } = useTicketsActions();

  const setProduct = (event: React.ChangeEvent<{ value: unknown }>) => {
    const product = products.find(
      item => item.id === parseInt(event.target.value as string, 10)
    );
    if (product) {
      addFilterProduct(product);
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
          <span>Product:</span>
        </Grid>
        <Grid item xs={12}>
          {filters.products.map(product => (
            <FilterTag
              key={product.id}
              tag={{
                ...product,
                text: product.name,
                type: FilterType.Product
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
              filters.products.length
                ? filters.products[filters.products.length - 1].name
                : ""
            }
            onChange={setProduct}
          >
            {products.map(product => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
