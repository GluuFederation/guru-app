import { makeStyles } from "@material-ui/styles";

import { colors } from "../../../theme";

export const useStyles = makeStyles({
  divider: {
    marginTop: ".7rem"
  },
  autoCompleteInput: {
    marginRight: "1em",
    marginLeft: "1em",
    width: "12em"
  },
  autoCompletePaper: {
    maxHeight: "none"
  },
  titleText: {
    color: colors.LIGHTER_TEXT
  }
});
