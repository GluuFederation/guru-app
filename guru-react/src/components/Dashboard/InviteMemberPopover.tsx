import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const styles = (theme: Theme) =>
    createStyles({
        btnSuccess: {
            backgroundColor: '#2dce56',
            textTransform: 'capitalize',
            color: '#ffffff',
            '&:hover': { color: '#2dce56', backgroundColor: 'transparent', }
        },
        txtField: {
            margin: 0,
            width: '100%',
            marginBottom: 10,
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
                <Button variant="outlined" size="medium" className={classes.btnSuccess} onClick={this.handleOpenInviteMen}>
                    Invite new
                </Button>

                <Modal open={this.state.openInviteMen} onClose={this.handleCloseInviteMen}>
                    <Box style={{ width: '28%' }} className={classes.paperModel}>
                        <form>
                            <Box>
                                <Typography variant="h6" align="left">Invite new member</Typography>

                                <Typography variant="body2" align="left">Name</Typography>
                                <TextField
                                    className={classes.txtField}
                                    variant="outlined"
                                    margin="dense"
                                />

                                <Typography variant="body2" align="left">Email</Typography>
                                <TextField
                                    className={classes.txtField}
                                    variant="outlined"
                                    margin="dense"
                                />

                                <Typography variant="body2" align="left">Role</Typography>
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

                                <Button variant="outlined" className={classes.btnSuccess}>
                                    Send Invite
                              </Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>


            </div>

        );
    }
}

export default withRouter(withStyles(styles)(InviteMemberPopover));
