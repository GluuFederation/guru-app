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
const styles = (theme: Theme) =>
    createStyles({
        notificationTitle: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 24,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        titleDesc: {
            marginTop: 20,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 12,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        decPaperB: {
            marginTop: 20,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: '"Lato", sans-serif',
        },
        decPaperG: {
            marginTop: 20,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 12,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        decTitlePaper: {
            marginTop: 20,
            marginBottom: 0,
            textAlign: 'left',
            color: '#18a85e',
            fontSize: 15,
            fontWeight: 600,
            fontFamily: '"Lato", sans-serif',
        },
        decPaperI: {
            marginTop: 20,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 12,
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
        tabs: {
            // borderLeft: '1px solid ${theme.palette.divider}',
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

                <Paper style={{ marginBottom: 20, marginTop: 20 }} className={classes.paper}>
                    <div style={{ padding: 25 }}>
                        <Grid style={{ marginBottom: -17, }} container>

                            <Grid item xs={8}>
                                <Typography className={classes.notificationTitle}>Notifications</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                
                                <ManageNotificationPopover></ManageNotificationPopover>
                            </Grid>

                            <Tabs
                                value={this.state.valueNotif}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="All activities" {...a11yProps(0)} />
                                <Tab label="Your activities" {...a11yProps(1)} />
                            </Tabs>

                            <div style={{ width: '100%', }}>
                                <TabPanel value={this.state.valueNotif} index={0}>
                                    <Grid container style={{ marginBottom: 20 }}>
                                        <Typography className={classes.titleDesc}>A new ticket has been Opened</Typography>

                                        <Paper style={{ marginTop: 10, padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperB}>Docker single host oxtrust cannot download SSL certificate</Typography>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperG}>it is a long established fact that a reader will be directed by the readable content of a page</Typography>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperI}>just Now</Typography>
                                        </Paper>


                                        <Typography className={classes.titleDesc}><span style={{ color: '#2dce56', marginRight: 2 }}>William</span>replied to your ticket</Typography>

                                        <Paper style={{ marginTop: 10, padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperB}>Mass Updating user Information</Typography>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperG}>Our current Provisioning process does not include your user date of birth</Typography>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperI}>10 min ago</Typography>
                                        </Paper>

                                        <div>
                                            <Typography className={classes.decPaperB}>Your Invoice of September is ready</Typography>
                                            <Typography style={{ marginTop: 0, }} className={classes.decPaperI}>Last week</Typography>
                                        </div>


                                    </Grid>
                                </TabPanel>
                            </div>

                            <div style={{ width: '100%', }}>
                                <TabPanel value={this.state.valueNotif} index={1}>
                                    <Grid container style={{ marginBottom: 25 }}>
                                        <Grid item xs={8}>
                                            <Typography className={classes.userTicketD}>Nasir<span className={classes.userTicketLig}>Created a ticket</span></Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography className={classes.timeTicket}>9 hours ago</Typography>
                                        </Grid>
                                    </Grid>
                                    <Paper style={{ marginTop: 10, padding: 10, width: '100%', backgroundColor: '#efefef' }} className={classes.paper}>
                                        <Typography style={{ marginTop: 0 }} className={classes.decTitlePaper}>Cheche Option not available in cluster manager V 3.1.4-06</Typography>
                                        <Typography style={{ marginTop: 0 }} className={classes.decPaperG}>Hi Gluu support,</Typography>
                                        <Typography style={{ marginTop: 0 }} className={classes.decPaperG}>I'm trying to get two servers clustered using the cluster manager.</Typography>
                                    </Paper>

                                    <Grid container style={{ marginBottom: 20 }}>
                                        <Grid item xs={8}>
                                            <Typography className={classes.userTicketD}>Nasir<span className={classes.userTicketLig}>Relied to your ticket</span></Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography className={classes.timeTicket}>Yesturday</Typography>
                                        </Grid>

                                        <Paper style={{ marginTop: 10, padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperG}>I think we know the origin of the bug. It has to do with the button that comes pre-selected in 3.1.4 and when you drop down to 3.1.2, it doesn't automatically deselected it, revealing the <span style={{ color: 'red', backgroundColor: '#f9e0e0', padding: 3 }}>Cache Configuration</span> menu. A fix is cooming shortly.</Typography>
                                        </Paper>


                                        <Grid container style={{ marginBottom: 20 }}>
                                            <Grid item xs={8}>
                                                <Typography className={classes.userTicketD}>Nasir<span className={classes.userTicketLig}>Relied to your ticket</span></Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography className={classes.timeTicket}>Jan18, 2018</Typography>
                                            </Grid>
                                        </Grid>

                                        <Paper style={{ marginTop: 10, padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperB}>Can you specify what is trying to connect to OpenDJ Here</Typography>
                                            <Paper style={{ marginTop: 10, padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                                <Typography style={{ marginTop: 0 }} className={classes.decPaperG}>descriplication.Java-args=-Xms8m. Client-Dcom.sun.jndi.ldap.object.disableEndpoint.</Typography>
                                            </Paper>
                                        </Paper>


                                        <Grid container style={{ marginBottom: 20 }}>
                                            <Grid item xs={8}>
                                                <Typography className={classes.userTicketD}>Nasir<span className={classes.userTicketLig}>Created a ticket</span></Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography className={classes.timeTicket}>Jan18, 2018</Typography>
                                            </Grid>
                                        </Grid>


                                        <Paper style={{ marginTop: 10, padding: 10, width: '100%', backgroundColor: '#f7f7f7' }} className={classes.paper}>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperB}>Java Update - Cert Error w/OpenDJ</Typography>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperG}>Hello,</Typography>
                                            <Typography style={{ marginTop: 0 }} className={classes.decPaperG}>Upon a recent patch to our in-house servers (to 1.8.0_191), our servers or not longer able to...</Typography>
                                        </Paper>
                                    </Grid>

                                </TabPanel>
                            </div>

                        </Grid>
                    </div>
                </Paper>

            </div>
        );
    }
}

export default withRouter(withStyles(styles)(NotificationPage));
