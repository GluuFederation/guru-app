import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/styles";
import Avatar, { AvatarProps } from "@material-ui/core/Avatar";
import { ShortUser } from "../../state/types/profiles";

const useStyles = makeStyles({
  all: {
    float: "left",
    color: "#E9E9E9",
    backgroundColor: "#F3F2F2",
    alignItems: "center",
    justifyContent: "center"
  },
  default: {
    width: 55,
    height: 55
  },
  sm: {
    width: 30,
    height: 30
  },
  lg: {
    width: 70,
    height: 70
  },
  xl: {
    width: 100,
    height: 100
  }
});

type Size = "default" | "sm" | "lg" | "xl";

interface ExternalProps {
  size?: Size;
  user?: ShortUser;
}

type Props = ExternalProps & AvatarProps;

const UserAvatar: FunctionComponent<Props> = props => {
  const { size, className, children, user, ...allProps } = props;
  const classes = useStyles();
  const finalClassName = `${className} ${classes.all} ${
    size ? classes[size] : "default"
  }`;
  const { src, ...avatarProps } = allProps;
  const avatarSrc = user && user.avatar ? user.avatar : src;
  const initials = user
    ? user.firstName.charAt(0) + user.lastName.charAt(0)
    : "GU";
  return (
    <Avatar src={avatarSrc} {...avatarProps} className={finalClassName}>
      {!user ? children : !user.avatar ? initials : null}
    </Avatar>
  );
};

export default UserAvatar;
