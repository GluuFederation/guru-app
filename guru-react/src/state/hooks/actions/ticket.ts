import { useDispatch } from "react-redux";

import * as actions from "../../actions/ticket";
import { CreateTicketState } from "../../types/state";
import { ShortCompany, ShortUser } from "../../types/profiles";
import { TicketProduct } from "../../types/tickets";

const useTicketActions = () => {
  const dispatch = useDispatch();

  const setTicketStep = (step: number) => dispatch(actions.setTicketStep(step));
  const updateNewTicket = (ticket: CreateTicketState) =>
    dispatch(actions.updateNewTicket(ticket));
  const setTicketCompany = (companyAssociation: ShortCompany) =>
    dispatch(actions.setTicketCompany(companyAssociation));
  const setTicketCreator = (createdFor: ShortUser) =>
    dispatch(actions.setTicketCreator(createdFor));
  const setTicketIssueType = (issueType: number) =>
    dispatch(actions.setTicketIssueType(issueType));
  const setTicketCategory = (category: number) =>
    dispatch(actions.setTicketCategory(category));
  const setTicketGluuServer = (gluuServer: string) =>
    dispatch(actions.setTicketGluuServer(gluuServer));
  const setTicketOs = (os: string) => dispatch(actions.setTicketOs(os));
  const setTicketOsVersion = (osVersion: string) =>
    dispatch(actions.setTicketOsVersion(osVersion));
  const setTicketHasProducts = (hasProducts: boolean) =>
    dispatch(actions.setTicketHasProducts(hasProducts));
  const addTicketProduct = (product: TicketProduct) =>
    dispatch(actions.addTicketProduct(product));
  const removeTicketProduct = (index: number) =>
    dispatch(actions.removeTicketProduct(index));
  const setTicketTitle = (title: string) =>
    dispatch(actions.setTicketTitle(title));
  const setTicketBody = (body: string) => dispatch(actions.setTicketBody(body));
  const setTicketPrivacy = (isPrivate: boolean) =>
    dispatch(actions.setTicketPrivacy(isPrivate));
  const clearTicketEntry = () => dispatch(actions.clearTicketEntry());
  const createTicket = (ticket: CreateTicketState) =>
    actions.createTicket(ticket)();

  return {
    setTicketStep,
    updateNewTicket,
    setTicketCompany,
    setTicketCreator,
    setTicketIssueType,
    setTicketCategory,
    setTicketGluuServer,
    setTicketOs,
    setTicketOsVersion,
    setTicketHasProducts,
    addTicketProduct,
    removeTicketProduct,
    setTicketTitle,
    setTicketBody,
    setTicketPrivacy,
    clearTicketEntry,
    createTicket
  };
};

export default useTicketActions;
