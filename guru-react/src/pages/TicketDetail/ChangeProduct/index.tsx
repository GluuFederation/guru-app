import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import {
  removeTicketProduct,
  addTicketProduct
} from "../../../state/actions/ticket";
import {
  deleteTicketProduct,
  updateTicketProduct,
  createTicketProduct
} from "../../../state/actions/tickets";
import { colors } from "../../../theme";
import { TicketProduct, Ticket } from "../../../state/types/tickets";
import { CreateTicketState } from "../../../state/types/state";
import {
  useInfoState,
  useTicketsState,
  useTicketState
} from "../../../state/hooks/state";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.MAIN_BACKGROUND,
    padding: "2em 5em"
  },
  saveButton: {
    color: colors.MAIN_BACKGROUND,
    backgroundColor: colors.MAIN_COLOR
  }
});

interface Props {
  product?: TicketProduct;
  closeModal: () => void;
  index?: number;
}

interface State {
  product?: number;
  version: string;
  os: string;
  osVersion: string;
  errorMessage: string;
}

const ChangeProduct: FunctionComponent<Props> = ({
  product,
  closeModal,
  index
}) => {
  const [gluuProduct, setGluuProduct] = useState<number | undefined>(undefined);
  const [version, setVersion] = useState("");
  const [os, setOs] = useState("");
  const [osVersion, setOsVersion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const info = useInfoState();
  const { ticketDetail } = useTicketsState();
  const { ticket: existingTicket } = ticketDetail;
  const newTicket = useTicketState();
  const classes = useStyles();

  useEffect(() => {
    if (product) {
      setGluuProduct(product.product);
      setVersion(product.version);
      setOs(product.os);
      setOsVersion(product.osVersion);
    }
  }, []);

  const ticket = index && existingTicket ? existingTicket : newTicket;

  const changeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const productId = parseInt(event.target.value, 10);
    const isProductValid =
      info.products.find(item => item.id === productId) !== undefined;
    if (!isNaN(productId) && isProductValid) {
      setGluuProduct(productId);
    } else {
      setGluuProduct(undefined);
    }
  };

  const changeOsVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOsVersion(event.target.value);
  };

  const changeVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVersion(event.target.value);
  };

  const changeOs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOs(event.target.value);
  };

  const removeProduct = (event: React.MouseEvent) => {
    event.preventDefault();
    if (product) {
      if (index) dispatch(removeTicketProduct(index));
      else if (ticket) deleteTicketProduct(ticket.slug, product)(dispatch);
    }
    closeModal();
  };

  const saveProduct = () => {
    let invalidFields = [];
    if (!gluuProduct) invalidFields.push("product");
    if (!version) invalidFields.push("version");
    if (!osVersion) invalidFields.push("os version");
    if (!os) invalidFields.push("os");

    if (invalidFields.length) {
      setErrorMessage(`Invalid entry for: ${invalidFields.join(", ")}`);
      return;
    }

    const updatedProduct: TicketProduct = {
      ...product,
      id: product ? product.id : NaN,
      product: gluuProduct as number,
      version,
      osVersion,
      os
    };

    console.log(index);
    if (index !== undefined) {
      if (!isNaN(index)) dispatch(removeTicketProduct(index));
      dispatch(addTicketProduct(updatedProduct));
      closeModal();
    } else if (product && gluuProduct) {
      updateTicketProduct(
        ticket.slug,
        updatedProduct
      )(dispatch).then(() => {
        closeModal();
      });
    } else if (gluuProduct) {
      createTicketProduct(
        ticket.slug,
        updatedProduct
      )(dispatch).then(() => {
        closeModal();
      });
    }
  };

  const { products } = info;
  const selectedProduct = products.find(item => item.id === gluuProduct);
  const versionOptions = selectedProduct ? selectedProduct.version : [];
  const osOptions = gluuProduct
    ? ["Ubuntu", "CentOS", "RHEL", "Debian", "Docker", "RH Container", "Other"]
    : [];

  return (
    <div className={classes.root}>
      <Typography variant="h6">
        {product ? "Change Product" : "Add additional product"}
      </Typography>{" "}
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <p>Which Product?</p>
          <TextField
            select
            required
            value={gluuProduct ? gluuProduct : ""}
            onChange={changeProduct}
            fullWidth
            margin="dense"
            variant="outlined"
          >
            {products.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p>What Version?</p>
          <TextField
            select
            required
            value={version}
            onChange={changeVersion}
            fullWidth
            margin="dense"
            variant="outlined"
          >
            {versionOptions.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p>Which OS?</p>
          <TextField
            select
            required
            value={os}
            onChange={changeOs}
            fullWidth
            margin="dense"
            variant="outlined"
          >
            {osOptions.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <p>What Version?</p>
          <TextField
            required
            value={osVersion}
            onChange={changeOsVersion}
            fullWidth
            margin="dense"
            variant="outlined"
            disabled={!gluuProduct}
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Button onClick={saveProduct} classes={{ root: classes.saveButton }}>
          {product ? "Update Product" : "Add Product"}
        </Button>{" "}
        &emsp;
        <Button onClick={closeModal}>Cancel</Button>
      </Box>
      <Box mt={4}>
        <Link onClick={removeProduct}>
          <small>Remove Product</small>
        </Link>
      </Box>
    </div>
  );
};

export default ChangeProduct;
