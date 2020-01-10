import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";

import useMenuElement from "../../../../utils/hooks/menu";
import Autocomplete, { Suggestion } from "../../../../components/Autocomplete";
import { updateNewTicket } from "../../../../state/actions/ticket";
import { useSearch } from "../../../../utils/hooks/tickets";
import { useStyles } from "../hooks";
import { CreateTicketState } from "../../../../state/types/state";

interface Props {
  ticket: CreateTicketState;
}

const Company: FunctionComponent<Props> = ({ ticket }) => {
  const { element, setElement, open, close } = useMenuElement();
  const dispatch = useDispatch();
  const { companies, searchCompanies } = useSearch();
  const classes = useStyles();
  const { companyAssociation: company } = ticket;
  const infoText = !!company ? company.name : "";

  const updateTicketCompany = (selectedItem: Suggestion) => {
    if (selectedItem.text)
      dispatch(
        updateNewTicket({
          ...ticket,
          companyAssociation: { id: selectedItem.id, name: selectedItem.text }
        })
      );
    setElement(null);
  };

  const InputProps = {
    classes: { root: classes.autoCompleteInput },
    placeholder: "Search company..."
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <small className={classes.titleText}>Organization</small>
        </Grid>
        <Grid item xs={10}>
          {infoText}
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={open}>
            <EditIcon />
          </IconButton>
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
            suggestions={companies}
            updateQueryFunction={searchCompanies}
            selectFunction={updateTicketCompany}
          />
        </Menu>
        <Divider classes={{ root: classes.divider }} />
      </Grid>
      <Divider classes={{ root: classes.divider }} />
    </Grid>
  );
};

export default Company;
