import React, { Component } from "react";

import { withStyles, WithStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { colors } from "../../theme";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Page from "../../components/Page";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import {
  WithCreateTicketProps,
  withCreateTicket
} from "../../state/hocs/ticket";
import {
  WithTicketDetailProps,
  withTicketDetail
} from "../../state/hocs/tickets";
import { WithInfoProps, withInfo } from "../../state/hocs/info";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";
import { paths } from "../../routes";
import TicketDetailSideBarItem, {
  MenuType
} from "../../components/TicketDetail/TicketDetailSideBarItem";

import "easymde/dist/easymde.min.css";
import { history } from "../../state/store";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: colors.SECONDARY_BACKGROUND,
      marginTop: "4em"
    },
    nextButton: {
      color: colors.MAIN_BACKGROUND,
      backgroundColor: colors.MAIN_COLOR
    }
  });

type Props = WithUserProps &
  WithCreateTicketProps &
  WithTicketDetailProps &
  WithInfoProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

interface State {
  isLoading: boolean;
  files: Array<File>;
}

class CreateTicket extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      files: []
    };
  }

  componentDidMount() {
    const { newTicket, history } = this.props;
    const paramsStep = parseInt((this.props.match.params as any).step, 10);
    if (isNaN(paramsStep)) {
      history.push(paths.getCreateTicketPath(newTicket.step));
    }
  }

  next = () => {
    const newStep = this.props.newTicket.step + 1;
    this.props.setCreateTicketStep(newStep);
    history.push(paths.getCreateTicketPath(newStep));
  };

  back = () => {
    const { setCreateTicketStep, newTicket } = this.props;
    const newStep = newTicket.step - 1;
    if (newTicket.step > 1) setCreateTicketStep(newStep);
    history.push(paths.getCreateTicketPath(newStep));
  };

  createTicket = () => {
    const {
      createTicket,
      clearTicketEntry,
      newTicket,
      history,
      uploadTicketFiles
    } = this.props;
    const { files } = this.state;
    createTicket(newTicket).then(ticket => {
      if (files.length) {
        const formData = new FormData();
        files.forEach((file, index) => {
          formData.append(`file-${index}`, file);
        });
        console.log(files, formData);
        uploadTicketFiles(ticket.slug, formData);
      }
      clearTicketEntry();
      history.push(paths.getTicketDetailPath(ticket.slug));
    });
  };

  cancel = () => {
    this.props.clearTicketEntry();
  };

  onFileDrop = (files: Array<File>) => {
    this.setState({ files: [...this.state.files, ...files] });
    console.log(files);
  };

  render() {
    const { classes, newTicket } = this.props;
    const {
      step,
      companyAssociation,
      createdFor,
      issueType,
      category,
      os,
      gluuServer,
      hasProducts
    } = newTicket;

    return (
      <Page>
        <Navbar />
        <div className={`app-body ${classes.root}`}>
          <Container fixed>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">Create Ticket</Typography>
                <p>Step {step} of 9</p>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item md={8}>
                {step === 1 ? (
                  <Step1 />
                ) : step === 2 ? (
                  <Step2 />
                ) : step === 3 ? (
                  <Step3 />
                ) : step === 4 ? (
                  <Step4 />
                ) : step === 5 ? (
                  <Step5 />
                ) : step === 6 ? (
                  <Step6 />
                ) : step === 7 ? (
                  <Step7 />
                ) : step === 8 ? (
                  <Step8 />
                ) : step === 9 ? (
                  <Step9 onFileDrop={this.onFileDrop} />
                ) : null}
              </Grid>
              <Grid item md={3}>
                {companyAssociation ? (
                  <TicketDetailSideBarItem
                    menuType={MenuType.CompanyAssociation}
                    canEdit={true}
                    isNew={true}
                  />
                ) : null}
                {createdFor ? (
                  <TicketDetailSideBarItem
                    menuType={MenuType.Creator}
                    canEdit={true}
                    isNew={true}
                  />
                ) : null}
                {issueType ? (
                  <TicketDetailSideBarItem
                    menuType={MenuType.IssueType}
                    canEdit={true}
                    isNew={true}
                  />
                ) : null}
                {category ? (
                  <TicketDetailSideBarItem
                    menuType={MenuType.Category}
                    canEdit={true}
                    isNew={true}
                  />
                ) : null}
                {gluuServer ? (
                  <TicketDetailSideBarItem
                    menuType={MenuType.GluuServer}
                    canEdit={true}
                    isNew={true}
                  />
                ) : null}
                {os ? (
                  <TicketDetailSideBarItem
                    menuType={MenuType.Os}
                    canEdit={true}
                    isNew={true}
                  />
                ) : null}
                {hasProducts ? (
                  <TicketDetailSideBarItem
                    menuType={MenuType.Products}
                    canEdit={true}
                    isNew={true}
                  />
                ) : null}
                {step === 9 ? (
                  <TicketDetailSideBarItem
                    menuType={MenuType.NewProduct}
                    canEdit={true}
                    isNew={true}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Box mt={2}>
              {step === 9 ? (
                <Grid container>
                  <Grid item>
                    <Button
                      classes={{ root: classes.nextButton }}
                      onClick={this.createTicket}
                    >
                      Save and Submit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={this.cancel}>Cancel</Button>
                  </Grid>
                </Grid>
              ) : step !== 7 ? (
                <Grid container>
                  <Grid item>
                    <Button onClick={this.back}>Back</Button>
                  </Grid>
                  <Grid item>
                    <Button
                      classes={{ root: classes.nextButton }}
                      onClick={this.next}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              ) : null}
            </Box>
          </Container>
          <Footer />
        </div>
      </Page>
    );
  }
}

export default withRouter(
  withInfo(
    withCreateTicket(
      withTicketDetail(withUser(withStyles(styles)(CreateTicket)))
    )
  )
);
