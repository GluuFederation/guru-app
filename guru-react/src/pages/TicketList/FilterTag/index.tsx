import React, { Component, FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";

import { formatChipText } from "../../../utils/chipStyles";
import {
  removeFilterAssignee,
  removeFilterCategory,
  removeFilterCompany,
  removeFilterCreator,
  removeFilterIssueType,
  removeFilterProduct,
  removeFilterStatus,
  setFilterQuery
} from "../../../state/actions/tickets";
import { useStatePathSync } from "../hooks";

const useStyles = makeStyles({
  root: {
    paddingRight: ".1em",
    paddingTop: ".5em",
    display: "inline-block"
  },
  chip: {
    fontSize: ".9rem",
    borderRadius: ".2rem"
  }
});

export enum FilterType {
  Company,
  Creator,
  Assignee,
  Category,
  Product,
  IssueType,
  Status,
  Query
}

export interface Tag {
  type: FilterType;
  id: number;
  text: string;
}

interface Props {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
  tag: Tag;
}

const FilterTag: FunctionComponent<Props> = ({ tag, setTicketsLoading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { fetchTickets } = useStatePathSync();

  const removeTag = () => {
    switch (tag.type) {
      case FilterType.Category:
        dispatch(removeFilterCategory(tag.id));
        break;
      case FilterType.Assignee:
        dispatch(removeFilterAssignee(tag.id));
        break;
      case FilterType.Creator:
        dispatch(removeFilterCreator(tag.id));
        break;
      case FilterType.Company:
        dispatch(removeFilterCompany(tag.id));
        break;
      case FilterType.IssueType:
        dispatch(removeFilterIssueType(tag.id));
        break;
      case FilterType.Product:
        dispatch(removeFilterProduct(tag.id));
        break;
      case FilterType.Status:
        dispatch(removeFilterStatus(tag.id));
        break;
      case FilterType.Query:
        dispatch(setFilterQuery(""));
        break;
    }
    setTicketsLoading(true);
    fetchTickets(true).then(() => {
      setTicketsLoading(false);
    });
  };

  return (
    <div className={classes.root}>
      <Chip
        label={formatChipText(tag.text)}
        className={classes.chip}
        color="primary"
        onDelete={removeTag}
      />
    </div>
  );
};

export default FilterTag;
