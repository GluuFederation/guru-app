import React, { FunctionComponent } from "react";
import { Moment } from "moment";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { ShortUser } from "../../../../state/types/profiles";
import Avatar from "../../../../components/Avatar";
import { getDateString } from "../../../../utils/time";

const useStyles = makeStyles({
  avatarBig: {
    width: 55,
    height: 55,
    margin: "auto",
    marginBottom: ".5em"
  },
  userName: {
    fontSize: "1rem",
    fontWeight: 600,
    marginTop: 5
  },
  nameMeta: {
    fontWeight: 400
  },
  userEmail: {
    fontSize: "0.9rem",
    color: "#A9A9A9"
  }
});

interface Props {
  createdBy: ShortUser;
  createdFor?: ShortUser | null;
  nameMeta?: string;
  date?: Moment | string;
}

const ResponsiveUserInfo: FunctionComponent<Props> = ({
  createdBy,
  createdFor,
  nameMeta,
  date
}) => {
  const user = createdFor ? createdFor : createdBy;
  const classes = useStyles();
  const dateString = date ? getDateString(date) : "";
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Avatar user={user} />
      </Grid>
      <Grid item>
        <Typography className={classes.userName}>
          {user.firstName} {user.lastName}{" "}
          {nameMeta ? (
            <span className={classes.nameMeta}>{nameMeta}</span>
          ) : null}
        </Typography>
        {dateString ? (
          <Typography className={classes.userEmail}>{dateString}</Typography>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default ResponsiveUserInfo;
