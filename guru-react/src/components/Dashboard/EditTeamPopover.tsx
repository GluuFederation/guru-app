import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import UserOne from '../../assets/images/user_one.png';
import Edit from '@material-ui/icons/Edit';
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
        editDetails: {
            marginTop: 0,
            marginBottom: 0,
            color: '#ADADAD',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
            '&:hover': { color: '#00b372', backgroundColor: 'transparent' }
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
        saveTeamProfile: {
            padding: 10,
            color: '#ffffff',
            backgroundColor: '#00b372',
            fontFamily: 'arial',
            '&:hover': {
                color: '#00b372',
            },
        },
        labelPopup: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
            fontSize: 15,
            marginTop: 5,
            marginBottom: 5,
        },
        teamNameField: {
            margin: 0,
            width: '100%',
            marginBottom: 10,
        },
        teamBioField: {
            margin: 0,
            width: '100%',
            marginBottom: 10,
        },
        bioWords: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
            fontSize: 12,
            marginTop: -8,
            marginBottom: 15,
            color: '#95A5A6',
        },
        popupEditImageP: {
            backgroundColor: '#ffffff',
            width: 30,
            height: 30,
            borderRadius: 20,
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            textAlign: 'right',
            marginLeft: '15%',
            position: 'relative',
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.1)',
        },
        popupEditPancil: {
            fontSize: 15,
            borderRadius: 20,
            color: '#2dce56',
            marginLeft: 0,
            marginTop: 2,
        },
        popupAvatar: {
            width: 85,
            height: 85,
            marginBottom: 15,
            marginTop: 15,
        },
    });


type Props = WithStyles<typeof styles> & RouteComponentProps

interface State {
    openAdd:boolean

}

class EditTeamPopover extends Component<Props,State> {
    state = {
        openAdd:false
    }

    handleOpenAdd = () => {
        this.setState({ openAdd: true });
    };

    handleCloseAdd = () => {
        this.setState({ openAdd: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <a href="#" style={{ float: 'left', marginBottom: 3, marginTop: 0 }} className={classes.editDetails} onClick={this.handleOpenAdd}>Edit details</a>

                <Modal open={this.state.openAdd} onClose={this.handleCloseAdd}>
                    <div style={{ width: '28%' }} className={classes.paperModel}>
                        <form>
                            <div>
                                <Typography className={classes.editTitleProfile}>Edit team profile</Typography>

                                <div style={{ marginBottom: 15, }}>
                                    <Avatar style={{ marginBottom: -26, }} alt="Avatar" src={UserOne} className={classes.popupAvatar} />
                                    <button className={classes.popupEditImageP}>
                                        <Edit className={classes.popupEditPancil} />
                                    </button>
                                </div>
                                <p className={classes.labelPopup}>Name</p>
                                <TextField
                                    className={classes.teamNameField}
                                    variant="outlined"
                                    margin="dense"
                                />

                                <p className={classes.labelPopup}>BIO</p>
                                <TextField
                                    className={classes.teamBioField}
                                    variant="outlined"
                                    margin="dense"
                                />
                                <p className={classes.bioWords}>Maximum 25 words</p>

                                <Button variant="outlined" className={classes.saveTeamProfile}>
                                    Save
                                  </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>

        );
    }
}

export default withRouter(withStyles(styles)(EditTeamPopover));
