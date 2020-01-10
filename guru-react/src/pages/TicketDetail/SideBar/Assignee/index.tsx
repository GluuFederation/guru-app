import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";

import Avatar from "../../../../components/Avatar";
import { ShortUser } from "../../../../state/types/profiles";
import useMenuElement from "../../../../utils/hooks/menu";
import Autocomplete, { Suggestion } from "../../../../components/Autocomplete";
import { setTicketAssignee } from "../../../../state/actions/tickets";
import { useSearch } from "../../../../utils/hooks/tickets";
import { useStyles } from "../hooks";

interface Props {
  assignee?: ShortUser;
  slug: string;
  canEdit: boolean;
}

const Assignee: FunctionComponent<Props> = ({ assignee, slug, canEdit }) => {
  const { element, setElement, open, close } = useMenuElement();
  const dispatch = useDispatch();
  const { staff, searchStaff } = useSearch();
  const classes = useStyles();
  const infoText = !!assignee
    ? `${assignee.firstName} ${assignee.otherNames} ${assignee.lastName}`
    : "";

  const updateTicketAssignee = (selectedItem: Suggestion) => {
    if (canEdit) setTicketAssignee(slug, selectedItem.id)(dispatch);
    setElement(null);
  };

  const InputProps = {
    classes: { root: classes.autoCompleteInput },
    placeholder: "Search name..."
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <small className={classes.titleText}>Assigned to</small>
        </Grid>
        <Grid item xs={3}>
          <Avatar user={assignee || undefined} />
        </Grid>
        <Grid item xs={7}>
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
          <Autocomplete
            InputProps={InputProps}
            suggestions={staff}
            updateQueryFunction={searchStaff}
            selectFunction={updateTicketAssignee}
          />
        </Menu>
      </Grid>
      <Divider classes={{ root: classes.divider }} />
    </Grid>
  );
};

export default Assignee;
