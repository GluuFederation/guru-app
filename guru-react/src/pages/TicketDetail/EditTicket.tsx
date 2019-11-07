import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import Dropzone from "react-dropzone";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import {
  withTicketDetail,
  WithTicketDetailProps
} from "../../state/hocs/tickets";
import { colors } from "../../theme";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.MAIN_BACKGROUND,
      padding: "2em"
    },
    saveButton: {
      color: colors.MAIN_BACKGROUND,
      backgroundColor: colors.MAIN_COLOR
    }
  });

interface ExternalProps {
  closeModal: () => void;
}

type Props = ExternalProps &
  WithTicketDetailProps &
  WithStyles<typeof styles> &
  RouteComponentProps;

interface State {
  title: string;
  body: string;
  isPrivate: boolean;
  errorMessage: string;
  files: Array<File>;
}

class EditTicket extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let title = "";
    let body = "";
    let isPrivate = false;

    const { ticket } = props;
    if (ticket) {
      title = ticket.title;
      body = ticket.body;
      isPrivate = ticket.isPrivate;
    }
    this.state = {
      title,
      body,
      isPrivate,
      errorMessage: "",
      files: []
    };
  }

  updateTicket = () => {
    const { title, body, isPrivate, files } = this.state;
    const { ticket, updateTicket, closeModal, uploadTicketFiles } = this.props;
    if (!title) {
      this.setState({ errorMessage: "Title is required" });
      return;
    }

    if (ticket) {
      updateTicket({ ...ticket, title, body, isPrivate }).then(() => {
        if (files.length) {
          const formData = new FormData();
          files.forEach((file, index) => {
            formData.append(`file-${index}`, file);
          });
          uploadTicketFiles(ticket.slug, formData);
        }
        closeModal();
      });
    }
  };

  changeVisibility = (event: React.ChangeEvent<{}>, value: string) => {
    if (value === "public") {
      this.setState({ isPrivate: false });
    } else {
      this.setState({ isPrivate: true });
    }
  };

  changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  changeBody = (body: string) => {
    this.setState({ body });
  };

  onFileDrop = (files: Array<File>) => {
    this.setState({ files: [...this.state.files, ...files] });
  };

  render() {
    const { classes, closeModal } = this.props;
    const { title, body, isPrivate, files } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h6">Edit Ticket Information</Typography> <br />
        <Grid container>
          <Grid item xs={12}>
            <p>Subject</p>
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
            <SimpleMDE value={body} onChange={this.changeBody} />
            <Dropzone onDrop={this.onFileDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files.{" "}
                      <br />
                      {files.map((file, index) => (
                        <span key={index}>{file.name}</span>
                      ))}
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
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
        <Button
          onClick={this.updateTicket}
          classes={{ root: classes.saveButton }}
        >
          Save
        </Button>{" "}
        &emsp;
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    );
  }
}

export default withTicketDetail(withStyles(styles)(withRouter(EditTicket)));
