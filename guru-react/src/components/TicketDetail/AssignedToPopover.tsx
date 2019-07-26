import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Popover from '@material-ui/core/Popover';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import UserOne from '../../assets/images/user_one.png';
import UserTwo from '../../assets/images/user_two.jpg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarSmall: {
            width: 28,
            height: 28,
            textAlign: 'left',
        },
        createdGrid: {
            fontSize: 14,
            fontFamily: '"Lato", sans-serif',
            marginLeft: '20%',
            marginTop: 5,
        },
        editPancile: {
            float: 'right',
            textAlign: 'right',
            fontSize: 14,
            '&:hover': {
                color: '#00b372',
            },
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '98%',
        },
        margin: {
            margin: theme.spacing(1),
        },
        assignedName: {
            marginTop: '-10%',
            marginLeft: '36%',
            float: 'left',
            marginBottom: 20,
        },
        typography: {
            padding: theme.spacing(2),
        },
        assignPeople: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            fontSize: 12,
        },
        popupHover: {
            width: '120%',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '3%',
            paddingBottom: '3%',
        },
        textFieldAssigned: {
            width: '100%',
            marginTop: 20,
        },
        usersAssigned: {
            marginBottom: 20,
            marginTop: 20,
            '&:hover': {
                color: '#00b372',
            },
        },
        nameAssigned: {
            fontSized: 10,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20,
            '&:hover': {
                color: '#00b372',
            },
        },
        checkIcon: {
            fontSize: 16,
            float: 'right',
            position: 'absolute',
            right: 5,
            marginLeft: '10%',
            '&:hover': { color: '#24BC0B' }
        },

    }),
);

export default function AssignedToPopover() {
    const classes = useStyles();
    //////////// Popuphover on Created User Start
    const [anchorElAssign, setAnchorElAssign] = React.useState<HTMLButtonElement | null>(null);

    function handleClickAssign(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchorElAssign(event.currentTarget);
    }

    function handleCloseAssign() {
        setAnchorElAssign(null);
    }

    const openAssign = Boolean(anchorElAssign);
    const idAssign = openAssign ? 'simple-popover' : undefined;
    ////////////////  Popuphover on Created User End
    return (
        <div>
            <Typography className={classes.createdGrid} component="span">
                <Avatar style={{ marginLeft: 48, marginTop: -20, }} alt="Avatar" src={UserOne} className={classes.avatarSmall} />
                <label className={classes.assignedName}>Nasir Uddin</label>
                <IconButton aria-describedby={idAssign} onClick={handleClickAssign} style={{ float: 'right', marginTop: -55, }}><EditIcon className={classes.editPancile} /></IconButton>
            </Typography>
            <Popover
                id={idAssign}
                open={openAssign}
                anchorEl={anchorElAssign}
                onClose={handleCloseAssign}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.popupHover}>
                    <span className={classes.assignPeople}>Assign Up to 5 people to this issues</span>
                    <form>
                        <TextField
                            style={{ padding: -5, }}
                            className={classes.textFieldAssigned}
                            placeholder="Search Name..."
                            variant="outlined"
                            margin="dense"
                        />
                        <div style={{ height: 150, }}>
                            <div className={classes.usersAssigned}>
                                <span className={classes.nameAssigned}>Nasir Uddin nerob</span>
                                <Avatar alt="Avatar" src={UserTwo} style={{ float: 'left' }} className={classes.avatarSmall} />
                            </div>
                            <div className={classes.usersAssigned}>
                                <span className={classes.nameAssigned}>Nasir Uddin nerob</span>
                                <Avatar alt="Avatar" src={UserOne} style={{ float: 'left' }} className={classes.avatarSmall} />
                            </div>
                            <div className={classes.usersAssigned}>
                                <CheckIcon className={classes.checkIcon} />
                                <span className={classes.nameAssigned}>Nasir Uddin nerob</span>
                                <Avatar alt="Avatar" src={UserTwo} style={{ float: 'left' }} className={classes.avatarSmall} />
                            </div>
                            <div className={classes.usersAssigned}>
                                <span className={classes.nameAssigned}>Nasir Uddin nerob</span>
                                <Avatar alt="Avatar" src={UserOne} style={{ float: 'left' }} className={classes.avatarSmall} />
                            </div>
                            <div className={classes.usersAssigned}>
                                <span className={classes.nameAssigned}>Nasir Uddin nerob</span>
                                <Avatar alt="Avatar" src={UserTwo} style={{ float: 'left' }} className={classes.avatarSmall} />
                            </div>
                            <div className={classes.usersAssigned}>
                                <span className={classes.nameAssigned}>Nasir Uddin nerob</span>
                                <Avatar alt="Avatar" src={UserOne} style={{ float: 'left' }} className={classes.avatarSmall} />
                            </div>
                            <div className={classes.usersAssigned}>
                                <span className={classes.nameAssigned}>Nasir Uddin nerob</span>
                                <Avatar alt="Avatar" src={UserTwo} style={{ float: 'left' }} className={classes.avatarSmall} />
                            </div>
                            <div className={classes.usersAssigned}>
                                <span className={classes.nameAssigned}>Nasir Uddin nerob</span>
                                <Avatar alt="Avatar" src={UserOne} style={{ float: 'left' }} className={classes.avatarSmall} />
                            </div>
                        </div>
                    </form>
                </div>
            </Popover>

        </div>
    )
}
