import React, { FunctionComponent, useState, useEffect } from "react";
import Downshift from "downshift";

import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

import { ReactComponent as SearchImg } from "../../assets/images/search.svg";

const useStyles = makeStyles({
  dropdown: {
    position: "absolute"
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

interface Props {
  InputProps?: Partial<OutlinedInputProps>;
  updateQueryFunction?: (query: string) => void;
  selectFunction?: (selectedItem: Suggestion) => void;
  suggestions: Array<Suggestion>;
  isAlwaysOpen?: boolean;
  value?: string;
  variant?: "filled" | "standard" | "outlined";
  searchButton?: SearchButtonOptions;
  isAbsolute?: boolean;
}

const Autocomplete: FunctionComponent<Props> = props => {
  const {
    updateQueryFunction,
    selectFunction,
    suggestions,
    isAlwaysOpen,
    isAbsolute,
    value,
    variant,
    searchButton
  } = props;
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState<string>(value || "");
  const [selectedItem, setSelectedItem] = useState<Suggestion | null>(null);

  useEffect(() => {
    if (updateQueryFunction) updateQueryFunction(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (selectFunction && selectedItem) selectFunction(selectedItem);
  }, [selectedItem]);

  const changeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleChange = (item: Suggestion) => {
    setSearchQuery(item.text);
    setSelectedItem({ ...item });
  };

  const handleKeyPress = (event: React.KeyboardEvent<any>) => {
    if (event.key === "Enter" && searchQuery && selectFunction) {
      selectFunction({ id: 1, text: searchQuery });
    }
  };

  const handleButton = () => {
    if (selectFunction && searchQuery)
      selectFunction({ id: 1, text: searchQuery });
  };

  let { InputProps } = props;
  const tfVariant: any = variant ? variant : "outlined";
  if (searchButton) {
    switch (searchButton) {
      case SearchButtonOptions.Start:
        const startAdornment = (
          <InputAdornment position="start">
            <Button onClick={handleButton}>
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
            <Button onClick={handleButton}>
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
      onChange={handleChange}
    >
      {({ getInputProps, getItemProps, isOpen, highlightedIndex }) => {
        const { onBlur, onFocus, onChange, ...inputProps } = getInputProps({
          onChange: changeSearchQuery,
          onKeyDown: handleKeyPress
        });
        return (
          <div>
            <TextField
              variant={tfVariant}
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
              <Paper classes={isAbsolute ? { root: classes.dropdown } : {}}>
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
};

export default Autocomplete;
