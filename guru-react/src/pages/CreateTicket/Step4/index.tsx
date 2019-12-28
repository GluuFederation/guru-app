import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Icon from "@material-ui/core/Icon";
import CardContent from "@material-ui/core/CardContent";

import { colors } from "../../../theme";
import { setTicketCategory } from "../../../state/actions/ticket";
import { useInfoState } from "../../../state/hooks/state";
import { CreateTicketState } from "../../../state/types/state";
import { getCardClass } from "../../../utils/chipStyles";
import { useDefaultStyles } from "../styles";
import { getCategoryComponentFromSlug } from "../../../utils/info";

const useStyles = makeStyles({
  categoryText: {
    textAlign: "center"
  },
  categoryIcon: {
    textAlign: "center",
    marginTop: "1em"
  },
  isSelected: {
    color: colors.MAIN_BACKGROUND,
    backgroundColor: colors.MAIN_COLOR,
    "& g": {
      fill: colors.MAIN_BACKGROUND,
      path: colors.MAIN_BACKGROUND
    }
  }
});

interface Props {
  ticket: CreateTicketState;
}

const Step4: FunctionComponent<Props> = ({ ticket }) => {
  const dispatch = useDispatch();
  const defaultClasses = useDefaultStyles();
  const classes = useStyles();
  const { categories } = useInfoState();

  const setCategory = (categoryId: number) => () => {
    const category = categories.find(item => item.id === categoryId);
    if (category) {
      dispatch(setTicketCategory(categoryId));
    }
  };

  const category = categories.find(item => item.id === ticket.category);

  return (
    <div className={defaultClasses.root}>
      <Grid container>
        <Grid item xs={12} md={10}>
          <p>What type of ticket are you opening?</p>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container spacing={2}>
            {categories.map(item => {
              const Icon = getCategoryComponentFromSlug(item.slug);
              return (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Card
                    onClick={setCategory(item.id)}
                    classes={{
                      root:
                        category && category.slug === item.slug
                          ? classes.isSelected
                          : ""
                    }}
                  >
                    <CardMedia classes={{ root: classes.categoryIcon }}>
                      <Icon></Icon>
                    </CardMedia>
                    <CardContent classes={{ root: classes.categoryText }}>
                      {item.name}
                    </CardContent>
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

export default Step4;
