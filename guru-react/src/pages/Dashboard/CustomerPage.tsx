import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import UserOne from '../../assets/images/user_one.png';
import UserTwo from '../../assets/images/user_two.jpg';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddUserPopover from "../../components/Dashboard/AddUserPopover";
import Container from '@material-ui/core/Container';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashboardSideMenu from "../../components/Dashboard/DashboardSideMenu";
const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        ContainerAlign: {
            width: '80%',
            margin: '0 auto',
            marginTop: -4,
            marginBottom: 54,
        },
        contentContainer: {},
        avatarAverage: {
            width: 65,
            height: 65,
            marginBottom: 15,
        },
        avatarSmall: {
            width: 45,
            height: 45,
            float: 'left',
        },
        partnerCompTitle: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 24,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        partnerCompDetail: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        nameGroup: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 22,
            fontWeight: 600,
            fontFamily: '"Lato", sans-serif',
        },
        nameGroupInvited: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#727272',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        pendingInvi: {
            marginTop: 15,
            marginBottom: 0,
            textAlign: 'left',
            color: '#f9ae40',
            fontSize: 16,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        btnApprove: {
            margin: theme.spacing(1),
            fontSize: 12,
            fontWeight: 600,
            color: '#ffffff',
            marginTop: 0,
            width: '90%',
            marginBottom: 0,
            backgroundColor: '#00b372',
            textTransform: 'capitalize',
            fontFamily: '"Lato", sans-serif',
            '&:hover': { color: '#00b372', }
        },
        btnDeny: {
            margin: theme.spacing(1),
            fontSize: 12,
            fontWeight: 600,
            color: '#232323',
            marginTop: 0,
            width: '90%',
            marginBottom: 0,
            backgroundColor: '#ededed',
            textTransform: 'capitalize',
            fontFamily: '"Lato", sans-serif',
            '&:hover': { color: '#00b372', }
        },
        btnRevokeAcc: {
            margin: theme.spacing(1),
            fontSize: 12,
            fontWeight: 600,
            color: '#232323',
            marginTop: 0,
            width: '90%',
            marginBottom: 0,
            backgroundColor: '#ededed',
            textTransform: 'capitalize',
            fontFamily: '"Lato", sans-serif',
            '&:hover': { color: '#00b372', }
        },
        assignedUserTitle: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 17,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        assignedUserDes: {
            marginTop: 0,
            marginBottom: 10,
            textAlign: 'left',
            color: '#232323',
            fontSize: 12,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        assgnedUserName: {
            marginLeft: 15,
            color: '#232323',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
            position: 'relative',
            top: 13,
        },
        tableTitleAssigned: {
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
            color: '#232323',
        },
        removeUserType: {
            alignSelf: 'center',
            justifySelf: 'center',
            color: '#00b372',
            fontFamily: '"Lato", sans-serif',
        },
        footerTitle: {
            textAlign: 'center',
            color: '#232323',
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            fontSize: 15,
            marginLeft: 10,
            marginBottom: 5,
        },
        addUser: {
            color: '#00b372',
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            fontSize: 13,
        },


        margin: {
            width: '98%',
        },
        paper: {
            marginRight: theme.spacing(2),
        },
        table: {
            minWidth: '100%',
        },

    });


type Props = WithStyles<typeof styles> & RouteComponentProps;


class CustomerPage extends Component<Props> {


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Navbar />
                <Container className={classes.ContainerAlign} fixed>
                    <Grid className={classes.contentContainer} container>
                        <Grid item md={4} xs={12} sm={12}>
                            <DashboardSideMenu></DashboardSideMenu>
                        </Grid>

