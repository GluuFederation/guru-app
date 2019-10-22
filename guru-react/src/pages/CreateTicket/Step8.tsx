import React, { Component } from "react";
import axios from "axios";

import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { colors } from "../../theme";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import {
  WithCreateTicketProps,
  withCreateTicket
} from "../../state/hocs/ticket";
import { WithInfoProps, withInfo } from "../../state/hocs/info";
import { withRouter, RouteComponentProps } from "react-router-dom";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "5em"
    }
  });

type Props = WithUserProps &
  WithCreateTicketProps &
  WithInfoProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

interface State {
  product: number;
  version: string;
  os: string;
  osVersion: string;
  errorMessage: string;
  isLoading: boolean;
}

class Step8 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      product: NaN,
      version: "",
      os: "",
      osVersion: "",
      errorMessage: ""
    };
  }

  changeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gluuProduct = parseInt(event.target.value, 10);
    const isProductValid =
      this.props.info.products.find(item => item.id === gluuProduct) !==
      undefined;
    if (!isNaN(gluuProduct) && isProductValid) {
      const product = gluuProduct;
      this.setState({ product }, () => {
        this.saveProduct();
      });
    } else {
      this.setState({ product: NaN }, () => {
        this.saveProduct();
      });
    }
  };

  changeOsVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const osVersion = event.target.value;
    this.setState({ osVersion }, () => {
      this.saveProduct();
    });
  };

  changeVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const version = event.target.value;
    this.setState({ version }, () => {
      this.saveProduct();
    });
  };

  changeOs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const os = event.target.value;
    this.setState({ os }, () => {
      this.saveProduct();
    });
  };

  saveProduct = () => {
    const { product, version, os, osVersion } = this.state;
    if (!isNaN(product) && version && os && osVersion) {
      const { updateNewTicket, newTicket } = this.props;
      updateNewTicket({
        ...newTicket,
        products: [
          ...newTicket.products.filter(item => item.id && item.id !== NaN),
          { ...this.state, id: NaN }
        ]
      });
    }
  };

  render() {
    const { classes, info } = this.props;
    const { product, version, osVersion, os } = this.state;
    const { products } = info;
    const gluuProduct = products.find(item => item.id === product);
    const versionOptions = gluuProduct ? gluuProduct.version : [];
    const osOptions = gluuProduct
      ? [
          "Ubuntu",
          "CentOS",
          "RHEL",
          "Debian",
          "Docker",
          "RH Container",
          "Other"
        ]
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
              onChange={this.changeProduct}
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
              onChange={this.changeVersion}
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
              onChange={this.changeOs}
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
              onChange={this.changeOsVersion}
              fullWidth
              margin="dense"
              variant="outlined"
              disabled={!gluuProduct}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  withInfo(withCreateTicket(withUser(withStyles(styles)(Step8))))
);
