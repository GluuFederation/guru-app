import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import ReactMarkdown from "react-markdown";

import { makeStyles } from "@material-ui/styles";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";

import { colors } from "../../../theme";
import { Ticket } from "../../../state/types/tickets";
import { User } from "../../../state/types/profiles";
import { changeTicketVote } from "../../../state/actions/tickets";
import TicketCardMenu from "./Menu";
import Attachment from "../Attachment";

const useStyles = makeStyles({
  ticketContent: {
    "& img": {
      width: "100%"
    },
    "& pre": {
      whiteSpace: "pre-wrap"
    }
  },
  upVotesGrid: {
    borderRight: `1px solid ${colors.LIGHT_BORDER}`,
    "&> div": {
      textAlign: "right"
    }
  },
  upVotesIcon: {
    position: "relative",
    "&> button": {
      marginRight: "-1rem"
    }
  }
});

interface Props {
  ticket: Ticket;
  user: User | null;
}

const TicketDetailBreadcrumbs: FunctionComponent<Props> = ({
  ticket,
  user
}) => {
  const isVoted =
    user && ticket.voters.findIndex(voter => voter.id === user.id) >= 0;
  const classes = useStyles();
  const slug = ticket.slug;
  const dispatch = useDispatch();

  const toggleVote = () => {
    changeTicketVote(ticket.slug, !isVoted)(dispatch);
  };
  return (
    <Card elevation={0}>
      <CardHeader
        action={
          <div>
            <Grid
              container
              spacing={2}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <div className={classes.upVotesIcon}>
                  <IconButton onClick={toggleVote}>
                    <ThumbUpAlt />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={5} classes={{ root: classes.upVotesGrid }}>
                <div>Upvotes </div>
              </Grid>
              <Grid item xs={1}>
                {ticket.voters.length}
              </Grid>
              <Grid item xs={3}>
                <TicketCardMenu slug={ticket.slug} />
              </Grid>
            </Grid>
          </div>
        }
        subheader={`${moment(ticket.createdOn).format("ll")} at ${moment(
          ticket.createdOn
        ).format("LT")} GMT`}
      />

      <CardContent>
        <ReactMarkdown className={classes.ticketContent} source={ticket.body} />
        {ticket.attachments.map((attachment, index) => (
          <Attachment key={index} document={attachment} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TicketDetailBreadcrumbs;
