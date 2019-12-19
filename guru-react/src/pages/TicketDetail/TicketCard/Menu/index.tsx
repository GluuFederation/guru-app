import React, { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import MoreHoriz from "@material-ui/icons/MoreHoriz";

import { paths } from "../../../../routes";
import DeleteConfirmation from "../../DeleteConfirmation";

interface Props {
  slug: string;
}

const TicketCardMenu: FunctionComponent<Props> = ({ slug }) => {
  const history = useHistory();
  const [
    ticketMenuElement,
    setTicketMenuElement
  ] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeTicketMenu = () => {
    setTicketMenuElement(null);
  };
  const openTicketMenu = (event: React.MouseEvent<HTMLElement>) => {
    setTicketMenuElement(event.currentTarget);
  };
  const openModal = () => {
    setIsModalOpen(true);
    closeTicketMenu();
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigateTo = (path: string) => () => {
    history.push(path);
  };

  const copyLink = () => {
    const url = `${window.location.protocol}//${window.location.hostname}/tickets/${slug}`;
    navigator.clipboard.writeText(url);
    closeTicketMenu();
  };
  return (
    <>
      <IconButton onClick={openTicketMenu}>
        <MoreHoriz />
      </IconButton>
      <Menu
        id="ticket-menu"
        anchorEl={ticketMenuElement}
        keepMounted
        open={Boolean(ticketMenuElement)}
        onClose={closeTicketMenu}
      >
        <MenuItem onClick={copyLink}>Copy Link</MenuItem>
        <MenuItem onClick={navigateTo(paths.getCreateTicketPath(NaN))}>
          Open new ticket
        </MenuItem>
        <MenuItem onClick={openModal}>Delete</MenuItem>
      </Menu>
      <Modal
        aria-labelledby="delete-confirmation-modal"
        open={isModalOpen}
        onClose={closeModal}
      >
        <div className="modal-super-container">
          <div className="modal-container">
            <DeleteConfirmation closeModal={closeModal} slug={slug} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TicketCardMenu;
