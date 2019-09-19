import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button/";
import { colors } from "../../theme";
import { paths } from "../../routes";
import { getSearchString } from "../../utils/filterQueries";
import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Autocomplete, { Suggestion } from "../../components/Autocomplete";
import CategoryItem from "./CategoryItem";
import { withInfo, WithInfoProps } from "../../state/hocs/info";

import HeroImg from "../../assets/images/hero.svg";
import { ReactComponent as SearchImg } from "../../assets/images/search.svg";
import { TicketSearchResult } from "../../state/types/tickets";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    searchHeader: {
      backgroundImage: `url(${HeroImg})`,
      backgroundSize: "contain",
      height: "23em",
      marginBottom: "4em"
    },
    searchInput: {
      border: "none",
      boxShadow: `5px 3px 4px 2px ${colors.VERY_LIGHT_TEXT}`
    }
  });

type Props = WithStyles<typeof styles> & RouteComponentProps & WithInfoProps;

type SearchSuggestion = TicketSearchResult & Suggestion;

interface State {
  searchResults: Array<SearchSuggestion>;
  searchQuery: string;
}

class Home extends Component<Props, State> {
  private Ref: React.RefObject<Autocomplete>;
  constructor(props: Props) {
    super(props);
    this.state = {
      searchResults: [],
      searchQuery: ""
    };
    this.Ref = React.createRef();

  }

  searchTickets = (q: string) => {
    const url = `${process.env.REACT_APP_API_BASE}/api/v1/tickets/search/`;
    const params = { q };

    axios.get(url, { params }).then(response => {
      this.setState({
        searchResults: response.data.results
          .map((result: TicketSearchResult) => ({
            ...result,
            text: result.title
          }))
          .slice(0, 5)
      });
    });
  };

  handleClick = () => {
    let searchQuery = this.Ref.current ? this.Ref.current.state.searchQuery : '';
    this.props.history.push(
      `${paths.TICKET_LIST}${getSearchString({
        query: searchQuery
      })}`
    );
  }
  handleSubmit = (event: React.KeyboardEvent<any>) => {
    if (event.key === "Enter") {
      let searchQuery = this.Ref.current ? this.Ref.current.state.searchQuery : '';
      this.props.history.push(
        `${paths.TICKET_LIST}${getSearchString({
          query: searchQuery
        })}`
      );
    }
  }

  render() {
    const { classes, info } = this.props;
    const { searchResults } = this.state;
    const { categories } = info;

    const InputProps = {
      startAdornment: (
        <InputAdornment position="start">
          <Button onClick={this.handleClick}>
            <SearchImg />
          </Button>
        </InputAdornment>
      ),
      classes: { notchedOutline: classes.searchInput },
      onKeyPress: this.handleSubmit
    };

    return (
      <Page>
        <Navbar />
        <div className={`${classes.root} app-body`}>
          <div>
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
                    updateQueryFunction={this.searchTickets}
                    ref={this.Ref}
                  />
                </Typography>
              </Grid>
            </Grid>
          </div>
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
        </div>

        <Footer />
      </Page>
    );
  }
}

export default withInfo(withRouter(connect()(withStyles(styles)(Home))));