                        <Grid item md={8} xs={12} sm={12}>
                            <Grid container>
                                <Grid item md={12} xs={12} sm={12}>
                                    <Typography style={{ marginTop: 20 }} className={classes.partnerCompTitle}>Customer</Typography>
                                </Grid>
                                <Grid item md={8} xs={12} sm={12}>
                                    <Typography style={{ marginBottom: 20, marginTop: 20 }} className={classes.partnerCompDetail}>It is a long established fact that a reader will be distracted by the readable content of the page when looking at its layout.</Typography>
                                </Grid>
                                <Grid item md={4} xs={12} sm={12}>

                                </Grid>

                            </Grid>

                            {/* <MySnackbarContentWrapper
                    variant="success"
                    className={classes.margin}
                    message="Hub City Media has been added as a customer. You can now assign users to this account."
                /> */}

                            <Paper style={{ marginBottom: 20, marginTop: 20 }} className={classes.paper}>
                                <div style={{ padding: 25 }}>
                                    <Grid style={{ marginBottom: -17, }} container>
                                        <Grid item xs={2}>
                                            <Avatar alt="Avatar" src={UserTwo} className={classes.avatarAverage} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.nameGroup}>Identity Nested</Typography>
                                            <Typography className={classes.nameGroupInvited}>Invited Feb 28, 2019</Typography>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Typography className={classes.pendingInvi}>Invitation pending</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button variant="outlined" size="medium" className={classes.btnApprove}>
                                                Approve
                                </Button>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button variant="outlined" size="medium" className={classes.btnDeny}>
                                                Deny
                                </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Paper>
                            <Paper style={{ marginTop: 20, marginBottom: 20 }} className={classes.paper}>
                                <div style={{ padding: 25 }}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Avatar alt="Avatar" src={UserOne} className={classes.avatarAverage} />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Typography className={classes.nameGroup}>Team Orizon</Typography>
                                            <Typography className={classes.nameGroupInvited}>Added on July 12, 2019</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="outlined" size="medium" className={classes.btnRevokeAcc}>
                                                Remove Company
                                </Button>
                                        </Grid>
                                    </Grid>
                                    <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%', marginBottom: 10, }} />

                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div>
                                                <Typography className={classes.assignedUserTitle}>Assigned Users</Typography>
                                                <Typography className={classes.assignedUserDes} style={{ float: 'left' }}>The Customer will able to manage privileges for this users.</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <div style={{ overflowX: 'auto' }}>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell className={classes.tableTitleAssigned} style={{ width: '50%' }} align="left">Name</TableCell>
                                                    <TableCell className={classes.tableTitleAssigned} style={{ width: '12%' }} align="left">Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '50%' }}><Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} /><span className={classes.assgnedUserName}>Nasir Uddin</span></TableCell>

                                                    <TableCell style={{ width: '12%' }} align="left">
                                                        <a href="#" className={classes.removeUserType}>Remove</a>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '50%' }}><Avatar alt="Avatar" src={UserOne} className={classes.avatarSmall} /><span className={classes.assgnedUserName}>Nasir Uddin</span></TableCell>

                                                    <TableCell style={{ width: '12%' }} align="left">
                                                        <a href="#" className={classes.removeUserType}>Remove</a>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                        <AddUserPopover></AddUserPopover>
                                    </div>
                                </div>
                            </Paper>


                            <Paper style={{ marginBottom: 20, marginTop: 20 }} className={classes.paper}>
                                <div style={{ padding: 25 }}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Avatar alt="Avatar" src={UserOne} className={classes.avatarAverage} />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Typography className={classes.nameGroup}>Hub City Media</Typography>
                                            <Typography className={classes.nameGroupInvited}>Added on July 12, 2019</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="outlined" size="medium" className={classes.btnRevokeAcc}>
                                                Remove Company
                          </Button>
                                        </Grid>
                                    </Grid>

                                    <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%', marginBottom: 10, }} />

                                    <p className={classes.footerTitle}>You don't have any assigned user for this company</p>
                                    <p style={{ textAlign: 'center', margin: 'auto' }}><a href="#" className={classes.addUser}>Add User</a></p>

                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Footer></Footer>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(CustomerPage));
