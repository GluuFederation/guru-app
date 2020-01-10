import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";

import useMenuElement from "../../../../utils/hooks/menu";
import { updateTicket } from "../../../../state/actions/tickets";
import { updateNewTicket } from "../../../../state/actions/ticket";
import { useInfoState } from "../../../../state/hooks";
import { useStyles } from "../hooks";
import { CreateTicketState } from "../../../../state/types/state";
import { Ticket } from "../../../../state/types/tickets";

interface Props {
  canEdit: boolean;
  ticket: Ticket | CreateTicketState;
  isNew?: boolean;
}

interface MenuItem {
  id: number;
  name: string;
  slug: string;
}

const GluuServer: FunctionComponent<Props> = ({ canEdit, ticket, isNew }) => {
  const { element, setElement, open, close } = useMenuElement();
  const dispatch = useDispatch();
  const { products } = useInfoState();
  const gluu = products.find(product => product.id === 1);
  let menuItems: Array<MenuItem> = [];
  if (gluu) {
    menuItems = [
      ...gluu.version.map((version, index) => ({
        id: index,
        name: `Gluu ${version}`,
        slug: version
      }))
    ];
  }
  const classes = useStyles();
  const infoText = ticket.gluuServer;

  const update = (selectedItem: MenuItem) => () => {
    if (isNew) {
      const newTicket = ticket as CreateTicketState;
      dispatch(
        updateNewTicket({ ...newTicket, gluuServer: selectedItem.slug })
      );
    } else if (canEdit) {
      const oldTicket = ticket as Ticket;
      updateTicket({ ...oldTicket, gluuServer: selectedItem.slug })(dispatch);
    }
    setElement(null);
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <small className={classes.titleText}>Gluu version</small>
        </Grid>
        <Grid item xs={10}>
          {infoText}
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
          {menuItems.map(item => (
            <MenuItem key={item.id} value={item.slug} onClick={update(item)}>
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      <Divider classes={{ root: classes.divider }} />
    </Grid>
  );
};

export default GluuServer;
