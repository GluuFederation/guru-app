import React, { useState, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import SimpleMDE from "react-simplemde-editor";
import Dropzone from "react-dropzone";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import { colors } from "../../../theme";
import { Ticket } from "../../../state/types/tickets";
import {
  updateTicket,
  uploadTicketFiles
} from "../../../state/actions/tickets";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.MAIN_BACKGROUND,
    padding: "2em"
  },
  saveButton: {
    color: colors.MAIN_BACKGROUND,
    backgroundColor: colors.MAIN_COLOR
  }
});

interface Props {
  ticket: Ticket;
  closeModal: () => void;
}

interface State {
  title: string;
  body: string;
  isPrivate: boolean;
  errorMessage: string;
  files: Array<File>;
}

const EditTicket: FunctionComponent<Props> = ({ ticket, closeModal }) => {
  const [title, setTitle] = useState(ticket.title);
  const [body, setBody] = useState(ticket.body);
  const [isPrivate, setIsPrivate] = useState(ticket.isPrivate);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<Array<File>>([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const editTicket = () => {
    if (!title) {
      setErrorMessage("Title is required");
      return;
    }

    updateTicket({ ...ticket, title, body, isPrivate })(dispatch).then(() => {
      if (files.length) {
        const formData = new FormData();
        files.forEach((file, index) => {
          formData.append(`file-${index}`, file);
        });
        uploadTicketFiles(ticket.slug, formData)(dispatch);
      }
      closeModal();
    });
  };

  const changeVisibility = (event: React.ChangeEvent<{}>, value: string) => {
    if (value === "public") {
      setIsPrivate(false);
    } else {
      setIsPrivate(true);
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeBody = (body: string) => {
    setBody(body);
  };

  const onFileDrop = (droppedFiles: Array<File>) => {
    setFiles([...files, ...droppedFiles]);
  };

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
            onChange={changeTitle}
            fullWidth
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <p>Description</p>
        </Grid>
        <Grid item xs={12}>
          <SimpleMDE value={body} onChange={changeBody} />
          <Dropzone onDrop={onFileDrop}>
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
            onChange={changeVisibility}
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
      <Button onClick={editTicket} classes={{ root: classes.saveButton }}>
        Save
      </Button>{" "}
      &emsp;
      <Button onClick={closeModal}>Cancel</Button>
    </div>
  );
};

export default EditTicket;
