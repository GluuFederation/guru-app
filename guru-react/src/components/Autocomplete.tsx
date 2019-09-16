import React, { Component } from "react";
import Downshift from "downshift";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

export interface Suggestion {
  id: number;
  text: string;
  image?: string;
  color?: string;
}

interface ExternalProps {
  InputProps?: Partial<OutlinedInputProps>;
  updateQueryFunction?: (query: string) => void;
  selectFunction?: (selectedItem: Suggestion) => void;
  suggestions: Array<Suggestion>;
  isAlwaysOpen?: boolean;
  value?: string;
}

type Props = ExternalProps;

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

  render() {
    const { InputProps, suggestions, isAlwaysOpen, value } = this.props;
    const { searchQuery, selectedItem } = this.state;

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
                margin="dense"
                value={"Hello"}
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
                <Paper>
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

export default Autocomplete;
