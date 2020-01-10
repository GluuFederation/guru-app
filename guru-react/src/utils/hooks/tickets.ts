import { useState } from "react";
import axios from "axios";

import { ShortUser, ShortCompany } from "../../state/types/profiles";
import { Ticket } from "../../state/types/tickets";
import { Suggestion } from "../../components/Autocomplete";

export const useSearch = (limit: number = 10) => {
  const [users, setUsers] = useState<Array<ShortUser & Suggestion>>([]);
  const [tickets, setTickets] = useState<Array<Ticket & Suggestion>>([]);
  const [staff, setStaff] = useState<Array<ShortUser & Suggestion>>([]);
  const [companies, setCompanies] = useState<Array<ShortCompany & Suggestion>>(
    []
  );

  const searchUsers = (q: string, company?: number) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/users/`;
    const params: any = { q, company };

    axios.get(url, { params }).then(response => {
      setUsers(
        response.data.results
          .map((result: ShortUser) => ({
            ...result,
            text: `${result.firstName} ${result.lastName}`
          }))
          .slice(0, limit)
      );
    });
  };

  const searchStaff = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/users/`;
    const params = { q, staff: "true" };

    axios.get(url, { params }).then(response => {
      setStaff(
        response.data.results
          .map((result: ShortUser) => ({
            ...result,
            text: `${result.firstName} ${result.lastName}`
          }))
          .slice(0, limit)
      );
    });
  };

  const searchCompanies = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/access-list/companies/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      setCompanies(
        response.data.results
          .map((result: ShortCompany) => ({
            ...result,
            text: result.name
          }))
          .slice(0, limit)
      );
    });
  };

  const searchTickets = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/tickets/search/`;
    q = q.toLowerCase()
    const params = { q };

    axios.get(url, { params }).then(response => {
      setTickets(
        response.data.results
          .map((result: Ticket) => ({
            ...result,
            text: result.title
          }))
          .slice(0, limit)
      );
    });
  };

  return {
    users,
    setUsers,
    searchUsers,
    staff,
    setStaff,
    searchStaff,
    companies,
    setCompanies,
    searchCompanies,
    tickets,
    setTickets,
    searchTickets
  };
};
