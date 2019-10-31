import React, { Component } from "react";
import SimpleMDE from "react-simplemde-editor";

import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import { colors } from "../../theme";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import {
  WithCreateTicketProps,
  withCreateTicket
} from "../../state/hocs/ticket";
import { WithInfoProps, withInfo } from "../../state/hocs/info";
import { withRouter, RouteComponentProps } from "react-router-dom";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "5em"
    }
  });

type Props = WithUserProps &
  WithCreateTicketProps &
  WithInfoProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

interface State {
  isLoading: boolean;
}

class Step9 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  changeVisibility = (event: React.ChangeEvent<{}>, value: string) => {
    const { setCreateTicketPrivacy } = this.props;
    if (value === "public") {
      setCreateTicketPrivacy(false);
    } else {
      setCreateTicketPrivacy(true);
    }
  };

  changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setCreateTicketTitle(event.target.value);
  };

  render() {
    const { classes, newTicket } = this.props;
    const { body, title, isPrivate } = newTicket;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <p>Add a title</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              value={title}
              onChange={this.changeTitle}
              fullWidth
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <p>Description</p>
          </Grid>
          <Grid item xs={12}>
            <SimpleMDE value={body} onChange={this.props.setCreateTicketBody} />
          </Grid>
          <Grid item xs={12}>
            Visibility{" "}
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={isPrivate ? "private" : "public"}
              onChange={this.changeVisibility}
            >
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  withInfo(withCreateTicket(withUser(withStyles(styles)(Step9))))
);
