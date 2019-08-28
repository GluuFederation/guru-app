import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import GroupIcon from '../../assets/images/group_icon.png';
import GraphIcon from '../../assets/images/graph_icon.png';
import PersonIcon from '../../assets/images/person_icon.png';
import NextArrow from '../../assets/images/next_arrow.png';
import Container from '@material-ui/core/Container';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashboardSideMenu from "../../components/Dashboard/DashboardSideMenu";
import AdminNotificationPopover from "../../components/Dashboard/AdminNotificationPopover";
import AdminUserRolePopover from "../../components/Dashboard/AdminUserRolePopover";

const styles = (theme: Theme) =>
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
        contentContainer: {},
        cardGraph: {
            width: '100%',
            height: 100,
            backgroundColor: '#ffa516',
            color: '#ffffff',
        },
        cardPerson: {
            width: '100%',
            height: 100,
            backgroundColor: '#059599',
            color: '#ffffff',
        },
        cardBackground: {
            backgroundImage: "url(" + { GroupIcon } + ")"
        },
        dashboardClickImg: {
            width: 90,
            height: 90,
            marginTop: -34,
            opacity: 0.3,
            float: 'right',
        },
        catagoryName: {
            marginTop: 30,
            marginLeft: 30,
            textAlign: 'left',
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: '"Lato", sans-serif',
        },
        catagoryClick: {
            marginLeft: 30,
            textAlign: 'left',
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        nextArrow: {
            width: 15,
            marginTop: 5,
            marginLeft: 10,
            height: 'auto',
        },
    });


type Props = WithStyles<typeof styles> & RouteComponentProps;


class AdminPage extends Component<Props> {


    render() {
        const { classes } = this.props;

        return (
            <div style={{ marginTop: 20, }}>
                <Navbar />
                <Container className={classes.ContainerAlign} fixed>
                    <Grid className={classes.contentContainer} container>
                        <Grid item md={4} xs={12} sm={12}>
                            <DashboardSideMenu></DashboardSideMenu>
                        </Grid>

                        <Grid item md={8} xs={12} sm={12}>

                            <Grid style={{marginTop: 20}} container>

                                <Grid item xs={3} style={{ margin: 5,}}>
                                    <AdminUserRolePopover></AdminUserRolePopover>
                                </Grid>


                                <Grid item xs={3} style={{ margin: 5,}}>
                                    <AdminNotificationPopover></AdminNotificationPopover>
                                </Grid>


                                <Grid item xs={3} style={{ margin: 5,}}>
                                    <Card className={classes.cardGraph}>
                                        <CardActionArea>
                                            <Typography className={classes.catagoryName}>System Metrics</Typography>
                                            <Typography className={classes.catagoryClick}>Click here<img alt="" className={classes.nextArrow} src={NextArrow} /></Typography>
                                            <img alt="" className={classes.dashboardClickImg} src={GraphIcon} />

                                        </CardActionArea>
                                    </Card>
                                </Grid>


                                <Grid item xs={3} style={{ margin: 5,}}>
                                    <Card className={classes.cardPerson}>
                                        <CardActionArea>
                                            <Typography className={classes.catagoryName}>Profile Setting</Typography>
                                            <Typography className={classes.catagoryClick}>Click here<img alt="" className={classes.nextArrow} src={NextArrow} /></Typography>
                                            <img alt="" className={classes.dashboardClickImg} src={PersonIcon} />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid >
                </Container >
                <Footer></Footer>

            </div >

        );
    }
}

export default withRouter(withStyles(styles)(AdminPage));
