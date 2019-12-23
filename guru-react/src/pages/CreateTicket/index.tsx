import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";

import { colors } from "../../theme";
import Page from "../../components/EmptyPage";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";
import SideBar from "./SideBar";
import { paths } from "../../routes";
import FullPageLoader from "../../components/loaders/FullPageLoader";
import { AppState } from "../../state/types/state";
import {
  setTicketStep,
  createTicket,
  clearTicketEntry,
  setTicketCompany,
  setTicketCreator
} from "../../state/actions/ticket";
import { uploadTicketFiles } from "../../state/actions/tickets";
import { setConfirmationText } from "../../state/actions/info";
import { useTicketPermissions } from "../TicketDetail/hooks";
import useValidators from "./validators";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingBottom: "5rem",
    paddingTop: "2rem"
  },
  nextButton: {
    color: colors.MAIN_BACKGROUND,
    backgroundColor: colors.MAIN_COLOR
  },
  errorMessage: {
    colors: colors.RED,
    marginBottom: ".5rem",
    marginTop: 0
  }
});

export const getDisplayStep = (step: number, isCommunity?: boolean): number => {
  if (isCommunity) {
    return step > 3 ? step - 3 : step;
  }
  return step;
};

const CreateTicket = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<Array<File>>([]);
  const ticket = useSelector((state: AppState) => state.ticket);
  const params: any = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const paramsStep = parseInt(params.step, 10);
  const { step } = ticket;
  const classes = useStyles();
  const { isCommunity, user } = useTicketPermissions(null);
  const validateStep = useValidators();

  const setCommunityDefaults = () => {
    dispatch(setTicketCompany(user.company));
    dispatch(setTicketCreator(user));
  };

  useEffect(() => {
    if (isNaN(paramsStep)) {
      if (isNaN(step)) history.push(paths.getCreateTicketPath(1));
      else history.push(paths.getCreateTicketPath(ticket.step));
    }
    dispatch(
      setConfirmationText(
        "Are you sure you want to navigate away from this creating a ticket?"
      )
    );
    const currentStep = isCommunity ? (step < 4 ? 4 : step) : step;
    if (isCommunity) setCommunityDefaults();
    dispatch(setTicketStep(currentStep));
    history.push(paths.getCreateTicketPath(currentStep));
    setIsLoading(false);
  }, []);

  const next = async () => {
    try {
      await validateStep(step);
      const newStep = step + 1;
      dispatch(setTicketStep(newStep));
      history.push(paths.getCreateTicketPath(newStep));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const back = () => {
    const newStep = step - 1;
    if (step > 1) {
      dispatch(setTicketStep(newStep));
      history.push(paths.getCreateTicketPath(newStep));
    }
  };

  const create = () => {
    setIsLoading(true);
    createTicket(ticket)()
      .then(createdTicket => {
        dispatch(clearTicketEntry());
        if (files.length) {
          const formData = new FormData();
          files.forEach((file, index) => {
            formData.append(`file-${index}`, file);
          });
          uploadTicketFiles(createdTicket.slug, formData)(dispatch);
        }
        history.push(paths.getTicketDetailPath(createdTicket.slug));
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  const cancel = () => {
    dispatch(clearTicketEntry());
  };

  const onFileDrop = (droppedFiles: Array<File>) => {
    setFiles([...files, ...droppedFiles]);
  };

  if (isLoading) return <FullPageLoader />;

  return (
    <Page removeRootStyle confirmNavigation>
      <div className={classes.root}>
        <Container fixed>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4">Create Ticket</Typography>
              <p>
                Step {getDisplayStep(step, isCommunity)} of{" "}
                {getDisplayStep(9, isCommunity)}
              </p>
            </Grid>
            <Grid item xs={12}>
              {errorMessage ? (
                <div className={classes.errorMessage}>{errorMessage}</div>
              ) : null}
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={8}>
              {step === 1 ? (
                <Step1 ticket={ticket} />
              ) : step === 2 ? (
                <Step2 ticket={ticket} />
              ) : step === 3 ? (
                <Step3 ticket={ticket} />
              ) : step === 4 ? (
                <Step4 ticket={ticket} />
              ) : step === 5 ? (
                <Step5 ticket={ticket} />
              ) : step === 6 ? (
                <Step6 ticket={ticket} />
              ) : step === 7 ? (
                <Step7 />
              ) : step === 8 ? (
                <Step8 ticket={ticket} />
              ) : step === 9 ? (
                <Step9 ticket={ticket} files={files} onFileDrop={onFileDrop} />
              ) : null}
            </Grid>
            <Grid item md={3}>
              <Hidden smDown>
                <SideBar ticket={ticket} step={step} />
              </Hidden>
            </Grid>
          </Grid>
          <Box mt={2}>
            {step === 9 ? (
              <Grid container>
                <Grid item>
                  <Button
                    classes={{ root: classes.nextButton }}
                    onClick={create}
                  >
                    Save and Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={cancel}>Cancel</Button>
                </Grid>
              </Grid>
            ) : step !== 7 ? (
              <Grid container>
                <Grid item>
                  <Button onClick={back}>Back</Button>
                </Grid>
                <Grid item>
                  <Button classes={{ root: classes.nextButton }} onClick={next}>
                    Next
                  </Button>
                </Grid>
              </Grid>
            ) : null}
          </Box>
        </Container>
      </div>
    </Page>
  );
};

export default CreateTicket;
