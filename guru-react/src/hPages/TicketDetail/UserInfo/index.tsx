import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import { ShortUser } from "../../../state/types/profiles";

const useStyles = makeStyles({
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

interface Props {
  createdBy: ShortUser;
  createdFor?: ShortUser | null;
}

const UserInfo: FunctionComponent<Props> = ({ createdBy, createdFor }) => {
  const user = createdFor ? createdFor : createdBy;
  const classes = useStyles();

  return (
    <div style={{ textAlign: "center" }}>
      {user.avatar ? (
        <Avatar alt="Avatar" src={user.avatar} className={classes.avatarBig} />
      ) : (
        <Avatar alt="Avatar" className={classes.avatarBig}>
          {user.firstName.charAt(0)}
        </Avatar>
      )}

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
};

export default UserInfo;
