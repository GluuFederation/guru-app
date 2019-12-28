import { makeStyles } from "@material-ui/styles";

import { colors } from "../../../theme";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: colors.MAIN_BACKGROUND
  },
  caretIcon: {
    marginBottom: "-.2rem",
    height: ".8rem"
  },
  inputSet: {
    marginTop: ".8rem"
  },
  sideGrid: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem"
  },
  topSideGrid: {
    borderBottom: `1px solid ${colors.VERY_LIGHT_TEXT}`,
    paddingTop: "1.5em",
    paddingBottom: "1em"
  }
});

export default useStyles;
