import React, { Component } from "react";
import Downshift from "downshift";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { colors } from "../theme";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: colors.MAIN_BACKGROUND,
      paddingBottom: "4em",
      paddingLeft: "1em",
      paddingRight: "1em"
    }
  });

export interface Suggestion {
  id: number;
  text: string;
}

interface ExternalProps {
  InputProps?: Partial<OutlinedInputProps>;
  updateQueryFunction?: (query: string) => void;
  selectFunction?: (selectedItems: Array<Suggestion>) => void;
  suggestions: Array<Suggestion>;
}

type Props = WithStyles<typeof styles> & ExternalProps;

interface State {
  searchQuery: string;
  selectedItems: Array<Suggestion>;
}

class Autocomplete extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: "",
      selectedItems: []
    };
  }

  changeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery }, () => {
      const { updateQueryFunction } = this.props;
      if (updateQueryFunction) updateQueryFunction(searchQuery);
    });
  };

  handleChange = (item: Suggestion) => {
    let selectedItems = [...this.state.selectedItems];
    selectedItems = selectedItems.filter(
      selectedItem => item.id !== selectedItem.id
    );
    selectedItems.push(item);
    this.setState({ searchQuery: item.text, selectedItems }, () => {
      const { selectFunction } = this.props;
      if (selectFunction) selectFunction(selectedItems);
    });
  };

  render() {
    const { InputProps, suggestions } = this.props;
    const { searchQuery, selectedItems } = this.state;

    return (
      <Downshift
        itemToString={item => (item ? item.text : "")}
        inputValue={searchQuery}
        onChange={this.handleChange}
      >
        {({ getInputProps, getItemProps, isOpen, highlightedIndex }) => {
          const { onBlur, onFocus, onChange, ...inputProps } = getInputProps({
            onChange: this.changeSearchQuery
          });
          return (
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                placeholder="Search or ask a question"
                fullWidth
                InputProps={{
                  ...InputProps,
                  ...getInputProps(),
                  onChange,
                  onBlur,
                  onFocus
                }}
                inputProps={{ ...inputProps }}
              />
              {isOpen ? (
                <Paper>
                  {suggestions.map(suggestion => (
                    <MenuItem
                      {...getItemProps({
                        item: suggestion,
                        key: suggestion.id
                      })}
                      selected={
                        !!selectedItems.find(item => item.id == suggestion.id)
                      }
                    >
                      {suggestion.text}
                    </MenuItem>
                  ))}
                </Paper>
              ) : null}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default withStyles(styles)(Autocomplete);
