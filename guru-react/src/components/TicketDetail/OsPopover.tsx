import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
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
        osVerGrid: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            marginTop: 5,
            marginBottom: 5,
        },
        whichOSVer: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            marginTop: 5,
            marginBottom: 5,
        },
        selectionOSVer: {
            width: '100%',
            padding: 15,
            borderRadius: 5,
            marginBottom: 10,
            backgroundColor: 'white',
        },
        whatOSVer: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            marginTop: 5,
            marginBottom: 5,
        },
        osVerNo: {
            margin: 0,
            width: '100%',
            marginBottom: 20,
        },
        osVerBtnSave: {
            padding: 10,
            color: '#ffffff',
            backgroundColor: '#00b372',
            fontFamily: '"Lato", sans-serif',
            marginRight: 5,
            '&:hover': { color: '#00b372', backgroundColor: 'transparent' }
        },
        osVerBtnCancel: {
            padding: 10,
            color: '#232323',
            fontFamily: '"Lato", sans-serif',
            marginLeft: 5,
            border: 'none',
            backgroundColor: 'transparent',
            '&:hover': { color: '#00b372', }
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
        titleEditeForm: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
        },

    }),
);

export default function OsPopover() {
    const classes = useStyles();
    /////// Popup DialogBox OS Version Start Code
    const [openOSVer, setOpenOSVer] = React.useState(false);

    const handleOpenOSVer = () => {
        setOpenOSVer(true);
    };

    const handleCloseOSVer = () => {
        setOpenOSVer(false);
    };
    /////// Popup DialogBox OS Version End Code

    return (
        <div>
            <Typography className={classes.createdGrid}>
                    <label className={classes.CategoryLable}>CentOS 7</label>
                    <IconButton style={{ float: 'right' }} onClick={handleOpenOSVer}><EditIcon className={classes.editPancileLable} /></IconButton>
                </Typography>

                <Modal open={openOSVer} onClose={handleCloseOSVer}>
                    <div style={{ width: '23%' }} className={classes.paper}>
                        <form>
                            <h2 className={classes.titleEditeForm}>Edit OS Version</h2>
                            <p className={classes.whichOSVer}>Which OS</p>
                            <select className={classes.selectionOSVer}>
                                <option value="CentOS 7">CentOS 7</option>
                                <option value="CentOS 6">CentOS 6</option>
                                <option value="CentOS 5">CentOS 5</option>
                                <option value="CentOS 4">CentOS 4</option>
                            </select>
                            <p className={classes.whatOSVer}>What Version</p>
                            <TextField
                                className={classes.osVerNo}
                                type="number"
                                variant="outlined"
                            />

                            <Button variant="outlined" className={classes.osVerBtnSave}>
                                Save
                            </Button>
                            <Button variant="outlined" className={classes.osVerBtnCancel} onClick={handleCloseOSVer}>
                                Cancel
                            </Button>
                        </form>
                    </div>
                </Modal>
            
        </div>
    )
}
