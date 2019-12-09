import React, { FunctionComponent } from "react";
import SimpleMDE from "react-simplemde-editor";
import Dropzone from "react-dropzone";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { colors } from "../../../../../theme";
import useFunctions from "../hooks";
import { Ticket } from "../../../../../state/types/tickets";
import Autocomplete from "../../../../../components/Autocomplete";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.MAIN_BACKGROUND,
    padding: "1rem"
  },
  saveButton: {
    color: colors.MAIN_BACKGROUND,
    backgroundColor: colors.MAIN_COLOR
  }
});

interface Props {
  closeModal: () => void;
  ticket: Ticket;
}

const ResponsiveResponsePost: FunctionComponent<Props> = ({
  closeModal,
  ticket
}) => {
  const classes = useStyles();
  const {
    users,
    body,
    assignee,
    status,
    errorMessage,
    files,
    isLoading,
    statuses,
    changeAssignee,
    searchCreators,
    changeStatus,
    changeBody,
    saveAnswer,
    closeTicket,
    onFileDrop
  } = useFunctions(ticket);

  const InputProps = {
    placeholder: "Search name...",
    fullWidth: true
  };

  const postResponse = () => {
    saveAnswer().then(() => {
      closeModal();
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">Post a response</Typography> <br />
      <Grid container spacing={2}>
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
          <p>Assign To</p>
          <Autocomplete
            InputProps={InputProps}
            suggestions={users}
            updateQueryFunction={searchCreators}
            selectFunction={changeAssignee}
          />
        </Grid>
        <Grid item xs={12}>
          <p>Ticket Status</p>
          <TextField
            select
            fullWidth
            variant="outlined"
            margin="dense"
            value={status ? status : ""}
            onChange={changeStatus}
          >
            {statuses.map(status => (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Button onClick={postResponse} classes={{ root: classes.saveButton }}>
        Save
      </Button>{" "}
      &emsp;
      <Button onClick={closeModal}>Cancel</Button>
    </div>
  );
};

export default ResponsiveResponsePost;
