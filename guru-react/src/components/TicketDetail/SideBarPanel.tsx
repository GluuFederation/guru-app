import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Popover from '@material-ui/core/Popover';
import CheckIcon from '@material-ui/icons/Check';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddAdditional from '@material-ui/icons/AddCircleOutlineRounded';
import UserOne from '../../assets/images/user_one.png';
import UserTwo from '../../assets/images/user_two.jpg';
import Installation from '../../assets/images/installation.svg';
import PersManag from '../../assets/images/identity-management.svg';
import SinglePers from '../../assets/images/sso.svg';
import SecurityThu from '../../assets/images/authentication.svg';
import DesignCustom from '../../assets/images/customization.svg';
import AccessManag from '../../assets/images/access-management.svg';
import Maintenance from '../../assets/images/maintenance.svg';
import Upgrade from '../../assets/images/upgrade.svg';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarSmall: {
            width: 28,
            height: 28,
            textAlign: 'left',
        },
        createdBy: {
            fontSize: 14,
            fontFamily: 'arial',
            marginBottom: 5,
            marginLeft: '21%',
            textAlign: 'left',
        },
        createdGrid: {
            fontSize: 14,
            fontFamily: 'arial',
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
        editPancileLable: {
            float: 'right',
            textAlign: 'right',
            fontSize: 14,
            '&:hover': {
                color: '#00b372',
            },
        }, 
        cardSubscribe: {
            width: '80%',
            marginLeft: '20%',
            backgroundColor: '#f7f9fa',
        },
        notificationTxt: {
            fontFamily: 'arial',
            fontWeight: 500,
            fontSize: 14,
            float: 'left',
            marginBottom: 7,
        },
        btnSubscribe: {
            width: '100%',
            left: 0,
            fontSize: 14,
            backgroundColor: '#e7ebed',
            fontFamily: 'arial',
        },
        pos: {
            marginBottom: 12,
            marginTop: 12,
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: 12,
            fontWeight: 500,
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '98%',
        },

        margin: {
            margin: theme.spacing(1),
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
        statusLable: {
            color: '#ffffff',
            borderRadius: 3,
            padding: 5,
            fontSize: 12,
            backgroundColor: '#53c507',
            float: 'left',
            marginBottom: 20,
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
        additionalProducts: {
            color: '#00b372',
            fontSize: 12,
            fontWeight: 500,
            fontFamily: 'arial',
            marginTop: 2,
            float: 'left',
            marginBottom: 20,
            marginLeft: 4,
        },
        addAdditional: {
            float: 'left',
            fontSize: 14,
            fontWeight: 500,
            marginLeft: '23%',
            marginTop: 2,
            color: '#00b372',
        },
        createdName: {
            marginTop: '-10%',
            marginLeft: '36%',
            float: 'left',
            marginBottom: 20,
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
        titleEditeForm: {
            fontFamily: 'arial',
            fontWeight: 500,
        },
        radioFont: {
            fontFamily: 'arial',
            marginTop: 12,
            marginRight: 10,
        },
        radioFontDev: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#81F023' }
        },
        radioFontProd: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#F02336' }
        },
        radioFontPre: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#D329E3' }
        },
        radioFontMinor: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#673EA7' }
        },
        radioFontPImpa: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#FFA035' }
        },
        checkIcon: {
            fontSize: 16,
            float: 'right',
            position: 'absolute',
            right: 5,
            marginLeft: '10%',
            '&:hover': { color: '#24BC0B' }
        },
        radioFontNew: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#35F4FF' }
        },
        radioFontAssig: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#202020' }
        },
        radioFontInPro: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#50C837' }
        },
        radioFontPend: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#F8C454' }
        },
        radioFontClose: {
            fontFamily: 'arial',
            fontSize: 12,
            marginTop: 10,
            marginRight: 15,
            '&:hover': { color: '#F85454' }
        },
        aditionalFromTxt: {
            fontFamily: 'arial',
            fontWeight: 500,
            marginTop: 15,
        },
        selectionGenrel: {
            width: '95%',
            padding: 15,
            borderRadius: 5,
            marginTop: 5,
            marginBottom: 10,
            backgroundColor: 'white',
        },
        addProductBtn: {
            padding: 10,
            color: '#ffffff',
            backgroundColor: '#00b372',
            fontFamily: 'arial',
            marginRight: 5,
            '&:hover': {
                color: '#00b372',
            },
        },
        cancelProductBtn: {
            padding: 10,
            color: '#232323',
            backgroundColor: 'transparent',
            fontFamily: 'arial',
            marginLeft: 5,
        },

        assignPeople: {
            fontFamily: 'arial',
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
        catagoryTitile: {
            marginBottom: 20,
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
        nameAssigned: {
            fontSized: 10,
            fontWeight: 500,
            fontFamily: 'arial',
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

    }),
);

