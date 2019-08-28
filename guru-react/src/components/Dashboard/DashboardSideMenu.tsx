import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import UserOne from '../../assets/images/user_one.png';
import VerifyIcon from '../../assets/images/verify_icon.png';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';

const styles = (theme: Theme) =>
    createStyles({
        avatarBig: {
            width: 85,
            height: 85,
            margin: 'auto',
            marginBottom: 15,
        },

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
        userPname: {
            fontSize: 22,
            color: '#232323',
            fontWeight: 500,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            fontFamily: '"Lato", sans-serif',
        },
        userCompany: {
            marginTop: 0,
            marginBottom: 0,
            color: '#ADADAD',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 400,
            fontFamily: '"Lato", sans-serif',
        },
        userCompanyEmail: {
            marginTop: 0,
            color: '#232323',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        ticketsCount: {
            marginBottom: 0,
            color: '#232323',
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        ticketsTitle: {
            marginTop: 10,
            color: '#ADADAD',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        votesCount: {
            marginBottom: 0,
            color: '#232323',
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        votesTitle: {
            marginTop: 10,
            color: '#ADADAD',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },

        detailMembers: {
            fontSize: 14,
            color: '#232323',
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },

        menuSidebar: {
            color: '#232323',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: '"Lato", sans-serif',
            backgroundColor: '#ffffff',
            '&:hover': { color: '#00b372', borderLeft: 'solid #2dce56', }
        },
        anchorMenu:{
            textDecoration: 'none',
            color: '#232323',
            marginLeft: '10%',
            '&:hover': { color: '#2dce56',}
        },
        menuSidebarTxt: {
        },
        paper: {
            marginRight: theme.spacing(2),
        },
    });


type Props = WithStyles<typeof styles> & RouteComponentProps

class DashboardSideMenu extends Component<Props> {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Paper style={{ marginTop: 20, marginBottom: 20 }} className={classes.paper}>
                    <div style={{ padding: 25 }}>
                        <div>
                            <Avatar style={{ marginBottom: -26 }} alt="Avatar" src={UserOne} className={classes.avatarBig} />
                            <button className={classes.editImageP}>
                                <Edit className={classes.editPancil} />
                            </button>
                        </div>
                        <span className={classes.userPname}>Nasir uddin<img alt="Verify Icon" style={{ width: 18, height: 18, marginLeft: 5, marginTop: 8, }} src={VerifyIcon} /></span>
                        <p className={classes.userCompany}>Gluu Inc</p>
                        <p className={classes.userCompanyEmail}>nasir@gluu.org</p>
                        <div style={{ backgroundColor: '#eeeeee', height: 1, width: '100%', }} ></div>
                        <Grid container>
                            <Grid item md={6} xs={6} sm={6}>
                                <p className={classes.ticketsCount}>12</p>
                                <p className={classes.ticketsTitle}>Opened Tickets</p>
                            </Grid>
                            <Grid item md={6} xs={6} sm={6}>
                                <p className={classes.votesCount}>170</p>
                                <p className={classes.votesTitle}>Upvotes</p>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ backgroundColor: '#eeeeee', height: 1, width: '100%', }} ></div>
                    <div>
                        <MenuList>
                            <MenuItem className={classes.menuSidebar}>
                                <a className={classes.anchorMenu} href="/dashboard/notifications"><Typography className={classes.menuSidebarTxt} variant="inherit">Notification</Typography></a>
                            </MenuItem>
                            <MenuItem className={classes.menuSidebar}>
                                <a className={classes.anchorMenu} href="/dashboard/profile"><Typography className={classes.menuSidebarTxt} variant="inherit">Profile</Typography></a>
                            </MenuItem>
                            <MenuItem className={classes.menuSidebar}>
                                <a className={classes.anchorMenu} href="/dashboard/team"><Typography className={classes.menuSidebarTxt} variant="inherit" noWrap>Team</Typography></a>
                            </MenuItem>
                            <MenuItem className={classes.menuSidebar}>
                                <a className={classes.anchorMenu} href="/dashboard/partner"><Typography className={classes.menuSidebarTxt} variant="inherit" noWrap>Partners</Typography></a>
                            </MenuItem>
                            <MenuItem className={classes.menuSidebar}>
                                <a className={classes.anchorMenu} href="/dashboard/customer"><Typography className={classes.menuSidebarTxt} variant="inherit" noWrap>Customers</Typography></a>
                            </MenuItem>
                            <MenuItem className={classes.menuSidebar}>
                                <a className={classes.anchorMenu} href="/dashboard/billing"><Typography className={classes.menuSidebarTxt} variant="inherit" noWrap>Billing</Typography></a>
                            </MenuItem>
                            <MenuItem className={classes.menuSidebar}>
                                <a className={classes.anchorMenu} href="/dashboard/account-setting"><Typography className={classes.menuSidebarTxt} variant="inherit" noWrap>Account Security</Typography></a>
                            </MenuItem>
                            <MenuItem className={classes.menuSidebar}>
                                <a className={classes.anchorMenu} href="/dashboard/admin"><Typography className={classes.menuSidebarTxt} variant="inherit" noWrap>Admin</Typography></a>
                            </MenuItem>
                        </MenuList>
                    </div>
                </Paper>
            </div>

        );
    }
}

export default withRouter(withStyles(styles)(DashboardSideMenu));
