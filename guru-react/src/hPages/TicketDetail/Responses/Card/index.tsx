import React, { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ReactMarkdown from "react-markdown";

import { makeStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreHoriIcon from "@material-ui/icons/MoreHoriz";

import { paths } from "../../../../routes";
import { Answer } from "../../../../state/types/tickets";
import DeleteConfirmation from "../../../../components/TicketDetail/DeleteConfirmation";
import TicketAttachment from "../../Attachment";
import ResponsiveUserInfo from "../../UserInfo/Responsive";

const useStyles = makeStyles({
  answerContent: {
    "& img": {
      width: "100%"
    },
    "& pre": {
      whiteSpace: "pre-wrap"
    }
  }
});

interface Props {
  slug: string;
  answer: Answer;
}

const ResponseCard: FunctionComponent<Props> = ({ slug, answer }) => {
  const [
    responseMenuElement,
    setResponseMenuElement
  ] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const closeResponseMenu = () => {
    setResponseMenuElement(null);
  };
  const openResponseMenu = (event: React.MouseEvent<HTMLElement>) => {
    setResponseMenuElement(event.currentTarget);
  };

  const openModal = () => {
    setIsModalOpen(true);
    closeResponseMenu();
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const copyLink = () => {
    const url = `${window.location.protocol}//${window.location.hostname}/tickets/${slug}`;
    navigator.clipboard.writeText(url);
    closeResponseMenu();
  };
  const navigateTo = (path: string) => () => {
    history.push(path);
  };
  const createdOn = `${moment(answer.createdOn).format("ll")} at ${moment(
    answer.createdOn
  ).format("LT")} GMT`;

  return (
    <Card elevation={0}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={openResponseMenu}>
            <MoreHoriIcon />
          </IconButton>
        }
        subheader={
          <ResponsiveUserInfo
            createdBy={answer.createdBy}
            date={answer.createdOn}
          />
        }
      />
      <Menu
        id="response-menu"
        anchorEl={responseMenuElement}
        keepMounted
        variant="menu"
        open={Boolean(responseMenuElement)}
        onClose={closeResponseMenu}
      >
        <MenuItem onClick={copyLink}>Copy Link</MenuItem>
        <MenuItem onClick={navigateTo(paths.getCreateTicketPath(NaN))}>
          Open new ticket
        </MenuItem>
        <MenuItem onClick={openModal}>Delete</MenuItem>
      </Menu>
      <CardContent>
        <ReactMarkdown source={answer.body} className={classes.answerContent} />
        {answer.attachments.map((attachment, index) => (
          <TicketAttachment key={index} document={attachment} />
        ))}
        <Modal
          aria-labelledby="delete-confirmation-modal"
          open={isModalOpen}
          onClose={closeModal}
        >
          <div className="modal-super-container">
            <div className="modal-container">
              <DeleteConfirmation
                closeModal={closeModal}
                slug={slug}
                answer={answer}
              />
            </div>
          </div>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default ResponseCard;
