import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Popover from '@material-ui/core/Popover';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';

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
        CategoryLable: {
            color: '#353b38',
            borderRadius: 3,
            padding: 5,
            fontSize: 13,
            fontWeight: 500,
            textAlign: 'left',
            marginBottom: 20,
            float: 'left',
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
        GluuVerTitile: {
            marginBottom: 20,
            marginTop: 20,
            '&:hover': {
                color: '#00b372',
            },
        },
        textFieldAssigned: {
            width: '100%',
            marginTop: 20,
        },

    }),
);

export default function GluuPopover() {
    const classes = useStyles();
    //////////// Popuphover on Gluu Version Start
    const [anchorElGluuVer, setAnchorElGluuVer] = React.useState<HTMLButtonElement | null>(null);

    function handleClickGluuVer(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchorElGluuVer(event.currentTarget);
    }

    function handleCloseGluuVer() {
        setAnchorElGluuVer(null);
    }

    const openGluuVer = Boolean(anchorElGluuVer);
    const idGluuVer = openGluuVer ? 'simple-popover' : undefined;
    ////////////////  Popuphover on Gluu Version End


    return (
        <div>
            <Typography className={classes.createdGrid}>
                <label className={classes.CategoryLable}>Gluu 3.1.4</label>
                <IconButton aria-describedby={idGluuVer} onClick={handleClickGluuVer} style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
            </Typography>
            <Popover
                id={idGluuVer}
                open={openGluuVer}
                anchorEl={anchorElGluuVer}
                onClose={handleCloseGluuVer}
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
                        <TextField
                            className={classes.textFieldAssigned}
                            placeholder="Search Name..."
                            variant="outlined"
                            margin="dense"
                        />
                        <div style={{ height: 150, }}>
                            <div className={classes.GluuVerTitile}>
                                <span className={classes.nameAssigned}>Gluu 4.0</span>
                            </div>
                            <div className={classes.GluuVerTitile}>

                                <span className={classes.nameAssigned}>Gluu 3.1.5</span>
                            </div>
                            <div className={classes.GluuVerTitile}>
                                <CheckIcon className={classes.checkIcon} />
                                <span className={classes.nameAssigned}>Gluu 3.1.4</span>
                            </div>
                            <div className={classes.GluuVerTitile}>

                                <span className={classes.nameAssigned}>Gluu 3.1.3</span>
                            </div>
                            <div className={classes.GluuVerTitile}>

                                <span className={classes.nameAssigned}>Gluu 3.1.2</span>
                            </div>
                            <div className={classes.GluuVerTitile}>

                                <span className={classes.nameAssigned}>Gluu 3.1.1</span>
                            </div>
                            <div className={classes.GluuVerTitile}>

                                <span className={classes.nameAssigned}>Gluu 3.0.1</span>
                            </div>
                            <div className={classes.GluuVerTitile}>

                                <span className={classes.nameAssigned}>Gluu 2.4.4</span>
                            </div>
                        </div>
                    </form>
                </div>
            </Popover>

        </div>
    )
}
