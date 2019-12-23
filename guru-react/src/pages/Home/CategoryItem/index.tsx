import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { colors } from "../../../theme";

import { paths } from "../../../routes";
import { TicketCategory } from "../../../state/types/info";
import { getSearchString } from "../../../utils/filterQueries";
import { getCategoryComponentFromSlug } from "../../../utils/info";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "7em",
    alignContent: "center",
    textAlign: "center",
    padding: "1em",
    paddingTop: "2em",
    border: `1px solid ${colors.VERY_LIGHT_TEXT}`,
    marginTop: "1px",
    marginBottom: "1px",
    "&:hover": {
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      marginTop: 0,
      marginBottom: 0,
      cursor: "pointer",
      "& g": {
        fill: theme.palette.primary.main
      }
    }
  },
  icon: {
    height: "3em",
    marginBottom: "-.1em",
    display: "inline",
    width: "auto"
  }
}));

interface Props {
  category: TicketCategory;
}

const CategoryItem: FunctionComponent<Props> = ({ category }) => {
  const history = useHistory();
  const classes = useStyles();
  const handleClick = () => {
    history.push(
      `${paths.TICKET_LIST}${getSearchString({
        categories: [category]
      })}`
    );
  };
  const Icon = getCategoryComponentFromSlug(category.slug);
  return (
    <Paper className={classes.root} onClick={handleClick}>
      <Icon className={classes.icon} />
      <p>{category.name}</p>
    </Paper>
  );
};

export default CategoryItem;