export default function SideBarPanel() {
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

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Created by</Typography>
                <Typography className={classes.createdGrid} component="span">
                    <Avatar style={{marginLeft: 48,marginTop: -20,}} alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                    <label className={classes.createdName}>William Lowe</label>
                    <IconButton style={{ float: 'right', marginTop: -55, }}><EditIcon className={classes.editPancile} /></IconButton>
                </Typography>
            </div>

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Assigned to</Typography>
                <Typography className={classes.createdGrid} component="span">
                    <Avatar style={{marginLeft: 48,marginTop: -20,}} alt="Avatar" src={UserOne} className={classes.avatarSmall} />
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

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Issue type</Typography>
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

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Status</Typography>
                <Typography className={classes.createdGrid}>
                    <label className={classes.statusLable}>in-Pogress</label>
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

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Category</Typography>
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

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Gluu Version</Typography>
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

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>OS Version</Typography>
                <Typography className={classes.createdGrid}>
                    <label className={classes.CategoryLable}>CentOS 7</label>
                    <IconButton style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
                </Typography>
            </div>

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Additional Products</Typography>
                <Typography className={classes.createdGrid}>
                    <label className={classes.CategoryLable}>OXD 3.1.4</label>
                    <IconButton style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
                </Typography>
            </div>



            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />
            <div style={{ float: 'left', width: '100%', cursor: 'pointer' }}>
                <AddAdditional className={classes.addAdditional} />
                <span className={classes.additionalProducts} onClick={handleOpen}>Add Additional Products</span>
            </div>
            {/* Additional Product Popup */}
            <Modal open={open} onClose={handleClose}>
                <div style={{width: '35%',}} className={classes.paper}>
                    <form>
                        <h2 className={classes.titleEditeForm}>Add Aditional Products</h2>
                        <Grid container xs={12} item={true}>
                            <Grid sm={6} item={true}>
                                <span style={{ width: '93%' }} className={classes.aditionalFromTxt}>Which product</span>
                            </Grid>
                            <Grid sm={6} item={true}>
                                <span style={{ width: '93%' }} className={classes.aditionalFromTxt}>What Version</span>
                            </Grid>
                            <Grid sm={6} item={true}>
                                <select className={classes.selectionGenrel}>
                                    <option value="product 1">Gluu Gateway</option>
                                    <option value="product 2">Gluu Gateway 2</option>
                                    <option value="product 3">Gluu Gateway 3</option>
                                    <option value="product 4">Gluu Gateway 4</option>
                                </select>
                            </Grid>
                            <Grid sm={6} item={true}>
                                <select className={classes.selectionGenrel}>
                                    <option value="version 1">3.4.2</option>
                                    <option value="version 2">3.4.3</option>
                                    <option value="version 3">3.4.4</option>
                                    <option value="version 4">3.4.5</option>
                                </select>
                            </Grid>
                            <Grid sm={6} item={true}>
                                <span style={{ width: '93%' }} className={classes.aditionalFromTxt}>Which OS</span>
                            </Grid>
                            <Grid sm={6} item={true}>
                                <span style={{ width: '93%' }} className={classes.aditionalFromTxt}>What Version</span>
                            </Grid>
                            <Grid sm={6} item={true}>
                                <select className={classes.selectionGenrel}>
                                    <option value="centOS 1">centOS 1</option>
                                    <option value="centOS 2">centOS 2</option>
                                    <option value="centOS 3">centOS 3</option>
                                    <option value="centOS 4">centOS 4</option>
                                </select>
                            </Grid>
                            <Grid sm={6} item={true}>
                                <select className={classes.selectionGenrel}>
                                    <option value="eg. 3.1.2">eg. 3.1.2</option>
                                    <option value="eg. 3.1.3">eg. 3.1.3</option>
                                    <option value="eg. 3.1.4">eg. 3.1.4</option>
                                    <option value="eg. 3.1.4">eg. 3.1.5</option>
                                </select>
                            </Grid>
                        </Grid>
                        <Button variant="outlined" className={classes.addProductBtn}>
                            Add Product
                      </Button>
                        <Button variant="outlined" className={classes.cancelProductBtn} onClick={handleClose}>
                            Cancel
                      </Button>
                    </form>
                </div>
            </Modal>
            <Card className={classes.cardSubscribe}>
                <CardContent>
                    <Typography className={classes.notificationTxt}>Notification</Typography>
                    <Button className={classes.btnSubscribe}>
                        Subscribe
                    </Button>
                    <Typography className={classes.pos} color="textSecondary">
                        You are receiving this Notification because You're watching this Ticket
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        5 subscriber's
                    </Typography>
                    <Grid container>
                        <Grid item={true} sm={2}><Avatar style={{ margin: 10 }} alt="Avatar" src={UserTwo} className={classes.avatarSmall} /></Grid>
                        <Grid item={true} sm={2}><Avatar style={{ margin: 10 }} alt="Avatar" src={UserOne} className={classes.avatarSmall} /></Grid>
                        <Grid item={true} sm={2}><Avatar style={{ margin: 10 }} alt="Avatar" src={UserTwo} className={classes.avatarSmall} /></Grid>
                        <Grid item={true} sm={2}><Avatar style={{ margin: 10 }} alt="Avatar" src={UserOne} className={classes.avatarSmall} /></Grid>
                        <Grid item={true} sm={2}><Avatar style={{ margin: 10 }} alt="Avatar" src={UserTwo} className={classes.avatarSmall} /></Grid>
                    </Grid>
                </CardContent>
            </Card>


        </div>

    );
}
