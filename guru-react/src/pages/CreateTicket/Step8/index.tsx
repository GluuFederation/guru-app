import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { useInfoState } from "../../../state/hooks";
import { updateNewTicket } from "../../../state/actions/ticket";
import { CreateTicketState } from "../../../state/types/state";
import { useDefaultStyles } from "../styles";

interface Props {
  ticket: CreateTicketState;
}

const Step8: FunctionComponent<Props> = ({ ticket }) => {
  const [product, setProduct] = useState<number>(NaN);
  const [version, setVersion] = useState("");
  const [os, setOs] = useState("");
  const [osVersion, setOsVersion] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const classes = useDefaultStyles();
  const { products } = useInfoState();

  const saveProduct = () => {
    if (!isNaN(product) && version && os && osVersion) {
      const state = {
        product,
        version,
        os,
        osVersion
      };
      dispatch(
        updateNewTicket({
          ...ticket,
          products: [
            ...ticket.products.filter(item => item.id && isNaN(item.id)),
            { ...state, id: NaN }
          ]
        })
      );
    }
  };

  useEffect(() => {
    saveProduct();
  }, [product]);

  useEffect(() => {
    saveProduct();
  }, [version]);

  useEffect(() => {
    saveProduct();
  }, [os]);

  useEffect(() => {
    saveProduct();
  }, [osVersion]);

  const changeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gluuProduct = parseInt(event.target.value, 10);
    const isProductValid =
      products.find(item => item.id === gluuProduct) !== undefined;
    if (!isNaN(gluuProduct) && isProductValid) {
      setProduct(gluuProduct);
    } else {
      setProduct(NaN);
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
  const gluuProduct = products.find(item => item.id === product);
  const versionOptions = gluuProduct ? gluuProduct.version : [];
  const osOptions = gluuProduct
    ? ["Ubuntu", "CentOS", "RHEL", "Debian", "Docker", "RH Container", "Other"]
    : [];

  return (
    <div className={classes.root}>
      <p>Add an additional product</p>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <p>Which Product?</p>
          <TextField
            select
            required
            value={!isNaN(product) ? product : ""}
            onChange={changeProduct}
            fullWidth
            margin="dense"
            variant="outlined"
          >
            {products.map(gluuProduct => (
              <MenuItem key={gluuProduct.id} value={gluuProduct.id}>
                {gluuProduct.name}
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
    </div>
  );
};

export default Step8;
