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
import Box from '@material-ui/core/Box';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashboardSideMenu from "../../components/Dashboard/DashboardSideMenu";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
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
        teamMembersTr: {
            marginTop: 20,
            marginBottom: 20,
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
        paper: {
            marginRight: theme.spacing(2),
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
                    <Box mt={2}>
                        <Grid className={classes.contentContainer} container>
                            <Grid item md={4} xs={12} sm={12}>
                                <DashboardSideMenu></DashboardSideMenu>
                            </Grid>
                            <Grid item md={8} xs={12} sm={12}>
                                <Paper className={classes.paper}>
                                    <Box style={{ padding: 25 }}>
                                        <Grid container>
                                            <Grid item md={3} xs={12} sm={12}>
                                                <Avatar style={{ float: 'left' }} alt="Avatar" src={UserTwo} className={classes.avatarBig} />
                                            </Grid>
                                            <Grid item md={9} xs={12} sm={12}>
                                                <Typography variant="h5" align="left">Nasir uddin<img alt="Verify Icon" style={{ width: 18, height: 18, marginLeft: 5, marginBottom: -3 }} src={VerifyIcon} /></Typography>
                                                <Typography variant="body2" align="left">A team of digital product thinker</Typography>
                                                <EditTeamPopover></EditTeamPopover>
                                            </Grid>
                                        </Grid>
                                        <Box style={{ paddingBottom: 25, }}></Box>
                                        <Grid container>
                                            <Grid item md={4} xs={12} sm={12}>
                                                <Typography variant="body2" align="left">Gluu Plan</Typography>
                                                <Typography variant="body2" align="left">VIP (Enterprise)<Link href="/" color="textSecondary"> Change Plan</Link></Typography>
                                            </Grid>
                                            <Grid item md={4} xs={12} sm={12}>
                                                <Typography variant="body2" align="left">Payment Cycle</Typography>
                                                <Typography variant="body2" align="left">Yearly<Link href="/" color="textSecondary"> Manage billing</Link></Typography>
                                            </Grid>
                                            <Grid item md={4} xs={12} sm={12}>
                                                <Typography variant="body2" align="left">Subscription term</Typography>
                                                <Typography variant="body2" align="left">Jan 25, 2019 - Jan 24, 2020</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                                <Paper style={{ marginTop: 20, marginBottom: 20 }} className={classes.paper}>
                                    <Box p={2}>
                                        <Grid container>
                                            <Grid item md={10} xs={8} sm={8}>
                                                <Typography variant="h6" align="left">Team members</Typography>
                                                <Typography variant="body2" align="left">User listed belongs to your team</Typography>
                                            </Grid>
                                            <Grid item md={2} xs={4} sm={4}>
                                                <InviteMemberPopover></InviteMemberPopover>
                                            </Grid>
                                        </Grid>
                                        <Box style={{ marginTop: 25, }}></Box>
                                        <Grid container>
                                            <Grid item md={12} xs={12} sm={12}>
                                                <Box textAlign="left" mb={2}>
                                                    <Typography display="inline" variant="h6" align="left">7 Members </Typography><Typography display="inline" variant="h3" align="left">.</Typography>
                                                    <Typography display="inline" variant="body1" align="left">You can add 2 more member(s) under your existing plan. </Typography><Typography display="inline" variant="body1" align="left" color="textPrimary">(Manage plan)</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Grid container>
                                            <Grid item md={12} xs={12} sm={12}>
                                                <Box style={{ width: '100%', overflowX: 'auto' }}>
                                                    <table style={{ width: '100%' }}>
                                                        <tr className={classes.teamMembersTr}>
                                                            <th><Typography variant="subtitle1" align="left">Name</Typography></th>
                                                            <th><Typography variant="subtitle1" align="left">Email</Typography></th>
                                                            <th><Typography variant="subtitle1" align="left">Role</Typography></th>
                                                            <th></th>
                                                        </tr>

                                                        <tr className={classes.teamMembersTr}>
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserTwo} className={classes.avatarMedium} /><Box mt={2}><Typography variant="subtitle1" align="center">Nasir uddin</Typography></Box></td>
                                                            <td><Typography variant="body1" align="left">iamnasir360@gmail.com</Typography></td>
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
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserOne} className={classes.avatarMedium} /><Box mt={2}><Typography variant="subtitle1" align="center">Nasir uddin</Typography></Box></td>
                                                            <td><Typography variant="body1" align="left">iamnasir360@gmail.com</Typography></td>
                                                            <td>
                                                                <FormControl className={classes.membersType}>
                                                                    <Select
                                                                        className={classes.selectType}
                                                                        value={3}
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
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserOne} className={classes.avatarMedium} /><Box mt={2}><Typography variant="subtitle1" align="center">Nasir uddin</Typography></Box></td>
                                                            <td><Typography variant="body1" align="left">iamnasir360@gmail.com</Typography></td>
                                                            <td>
                                                                <FormControl className={classes.membersType}>
                                                                    <Select
                                                                        className={classes.selectType}
                                                                        value={6}
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
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserTwo} className={classes.avatarMedium} /><Box mt={2}><Typography variant="subtitle1" align="center">Nasir uddin</Typography></Box></td>
                                                            <td><Typography variant="body1" align="left">iamnasir360@gmail.com</Typography></td>
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
                                                            <td><Avatar style={{ float: 'left' }} alt="Avatar" src={UserTwo} className={classes.avatarMedium} /><Box mt={2}><Typography variant="subtitle1" align="center">Nasir uddin</Typography></Box></td>
                                                            <td><Typography variant="body1" align="left">iamnasir360@gmail.com</Typography></td>
                                                            <td>
                                                                <FormControl className={classes.membersType}>
                                                                    <Select
                                                                        className={classes.selectType}
                                                                        value={10}
                                                                        // onChange={handleChange}
                                                                        >
                                                                        <MenuItem value={9}>Admin</MenuItem>
                                                                        <MenuItem value={10}>User</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </td>
                                                            <td>
                                                                <Button className={classes.btnMemberDel}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Footer></Footer>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(TeamPage));
