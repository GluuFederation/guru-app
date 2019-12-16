import React, { useState, FunctionComponent } from "react";
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

import Autocomplete, { Suggestion } from "../../../../components/Autocomplete";
import { colors } from "../../../../theme";
import { Ticket } from "../../../../state/types/tickets";
import useFunctions from "./hooks";

const useStyles = makeStyles({
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

interface Props {
  ticket: Ticket;
}
const ResponsePost: FunctionComponent<Props> = ({ ticket }) => {
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
    classes: { input: classes.autoCompleteInput },
    placeholder: "Search name...",
    fullWidth: true
  };

  const isButtonActive = !body;

  const postResponse = () => {
    saveAnswer();
  };

  return (
    <Card classes={{ root: classes.root }}>
      <CardContent>
        <Typography variant="h5">Post a response</Typography> <br />
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
          <Grid item md={6} xs={12}>
            <p>Assign To</p>
            <Autocomplete
              InputProps={InputProps}
              suggestions={users}
              updateQueryFunction={searchCreators}
              selectFunction={changeAssignee}
            />
          </Grid>
          <Grid item md={6} xs={12}>
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
        <Box mt={2}>
          <Button
            classes={{ root: classes.commentButton }}
            disabled={isButtonActive}
            onClick={postResponse}
          >
            Comment
          </Button>{" "}
          &emsp;
          <Button
            classes={{ root: classes.closeButton }}
            disabled={isButtonActive}
            onClick={closeTicket}
          >
            Close Ticket
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResponsePost;
