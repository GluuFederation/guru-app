import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { paths } from "../../../routes";
import { colors } from "../../../theme";
import {
  setTicketHasProducts,
  setTicketStep
} from "../../../state/actions/ticket";
import { CreateTicketState } from "../../../state/types/state";
import { useDefaultStyles } from "../styles";

const useStyles = makeStyles({
  card: {
    "&:hover": {
      color: colors.MAIN_BACKGROUND,
      backgroundColor: colors.MAIN_COLOR
    }
  }
});

const Step7 = () => {
  const dispatch = useDispatch();
  const defaultClasses = useDefaultStyles();
  const classes = useStyles();
  const history = useHistory();

  const setHasProducts = (hasProducts: boolean) => () => {
    dispatch(setTicketHasProducts(hasProducts));
    if (hasProducts) {
      dispatch(setTicketStep(8));
      history.push(paths.getCreateTicketPath(8));
    } else {
      dispatch(setTicketStep(9));
      history.push(paths.getCreateTicketPath(9));
    }
  };

  return (
    <div className={defaultClasses.root}>
      <Grid container>
        <Grid item xs={12} md={10}>
          <p>Are any other Gluu products relevant to this support ticket?</p>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Card
                onClick={setHasProducts(false)}
                classes={{ root: classes.card }}
              >
                <CardContent>No</CardContent>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card
                onClick={setHasProducts(true)}
                classes={{ root: classes.card }}
              >
                <CardContent>Yes</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step7;
