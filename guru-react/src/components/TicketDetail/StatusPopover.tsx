import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Popover from '@material-ui/core/Popover';
import CheckIcon from '@material-ui/icons/Check';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        typography: {
            padding: theme.spacing(2),
        },
        popupHover: {
            width: '120%',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '3%',
            paddingBottom: '3%',
        },
        checkIcon: {
            fontSize: 16,
            float: 'right',
            position: 'absolute',
            right: 5,
            marginLeft: '10%',
            '&:hover': { color: '#24BC0B' }
        },
        editPancileLable: {
            float: 'right',
            textAlign: 'right',
            fontSize: 14,
            '&:hover': {
                color: '#00b372',
            },
        },
        statusLable: {
            color: '#ffffff',
            borderRadius: 3,
            padding: 5,
            fontSize: 12,
            backgroundColor: '#53c507',
            float: 'left',
            marginBottom: 20,
        },
        radioFontNew: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#35F4FF' }
        },
        radioFontAssig: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#202020' }
        },
        radioFontInPro: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#50C837' }
        },
        radioFontPend: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#F8C454' }
        },
        radioFontClose: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#F85454' }
        },

    }),
);

export default function StatusPopover() {
    const classes = useStyles();
    //////////// Popuphover on Status Start
    const [anchorElStatus, setAnchorElStatus] = React.useState<HTMLButtonElement | null>(null);

    function handleClickStatus(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchorElStatus(event.currentTarget);
    }

    function handleCloseStatus() {
        setAnchorElStatus(null);
    }

    const openStatus = Boolean(anchorElStatus);
    const idStatus = openStatus ? 'simple-popover' : undefined;
    ////////////////  Popuphover on Status End 

    return (
        <div>
            <Typography className={classes.createdGrid}>
                <label className={classes.statusLable}>In-Pogress</label>
                <IconButton aria-describedby={idStatus} onClick={handleClickStatus} style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
            </Typography>
            <Popover
                id={idStatus}
                open={openStatus}
                anchorEl={anchorElStatus}
                onClose={handleCloseStatus}
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
                    <form>
                        <div style={{ margin: 10 }}>
                            <div style={{ backgroundColor: '#35F4FF', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontNew}>New</label>

                        </div>
                        <div style={{ margin: 10 }}>
                            <div style={{ backgroundColor: '#202020', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontAssig}>Assigned</label>

                        </div>
                        <div style={{ margin: 10 }}>
                            <div style={{ backgroundColor: '#50C837', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontInPro}>In Progress<CheckIcon className={classes.checkIcon} /></label>

                        </div>
                        <div style={{ margin: 10 }}>
                            <div style={{ backgroundColor: '#F8C454', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontPend}>Pending</label>

                        </div>
                        <div style={{ margin: 10 }}>
                            <div style={{ backgroundColor: '#F85454', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontClose}>Closed</label>

                        </div>
                    </form>
                </div>
            </Popover>

        </div>
    )
}
