import React, { Component } from "react";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createStyles, Theme } from '@material-ui/core/styles';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Lock from '@material-ui/icons/Lock';
//components
import SideBarPanel from "../../components/TicketDetail/SideBarPanel";
import TicketCard from "../../components/TicketDetail/TicketCard";
import TicketUserInfo from "../../components/TicketDetail/TicketUserInfo";
import TicketHistory from "../../components/TicketDetail/TicketHistory";
import ResponseUserInfo from "../../components/TicketDetail/ResponseUserInfo";
import ResponseCard from "../../components/TicketDetail/ResponseCard";
import ResponsePost from "../../components/TicketDetail/ResponsePost";
import EditTicket from "../../components/TicketDetail/EditTicket";

const styles = ((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    ContainerAlign: {
      width: '80%',
      margin: '0 auto',
      marginTop: -4,
      marginBottom: 54,
    },

    textGreen: {
      color: '#7BC073',
      fontFamily: 'arial',
      fontWeight: 600,
      fontSize: 12
    },
    textGray: {
      color: '#B3B3B3',
      fontFamily: 'arial',
      fontWeight: 600,
      fontSize: 14
    },
    contentContainer: {
      marginTop: 10,
      marginBottom: 10,
    },
    titleBar: {
      color: '#3E3E3E',
      fontFamily: 'arial',
      fontWeight: 600,
      fontSize: 24,
      textAlign: 'left',
      left: 0
    },
    titleRespons: {
      color: '#3E3E3E',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: 24,
      textAlign: 'left',
      left: 0
    },
    gridContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    button: {
      width: 3,
      height: 30,
      fontFamily: 'arial',
      fontWeight: 600,
      color: '#ABABAB',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
    },
    buttonLock: {
      width: '5%',
      height: 30,
      fontFamily: 'arial',
      fontWeight: 600,
      color: '#ABABAB',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      borderRadius: 2,
      float: 'right',
    },

    buttonTxt: {
      color: '#08AC20',
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      display: 'none'
    },
    GridThreeRight: {
    },

  })
);

type Props = WithUserProps & RouteComponentProps & WithStyles<typeof styles>;

interface State {
  openAdd: boolean;
}

class TciketDetail extends Component<Props, State>{
  state = {
    openAdd: false,
  };

  handleOpenAdd = () => {
    this.setState({ openAdd: true });
  };

  handleCloseAdd = () => {
    this.setState({ openAdd: false });
  };

  render() {

    const { classes } = this.props;
    return (

      <div style={{ backgroundColor: 'white' }} className="TicketDetail">
        <Navbar />
        <Container className={classes.ContainerAlign} fixed>
          <Grid className={classes.contentContainer} container>
            <Grid item={true} md={12} xs={12} sm={12}>
              <Breadcrumbs aria-label="Breadcrumb">
                <Link className={classes.textGray} href="">
                  Dashboard
							</Link>
                <Link className={classes.textGreen} href="">
                  Tickets
							</Link>
                <Typography className={classes.textGray}>#5234</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>


          <Grid container spacing={3}>

            <Grid container item={true} md={9} xs={12} sm={12}>
              <Grid className={classes.gridContainer} item={true} md={9} xs={12} sm={12}>
                <Typography className={classes.titleBar}>
                  502 Gateway Error - Failed to load configuration from LDAP - Gluu Docker Multi-node #5234
              </Typography>
              </Grid>

              <Grid className={classes.gridContainer} item={true} md={3} xs={12} sm={12}>
                <EditTicket></EditTicket>
                <Button variant="outlined" className={classes.buttonLock}>
                  <Lock className={classes.buttonTxt} />
                </Button>

              </Grid>
              <Grid className={classes.gridContainer} item={true} md={2} xs={12} sm={12}>
                <TicketUserInfo></TicketUserInfo>
              </Grid>

              <Grid className={classes.gridContainer} item={true} md={10} xs={12} sm={12}>
                <TicketCard></TicketCard>
                <TicketHistory></TicketHistory>
              </Grid>

              <Grid className={classes.contentContainer} container>
                <Grid item={true} md={12} xs={12} sm={12}>
                  <Typography className={classes.titleRespons}>3 Responses</Typography>
                </Grid>
              </Grid>

              <Grid className={classes.contentContainer} container>
                <Grid item={true} md={12} xs={12} sm={12}>
                  <hr style={{ color: "#F1F1F1", backgroundColor: "#F1F1F1", height: 1, marginTop: -10, }} />
                </Grid>
              </Grid>

              <Grid className={classes.gridContainer} item={true} md={2} xs={12} sm={12}>
                <ResponseUserInfo></ResponseUserInfo>
              </Grid>


              <Grid className={classes.gridContainer} item={true} md={10} xs={12} sm={12}>
                <ResponseCard></ResponseCard>
              </Grid>

              <Grid className={classes.gridContainer} item={true} md={12} xs={12} sm={12}>
                <ResponsePost></ResponsePost>
              </Grid>
            </Grid>
            <Grid className={classes.GridThreeRight} container item={true} md={3} xs={12} sm={12}>
              <div>
                <SideBarPanel></SideBarPanel>
              </div>
            </Grid>

          </Grid>

        </Container>
        <Footer></Footer>
      </div>
    );
  };
};

export default withRouter(withUser(withStyles(styles)(TciketDetail)));
