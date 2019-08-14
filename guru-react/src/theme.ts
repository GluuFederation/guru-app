import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const colors = {
  MAIN_BACKGROUND: "#fff",
  SECONDARY_BACKGROUND: "#f1f5fb",
  TERTIARY_BACKGROUND: "#f8f9fb",
  LIGHT_BUTTON: "#e7eded",
  MAIN_COLOR: "#00b572",
  DARK_TEXT: "#181F1C",
  LIGHTER_TEXT: "#6f757b",
  VERY_LIGHT_TEXT: "#EFF1F4",
  LIGHT_BORDER: "#e3e7ea"
};

const muiTheme = createMuiTheme({
  // spacing: 12,
  palette: {
    primary: {
      main: colors.MAIN_COLOR
    }
  },
  typography: {
    fontFamily: '"Lato", sans-serif'
  },
  overrides: {
    MuiCardHeader: {
      root: {
        backgroundColor: colors.SECONDARY_BACKGROUND,
        padding: ".5em 1em",
        borderBottom: `1px solid ${colors.LIGHT_BORDER}`
      }
    },
    MuiPaper: {
      root: {
        border: `1px solid ${colors.LIGHT_BORDER}`
      }
    },
    MuiInputBase: {
      input: {
        backgroundColor: "#fff",
        borderRadius: ".1em",
        height: "1.5em"
      },
      root: {
        backgroundColor: "#fff"
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: "0.5em 1em"
      }
    },
    MuiInputAdornment: {
      root: {
        color: colors.MAIN_COLOR,
        "& path, & g": {
          fill: colors.MAIN_COLOR
        }
      }
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: colors.SECONDARY_BACKGROUND
        }
      }
    },
    MuiChip: {
      colorPrimary: {
        color: colors.MAIN_BACKGROUND
      },
      deleteIconColorPrimary: {
        color: colors.MAIN_BACKGROUND,
        "&:hover": {
          color: colors.VERY_LIGHT_TEXT
        }
      },
      root: {
        height: "inherit",
        paddingTop: ".3em",
        paddingBottom: ".3em",
        marginRight: ".5em",
        borderRadius: "none",
        marginBottom: ".8em"
      }
    },
    MuiButton: {
      root: {
        textTransform: "none"
      }
    }
  },
  shadows: [
    "none",
    "0px 1px 3px 0px rgba(0,0,0,0.1),0px 0px 0px 0px rgba(0,0,0,0.1),0px 0px 0px 0px rgba(0,0,0,0.1)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)"
  ]
});

const theme = responsiveFontSizes(muiTheme);

export default theme;
