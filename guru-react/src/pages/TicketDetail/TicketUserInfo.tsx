import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import { ShortUser } from "../../state/types/profiles";

const styles = (theme: Theme) =>
  createStyles({
    avatarBig: {
      width: 55,
      height: 55,
      margin: "auto",
      marginBottom: ".5em"
    },
    userName: {
      fontSize: 12,
      fontWeight: 600,
      marginTop: 5
    },
    userEmail: {
      fontSize: 11,
      color: "#A9A9A9"
    },
    userChip: {
      marginRight: 0,
      whiteSpace: "nowrap"
    },
    userChipLabel: {
      whiteSpace: "pre-wrap",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  });

interface ExternalProps {
  createdBy: ShortUser;
  createdFor?: ShortUser | null;
}

type Props = ExternalProps & WithStyles<typeof styles> & RouteComponentProps;

class TicketDetail extends Component<Props> {
  render() {
    const { classes, createdBy, createdFor } = this.props;
    const user = createdFor ? createdFor : createdBy;

    return (
      <div style={{ textAlign: "center" }}>
        <Avatar alt="Avatar" src={user.avatar} className={classes.avatarBig} />
        {user.role ? (
          <div>
            <Chip
              label={user.role.name}
              className="chip gluu"
              classes={{ root: classes.userChip, label: classes.userChipLabel }}
            />
          </div>
        ) : null}

        <Typography className={classes.userName}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography className={classes.userEmail}>{user.email}</Typography>
        <br />
        {user.company ? (
          <div>
            <Chip
              label={user.company.name}
              className="chip green"
              classes={{ root: classes.userChip, label: classes.userChipLabel }}
            />
          </div>
        ) : null}
        {user.plan ? (
          <div>
            <Chip
              label={user.plan}
              className="chip green capitalize"
              classes={{ root: classes.userChip, label: classes.userChipLabel }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(TicketDetail));
