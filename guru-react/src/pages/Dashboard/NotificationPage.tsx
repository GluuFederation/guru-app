import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ManageNotificationPopover from "../../components/Dashboard/ManageNotificationPopover";
import Navbar from "../../components/Navbar";
import Container from '@material-ui/core/Container';
import Footer from "../../components/Footer";
import DashboardSideMenu from "../../components/Dashboard/DashboardSideMenu";

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
        userTicketD: {
            marginTop: 20,
            marginBottom: 0,
            float: 'left',
            color: '#232323',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        userTicketLig: {
            marginTop: 20,
            marginBottom: 0,
            marginLeft: 4,
            color: '#929292',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        timeTicket: {
            marginTop: 20,
            marginBottom: 0,
            marginLeft: 4,
            color: '#929292',
            fontSize: 13,
            float: 'right',
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },

        paper: {
            marginRight: theme.spacing(2),
        },

    });
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box style={{ padding: 0 }} p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

type Props = WithStyles<typeof styles> & RouteComponentProps;

interface State {
    openTeamPro: boolean
    valueNotif: number
}

class NotificationPage extends Component<Props, State> {
    state = {
        openTeamPro: false,
        valueNotif: 0
    }

    handleOpenTeamPro = () => {
        this.setState({ openTeamPro: true });
    };

