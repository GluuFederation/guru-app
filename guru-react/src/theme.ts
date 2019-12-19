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
  LIGHT_BORDER: "#e3e7ea",

  LIGHT_BLUE_BG: "rgba(31, 191, 221, 0.15)",
  LIGHT_BLUE: "#1fbfdd",
  GREEN_BG: "rgba(65, 204, 34, 0.15)",
  GREEN: "#41cc22",
  GRAY_BG: "rgba(0, 0, 0, 0.15)",
  GRAY: "#4a4a4a",
  YELLOW_BG: "rgba(255, 188, 22, 0.15)",
  YELLOW: "#ffbc16",
  RED_BG: "rgba(255, 89, 28, 0.15)",
  RED: "#ff591c",
  PURPLE_BG: "rgba(183, 54, 255, 0.15)",
  PURPLE: "#b736ff",
  BLUE_BG: "rgba(120, 110, 255, 0.15)",
  BLUE: "#786eff"
};

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.MAIN_COLOR
    }
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    fontSize: 10
  },
  overrides: {
    MuiTypography: {
      root: {
        wordBreak: "normal"
      },
      body1: {
        fontSize: ".9rem"
      },
      body2: {
        fontSize: ".9rem"
      }
    },
    MuiCardHeader: {
      root: {
        backgroundColor: colors.SECONDARY_BACKGROUND,
        padding: ".5em 1em",
        borderBottom: `1px solid ${colors.LIGHT_BORDER}`
      },
      action: {
        justifyContent: "center"
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
        fontSize: "1rem"
      },
      root: {
        fontSize: "1rem",
        backgroundColor: "#fff",
        "&$focused": {
          outlineWidth: "1px",
          borderWidth: "1px"
        }
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
      },
      root: {
        fontSize: ".9rem"
      }
    },
    MuiListItemText: {
      root: {
        fontSize: "1rem"
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
        fontSize: ".8rem",
        height: "inherit",
        paddingTop: ".3em",
        paddingBottom: ".3em",
        marginRight: ".5em",
        borderRadius: ".2rem",
        marginBottom: ".8em"
      }
    },
    MuiButton: {
      root: {
        textTransform: "none"
      },
      label: {
        fontSize: ".9rem"
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: ".9rem"
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
