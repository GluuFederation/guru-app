import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

import { colors } from "../../theme";

export const useDefaultStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: colors.MAIN_BACKGROUND,
    padding: "2rem",
    [theme.breakpoints.down("sm")]: {
      padding: ".5rem"
    }
  }
}));
