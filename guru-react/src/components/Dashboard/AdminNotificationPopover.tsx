import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import BellIcon from '../../assets/images/bell_icon.png';
import NextArrow from '../../assets/images/next_arrow.png';
const styles = (theme: Theme) =>
    createStyles({
        divGenralPedd: {
            padding: 20,
        },
        editTextField: {
            margin: 0,
            width: '80%',
            marginBottom: 10,
            float: 'left',
        },
        cardBell: {
            width: '100%',
            height: 98,
            backgroundColor: '#1d8de0',
            color: '#ffffff',
        },
        dashboardClickImg: {
            width: 70,
            height: 70,
            opacity: 0.3,
            marginTop: -34,
            float: 'right',
        },
        catagoryName: {
            marginTop: 30,
            marginLeft: 30,
            textAlign: 'left',
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: '"Lato", sans-serif',
        },
        catagoryClick: {
            marginLeft: 30,
            textAlign: 'left',
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        nextArrow: {
            width: 15,
            marginTop: 5,
            marginLeft: 10,
            height: 'auto',
        },
        paperModel: {
            position: 'absolute',
            width: '60%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 4),
            outline: 'none',
            left: '35%',
            top: '2%',
        },
        headerTitle: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 24,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        textReguBold: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#727272',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: '"Lato", sans-serif',
        },
        textRegu: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#727272',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        textReguDesc: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 10,
            color: '#232323',
        },
        selectType: {
            paddingLeft: 10,
            paddingRight: 5,
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 4,
            height: 40,
            backgroundColor: 'transparent',
            borderColor: '#c9c9c9',
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.1)',
        },
        btnSuccess: {
            padding: 10,
            width: '30%',
            marginRight: 10,
            fontWeight: 500,
            color: '#ffffff',
            backgroundColor: '#00b372',
            fontFamily: '"Lato", sans-serif',
            '&:hover': {
                color: '#00b372',
            },
        },
        btnCancel: {
            padding: 10,
            width: '30%',
            marginRight: 10,
            border: 'none',
            fontWeight: 500,
            color: '#232323',
            backgroundColor: 'transparent',
            fontFamily: '"Lato", sans-serif',
            '&:hover': {
                color: '#00b372',
            },
        },
        paper: {
            marginRight: theme.spacing(2),
        },
    });

type Props = WithStyles<typeof styles> & RouteComponentProps
interface State {
    openClNoti: boolean
}

class AdminNotificationPopover extends Component<Props, State> {
    state = {
        openClNoti: false,
    }

    handleOpenClNoti = () => {
        this.setState({ openClNoti: true });
    };

    handleCloseClNoti = () => {
        this.setState({ openClNoti: false });
    };


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Card onClick={this.handleOpenClNoti} className={classes.cardBell}>
                    <CardActionArea>
                        <Typography className={classes.catagoryName}>Notifications</Typography>
                        <Typography className={classes.catagoryClick}>Click here<img className={classes.nextArrow} alt="" src={NextArrow} /></Typography>
                        <img className={classes.dashboardClickImg} alt="" src={BellIcon} />

                    </CardActionArea>
                </Card>
                <Modal open={this.state.openClNoti} onClose={this.handleCloseClNoti}>
                    <div style={{ width: '40%' }} className={classes.paperModel}>
                        <form>
                            <div>

                                <div style={{padding: 0}} className={classes.divGenralPedd}>
                                    <Typography className={classes.headerTitle}>Notification</Typography>
                                    <p className={classes.textRegu}>For important updates regarding your Gull activity, certain notification cannot be disabled.</p>

                                    <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%', marginBottom: 10, }} />
                                 

                                    <Typography className={classes.textReguBold}>Settings</Typography>

                                
                                    <Grid container>
                                        <Grid item xs={5}>
                                            <p className={classes.textRegu}>New ticket reminder interval:</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                className={classes.editTextField}
                                                placeholder="Search Name..."
                                                variant="outlined"
                                                margin="dense"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={5}>
                                            <p className={classes.textRegu}>New ticket reminder frequency:</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                className={classes.editTextField}
                                                placeholder="Search Name..."
                                                variant="outlined"
                                                margin="dense"
                                            />
                                        </Grid>
                                    </Grid>

                             
                                    <Typography className={classes.textReguBold}>Idle ticket reminder</Typography>
                               
                                    <Grid container>
                                        <Grid item xs={5}>
                                            <p className={classes.textRegu}>Community user:</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                className={classes.editTextField}
                                                placeholder="Search Name..."
                                                variant="outlined"
                                                margin="dense"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={5}>
                                            <p className={classes.textRegu}>Core user:</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                className={classes.editTextField}
                                                placeholder="Search Name..."
                                                variant="outlined"
                                                margin="dense"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={5}>
                                            <p className={classes.textRegu}>VIP user:</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                className={classes.editTextField}
                                                placeholder="Search Name..."
                                                variant="outlined"
                                                margin="dense"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={5}>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <div style={{ textAlign: 'left',}}>
                                                <Button variant="outlined" className={classes.btnSuccess}>
                                                    Save
                                        </Button>
                                                <Button variant="outlined" className={classes.btnCancel}>
                                                    Cancel
                                        </Button>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%'}} />

                                    <div style={{ marginTop: 5 }}> </div>
                                    <Typography className={classes.textReguBold}>Send test email notification</Typography>
                                    <div style={{ marginTop: 5 }}> </div>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <p className={classes.textRegu}>Comunity user:</p>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <select
                                                style={{ width: '70%', float: 'left' }}
                                                className={classes.selectType}>
                                                <option value="Activitaion email">Activitaion email</option>
                                                <option value="NotActivitaion email ">Not Activitaion email</option>
                                            </select>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={3}>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <div style={{ textAlign: 'left', marginTop: 10, }}>
                                                <Button style={{width: '44%'}} variant="outlined" className={classes.btnSuccess}>
                                                    Send Email
                                        </Button>
                                            </div>
                                        </Grid>
                                    </Grid>


                                </div>

                            </div>
                        </form>
                    </div>
                </Modal>
            </div>

        );
    }
}

export default withRouter(withStyles(styles)(AdminNotificationPopover));
