import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { colors } from "../../../theme";
import { setTicketIssueType } from "../../../state/actions/ticket";
import { useInfoState } from "../../../state/hooks";
import { CreateTicketState } from "../../../state/types/state";
import { getCardClass } from "../../../utils/chipStyles";
import { useDefaultStyles } from "../styles";

const useStyles = makeStyles({
  isSelected: {
    backgroundColor: colors.MAIN_COLOR,
    color: colors.MAIN_BACKGROUND
  },
  issueText: {
    minHeight: "2.5em",
    wordWrap: "break-word"
  }
});

interface Props {
  ticket: CreateTicketState;
}

const Step3: FunctionComponent<Props> = ({ ticket }) => {
  const dispatch = useDispatch();
  const defaultClasses = useDefaultStyles();
  const classes = useStyles();
  const { issueTypes } = useInfoState();

  const setIssueType = (issueTypeId: number) => () => {
    const issueType = issueTypes.find(item => item.id === issueTypeId);
    if (issueType) {
      dispatch(setTicketIssueType(issueTypeId));
    }
  };

  const issueType = issueTypes.find(item => item.id === ticket.issueType);

  return (
    <div className={defaultClasses.root}>
      <Grid container>
        <Grid item xs={12} md={10}>
          <p>What type of ticket are you opening?</p>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container spacing={2}>
            {issueTypes.map(item => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <Card
                  onClick={setIssueType(item.id)}
                  classes={{
                    root: issueType
                      ? issueType.slug === item.slug
                        ? classes.isSelected
                        : getCardClass(item.slug)
                      : getCardClass(item.slug)
                  }}
                >
                  <CardContent classes={{ root: classes.issueText }}>
                    {item.name}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step3;
