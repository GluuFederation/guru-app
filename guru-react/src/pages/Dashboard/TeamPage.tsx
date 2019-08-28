import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import UserOne from '../../assets/images/user_one.png';
import UserTwo from '../../assets/images/user_two.jpg';
import VerifyIcon from '../../assets/images/verify_icon.png';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditTeamPopover from '../../components/Dashboard/EditTeamPopover';
import InviteMemberPopover from '../../components/Dashboard/InviteMemberPopover';
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
        avatarBig: {
            width: 85,
            height: 85,
            margin: 'auto',
            marginBottom: 15,
        },
        avatarMedium: {
            width: 45,
            height: 45,
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
        editDetails: {
            marginTop: 0,
            marginBottom: 0,
            color: '#ADADAD',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
            '&:hover': { color: '#00b372', backgroundColor: 'transparent' }
        },
        planTitle: {
            marginTop: 0,
            marginBottom: 0,
            color: '#ADADAD',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        paymentTitle: {
            marginTop: 0,
            marginBottom: 0,
            color: '#ADADAD',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        subscriptionTitle: {
            marginTop: 0,
            marginBottom: 0,
            color: '#ADADAD',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        planName: {
            marginTop: 0,
            marginBottom: 0,
            color: '#232323',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        paymentName: {
            marginTop: 0,
            marginBottom: 0,
            color: '#232323',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        subscriptionName: {
            marginTop: 0,
            marginBottom: 0,
            color: '#232323',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        editPlan: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 10,
            color: '#C1C1C1',
            fontSize: 12,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
            '&:hover': { color: '#00b372', backgroundColor: 'transparent' }
        },
        teammemTitle: {
            fontSize: 22,
            color: '#232323',
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        teammemDetail: {
            marginTop: 0,
            marginBottom: 0,
            color: '#232323',
            fontSize: 14,
            fontWeight: 400,
            fontFamily: '"Lato", sans-serif',
        },
        noMembers: {
            fontSize: 18,
            color: '#232323',
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        detailMembers: {
            fontSize: 14,
            color: '#232323',
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        tableHeader: {
            fontSize: 14,
            color: '#232323',
            textAlign: 'left',
            fontFamily: '"Lato", sans-serif',
            paddingTop: 15,
            paddingBottom: 15,
        },
        teamMembersTr: {
            marginTop: 20,
            marginBottom: 20,
        },
        membersName: {
            fontSize: 14,
            color: '#232323',
            float: 'left',
            marginTop: 10,
            marginLeft: 10,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        membersEmail: {
            fontSize: 14,
            color: '#232323',
            float: 'left',
            marginBottom: 20,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        pendingNote: {
            fontSize: 14,
            textAlign: 'center',
            color: '#EBB400',
            marginBottom: 20,
            float: 'left',
        },
        membersType: {
            fontSize: 14,
            color: '#232323',
            float: 'left',
            marginBottom: 20,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        selectType: {
            paddingLeft: 10,
            paddingRight: 5,
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 4,
            borderColor: '#c9c9c9',
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.1)',
        },
        btnMemberDel: {
            fontSize: 14,
            float: 'left',
            marginBottom: 20,
            fontWeight: 500,
            backgroundColor: '#FFEDED',
            fontFamily: '"Lato", sans-serif',
            color: '#FF5656',
            '&:hover': { backgroundColor: '#FFC2C2' }
        },
        margin: {
            margin: theme.spacing(1),
        },
        fab: {},
        paper: {
            marginRight: theme.spacing(2),
        },

        teamNameField: {
            margin: 0,
            width: '100%',
            marginBottom: 10,
        },

    });

type Props = WithStyles<typeof styles> & RouteComponentProps;


class TeamPage extends Component<Props> {


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
                            <Paper style={{ marginBottom: 20, marginTop: 20 }} className={classes.paper}>
                                <div style={{ padding: 25 }}>
                                    <Grid container>
                                        <Grid item md={3} xs={12} sm={12}>
                                            <Avatar style={{ float: 'left' }} alt="Avatar" src={UserTwo} className={classes.avatarBig} />
                                        </Grid>
                                        <Grid item md={9} xs={12} sm={12}>
                                            <span style={{ flex: 'auto', justifyContent: 'left', marginBottom: 3, marginTop: 3 }} className={classes.userPname}>Team Orizon<img alt="Verify Icon" style={{ width: 18, height: 18, marginLeft: 5, marginTop: 8, }} src={VerifyIcon} /></span>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 0 }} className={classes.userCompany}>A team of digital product thinker</p>
                                            <EditTeamPopover></EditTeamPopover>
                                        </Grid>
                                    </Grid>
                                    <div style={{ marginTop: 25, paddingBottom: 25, }}></div>
                                    <Grid container>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 3 }} className={classes.planTitle}>Gluu Plan</p>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 0 }} className={classes.planName}>VIP (Enterprise)<a href="/" className={classes.editPlan}>Change Plan</a></p>
                                        </Grid>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 3 }} className={classes.paymentTitle}>Payment Cycle</p>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 0 }} className={classes.paymentName}>Yearly<a href="/" className={classes.editPlan}>Manage billing</a></p>
                                        </Grid>
                                        <Grid item md={4} xs={12} sm={12}>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 3 }} className={classes.subscriptionTitle}>Subscription term</p>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 0 }} className={classes.subscriptionName}>Jan 25, 2019 - Jan 24, 2020</p>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Paper>

                            <Paper style={{ marginTop: 20, marginBottom: 20 }} className={classes.paper}>
                                <div style={{ padding: 25 }}>
                                    <Grid container>
                                        <Grid item md={9} xs={8} sm={8}>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 0 }} className={classes.teammemTitle}>Team members</p>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 0 }} className={classes.teammemDetail}>User listed belongs to your team</p>
                                        </Grid>
                                        <Grid item md={3} xs={4} sm={4}>
                                            <InviteMemberPopover></InviteMemberPopover>
                                        </Grid>
                                    </Grid>
                                    <div style={{ marginTop: 25, }}></div>
                                    <Grid container>
                                        <Grid item md={12} xs={12} sm={12}>
                                            <p style={{ textAlign: 'left', marginBottom: 3, marginTop: 3 }}><span className={classes.noMembers}>7 Members </span><span style={{ textAlign: 'left', fontSize: 36, fontWeight: 800 }}>.</span>
                                                <span style={{ textAlign: 'left', marginBottom: 3, marginTop: 3 }} className={classes.detailMembers}>You can add 2 more member(s) under your existing plan. </span><span style={{ textAlign: 'left', marginBottom: 3, marginTop: 0 }} className={classes.editDetails}>(Manage plan)</span></p>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item md={12} xs={12} sm={12}>
                                            <div style={{ width: '100%', overflowX: 'auto' }}>
                                                <table style={{ width: '100%' }}>
                                                    <thead>
                                                        <tr className={classes.teamMembersTr}>
                                                            <th className={classes.tableHeader}>Name</th>
                                                            <th className={classes.tableHeader}>Email</th>
                                                            <th className={classes.tableHeader}>Role</th>
                                                            <th className={classes.tableHeader}></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className={classes.teamMembersTr}>
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserTwo} className={classes.avatarMedium} /><span className={classes.membersName}>Nasir uddin</span></td>
                                                            <td><span className={classes.membersEmail}>iamnasir360@gmail.com</span></td>
                                                            <td>
                                                                <FormControl className={classes.membersType}>
                                                                    <Select
                                                                        className={classes.selectType}
                                                                        value={1}
                                                                    // onChange={handleChange}
                                                                    >
                                                                        <MenuItem value={1}>Admin</MenuItem>
                                                                        <MenuItem value={2}>User</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </td>
                                                            <td>
                                                                <Button className={classes.btnMemberDel}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </td>
                                                        </tr>

                                                        <tr className={classes.teamMembersTr}>
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserOne} className={classes.avatarMedium} /><span className={classes.membersName}>Nasir uddin</span></td>
                                                            <td><span className={classes.membersEmail}>iamnasir360@gmail.com</span></td>
                                                            <td>
                                                                <FormControl className={classes.membersType}>
                                                                    <Select
                                                                        className={classes.selectType}
                                                                        value={4}
                                                                    // onChange={handleChange}
                                                                    >
                                                                        <MenuItem value={3}>Admin</MenuItem>
                                                                        <MenuItem value={4}>User</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </td>
                                                            <td>
                                                                <Button className={classes.btnMemberDel}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </td>
                                                        </tr>

                                                        <tr className={classes.teamMembersTr}>
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserOne} className={classes.avatarMedium} /><span className={classes.membersName}>Nasir uddin</span></td>
                                                            <td><span className={classes.membersEmail}>iamnasir360@gmail.com</span></td>
                                                            <td>
                                                                <FormControl className={classes.membersType}>
                                                                    <Select
                                                                        className={classes.selectType}
                                                                        value={5}
                                                                    // onChange={handleChange}
                                                                    >
                                                                        <MenuItem value={5}>Admin</MenuItem>
                                                                        <MenuItem value={6}>User</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </td>
                                                            <td>
                                                                <Button className={classes.btnMemberDel}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </td>
                                                        </tr>

                                                        <tr className={classes.teamMembersTr}>
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserTwo} className={classes.avatarMedium} /><span className={classes.membersName}>Nasir uddin</span></td>
                                                            <td><span className={classes.membersEmail}>iamnasir360@gmail.com</span></td>
                                                            <td>
                                                                <FormControl className={classes.membersType}>
                                                                    <Select
                                                                        className={classes.selectType}
                                                                        value={7}
                                                                    // onChange={handleChange}
                                                                    >
                                                                        <MenuItem value={7}>Admin</MenuItem>
                                                                        <MenuItem value={8}>User</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </td>
                                                            <td>
                                                                <Button className={classes.btnMemberDel}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </td>
                                                        </tr>

                                                        <tr className={classes.teamMembersTr}>
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserTwo} className={classes.avatarMedium} /><span className={classes.membersName}>Nasir uddin</span></td>
                                                            <td><span className={classes.membersEmail}>iamnasir360@gmail.com</span></td>
                                                            <td>
                                                                <span className={classes.pendingNote}>Pending</span>
                                                            </td>
                                                            <td>
                                                                <Button className={classes.btnMemberDel}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Grid>
                                    </Grid>

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

export default withRouter(withStyles(styles)(TeamPage));
