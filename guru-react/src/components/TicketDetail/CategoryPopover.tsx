import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Popover from '@material-ui/core/Popover';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import Installation from '../../assets/images/installation.svg';
import PersManag from '../../assets/images/identity-management.svg';
import SinglePers from '../../assets/images/sso.svg';
import SecurityThu from '../../assets/images/authentication.svg';
import DesignCustom from '../../assets/images/customization.svg';
import AccessManag from '../../assets/images/access-management.svg';
import Maintenance from '../../assets/images/maintenance.svg';
import Upgrade from '../../assets/images/upgrade.svg';

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
        catagoryIcon: {
            width: 28,
            height: 28,
            padding: 3,
            marginLeft: 5,
            marginTop: -7,
            float: 'left',
        },
        catagoryTitile: {
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

export default function CategoryPopover() {
    const classes = useStyles();
    //////////// Popuphover on Catagory Start
    const [anchorElCatagory, setAnchorElCatagory] = React.useState<HTMLButtonElement | null>(null);

    function handleClickCatagory(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchorElCatagory(event.currentTarget);
    }

    function handleCloseCatagory() {
        setAnchorElCatagory(null);
    }

    const openCatagory = Boolean(anchorElCatagory);
    const idCatagory = openCatagory ? 'simple-popover' : undefined;
    ////////////////  Popuphover on Catagory End


    return (
        <div>
            <Typography className={classes.createdGrid}>
                <label className={classes.CategoryLable}>Installation</label>
                <IconButton aria-describedby={idCatagory} onClick={handleClickCatagory} style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
            </Typography>
            <Popover
                id={idCatagory}
                open={openCatagory}
                anchorEl={anchorElCatagory}
                onClose={handleCloseCatagory}
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
                            style={{ padding: -5, }}
                            className={classes.textFieldAssigned}
                            placeholder="Search Name..."
                            variant="outlined"
                            margin="dense"
                        />
                        <div style={{ height: 150, }}>
                            <div className={classes.catagoryTitile}>
                                <CheckIcon className={classes.checkIcon} />
                                <span className={classes.nameAssigned}>Installation</span>
                                <img className={classes.catagoryIcon} alt="" src={Installation} />
                            </div>
                            <div className={classes.catagoryTitile}>

                                <span className={classes.nameAssigned}>Identity Management</span>
                                <img className={classes.catagoryIcon} alt="" src={PersManag} />
                            </div>
                            <div className={classes.catagoryTitile}>

                                <span className={classes.nameAssigned}>Single Sign-on</span>
                                <img className={classes.catagoryIcon} alt="" src={SinglePers} />
                            </div>
                            <div className={classes.catagoryTitile}>

                                <span className={classes.nameAssigned}>Authentication</span>
                                <img className={classes.catagoryIcon} alt="" src={SecurityThu} />
                            </div>
                            <div className={classes.catagoryTitile}>

                                <span className={classes.nameAssigned}>Design Customization</span>
                                <img className={classes.catagoryIcon} alt="" src={DesignCustom} />
                            </div>
                            <div className={classes.catagoryTitile}>

                                <span className={classes.nameAssigned}>Access Management</span>
                                <img className={classes.catagoryIcon} alt="" src={AccessManag} />
                            </div>
                            <div className={classes.catagoryTitile}>

                                <span className={classes.nameAssigned}>Maintenance</span>
                                <img className={classes.catagoryIcon} alt="" src={Maintenance} />
                            </div>
                            <div className={classes.catagoryTitile}>
                                <span className={classes.nameAssigned}>Upgrade</span>
                                <img className={classes.catagoryIcon} alt="" src={Upgrade} />
                            </div>
                        </div>
                    </form>
                </div>
            </Popover>

        </div>
    )
}
