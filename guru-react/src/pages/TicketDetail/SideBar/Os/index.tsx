import React, { FunctionComponent } from "react";

import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";

import useModal from "../../../../utils/hooks/modal";
import { useInfoState } from "../../../../state/hooks";
import { useStyles } from "../hooks";
import { CreateTicketState } from "../../../../state/types/state";
import { Ticket } from "../../../../state/types/tickets";
import ChangeOs from "../../ChangeOs";

interface Props {
  canEdit: boolean;
  ticket: Ticket | CreateTicketState;
  isNew?: boolean;
}

const Os: FunctionComponent<Props> = ({ canEdit, ticket, isNew }) => {
  const classes = useStyles();
  const { isOpen, open, close } = useModal();
  const infoText = `${ticket.os} ${ticket.osVersion}`;

  return (
    <Grid item xs={12}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <small className={classes.titleText}>OS Version</small>
        </Grid>
        <Grid item xs={10}>
          {infoText}
        </Grid>
        <Grid item xs={2}>
          {canEdit ? (
            <IconButton onClick={open}>
              <EditIcon />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
      <Divider classes={{ root: classes.divider }} />
      <Modal open={isOpen} onClose={close}>
        <div className="modal-super-container">
          <div className="modal-container">
            <ChangeOs closeModal={close} isNew={isNew} />
          </div>
        </div>
      </Modal>
    </Grid>
  );
};

export default Os;
