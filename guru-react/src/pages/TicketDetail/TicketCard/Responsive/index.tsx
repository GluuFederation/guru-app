import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";

import { colors } from "../../../../theme";
import { Ticket } from "../../../../state/types/tickets";
import { changeTicketVote } from "../../../../state/actions/tickets";
import { User } from "../../../../state/types/profiles";
import ResponsiveUserInfo from "../../UserInfo/Responsive";
import Attachment from "../../Attachment";

interface Props {
  ticket: Ticket;
  user: User | null;
}

const useStyles = makeStyles({
  privacyIcon: {
    height: "1.283rem"
  },
  ticketContent: {
    "& img": {
      width: "100%"
    },
    "& pre": {
      maxWidth: "100%",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word"
    }
  },
  upVotesIcon: {
    borderRight: `1px solid ${colors.LIGHT_BORDER}`
  },
  upVotesContainer: {
    paddingRight: "1rem"
  }
});

const TicketResponsiveCard: FunctionComponent<Props> = ({ ticket, user }) => {
  const isVoted =
    user && ticket.voters.findIndex(voter => voter.id === user.id) >= 0;
  const classes = useStyles();
  const dispatch = useDispatch();

  const toggleVote = () => {
    changeTicketVote(ticket.slug, !isVoted)(dispatch);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={8}>
            <ResponsiveUserInfo
              createdBy={ticket.createdBy}
              createdFor={ticket.createdFor}
              nameMeta={"opened this issue"}
              date={ticket.createdOn}
            />
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              classes={{ root: classes.upVotesContainer }}
              alignItems="center"
              justify="flex-end"
              spacing={2}
            >
              <Grid item>
                <div className={classes.upVotesIcon}>
                  <IconButton onClick={toggleVote}>
                    <ThumbUpAlt />
                  </IconButton>
                </div>
              </Grid>
              <Grid item>
                <div>{ticket.voters.length}</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ReactMarkdown className={classes.ticketContent} source={ticket.body} />
        {ticket.attachments.map((attachment, index) => (
          <Attachment key={index} document={attachment} />
        ))}
      </Grid>
    </Grid>
  );
};

export default TicketResponsiveCard;
