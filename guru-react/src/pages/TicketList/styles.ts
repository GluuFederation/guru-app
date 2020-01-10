import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

import { colors } from "../../theme";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "inherit",
    padding: "3rem 8rem 8rem 8rem",
    wordWrap: "break-word",
    [theme.breakpoints.down("md")]: {
      padding: "3rem 4rem 8rem 4rem"
    },
    [theme.breakpoints.down("xs")]: {
      padding: "3rem 1rem 30rem 1rem"
    }
  },
  ticketCount: {
    marginTop: "1.5em"
  },
  loading: {
    textAlign: "center",
    width: "100%",
    margin: "5em"
  },
  filterList: {
    height: "2rem"
  },
  modalContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.MAIN_BACKGROUND,
    height: "90vh",
    marginTop: "10vh"
  },
  modalScrollContainer: {
    maxHeight: "73vh",
    overflowY: "scroll",
    overflowX: "hidden"
  },
  applyButton: {
    color: colors.MAIN_BACKGROUND,
    backgroundColor: colors.MAIN_COLOR,
    fontSize: "1rem"
  },
  clearButton: {
    fontSize: ".8rem"
  },
  modalButtonContainer: {
    padding: "1rem"
  },
  paginationContainer: {
    marginTop: "2em",
    listStyle: "none",
    "& li": {
      display: "inline-block",
      backgroundColor: colors.MAIN_BACKGROUND,
      marginLeft: ".7em",
      border: `1px solid ${colors.VERY_LIGHT_TEXT}`,
      borderRadius: ".2em"
    },
    "& li.selected": {
      backgroundColor: colors.MAIN_COLOR,
      color: colors.MAIN_BACKGROUND
    },
    "& li:hover": {
      border: `1px solid ${colors.MAIN_COLOR}`,
      cursor: "pointer"
    },
    "& li a": {
      padding: ".5em",
      display: "inline-block"
    },
    "& li a:focus": {
      outline: "none"
    }
  }
}));

export default useStyles;
