import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import {
  withTicketDetail,
  WithTicketDetailProps
} from "../../state/hocs/tickets";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import Autocomplete, { Suggestion } from "../../components/Autocomplete";
import { colors } from "../../theme";
import { ShortUser } from "../../state/types/profiles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.SECONDARY_BACKGROUND,
      padding: "2em"
    },
    commentButton: {
      backgroundColor: colors.MAIN_COLOR,
      color: colors.MAIN_BACKGROUND
    },
    closeButton: {
      backgroundColor: colors.MAIN_BACKGROUND,
      border: `1px solid ${colors.LIGHT_BORDER}`
    },
    autoCompleteInput: {
      height: "inherit"
    }
  });

type Props = WithTicketDetailProps &
  WithInfoProps &
  WithStyles<typeof styles> &
  RouteComponentProps;

interface State {
  body: string;
  users: Array<Suggestion>;
  assignee?: number;
  status?: number;
  errorMessage: string;
}
class ResponsePost extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      body: "",
      users: [],
      errorMessage: ""
    };
  }

  changeAssignee = (assignee: Suggestion) => {
    const { users } = this.state;
    const user = users.find(item => item.id === assignee.id);
    if (user) {
      this.setState({ assignee: assignee.id });
    } else {
      this.setState({ assignee: undefined });
    }
  };

  searchCreators = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/users/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      this.setState({
        users: response.data.results
          .map((result: ShortUser) => ({
            ...result,
            text: `${result.firstName} ${result.lastName}`
          }))
          .slice(0, 5)
      });
    });
  };

  changeStatus = (event: React.ChangeEvent<{ value: string }>) => {
    const status = parseInt(event.target.value as string, 10);
    const { statuses } = this.props.info;
    const statusObject = statuses.find(item => item.id === status);
    if (statusObject) {
      this.setState({ status });
    } else {
      this.setState({ status: undefined });
    }
  };

  changeBody = (body: string) => {
    this.setState({ body });
  };

  saveAnswer = () => {
    const { body, assignee, status } = this.state;
    const {
      updateTicket,
      createTicketAnswer,
      ticket,
      setTicketAssignee
    } = this.props;
    if (!ticket) return;

    if (!body) {
      this.setState({ errorMessage: "Answer body cannot be empty" });
      return;
    }

    createTicketAnswer(ticket.slug, body).then(() => {
      if (status) {
        updateTicket({ ...ticket, status });
      }
      if (assignee) {
        setTicketAssignee(ticket.slug, assignee);
      }
      this.setState({
        body: "",
        users: [],
        errorMessage: ""
      });
    });
  };

  closeTicket = () => {
    const { statuses } = this.props.info;
    const statusObject = statuses.find(item => item.slug === "closed");
    if (statusObject) {
      this.setState({ status: statusObject.id }, () => {
        this.saveAnswer();
      });
    }
  };

  render() {
    const { classes, info } = this.props;
    const { body, users, status } = this.state;

    const InputProps = {
      classes: { input: classes.autoCompleteInput },
      placeholder: "Search name...",
      fullWidth: true
    };

    const isButtonActive = !body;

    return (
      <Card classes={{ root: classes.root }}>
        <CardContent>
          <Typography variant="h5">Post a response</Typography> <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SimpleMDE value={body} onChange={this.changeBody} />
            </Grid>
            <Grid item md={6} xs={12}>
              <p>Assign To</p>
              <Autocomplete
                InputProps={InputProps}
                suggestions={users}
                updateQueryFunction={this.searchCreators}
                selectFunction={this.changeAssignee}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <p>Ticket Status</p>
              <TextField
                select
                fullWidth
                variant="outlined"
                value={status ? status : ""}
                onChange={this.changeStatus}
              >
                {info.statuses.map(status => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button
              classes={{ root: classes.commentButton }}
              disabled={isButtonActive}
              onClick={this.saveAnswer}
            >
              Comment
            </Button>{" "}
            &emsp;
            <Button
              classes={{ root: classes.closeButton }}
              disabled={isButtonActive}
              onClick={this.closeTicket}
            >
              Close Ticket
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default withTicketDetail(
  withInfo(withStyles(styles)(withRouter(ResponsePost)))
);
