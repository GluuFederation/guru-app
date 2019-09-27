import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
  withTicketDetail,
  WithTicketDetailProps
} from "../../state/hocs/tickets";
import { Answer } from "../../state/types/tickets";
import { colors } from "../../theme";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "2em"
    },
    noButton: {
      color: colors.MAIN_COLOR
    }
  });

interface ExternalProps {
  slug?: string;
  answer?: Answer;
  closeModal: () => void;
}

type Props = ExternalProps &
  WithTicketDetailProps &
  WithStyles<typeof styles> &
  RouteComponentProps;

class DeleteConfirmation extends Component<Props> {
  deleteItem = () => {
    const {
      slug,
      answer,
      closeModal,
      deleteTicket,
      deleteTicketAnswer
    } = this.props;
    if (slug) {
      if (answer) {
        deleteTicketAnswer(slug, answer).then(() => {
          closeModal();
        });
      } else {
        deleteTicket(slug).then(() => {
          closeModal();
          this.props.history.push('/dashboard');
        });
      }
    }
  };

  render() {
    const { classes, answer, closeModal } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h6">
          Are you sure you want to delete this {answer ? "answer" : "ticket"}?
        </Typography>{" "}
        <br />
        <Button onClick={closeModal} classes={{ root: classes.noButton }}>
          No
        </Button>
        <Button onClick={this.deleteItem}>Yes</Button>
      </div>
    );
  }
}

export default withTicketDetail(
  withRouter(connect()(withStyles(styles)(DeleteConfirmation)))
);
