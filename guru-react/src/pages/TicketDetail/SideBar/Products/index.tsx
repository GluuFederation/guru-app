import React, { FunctionComponent, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

import { useInfoState } from "../../../../state/hooks";
import useModal from "../../../../utils/hooks/modal";
import { useStyles } from "../hooks";
import { CreateTicketState } from "../../../../state/types/state";
import { Ticket, TicketProduct } from "../../../../state/types/tickets";
import ChangeProduct from "../../ChangeProduct";

interface Props {
  canEdit: boolean;
  ticket: Ticket | CreateTicketState;
  isNew?: boolean;
}

const Products: FunctionComponent<Props> = ({ canEdit, ticket, isNew }) => {
  const classes = useStyles();
  const { isOpen, open, close } = useModal();
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [activeProduct, setActiveProduct] = useState<
    TicketProduct | undefined
  >();
  const { products: gluuProducts } = useInfoState();

  const products = ticket.products;
  const openProductMenu = (index?: number) => () => {
    setActiveIndex(index);
    if (index && index < products.length) setActiveProduct(products[index]);
    open();
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12}>
          <small className={classes.titleText}>Additional Products</small>
        </Grid>
        {products.map((ticketProduct, index) => {
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
                  <IconButton onClick={openProductMenu(index)}>
                    <EditIcon />
                  </IconButton>
                ) : null}
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth onClick={openProductMenu()}>
          <AddCircleOutline /> Add Additional Product
        </Button>
      </Grid>
      <Modal open={isOpen} onClose={close}>
        <div className="modal-super-container">
          <div className="modal-container">
            <ChangeProduct
              closeModal={open}
              product={activeProduct}
              index={isNew ? activeIndex : undefined}
            />
          </div>
        </div>
      </Modal>
    </Grid>
  );
};

export default Products;
