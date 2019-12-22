import React, { FunctionComponent, useEffect } from "react";
import { useHistory, matchPath } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import { colors } from "../../theme";
import { paths } from "../../routes";
import { useInfoState } from "../../state/hooks";
import useModal from "../../utils/hooks/modal";
import { setConfirmationPath } from "../../state/actions/info";
import { clearTicketEntry } from "../../state/actions/ticket";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.MAIN_BACKGROUND,
    padding: "2em"
  },
  noButton: {
    color: colors.MAIN_COLOR
  }
});

const ConfirmationModal: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    confirmationPath: path,
    confirmationText: text,
    confirmationExceptions: exceptions
  } = useInfoState();
  const displayText =
    text || "Are you sure you want to navigate away from this page?";
  const { isOpen, open, close } = useModal();

  useEffect(() => {
    const isException = exceptions.filter(exception =>
      matchPath(path, { path: exception, exact: true, strict: false })
    ).length;
    if (path && !isException) open();
  }, [path]);

  const closeModal = () => {
    dispatch(setConfirmationPath(""));
    close();
  };

  const yesAction = () => {
    if (
      matchPath(path, { path: paths.CREATE_TICKET, exact: true, strict: false })
    )
      dispatch(clearTicketEntry());
    history.push(path);
    closeModal();
  };

  return (
    <Modal
      aria-labelledby="delete-confirmation-modal"
      open={isOpen}
      onClose={close}
    >
      <div className="modal-super-container">
        <div className="modal-container">
          <div className={classes.root}>
            <Typography variant="h6">{displayText}</Typography> <br />
            <Button onClick={closeModal} classes={{ root: classes.noButton }}>
              No
            </Button>
            <Button onClick={yesAction}>Yes</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
