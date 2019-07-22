import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import { colors } from "../../theme";
import { paths } from "../../routes";
import { withUser, WithUserProps } from "../../state/hocs/profiles";
import { withTicketList, WithTicketListProps } from "../../state/hocs/tickets";
import { getSearchString } from "./filterQueries";
import { ShortUser } from "../../state/types/profiles";
import { TicketStatus } from "../../state/types/info";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingRight: ".1em",
      paddingTop: ".5em",
      display: "inline-block"
    },
    chip: {}
  });

export enum FilterType {
  Company,
  Creator,
  Assignee,
  Category,
  Product,
  IssueType,
  Status
}

export interface Tag {
  type: FilterType;
  id: number;
  text: string;
}

interface ExternalProps {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
  tag: Tag;
}

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithUserProps &
  WithTicketListProps &
  ExternalProps;

class TicketNav extends Component<Props> {
  removeTag = () => {
    const {
      tag,
      removeFilterAssignee,
      removeFilterCategory,
      removeFilterCompany,
      removeFilterCreator,
      removeFilterIssueType,
      removeFilterProduct,
      removeFilterStatus,
      filters,
      fetchTickets,
      setTicketsLoading
    } = this.props;

    let searchString = "";

    switch (tag.type) {
      case FilterType.Category:
        removeFilterCategory(tag.id);
        searchString = getSearchString({
          ...filters,
          categories: [...filters.categories.filter(item => item.id !== tag.id)]
        });
        break;
      case FilterType.Assignee:
        removeFilterAssignee(tag.id);
        searchString = getSearchString({
          ...filters,
          assignees: [...filters.assignees.filter(item => item.id !== tag.id)]
        });
        break;
      case FilterType.Creator:
        removeFilterCreator(tag.id);
        searchString = getSearchString({
          ...filters,
          creators: [...filters.creators.filter(item => item.id !== tag.id)]
        });
        break;
      case FilterType.Company:
        removeFilterCompany(tag.id);
        searchString = getSearchString({
          ...filters,
          companies: [...filters.companies.filter(item => item.id !== tag.id)]
        });
        break;
      case FilterType.IssueType:
        removeFilterIssueType(tag.id);
        searchString = getSearchString({
          ...filters,
          issueTypes: [...filters.issueTypes.filter(item => item.id !== tag.id)]
        });
        break;
      case FilterType.Product:
        removeFilterProduct(tag.id);
        searchString = getSearchString({
          ...filters,
          products: [...filters.products.filter(item => item.id !== tag.id)]
        });
        break;
      case FilterType.Status:
        removeFilterStatus(tag.id);
        searchString = getSearchString({
          ...filters,
          statuses: [...filters.statuses.filter(item => item.id !== tag.id)]
        });
        break;
    }
    setTicketsLoading(true);
    fetchTickets(filters).then(() => {
      setTicketsLoading(false);
    });
    this.props.history.push(`${paths.TICKET_LIST}${searchString}`);
    this.setState({
      myAssignmentsElement: null,
      allTicketsElement: null,
      myTicketsElement: null
    });
  };

  render() {
    const { classes, tag } = this.props;
    return (
      <div className={classes.root}>
        <Chip
          label={tag.text}
          className={classes.chip}
          color="primary"
          onDelete={this.removeTag}
        />
      </div>
    );
  }
}

export default withTicketList(
  withUser(withRouter(withStyles(styles)(TicketNav)))
);
