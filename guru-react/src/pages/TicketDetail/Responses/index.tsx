import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import { colors } from "../../../theme";
import ResponseCard from "./Card";
import TicketUserInfo from "../UserInfo";
import ResponsePost from "./Post";
import ResponsiveResponsePost from "./Post/Responsive";
import useModal from "../../../utils/hooks/modal";
import { Answer, Ticket } from "../../../state/types/tickets";

const useStyles = makeStyles((theme: Theme) => ({
  responseArea: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "10rem",
    backgroundColor: colors.MAIN_BACKGROUND,
    zIndex: 99,
    borderTop: `1px solid ${colors.LIGHT_BORDER}`,
    padding: "1.5rem",
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      height: "3.5rem",
      padding: "1rem"
    }
  },
  replyText: {
    color: colors.LIGHTER_TEXT,
    marginBottom: ".5rem"
  },
  replyButton: {
    backgroundColor: colors.MAIN_COLOR,
    color: colors.MAIN_BACKGROUND,
    '&:hover': {
      backgroundColor: colors.BUTTON_HOVER_COLOR,
      color: colors.MAIN_BACKGROUND
    }
  },
  replyButtonDiv: {
    textAlign: "right"
  },
  modalSuperContainer: {
    position: "relative",
    textAlign: "center",
    top: "10vh",
    maxHeight: "90vh",
    overflowY: "auto",
    overflowX: "hidden",
    margin: "auto",
    "&:focus": {
      outline: "none"
    }
  }
}));

interface Props {
  answers: Array<Answer>;
  ticket: Ticket;
  canEdit: boolean;
}

const Responses: FunctionComponent<Props> = ({ answers, ticket, canEdit }) => {
  const classes = useStyles();
  const modal = useModal();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box mt={6} mb={4}>
            <Typography variant="h5">
              {answers.length} {answers.length === 1 ? "Response" : "Responses"}
            </Typography>
            <Divider />
          </Box>
        </Grid>
      </Grid>
      {answers.map(answer => (
        <Grid key={answer.id} container spacing={8}>
          <Hidden smDown>
            <Grid item xs={12} md={2}>
              <TicketUserInfo createdBy={answer.createdBy} />
            </Grid>
          </Hidden>
          <Grid item xs={12} md={10}>
            <ResponseCard answer={answer} slug={ticket.slug} />
          </Grid>
        </Grid>
      ))}
      <Hidden smDown>
        {canEdit ? (
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <ResponsePost ticket={ticket} />
            </Grid>
          </Grid>
        ) : null}
      </Hidden>
      <Hidden mdUp>
        <div className={classes.responseArea} onClick={modal.open}>
          <Typography classes={{ root: classes.replyText }}>
            Reply ticket...
          </Typography>
          <div className={classes.replyButtonDiv}>
            <Button classes={{ root: classes.replyButton }}>Comment</Button>
          </div>
        </div>
      </Hidden>
      <Modal
        aria-labelledby="delete-confirmation-modal"
        open={modal.isOpen}
        onClose={modal.close}
      >
        <div className={classes.modalSuperContainer}>
          <div>
            <ResponsiveResponsePost closeModal={modal.close} ticket={ticket} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Responses;
