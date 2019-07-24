import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import { withUser, WithUserProps } from "../../state/hocs/profiles";
import { withTicketList, WithTicketListProps } from "../../state/hocs/tickets";

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
      fetchTickets,
      setTicketsLoading
    } = this.props;

    switch (tag.type) {
      case FilterType.Category:
        removeFilterCategory(tag.id);
        break;
      case FilterType.Assignee:
        removeFilterAssignee(tag.id);
        break;
      case FilterType.Creator:
        removeFilterCreator(tag.id);
        break;
      case FilterType.Company:
        removeFilterCompany(tag.id);
        break;
      case FilterType.IssueType:
        removeFilterIssueType(tag.id);
        break;
      case FilterType.Product:
        removeFilterProduct(tag.id);
        break;
      case FilterType.Status:
        removeFilterStatus(tag.id);
        break;
    }
    setTicketsLoading(true);
    fetchTickets(true).then(() => {
      setTicketsLoading(false);
    });
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
