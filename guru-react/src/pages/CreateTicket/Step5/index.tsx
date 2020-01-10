import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { colors } from "../../../theme";
import { setTicketGluuServer } from "../../../state/actions/ticket";
import { useInfoState } from "../../../state/hooks";
import { CreateTicketState } from "../../../state/types/state";
import { useDefaultStyles } from "../styles";

const useStyles = makeStyles({
  isSelected: {
    color: colors.MAIN_BACKGROUND,
    backgroundColor: colors.MAIN_COLOR
  }
});

interface Props {
  ticket: CreateTicketState;
}

const Step5: FunctionComponent<Props> = ({ ticket }) => {
  const dispatch = useDispatch();
  const defaultClasses = useDefaultStyles();
  const classes = useStyles();
  const { products } = useInfoState();

  const setVersion = (gluuServer: string) => () => {
    if (gluuServer) {
      dispatch(setTicketGluuServer(gluuServer));
    }
  };

  const gluuServerProduct = products.find(item => item.id === 1);
  if (!gluuServerProduct) return <div>Skip</div>;
  const gluuServer = ticket.gluuServer;

  return (
    <div className={defaultClasses.root}>
      <Grid container>
        <Grid item xs={12} md={10}>
          <p>What version of Gluu Server do you use?</p>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container spacing={2}>
            {gluuServerProduct.version.map(item => {
              return (
                <Grid item md={4} key={item}>
                  <Card
                    onClick={setVersion(item)}
                    classes={{
                      root: gluuServer === item ? classes.isSelected : ""
                    }}
                  >
                    <CardContent>{item}</CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step5;
