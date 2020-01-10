import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { colors } from "../../theme";
import { paths } from "../../routes";
import Page from "../../components/EmptyPage";
import Autocomplete, {
  Suggestion,
  SearchButtonOptions
} from "../../components/Autocomplete";
import CategoryItem from "./CategoryItem";

import HeroImg from "../../assets/images/hero.svg";
import { TicketSearchResult } from "../../state/types/tickets";
import { AppState } from "../../state/types/state";

const useStyles = makeStyles((theme: Theme) => ({
  searchHeader: {
    backgroundImage: `url(${HeroImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "23em",
    marginBottom: "4em",
    [theme.breakpoints.down("xs")]: {
      height: "10em",
      backgroundImage: "none"
    }
  },
  searchInput: {
    border: "none",
    boxShadow: `5px 3px 4px 2px ${colors.VERY_LIGHT_TEXT}`
  }
}));

type SearchSuggestion = TicketSearchResult & Suggestion;

const Home = () => {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState<Array<SearchSuggestion>>(
    []
  );
  const history = useHistory();
  const { categories } = useSelector((state: AppState) => state.info);

  const searchTickets = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/tickets/search/`;
    q = q.toLowerCase();
    const params = { q };

    axios.get(url, { params }).then(response => {
      setSearchResults(
        response.data.results
          .map((result: TicketSearchResult) => ({
            ...result,
            text: result.title
          }))
          .slice(0, 5)
      );
    });
  };

  const handleSubmit = (selectedItem: Suggestion) => {
    const query = selectedItem.text;
    history.push(`${paths.TICKET_LIST}?q=${query}`);
  };

  const InputProps = {
    classes: { notchedOutline: classes.searchInput }
  };

  return (
    <Page>
      <Grid
        container
        justify="center"
        alignItems="center"
        classes={{ container: classes.searchHeader }}
      >
        <Grid item xs={10} md={6}>
          <Typography variant="h5" align="center">
            Search for a Ticket
            <Autocomplete
              suggestions={searchResults}
              InputProps={InputProps}
              selectFunction={handleSubmit}
              updateQueryFunction={searchTickets}
              searchButton={SearchButtonOptions.Start}
              isAbsolute={true}
            />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Select the category to find the related topic
              </Typography>
            </Grid>
            {categories.map(category => (
              <Grid item key={category.id} xs={6} md={3}>
                <CategoryItem category={category} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