    handleCloseTeamPro = () => {
        this.setState({ openTeamPro: false });
    };

    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({ valueNotif: newValue });
    };
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Navbar />
                <Container className={classes.ContainerAlign} fixed>
                    <Box mt={2}>
                        <div className={`container-body`}>
                            <Grid container>
                                <Grid item md={4} xs={12} sm={12}>
                                    <DashboardSideMenu></DashboardSideMenu>
                                </Grid>
                                <Grid item md={8} xs={12} sm={12}>
                                    <Paper className={classes.paper}>
                                        <Box p={3}>
                                            <Grid container>
                                                <Grid item xs={8}>
                                                    <Typography variant="h5" align="left">Notifications</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <ManageNotificationPopover></ManageNotificationPopover>
                                                </Grid>

                                                <Tabs
                                                    value={this.state.valueNotif}
                                                    onChange={this.handleChange}
                                                    indicatorColor="primary"
                                                    textColor="success"
                                                    variant="fullWidth"
                                                    aria-label="full width tabs example"
                                                >
                                                    <Tab label="All activities" {...a11yProps(10)} />
                                                    <Tab label="Your activities" {...a11yProps(20)} />
                                                </Tabs>

                                                <Box style={{ width: '100%', }}>
                                                    <TabPanel value={this.state.valueNotif} index={0}>
                                                        <Grid container>
                                                            <Box mt={1} mb={1}><Typography variant="body2" align="left" color="textPrimary">A new ticket has been Opened</Typography></Box>
                                                            <Paper style={{ padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                                                <Typography variant="subtitle1" align="left">Docker single host oxtrust cannot download SSL certificate</Typography>
                                                                <Typography variant="body2" align="left" color="textSecondary">it is a long established fact that a reader will be directed by the readable content of a page</Typography>
                                                                <Typography variant="body2" align="left" color="textSecondary">just Now</Typography>
                                                            </Paper>
                                                            <Box mt={1} mb={1}><Typography variant="caption" align="left" color="textSecondary"><Typography variant="caption" align="left" color="textPrimary">William</Typography> replied to your ticket</Typography></Box>
                                                            <Paper style={{ padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                                                <Typography variant="body1" align="left" color="textPrimary">Mass Updating user Information</Typography>
                                                                <Typography variant="body2" align="left" color="textSecondary">Our current Provisioning process does not include your user date of birth</Typography>
                                                                <Typography variant="body2" align="left" color="textSecondary">10 min ago</Typography>
                                                            </Paper>
                                                            <Box>
                                                                <Box mt={2}><Typography variant="subtitle1" align="left" color="textPrimary">Your Invoice of September is ready</Typography></Box>
                                                                <Typography variant="body2" align="left" color="textSecondary">Last week</Typography>
                                                            </Box>
                                                        </Grid>
                                                    </TabPanel>
                                                </Box>

                                                <Box style={{ width: '100%', }}>
                                                    <TabPanel value={this.state.valueNotif} index={1}>
                                                        <Grid container>
                                                            <Grid item xs={8}>
                                                                <Box mt={2} mb={2}><Typography variant="body2" align="left" color="textPrimary">Nasir<Typography variant="caption" align="left" color="textSecondary"> Created a ticket</Typography></Typography></Box>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Box mt={2} mb={2}><Typography variant="body2" align="right" color="textSecondary">9 hours ago</Typography></Box>
                                                            </Grid>
                                                        </Grid>
                                                        <Paper style={{ padding: 10, width: '95%', backgroundColor: '#efefef' }} className={classes.paper}>
                                                            <Typography variant="subtitle1" align="left" color="textPrimary">Cheche Option not available in cluster manager V 3.1.4-06</Typography>
                                                            <Typography variant="body2" align="left" color="textSecondary">Hi Gluu support,</Typography>
                                                            <Typography variant="body2" align="left" color="textSecondary">I'm trying to get two servers clustered using the cluster manager.</Typography>
                                                        </Paper>

                                                        <Grid container>
                                                            <Grid item xs={8}>
                                                                <Box mt={2} mb={2}><Typography variant="body2" align="left" color="textPrimary">Nasir<Typography variant="body2" align="left" color="textSecondary" display="inline"> Relied to your ticket</Typography></Typography></Box>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Box mt={2} mb={2}><Typography variant="body2" align="right" color="textSecondary">Yesturday</Typography></Box>
                                                            </Grid>

                                                            <Paper style={{ padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                                                <Typography variant="body2" align="left" color="textPrimary">I think we know the origin of the bug. It has to do with the button that comes pre-selected in 3.1.4 and when you drop down to 3.1.2, it doesn't automatically deselected it, revealing the <span style={{ color: 'red', backgroundColor: '#f9e0e0', padding: 3 }}>Cache Configuration</span> menu. A fix is cooming shortly.</Typography>
                                                            </Paper>


                                                            <Grid container>
                                                                <Grid item xs={8}>
                                                                    <Box mt={2} mb={2}><Typography variant="body2" align="left" color="textPrimary">Nasir<Typography variant="caption" align="left" color="textSecondary"> Relied to your ticket</Typography></Typography></Box>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Box mt={2} mb={2}><Typography variant="body2" align="right" color="textSecondary">Jan18, 2018</Typography></Box>
                                                                </Grid>
                                                            </Grid>
                                                            <Paper style={{ padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                                                <Typography variant="subtitle1" align="left" color="textPrimary">Can you specify what is trying to connect to OpenDJ Here</Typography>
                                                                <Paper style={{ marginTop: 10, padding: 10, width: '92%', backgroundColor: '#f7f7f7', wordBreak: 'break-all' }} className={classes.paper}>
                                                                    <Typography variant="body2" align="left" color="textPrimary">descriplication.Java-args=-Xms8m. Client-Dcom.sun.jndi.ldap.object.disableEndpoint.</Typography>
                                                                </Paper>
                                                            </Paper>


                                                            <Grid container>
                                                                <Grid item xs={8}>
                                                                    <Box mt={2} mb={2}><Typography variant="body2" align="left" color="textPrimary">Nasir<Typography variant="caption" align="left" color="textSecondary"> Created a ticket</Typography></Typography></Box>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Box mt={2} mb={2}><Typography variant="body2" align="right" color="textSecondary">Jan18, 2018</Typography></Box>
                                                                </Grid>
                                                            </Grid>

                                                            <Paper style={{ padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                                                <Typography variant="subtitle1" align="left" color="textPrimary">Java Update - Cert Error w/OpenDJ</Typography>
                                                                <Typography variant="caption" align="left" color="textPrimary">Hello,</Typography>
                                                                <Typography variant="caption" align="left" color="textPrimary">Upon a recent patch to our in-house servers (to 1.8.0_191), our servers or not longer able to...</Typography>
                                                            </Paper>
                                                        </Grid>
                                                    </TabPanel>
                                                </Box>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Container>
                <Footer></Footer>

            </div>
        );
    }
}

export default withStyles(styles)(withRouter(NotificationPage));
