import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import CrossIcon from '../../assets/images/cross_icon.png';
import { green } from '@material-ui/core/colors';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

const styles = (theme: Theme) =>
    createStyles({
        btnNotificationSet: {
            margin: theme.spacing(1),
            fontSize: 10,
            fontWeight: 500,
            color: '#232323',
            backgroundColor: '#ededed',
            textTransform: "capitalize",
            fontFamily: '"Lato", sans-serif',
            '&:hover': { color: '#00b372', }
        },
        paperNotifModel: {
            position: 'absolute',
            width: '60%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 4),
            outline: 'none',
            left: '25%',
            top: '5%',
        },
        titleCheck: {
            fontSize: 14,
            fontWeight: 600,
            marginTop: 15,
            color: '#232323',
            fontFamily: '"Lato", sans-serif',
        },
        subtitleCheck: {
            fontSize: 12,
            fontWeight: 500,
            marginTop: 15,
            color: '#232323',
            fontFamily: '"Lato", sans-serif',
        },
        crossIcon: {
            width: 15,
            height: 15,
            marginBottom: 10,
            marginTop: 10,
            float: 'right',
            cursor: 'pointer',
        },
        selectType: {
            paddingLeft: 10,
            paddingRight: 5,
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 4,
            backgroundColor: 'transparent',
            borderColor: '#c9c9c9',
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.1)',
        },
        paper: {
            marginRight: theme.spacing(2),
        },
        notificationPopupTit: {
            fontSize: 22,
            fontWeight: 500,
            marginTop: 10,
            color: '#232323',
            fontFamily: '"Lato", sans-serif',
        },
        notificationPopupDes: {
            fontSize: 12,
            fontWeight: 500,
            marginTop: 10,
            color: '#232323',
            fontFamily: '"Lato", sans-serif',
        },
    });
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
type Props = WithStyles<typeof styles> & RouteComponentProps
interface State {
    openTeamPro: boolean
}

class ManageNotificationPopover extends Component<Props, State> {
    state = {
        openTeamPro: false,
    }

    handleOpenTeamPro = () => {
        this.setState({ openTeamPro: true });
    };

    handleCloseTeamPro = () => {
        this.setState({ openTeamPro: false });
    };


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button onClick={this.handleOpenTeamPro} variant="outlined" size="medium" className={classes.btnNotificationSet}>
                    Manage Notification Settings
                                </Button>

                {/* //////////////  Popup Moded Code Start //////// */}

                <Modal open={this.state.openTeamPro} onClose={this.handleCloseTeamPro}>
                    <div style={{ width: '50%' }} className={classes.paperNotifModel}>

                        <div>
                            <img alt="Avatar" src={CrossIcon} className={classes.crossIcon} onClick={this.handleCloseTeamPro} />
                            <Typography className={classes.notificationPopupTit}>Notification Settings</Typography>
                        </div>

                        <form>
                            <div>
                                <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%', marginBottom: 10, }} />
                                <Typography className={classes.notificationPopupDes}>Notification Setting for new tickets only</Typography>

                                <div style={{ marginBottom: 0, marginTop: 4, }}>
                                    <GreenCheckbox
                                        style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                        // onChange={handleChangeCheckBox('A')}
                                        value="A"
                                    />
                                    <span className={classes.titleCheck}>All new tickets</span>
                                </div>
                                <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%', marginBottom: 10, }} />
                                <Typography className={classes.notificationPopupDes}>Notification setting for new tickets and tickets update (answer, status changes etc )</Typography>

                                <Grid style={{ marginBottom: 20 }} container>

                                    <Grid item xs={6}>
                                        <div style={{ marginBottom: 15, marginTop: 20, }}>
                                            <GreenCheckbox
                                                style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                // onChange={handleChangeCheckBox('A')}
                                                value="A"
                                            />
                                            <span className={classes.titleCheck}>All tickets types</span>
                                        </div>

                                        <div style={{ marginLeft: 15, marginRight: 15 }}>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>Production Outage</span>
                                            </div>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>Production Impaired</span>
                                            </div>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>Pre-Production Issues</span>
                                            </div>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>Minor Issues</span>
                                            </div>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>New Development Issues</span>
                                            </div>
                                        </div>

                                    </Grid>

                                    <Grid item xs={6}>
                                        <div style={{ marginBottom: 15, marginTop: 20, }}>
                                            <GreenCheckbox
                                                style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                // onChange={handleChangeCheckBox('A')}
                                                value="A"
                                            />
                                            <span className={classes.titleCheck}>All categories</span>
                                        </div>

                                        <div style={{ marginLeft: 15, marginRight: 15 }}>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>Production Outage</span>
                                            </div>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>Production Impaired</span>
                                            </div>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>Pre-Production Issues</span>
                                            </div>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>Minor Issues</span>
                                            </div>
                                            <div style={{ marginBottom: 10, marginTop: 10, }}>
                                                <GreenCheckbox
                                                    style={{ marginBottom: 5, marginRight: 8, width: 15, height: 15 }}
                                                    // onChange={handleChangeCheckBox('A')}
                                                    value="A"
                                                />
                                                <span className={classes.subtitleCheck}>New Development Issues</span>
                                            </div>
                                        </div>

                                    </Grid>

                                </Grid>
                                <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%', marginBottom: 10, }} />
                                <span className={classes.subtitleCheck}>Receive the newsletter : </span>
                                <select
                                    style={{ width: '40%', height: 40 }}
                                    className={classes.selectType}>
                                    <option value="Choose a Company">Never</option>
                                    <option value="consulting ">Receive</option>
                                </select>

                            </div>
                        </form>
                    </div>
                </Modal>



            </div>

        );
    }
}

export default withRouter(withStyles(styles)(ManageNotificationPopover));
