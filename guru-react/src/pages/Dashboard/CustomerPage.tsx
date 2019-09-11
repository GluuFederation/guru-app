import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { createStyles, Theme } from '@material-ui/core/styles';
import { colors } from "../../theme";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import UserOne from '../../assets/images/user_one.png';
import UserTwo from '../../assets/images/user_two.jpg';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
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
        btnSuccess: {
            backgroundColor: colors.MAIN_COLOR,
            textTransform: 'capitalize',
            color:colors.VERY_LIGHT_TEXT,
            '&:hover': { color:'#2dce56', backgroundColor: colors.SECONDARY_BACKGROUND, }
        },
        btnDeny: {
            backgroundColor: 'transparent',
            textTransform: 'capitalize',
            color: '#232323',
            '&:hover': { color:colors.MAIN_COLOR, backgroundColor:colors.SECONDARY_BACKGROUND, }
        },
        btnSuccessS: {
            backgroundColor: colors.MAIN_COLOR,
            width: '90%',
            color:colors.VERY_LIGHT_TEXT,
            textTransform: 'capitalize',
            '&:hover': { color: '#2dce56', backgroundColor: colors.SECONDARY_BACKGROUND, }
        },
        btnDenyS: {
            backgroundColor: 'transparent',
            textTransform: 'capitalize',
            color: '#232323',
            width: '90%',
            '&:hover': { color: colors.MAIN_COLOR, backgroundColor: colors.SECONDARY_BACKGROUND, }
        },
        anchorTag: {
            color: '#00b372',
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            fontSize: 12,
            marginLeft: 0,
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

                    <Box mt={2}>    
                        <Grid className={classes.contentContainer} container>
                            <Grid item md={4} xs={12} sm={12}>
                                <DashboardSideMenu></DashboardSideMenu>
                            </Grid>

                            <Grid item md={8} xs={12} sm={12}>
                                <Grid container>
                                    <Grid item md={12} xs={12} sm={12}>
                                        <Typography variant="h5" align="left">Customer</Typography>
                                    </Grid>
                                    <Grid item md={8} xs={12} sm={12}>
                                        <Box mt={2} mb={2}><Typography variant="body2" align="left">It is a long established fact that a reader will be distracted by the readable content of the page when looking at its layout.</Typography></Box>
                                    </Grid>
                                    <Grid item md={4} xs={12} sm={12}>
                                    </Grid>
                                </Grid>
                                <Box mb={2}>
                                    {/* <MySnackbarContentWrapper
                                        variant="success"
                                        className={classes.margin}
                                        message="Hub City Media has been added as a customer. You can now assign users to this account."
                                    /> */}
                                </Box>

                                <Paper className={classes.paper}>
                                    <Box style={{ padding: 25 }}>
                                        <Grid spacing={0} style={{ marginBottom: -17, }} container>
                                            <Grid item xs={2}>
                                                <Avatar alt="Avatar" src={UserTwo} className={classes.avatarAverage} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6" align="left">Identity Nested</Typography>
                                                <Typography variant="body2" align="left" color="textSecondary">Invited Feb 28, 2019</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Box mt={2}><Typography variant="body2" align="left" color="secondary">Invitation pending</Typography></Box>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <Button variant="contained" className={classes.btnSuccessS} size="medium" color="primary">
                                                    Approve
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <Button variant="contained" className={classes.btnDenyS} size="medium" color="secondary">
                                                    Deny
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                                <Paper style={{ marginTop: 20, marginBottom: 20 }} className={classes.paper}>
                                    <Box style={{ padding: 25 }}>
                                        <Grid container>
                                            <Grid item xs={2}>
                                                <Avatar alt="Avatar" src={UserOne} className={classes.avatarAverage} />
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography variant="h6" align="left">Team Orizon</Typography>
                                                <Typography variant="body2" align="left" color="textSecondary">Added on July 12, 2019</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant="contained" className={classes.btnSuccess} size="medium" color="primary">
                                                    Remove Company
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <hr />

                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box>
                                                    <Typography variant="subtitle2" align="left" color="textSecondary">Assigned Users</Typography>
                                                    <Typography variant="body2" align="left" color="textPrimary">The Customer will able to manage privileges for this users.</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Box style={{ overflowX: 'auto' }}>
                                            <Table className={classes.table}>
                                                <TableHead>
                                                    <TableRow style={{ width: '100%' }}>
                                                        <TableCell><Typography variant="subtitle1" align="left" color="textSecondary">Name</Typography></TableCell>
                                                        <TableCell><Typography variant="subtitle1" align="right" color="textSecondary">Delete</Typography></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow style={{ width: '100%' }}>
                                                        <TableCell><Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} /><Typography variant="body1" align="center" color="textSecondary">Nasir Uddin</Typography></TableCell>

                                                        <TableCell>
                                                            <Typography align="right"><a href="#" className={classes.anchorTag}>Remove</a></Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow style={{ width: '100%' }}>
                                                        <TableCell>
                                                            <Avatar alt="Avatar" src={UserOne} className={classes.avatarSmall} />
                                                            <Typography variant="body1" align="center" color="textSecondary">Nasir Uddin</Typography>
                                                        </TableCell>

                                                        <TableCell>
                                                            <Typography align="right"><a href="#" className={classes.anchorTag}>Remove</a></Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            <AddUserPopover></AddUserPopover>
                                        </Box>
                                    </Box>
                                </Paper>
                                <Paper style={{ marginBottom: 20, marginTop: 20 }} className={classes.paper}>
                                    <Box style={{ padding: 25 }}>
                                        <Grid container>
                                            <Grid item xs={2}>
                                                <Avatar alt="Avatar" src={UserOne} className={classes.avatarAverage} />
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography variant="h6" align="left" color="textPrimary">Hub City Media</Typography>
                                                <Typography variant="body2" align="left" color="textSecondary">Added on July 12, 2019</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant="contained" size="medium" className={classes.btnSuccessS} color="primary">
                                                    Remove Company
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <hr />
                                        <Typography variant="body2" align="center" color="textPrimary">You don't have any assigned user for this company</Typography>
                                        <Typography variant="body1" align="center"><a href="#" className={classes.anchorTag}>Add New User</a></Typography>
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

export default withRouter(withStyles(styles)(CustomerPage));
