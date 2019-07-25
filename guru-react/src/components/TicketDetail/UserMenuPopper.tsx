import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriIcon from '@material-ui/icons/MoreHoriz';
import Modal from '@material-ui/core/Modal';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        SettingsIcon: {
            color: '#858585',
            float: 'right',
            flex: 1,
            marginTop: -30,
            justifyContent: 'right',
            alignItems: 'right'
        },
        typography: {
            padding: theme.spacing(2),
        },
        paper: {
            position: 'absolute',
            width: '50%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 4),
            outline: 'none',
            left: '30%',
            top: '30%',
        },
        titleEditeForm: {
            fontFamily: 'arial',
            fontWeight: 500,
        },
        ticketDelete: {
            fontFamily: 'arial',
            fontWeight: 500,
            marginRight: 15,
            '&:hover': {
                color: '#00b372',
            },
        },
    }),
);

export default function UserMenuComponent() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const classes = useStyles();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(prev => (prev ? null : event.currentTarget));
    };

    const openDotsIcon = Boolean(anchorEl);
    const dotsIcon = openDotsIcon ? 'no-transition-popper' : undefined;

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton className={classes.SettingsIcon} aria-describedby={dotsIcon} onClick={handleClick}>
                <MoreHoriIcon />
            </IconButton>

            <Popper id={dotsIcon} open={openDotsIcon} anchorEl={anchorEl}>
                <Paper>
                    <Typography style={{ cursor: 'pointer' }} className={classes.typography}>Copy Link</Typography>
                    <Typography style={{ cursor: 'pointer' }} className={classes.typography}>Open new ticket</Typography>
                    <Typography style={{ cursor: 'pointer' }} className={classes.typography} onClick={handleOpen}>Delete</Typography>

                    <Modal open={open} onClose={handleClose}>
                        <div style={{ width: '22%', position: 'absolute', left: '35%', top: '35%' }} className={classes.paper}>
                            <form>
                                <h3 className={classes.titleEditeForm}>Are you sure you want to delete this ticket?</h3>
                                <span style={{ cursor: 'pointer' }} className={classes.ticketDelete} onClick={handleClose}>No</span>
                                <span style={{ cursor: 'pointer' }} className={classes.ticketDelete}>Delete</span>
                            </form>
                        </div>
                    </Modal>

                </Paper>
            </Popper>

        </div>
    );
}
