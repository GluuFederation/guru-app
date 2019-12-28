import React, { FunctionComponent } from "react";
import { Grid, Typography, Hidden } from "@material-ui/core";

import useStyles from "./styles";
import { useTicketPermissions } from "../../TicketDetail/hooks";
import Assignee from "./Assignee";
import Category from "./Category";
import Company from "./Company";
import CreatedDate from "./CreatedDate";
import Creator from "./Creator";
import IssueType from "./IssueType";
import Order from "./Order";
import Product from "./Product";
import Status from "./Status";

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

const SideBar: FunctionComponent<Props> = ({ setTicketsLoading }) => {
  const { isCommunity, isStaff } = useTicketPermissions(null);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          classes={{ root: `${classes.sideGrid} ${classes.topSideGrid}` }}
        >
          <Typography variant="h5">Advanced filter</Typography>
        </Grid>
        <Grid item xs={12} classes={{ root: classes.sideGrid }}>
          <Grid container spacing={1}>
            {isStaff ? (
              <>
                <Company setTicketsLoading={setTicketsLoading} />
                <Creator setTicketsLoading={setTicketsLoading} />
                <Assignee setTicketsLoading={setTicketsLoading} />
              </>
            ) : null}
            <Category setTicketsLoading={setTicketsLoading} />
            {isCommunity ? null : (
              <IssueType setTicketsLoading={setTicketsLoading} />
            )}
            <Product setTicketsLoading={setTicketsLoading} />
            <Status setTicketsLoading={setTicketsLoading} />
            <Hidden smUp>
              <Order setTicketsLoading={setTicketsLoading} />
            </Hidden>
            <CreatedDate setTicketsLoading={setTicketsLoading} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;
