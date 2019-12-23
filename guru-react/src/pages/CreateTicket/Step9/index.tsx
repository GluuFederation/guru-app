import React, { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleMDE from "react-simplemde-editor";
import Dropzone from "react-dropzone";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import {
  setTicketPrivacy,
  setTicketTitle,
  setTicketBody
} from "../../../state/actions/ticket";
import { CreateTicketState } from "../../../state/types/state";
import { useDefaultStyles } from "../styles";

import "easymde/dist/easymde.min.css";

interface Props {
  ticket: CreateTicketState;
  files: Array<File>;
  onFileDrop: (acceptedFiles: Array<File>) => void;
}

const Step9: FunctionComponent<Props> = ({ ticket, files, onFileDrop }) => {
  const dispatch = useDispatch();
  const classes = useDefaultStyles();

  const changeVisibility = (event: React.ChangeEvent<{}>, value: string) => {
    dispatch(setTicketPrivacy(!(value === "public")));
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTicketTitle(event.target.value));
  };

  const changeBody = (value: string) => {
    dispatch(setTicketBody(value));
  };

  const { body, title, isPrivate } = ticket;

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
    </div>
  );
};

export default Step9;
