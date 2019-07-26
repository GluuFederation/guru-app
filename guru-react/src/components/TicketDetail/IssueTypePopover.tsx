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
        radioFontDev: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#81F023' }
        },
        radioFontProd: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#F02336' }
        },
        radioFontPre: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#D329E3' }
        },
        radioFontMinor: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#673EA7' }
        },
        radioFontPImpa: {
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#FFA035' }
        },
        preProduction: {
            color: '#ffffff',
            borderRadius: 3,
            padding: 5,
            fontSize: 12,
            backgroundColor: '#b736ff',
            float: 'left',
            marginBottom: 20,
        },
        editPancileLable: {
            float: 'right',
            textAlign: 'right',
            fontSize: 14,
            '&:hover': {
                color: '#00b372',
            },
        },

    }),
);

export default function AssignedToPopover() {
    const classes = useStyles();
    //////////// Popuphover on Issue User Start
    const [anchorElIssue, setAnchorElIssue] = React.useState<HTMLButtonElement | null>(null);

    function handleClickIssue(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchorElIssue(event.currentTarget);
    }

    function handleCloseIssue() {
        setAnchorElIssue(null);
    }

    const openIssue = Boolean(anchorElIssue);
    const idIssue = openIssue ? 'simple-popover' : undefined;
    ////////////////  Popuphover on Issue User End
    return (
        <div>
            <Typography className={classes.createdGrid}>
                <label className={classes.preProduction}>Pre-Production</label>
                <IconButton aria-describedby={idIssue} onClick={handleClickIssue} style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
            </Typography>
            <Popover
                id={idIssue}
                open={openIssue}
                anchorEl={anchorElIssue}
                onClose={handleCloseIssue}
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
                            <div style={{ backgroundColor: '#81F023', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontDev}>New Development Issues</label>

                        </div>
                        <div style={{ margin: 10 }}>
                            <div style={{ backgroundColor: '#F02336', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontProd}>Production Outage</label>

                        </div>
                        <div style={{ margin: 10 }}>
                            <div style={{ backgroundColor: '#D329E3', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontPre}>Pre-Production Issues<CheckIcon className={classes.checkIcon} /></label>

                        </div>
                        <div style={{ margin: 10 }}>
                            <div style={{ backgroundColor: '#673EA7', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontMinor}>Minor Issues</label>

                        </div>
                        <div style={{ margin: 10 }}>
                            <div style={{ backgroundColor: '#FFA035', width: 15, height: 15, borderRadius: 2, float: 'left', marginRight: 10, marginTop: 3, }}></div>
                            <label className={classes.radioFontPImpa}>Production Impaired</label>

                        </div>
                    </form>
                </div>
            </Popover>

        </div>
    )
}
