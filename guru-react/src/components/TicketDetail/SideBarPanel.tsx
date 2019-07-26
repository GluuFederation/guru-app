import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddAdditional from '@material-ui/icons/AddCircleOutlineRounded';
import UserOne from '../../assets/images/user_one.png';
import UserTwo from '../../assets/images/user_two.jpg';
import Modal from '@material-ui/core/Modal';
import AssignedToPopover from './AssignedToPopover';
import IssueTypePopover from './IssueTypePopover';
import StatusPopover from './StatusPopover';
import CategoryPopover from './CategoryPopover';
import GluuPopover from './GluuPopover';
import OsPopover from './OsPopover';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarSmall: {
            width: 28,
            height: 28,
            textAlign: 'left',
        },
        createdBy: {
            fontSize: 14,
            fontFamily: '"Lato", sans-serif',
            marginBottom: 5,
            marginLeft: '21%',
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
            fontFamily: '"Lato", sans-serif',
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
            fontFamily: '"Lato", sans-serif',
        },
        pos: {
            marginBottom: 12,
            marginTop: 12,
            textAlign: 'left',
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            fontWeight: 500,
        },
        margin: {
            margin: theme.spacing(1),
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
            fontFamily: '"Lato", sans-serif',
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
        typography: {
            padding: theme.spacing(2),
        },
        titleEditeForm: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
        },
        aditionalFromTxt: {
            fontFamily: '"Lato", sans-serif',
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
            fontFamily: '"Lato", sans-serif',
            marginRight: 5,
            '&:hover': {
                color: '#00b372',
            },
        },
        cancelProductBtn: {
            padding: 10,
            color: '#232323',
            backgroundColor: 'transparent',
            fontFamily: '"Lato", sans-serif',
            marginLeft: 5,
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
                    <Avatar style={{ marginLeft: 48, marginTop: -20, }} alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                    <label className={classes.createdName}>William Lowe</label>
                    <IconButton style={{ float: 'right', marginTop: -55, }}><EditIcon className={classes.editPancile} /></IconButton>
                </Typography>
            </div>

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Assigned to</Typography>
                <AssignedToPopover></AssignedToPopover>
            </div>

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Issue type</Typography>
                <IssueTypePopover></IssueTypePopover>
            </div>

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Status</Typography>
                <StatusPopover></StatusPopover>
            </div>

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Category</Typography>
                <CategoryPopover></CategoryPopover>
            </div>

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>Gluu Version</Typography>
                <GluuPopover></GluuPopover>
            </div>

            <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

            <div style={{ float: 'left', width: '100%' }}>
                <Typography className={classes.createdBy}>OS Version</Typography>
                <OsPopover></OsPopover>
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
                <div style={{ width: '35%', }} className={classes.paper}>
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
