import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';


const styles = (theme: Theme) =>
    createStyles({
        editImageP: {
            backgroundColor: '#ffffff',
            width: 30,
            height: 30,
            borderRadius: 20,
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            textAlign: 'right',
            marginLeft: '53%',
            position: 'relative',
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.1)',
        },
        editPancil: {
            fontSize: 15,
            borderRadius: 20,
            color: '#2dce56',
        },
        btnInvite: {
            margin: theme.spacing(1),
            fontSize: 14,
            fontWeight: 500,
            backgroundColor: '#f4f5f7',
            textTransform: 'capitalize',
            fontFamily: '"Lato", sans-serif',
        },
        pendingNote: {
            fontSize: 14,
            textAlign: 'center',
            color: '#EBB400',
            marginBottom: 20,
            float: 'left',
        },
        membersType: {
            fontSize: 14,
            color: '#232323',
            float: 'left',
            marginBottom: 20,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        selectType: {
            paddingLeft: 10,
            paddingRight: 5,
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 4,
            borderColor: '#c9c9c9',
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.1)',
        },
        margin: {
            margin: theme.spacing(1),
        },
        paper: {
            marginRight: theme.spacing(2),
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
            top: '20%',
        },

        editTitleProfile: {
            fontFamily: 'arial',
            fontSize: 22,
            fontWeight: 500,
            marginTop: 10,
            color: '#232323',
        },

        sendInvite: {
            padding: 10,
            color: '#ffffff',
            backgroundColor: '#00b372',
            fontFamily: 'arial',
            '&:hover': {
                color: '#00b372',
            }
        },
        labelPopup: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
            fontSize: 15,
            marginTop: 5,
            marginBottom: 5,
        },
        inviteNameField: {
            margin: 0,
            width: '100%',
            marginBottom: 10,
        },
        inviteEmailField: {
            margin: 0,
            width: '100%',
            marginBottom: 10,
        },
    });


type Props = WithStyles<typeof styles> & RouteComponentProps

interface State {
    openInviteMen: boolean

}

class InviteMemberPopover extends Component<Props, State> {
    state = {
        openInviteMen: false
    }

    handleOpenInviteMen = () => {
        this.setState({ openInviteMen: true });
    };

    handleCloseInviteMen = () => {
        this.setState({ openInviteMen: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="outlined" size="medium" className={classes.btnInvite} onClick={this.handleOpenInviteMen}>
                    Invite new
                </Button>
                
                <Modal open={this.state.openInviteMen} onClose={this.handleCloseInviteMen}>
                    <div style={{ width: '28%' }} className={classes.paperModel}>
                        <form>
                            <div>
                                <Typography className={classes.editTitleProfile}>Invite new member</Typography>

                                <p className={classes.labelPopup}>Name</p>
                                <TextField
                                    className={classes.inviteNameField}
                                    variant="outlined"
                                    margin="dense"
                                />

                                <p className={classes.labelPopup}>Email</p>
                                <TextField
                                    className={classes.inviteEmailField}
                                    variant="outlined"
                                    margin="dense"
                                />

                                <p className={classes.labelPopup}>Role</p>
                                <FormControl style={{ width: '100%' }} className={classes.membersType}>
                                    <Select
                                        className={classes.selectType}
                                        value={2}
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value={1}>Admin</MenuItem>
                                        <MenuItem value={2}>User</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button variant="outlined" className={classes.sendInvite}>
                                    Send Invite
                                  </Button>
                            </div>
                        </form>
                    </div>
                </Modal>

            </div>

        );
    }
}

export default withRouter(withStyles(styles)(InviteMemberPopover));
