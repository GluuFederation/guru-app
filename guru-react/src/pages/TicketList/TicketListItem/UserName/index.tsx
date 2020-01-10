import React, { FunctionComponent } from "react";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import { colors } from "../../../../theme";
import { ShortUser } from "../../../../state/types/profiles";

interface Props {
  user: ShortUser;
}

const UserName: FunctionComponent<Props> = ({ user }) => {
  return (
    <>
      <Grid item xs={12}>
        <div>
          <strong>
            <small>
              {user.firstName} {user.otherNames} {user.lastName}
            </small>
          </strong>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{ color: colors.LIGHTER_TEXT }}>
          <small>{user.company ? user.company.name : ""}</small>
        </div>
      </Grid>
      <Hidden xsDown>
        <Grid item xs={12}>
          <div style={{ textTransform: "capitalize" }}>
            <small>{user.company ? user.company.plan : ""}</small>
          </div>
        </Grid>
      </Hidden>
    </>
  );
};

export default UserName;
