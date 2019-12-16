import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { AppState } from "../../../../state/types/state";
import {
  updateTicket,
  createTicketAnswer,
  setTicketAssignee,
  uploadAnswerFiles
} from "../../../../state/actions/tickets";
import { ShortUser } from "../../../../state/types/profiles";
import { Suggestion } from "../../../../components/Autocomplete";
import { Ticket } from "../../../../state/types/tickets";

const useFunctions = (ticket: Ticket) => {
  const [users, setUsers] = useState<Array<Suggestion>>([]);
  const [body, setBody] = useState("");
  const [assignee, setAssignee] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<Array<File>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { statuses } = useSelector((state: AppState) => state.info);
  const dispatch = useDispatch();

  const changeAssignee = (assignee: Suggestion) => {
    const user = users.find(item => item.id === assignee.id);
    if (user) {
      setAssignee(assignee.id);
    } else {
      setAssignee(undefined);
    }
  };

  const searchCreators = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/users/`;
    const params = { q };
    axios.get(url, { params }).then(response => {
      setUsers(
        response.data.results
          .map((result: ShortUser) => ({
            ...result,
            text: `${result.firstName} ${result.lastName}`
          }))
          .slice(0, 5)
      );
    });
  };

  const changeStatus = (event: React.ChangeEvent<{ value: string }>) => {
    const newStatus = parseInt(event.target.value as string, 10);
    const statusObject = statuses.find(item => item.id === newStatus);
    if (statusObject) {
      setStatus(newStatus);
    } else {
      setStatus(undefined);
    }
  };

  const changeBody = (body: string) => {
    setBody(body);
  };

  const clearState = () => {
    setBody("");
    setUsers([]);
    setErrorMessage("");
    setIsLoading(false);
  };

  const saveAnswer = async () => {
    if (!body) {
      setErrorMessage("Answer body cannot be empty");
      return;
    }
    setIsLoading(true);
    const answer = await createTicketAnswer(ticket.slug, body)(dispatch);
    if (status) {
      await updateTicket({ ...ticket, status })(dispatch);
    }
    if (assignee) {
      await setTicketAssignee(ticket.slug, assignee)(dispatch);
    }
    if (files.length) {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file-${index}`, file);
      });
      await uploadAnswerFiles(ticket.slug, answer, formData)(dispatch);
    }
    clearState();
    return Promise.resolve(true);
  };

  const closeTicket = () => {
    const statusObject = statuses.find(item => item.slug === "closed");
    if (statusObject) {
      setStatus(statusObject.id);
      saveAnswer();
    }
  };

  const onFileDrop = (droppedFiles: Array<File>) => {
    setFiles([...files, ...droppedFiles]);
  };

  return {
    users,
    body,
    assignee,
    status,
    errorMessage,
    files,
    isLoading,
    statuses,
    changeAssignee,
    searchCreators,
    changeStatus,
    changeBody,
    saveAnswer,
    closeTicket,
    onFileDrop
  };
};

export default useFunctions;
