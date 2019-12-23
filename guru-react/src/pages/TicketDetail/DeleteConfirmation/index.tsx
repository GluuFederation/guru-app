import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
  deleteTicket,
  deleteTicketAnswer
} from "../../../state/actions/tickets";
import { Answer } from "../../../state/types/tickets";
import { colors } from "../../../theme";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.MAIN_BACKGROUND,
    padding: "2em"
  },
  noButton: {
    color: colors.MAIN_COLOR
  }
});

interface Props {
  slug?: string;
  answer?: Answer;
  closeModal: () => void;
}

const DeleteConfirmation: FunctionComponent<Props> = ({
  slug,
  answer,
  closeModal
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteItem = () => {
    if (slug) {
      if (answer) {
        deleteTicketAnswer(
          slug,
          answer
        )(dispatch).then(() => {
          closeModal();
        });
      } else {
        deleteTicket(slug)(dispatch).then(() => {
          closeModal();
          history.push("/dashboard");
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">
        Are you sure you want to delete this {answer ? "answer" : "ticket"}?
      </Typography>{" "}
      <br />
      <Button onClick={closeModal} classes={{ root: classes.noButton }}>
        No
      </Button>
      <Button onClick={deleteItem}>Yes</Button>
    </div>
  );
};

export default DeleteConfirmation;
