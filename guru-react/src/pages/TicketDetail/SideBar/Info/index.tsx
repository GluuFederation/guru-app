import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";

import useMenuElement from "../../../../utils/hooks/menu";
import { updateTicket } from "../../../../state/actions/tickets";
import { updateNewTicket } from "../../../../state/actions/ticket";
import { useStyles } from "../hooks";
import { CreateTicketState } from "../../../../state/types/state";
import { Ticket, SidebarType } from "../../../../state/types/tickets";
import { getChipClass } from "../../../../utils/chipStyles";
import { useInfoState } from "../../../../state/hooks";

interface InfoItem {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  canEdit: boolean;
  ticket: Ticket | CreateTicketState;
  isNew?: boolean;
  sideBarType: SidebarType;
}

const Info: FunctionComponent<Props> = ({
  canEdit,
  ticket,
  isNew,
  sideBarType
}) => {
  const { element, setElement, open, close } = useMenuElement();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { issueTypes, categories, statuses } = useInfoState();

  const itemId =
    sideBarType === SidebarType.IssueType
      ? ticket.issueType
      : sideBarType === SidebarType.Category
      ? ticket.category
      : ticket.status;
  const infoList =
    sideBarType === SidebarType.IssueType
      ? issueTypes
      : sideBarType === SidebarType.Category
      ? categories
      : statuses;
  const title =
    sideBarType === SidebarType.IssueType
      ? "Issue Type"
      : sideBarType === SidebarType.Category
      ? "Category"
      : "Status";
  const item = infoList.find(item => item.id === itemId);
  const infoText = !!item ? item.name : "";
  const infoSlug = !!item ? item.slug : "";

  const isChip = [SidebarType.IssueType, SidebarType.Status].includes(
    sideBarType
  );

  const update = (selectedItem: InfoItem) => () => {
    if (isNew) {
      const newTicket = ticket as CreateTicketState;
      dispatch(
        updateNewTicket({ ...newTicket, [sideBarType]: selectedItem.id })
      );
    } else if (canEdit) {
      const oldTicket = ticket as Ticket;
      updateTicket({ ...oldTicket, [sideBarType]: selectedItem.id })(dispatch);
    }
    setElement(null);
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <small className={classes.titleText}>{title}</small>
        </Grid>
        <Grid item xs={10}>
          {isChip ? (
            <Chip label={infoText} className={getChipClass(infoSlug)} />
          ) : (
            infoText
          )}
        </Grid>
        <Grid item xs={2}>
          {canEdit ? (
            <IconButton onClick={open}>
              <EditIcon />
            </IconButton>
          ) : null}
        </Grid>
        <Menu
          id="creator-menu"
          anchorEl={element}
          variant="menu"
          open={Boolean(element)}
          onClose={close}
        >
          {infoList.map(item => (
            <MenuItem key={item.id} value={item.id} onClick={update(item)}>
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      <Divider classes={{ root: classes.divider }} />
    </Grid>
  );
};

export default Info;
