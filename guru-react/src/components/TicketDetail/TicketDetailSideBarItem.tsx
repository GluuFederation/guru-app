import React, { Component } from "react";
import axios from "axios";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

import { colors } from "../../theme";
import Autocomplete, { Suggestion } from "../Autocomplete";
import { ShortUser } from "../../state/types/profiles";
import { withUser, WithUserProps } from "../../state/hocs/profiles";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import { getChipClass } from "../../utils/chipStyles";
import {
  withTicketDetail,
  WithTicketDetailProps
} from "../../state/hocs/tickets";
import { closedStatus, otherCategory } from "../../state/preloaded/info";
import {
  TicketCategory,
  TicketStatus,
  TicketIssueType
} from "../../state/types/info";
import ChangeOs from "./ChangeOs";
import ChangeProduct from "./ChangeProduct";
import { TicketProduct } from "../../state/types/tickets";

const styles = (theme: Theme) =>
  createStyles({
    autoCompleteInput: {
      marginRight: "1em",
      marginLeft: "1em",
      width: "12em"
    },
    titleText: {
      color: colors.LIGHTER_TEXT
    }
  });

export enum MenuType {
  Creator = "creator",
  Assignee = "assignee",
  IssueType = "issueType",
  Status = "status",
  Category = "category",
  GluuServer = "gluuServer",
  Os = "os",
  Products = "products",
  NewProduct = "newProduct"
}

interface ExternalProps {
  menuType: MenuType;
  canEdit?: boolean;
}

type Props = ExternalProps &
  WithUserProps &
  WithInfoProps &
  WithTicketDetailProps &
  WithStyles<typeof styles>;

enum ModalType {
  Os,
  Product
}

interface State {
  users: Array<Suggestion>;
  menuElement: HTMLElement | null;
  isModalOpen: boolean;
  modalType: ModalType;
  product?: TicketProduct;
}

class TicketDetailSideBarItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      users: [],
      menuElement: null,
      isModalOpen: false,
      modalType: ModalType.Os
    };
  }

  closeMenu = () => {
    this.setState({ menuElement: null });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  openMenu = (event: React.MouseEvent<HTMLElement>) => {
    const { menuType } = this.props;
    if (menuType === MenuType.Os) {
      this.setState({ isModalOpen: true, modalType: ModalType.Os });
    } else {
      this.setState({ menuElement: event.currentTarget });
    }
  };

  openProductMenu = (product: TicketProduct) => () => {
    this.setState({
      isModalOpen: true,
      modalType: ModalType.Product,
      product
    });
  };

  addAdditionalProduct = () => {
    this.setState({
      isModalOpen: true,
      modalType: ModalType.Product,
      product: undefined
    });
  };

  searchCreators = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/users/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      this.setState({
        users: response.data.results
          .map((result: ShortUser) => ({
            ...result,
            text: `${result.firstName} ${result.lastName}`
          }))
          .slice(0, 5)
      });
    });
  };

  updateTicketCreator = (selectedItem: Suggestion) => {
    const { ticket } = this.props;
    if (!ticket) return;
    this.props.setTicketCreator(ticket.slug, selectedItem.id);
    this.setState({ menuElement: null });
  };

  updateTicketAssignee = (selectedItem: Suggestion) => {
    const { ticket } = this.props;
    if (!ticket) return;
    this.props.setTicketAssignee(ticket.slug, selectedItem.id);
    this.setState({ menuElement: null });
  };

  updateTicket = (selectedItem: { id: number; slug?: string }) => () => {
    const { ticket } = this.props;
    if (!ticket) return;
    const menuType = this.props.menuType;
    switch (menuType) {
      case MenuType.Category:
      case MenuType.Status:
      case MenuType.IssueType:
        this.props.updateTicket({
          ...ticket,
          [menuType]: selectedItem.id
        });
        this.setState({ menuElement: null });
        break;
      case MenuType.GluuServer:
        if (selectedItem.slug) {
          this.props.updateTicket({
            ...ticket,
            [menuType]: selectedItem.slug
          });
          this.setState({ menuElement: null });
        }
        break;
    }
  };

  render() {
    const { ticket, menuType, classes, info, canEdit } = this.props;
    if (!ticket) return <div />;

    const { createdBy, assignee, products } = ticket;
    const { users, menuElement, isModalOpen, modalType } = this.state;
    const { categories, statuses, issueTypes } = info;
    const gluuProducts = info.products;

    const tempStatus = info.statuses.find(item => item.id === ticket.status);
    const status = tempStatus ? tempStatus : closedStatus;

    const tempCategory = info.categories.find(
      item => item.id === ticket.category
    );
    const category = tempCategory ? tempCategory : otherCategory;

    const issueType = info.issueTypes.find(
      item => item.id === ticket.issueType
    );

    const showChip =
      (menuType === MenuType.IssueType && !!issueType) ||
      menuType === MenuType.Status;
    let chipName = "";
    let chipSlug = "";
    let infoText = "";
    let title = "";
    let avatar = "";
    let chipMenuItems: Array<
      | TicketCategory
      | TicketStatus
      | TicketIssueType
      | { id: number; name: string; slug: string }
    > = [];
    switch (menuType) {
      case MenuType.Creator:
        infoText = `${createdBy.firstName} ${createdBy.otherNames} ${
          createdBy.lastName
        }`;
        avatar = createdBy.avatar;
        title = "Created By";
        break;
      case MenuType.Assignee:
        infoText = assignee
          ? `${assignee.firstName} ${assignee.otherNames} ${assignee.lastName}`
          : "Unassigned";
        avatar = assignee ? assignee.avatar : "";
        title = "Assignee";
        break;
      case MenuType.Category:
        chipMenuItems = [...categories];
        infoText = category.name;
        title = "Category";
        break;
      case MenuType.Status:
        chipName = status.name;
        chipSlug = status.slug;
        chipMenuItems = [...statuses];
        title = "Status";
        break;
      case MenuType.IssueType:
        if (issueType) {
          chipName = issueType.name;
          chipSlug = issueType.slug;
          chipMenuItems = [...issueTypes];
        }
        title = "Issue Type";
        break;
      case MenuType.GluuServer:
        const gluu = gluuProducts.find(product => product.id === 1);
        if (gluu) {
          chipMenuItems = [
            ...gluu.version.map((version, index) => ({
              id: index,
              name: `Gluu ${version}`,
              slug: version
            }))
          ];
        }
        infoText = `Gluu ${ticket.gluuServer}`;
        title = "Gluu version";
        break;
      case MenuType.Products:
        title = "Additional Products";
        break;
      case MenuType.Os:
        title = "OS Version";
        infoText = `${ticket.os} ${ticket.osVersion}`;
        break;
    }

    const InputProps = {
      classes: { root: classes.autoCompleteInput },
      placeholder: "Search name..."
    };

    return (
      <Grid item xs={12}>
        {menuType === MenuType.NewProduct ? (
          <React.Fragment>
            {canEdit ? (
              <Button fullWidth onClick={this.addAdditionalProduct}>
                <AddCircleOutline /> Add Additional Product
              </Button>
            ) : null}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <small className={classes.titleText}>{title}</small>
              </Grid>
              {menuType === MenuType.Products ? (
                <React.Fragment>
                  {products.map(ticketProduct => {
                    const gluuProduct = gluuProducts.find(
                      item => item.id === ticketProduct.product
                    );
                    if (!gluuProduct) return <span key={ticketProduct.id} />;
                    return (
                      <React.Fragment key={ticketProduct.id}>
                        <Grid item xs={10}>
                          {gluuProduct.name} {ticketProduct.version}
                        </Grid>
                        <Grid item xs={2}>
                          {canEdit ? (
                            <IconButton
                              onClick={this.openProductMenu(ticketProduct)}
                            >
                              <EditIcon />
                            </IconButton>
                          ) : null}
                        </Grid>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {menuType === MenuType.Creator ||
                  menuType === MenuType.Assignee ? (
                    <React.Fragment>
                      <Grid item xs={3}>
                        <Avatar src={avatar} />
                      </Grid>
                      <Grid item xs={7}>
                        {infoText}
                      </Grid>
                    </React.Fragment>
                  ) : menuType === MenuType.Status ||
                    menuType === MenuType.IssueType ? (
                    <Grid item xs={10}>
                      {showChip ? (
                        <Chip
                          label={chipName}
                          className={getChipClass(chipSlug)}
                        />
                      ) : (
                        <span />
                      )}
                    </Grid>
                  ) : (
                    <Grid item xs={10}>
                      {infoText}
                    </Grid>
                  )}
                  <Grid item xs={2}>
                    {canEdit ? (
                      <IconButton onClick={this.openMenu}>
                        <EditIcon />
                      </IconButton>
                    ) : null}
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
            <Menu
              id="creator-menu"
              anchorEl={menuElement}
              variant="menu"
              open={Boolean(menuElement)}
              onClose={this.closeMenu}
            >
              {menuType === MenuType.Creator ||
              menuType === MenuType.Assignee ? (
                <Autocomplete
                  InputProps={InputProps}
                  suggestions={users}
                  updateQueryFunction={this.searchCreators}
                  selectFunction={this.updateTicketCreator}
                />
              ) : (
                <div>
                  {chipMenuItems.map(chipMenuItem => (
                    <MenuItem
                      key={chipMenuItem.id}
                      value={chipMenuItem.id}
                      onClick={this.updateTicket(chipMenuItem)}
                    >
                      {chipMenuItem.name}
                    </MenuItem>
                  ))}
                </div>
              )}
            </Menu>
            <Divider />
          </React.Fragment>
        )}

        {menuType === MenuType.Os ||
        menuType === MenuType.Products ||
        menuType === MenuType.NewProduct ? (
          <Modal open={isModalOpen} onClose={this.closeModal}>
            <div className="modal-super-container">
              <div className="modal-container">
                {modalType === ModalType.Os ? (
                  <ChangeOs closeModal={this.closeModal} />
                ) : (
                  <ChangeProduct
                    closeModal={this.closeModal}
                    product={this.state.product}
                  />
                )}
              </div>
            </div>
          </Modal>
        ) : null}
      </Grid>
    );
  }
}

export default withTicketDetail(
  withInfo(withUser(withStyles(styles)(TicketDetailSideBarItem)))
);
