import React, { Component } from "react";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { withTicketList, WithTicketListProps } from "../../state/hocs/tickets";
import FilterTag, { FilterType } from "./FilterTag";

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

interface ExternalProps {
  setTicketsLoading: (isTicketsLoading: boolean) => void;
}

type Props = ExternalProps & WithTicketListProps & WithStyles<typeof styles>;

interface State {
  os: string;
  osVersion: string;
}

class ChangeOs extends Component<Props, State> {
  clearAll = () => {
    const { clearAllFilters, setTicketsLoading, fetchTickets } = this.props;
    clearAllFilters();
    setTicketsLoading(true);
    fetchTickets(true).then(() => {
      setTicketsLoading(false);
    });
  };

  render() {
    const { classes, filters, setTicketsLoading, tickets } = this.props;
    const showClearAllBtn =
      filters.companies.length ||
      filters.creators.length ||
      filters.assignees.length ||
      filters.categories.length ||
      filters.products.length ||
      filters.issueTypes.length ||
      filters.statuses.length ||
      filters.query;
    return (
      <div className={classes.root}>
        {tickets.length} results found. &emsp;
        {filters.companies.map(company => (
          <FilterTag
            key={company.id}
            setTicketsLoading={setTicketsLoading}
            tag={{ ...company, text: company.name, type: FilterType.Company }}
          />
        ))}
        {filters.creators.map(creator => (
          <FilterTag
            key={creator.id}
            setTicketsLoading={setTicketsLoading}
            tag={{
              ...creator,
              text: `${creator.firstName} ${creator.lastName}`,
              type: FilterType.Creator
            }}
          />
        ))}
        {filters.assignees.map(assignee => (
          <FilterTag
            key={assignee.id}
            setTicketsLoading={setTicketsLoading}
            tag={{
              ...assignee,
              text: `${assignee.firstName} ${assignee.lastName}`,
              type: FilterType.Assignee
            }}
          />
        ))}
        {filters.categories.map(category => (
          <FilterTag
            key={category.id}
            setTicketsLoading={setTicketsLoading}
            tag={{
              ...category,
              text: category.name,
              type: FilterType.Category
            }}
          />
        ))}
        {filters.products.map(product => (
          <FilterTag
            key={product.id}
            setTicketsLoading={setTicketsLoading}
            tag={{
              ...product,
              text: product.name,
              type: FilterType.Product
            }}
          />
        ))}
        {filters.issueTypes.map(issueType => (
          <FilterTag
            key={issueType.id}
            setTicketsLoading={setTicketsLoading}
            tag={{
              ...issueType,
              text: issueType.name,
              type: FilterType.IssueType
            }}
          />
        ))}
        {filters.statuses.map(status => (
          <FilterTag
            key={status.id}
            setTicketsLoading={setTicketsLoading}
            tag={{
              ...status,
              text: status.name,
              type: FilterType.Status
            }}
          />
        ))}
        {filters.query ? (
          <FilterTag
            setTicketsLoading={setTicketsLoading}
            tag={{ id: NaN, text: filters.query, type: FilterType.Query }}
          />
        ) : null}
        &emsp;
        {showClearAllBtn ? (
          <Button onClick={this.clearAll}>Clear All</Button>
        ) : null}
      </div>
    );
  }
}

export default withTicketList(withStyles(styles)(ChangeOs));
