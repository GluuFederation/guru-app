import React, { Component, ReactNode } from "react";
import Downshift from "downshift";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

import { ReactComponent as SearchImg } from "../assets/images/search.svg";

const styles = (theme: Theme) =>
  createStyles({
    dropdown: {
      position: "absolute",
      zIndex: 999
    }
  });
export interface Suggestion {
  id: number;
  text: string;
  image?: string;
  color?: string;
}

export enum SearchButtonOptions {
  Hide,
  Start,
  End
}

interface ExternalProps {
  InputProps?: Partial<OutlinedInputProps>;
  updateQueryFunction?: (query: string) => void;
  selectFunction?: (selectedItem: Suggestion) => void;
  suggestions: Array<Suggestion>;
  isAlwaysOpen?: boolean;
  value?: string;
  searchButton?: SearchButtonOptions;
}

type Props = ExternalProps & WithStyles<typeof styles>;

interface State {
  searchQuery: string;
  selectedItem: Suggestion | null;
}

class Autocomplete extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: props.value ? props.value : "",
      selectedItem: null
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
    this.setState({ searchQuery: item.text, selectedItem: { ...item } }, () => {
      const { selectFunction } = this.props;
      if (selectFunction) selectFunction(item);
    });
  };

  handleKeyPress = (event: React.KeyboardEvent<any>) => {
    if (event.key === "Enter") {
      const { searchQuery } = this.state;
      const { selectFunction } = this.props;
      if (searchQuery && selectFunction) {
        selectFunction({ id: 1, text: searchQuery });
      }
    }
  };

  handleButton = () => {
    const { selectFunction } = this.props;
    const { searchQuery } = this.state;
    if (selectFunction && searchQuery)
      selectFunction({ id: 1, text: searchQuery });
  };

  render() {
    const { suggestions, isAlwaysOpen, classes, searchButton } = this.props;
    let { InputProps } = this.props;
    const { searchQuery, selectedItem } = this.state;
    if (searchButton) {
      switch (searchButton) {
        case SearchButtonOptions.Start:
          const startAdornment = (
            <InputAdornment position="start">
              <Button onClick={this.handleButton}>
                <SearchImg />
              </Button>
            </InputAdornment>
          );
          if (InputProps) InputProps.startAdornment = startAdornment;
          else InputProps = { startAdornment };
          break;
        case SearchButtonOptions.End:
          const endAdornment = (
            <InputAdornment position="end">
              <Button onClick={this.handleButton}>
                <SearchImg />
              </Button>
            </InputAdornment>
          );
          if (InputProps) InputProps.endAdornment = endAdornment;
          else InputProps = { endAdornment };
          break;
      }
    }
    return (
      <Downshift
        itemToString={item => (item ? item.text : "")}
        inputValue={searchQuery}
        onChange={this.handleChange}
      >
        {({ getInputProps, getItemProps, isOpen, highlightedIndex }) => {
          const { onBlur, onFocus, onChange, ...inputProps } = getInputProps({
            onChange: this.changeSearchQuery,
            onKeyDown: this.handleKeyPress
          });
          return (
            <div>
              <TextField
                variant="outlined"
                margin="none"
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
              {isOpen || isAlwaysOpen ? (
                <Paper classes={{ root: classes.dropdown }}>
                  {suggestions.map(suggestion => (
                    <MenuItem
                      {...getItemProps({
                        item: suggestion,
                        key: suggestion.id
                      })}
                      selected={
                        selectedItem ? selectedItem.id === suggestion.id : false
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
