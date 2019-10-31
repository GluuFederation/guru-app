import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import Modal from "@material-ui/core/Modal";
import { paths } from "../../routes";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreHoriIcon from "@material-ui/icons/MoreHoriz";
import { Answer } from "../../state/types/tickets";
import DeleteConfirmation from "../../components/TicketDetail/DeleteConfirmation";

const styles = (theme: Theme) =>
  createStyles({
    card: {}
  });

interface ExternalProps {
  slug: string;
  answer: Answer;
}

interface State {
  isModalOpen: boolean;
  responseMenuElement: HTMLElement | null;
}

type Props = ExternalProps & WithStyles<typeof styles> & RouteComponentProps;

class TicketDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      responseMenuElement: null,
      isModalOpen: false
    };
  }

  closeResponseMenu = () => {
    this.setState({ responseMenuElement: null });
  };

  openResponseMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ responseMenuElement: event.currentTarget });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
    this.closeResponseMenu();
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  copyLink = () => {
    const url = `${window.location.protocol}//${window.location.hostname}/tickets/${this.props.slug}`;
    navigator.clipboard.writeText(url);
    this.closeResponseMenu();
  };
  navigateTo = (path: string) => () => {
    this.props.history.push(path);
  };
  render() {
    const { answer, slug } = this.props;
    const { responseMenuElement, isModalOpen } = this.state;
    const createdOn = `${moment(answer.createdOn).format("ll")} at ${moment(
      answer.createdOn
    ).format("LT")} GMT`;

    return (
      <Card elevation={0}>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={this.openResponseMenu}>
              <MoreHoriIcon />
            </IconButton>
          }
          subheader={createdOn}
        />
        <Menu
          id="response-menu"
          anchorEl={responseMenuElement}
          keepMounted
          variant="menu"
          open={Boolean(responseMenuElement)}
          onClose={this.closeResponseMenu}
        >
          <MenuItem onClick={this.copyLink}>Copy Link</MenuItem>
          <MenuItem onClick={this.navigateTo(paths.getCreateTicketPath(NaN))}>
            Open new ticket
          </MenuItem>
          <MenuItem onClick={this.openModal}>Delete</MenuItem>
        </Menu>
        <CardContent>
          <ReactMarkdown source={answer.body} />
          <Modal
            aria-labelledby="delete-confirmation-modal"
            open={isModalOpen}
            onClose={this.closeModal}
          >
            <div className="modal-super-container">
              <div className="modal-container">
                <DeleteConfirmation
                  closeModal={this.closeModal}
                  slug={slug}
                  answer={answer}
                />
              </div>
            </div>
          </Modal>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(withRouter(TicketDetail));
