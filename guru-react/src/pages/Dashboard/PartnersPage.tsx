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
import { green } from '@material-ui/core/colors';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

const styles = (theme: Theme) =>
    createStyles({
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
            fontWeight: 550,
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
        btnInviteNewPartn: {
            margin: theme.spacing(1),
            fontSize: 12,
            fontWeight: 600,
            color: '#232323',
            marginTop: 20,
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
        table: {
            minWidth: '100%',
        },
        paper: {
            marginRight: theme.spacing(2),
        },

    });
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);


type Props = WithStyles<typeof styles> & RouteComponentProps;


class PartnersPage extends Component<Props> {


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item md={12} xs={12} sm={12}>
                        <Typography style={{ marginTop: 20 }} className={classes.partnerCompTitle}>Partner Companies</Typography>
                    </Grid>
                    <Grid item md={9} xs={8} sm={8}>
                        <Typography style={{ marginBottom: 20, marginTop: 20 }} className={classes.partnerCompDetail}>Give a partner company access to your company access. View all of the certified Gluu services Partners on your <a style={{ color: '#00b372' }} href="#">website</a></Typography>
                    </Grid>
                    <Grid item md={3} xs={4} sm={4}>
                        <Button variant="outlined" size="medium" className={classes.btnInviteNewPartn}>
                            Invite New Partner
                    </Button>
                    </Grid>
                </Grid>

                <Paper style={{ marginBottom: 20, marginTop: 20 }} className={classes.paper}>
                    <div style={{ padding: 25 }}>
                        <Grid style={{ marginBottom: -17, }} container>
                            <Grid item xs={2}>
                                <Avatar alt="Avatar" src={UserTwo} className={classes.avatarAverage} />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography className={classes.nameGroup}>Cogito Group</Typography>
                                <Typography className={classes.nameGroupInvited}>invited Feb 28, 2019</Typography>
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
                                <Typography className={classes.nameGroup}>Falcom Systems Consulting</Typography>
                                <Typography className={classes.nameGroupInvited}>Added on July 12, 2019</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" size="medium" className={classes.btnRevokeAcc}>
                                    Revoke access
                        </Button>
                            </Grid>
                        </Grid>
                        <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%', marginBottom: 10, }} />

                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.assignedUserTitle} style={{ float: 'left' }}>Assigned Users</Typography>
                            </Grid>
                        </Grid>

                        <div style={{ overflowX: 'auto' }}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow style={{ width: '100%' }}>
                                        <TableCell className={classes.tableTitleAssigned} style={{ width: '50%' }} align="left">Name</TableCell>
                                        <TableCell className={classes.tableTitleAssigned} style={{ width: '12%' }} align="left">View</TableCell>
                                        <TableCell className={classes.tableTitleAssigned} style={{ width: '12%' }} align="left">Create</TableCell>
                                        <TableCell className={classes.tableTitleAssigned} style={{ width: '12%' }} align="left">Edit</TableCell>
                                        <TableCell className={classes.tableTitleAssigned} style={{ width: '12%' }} align="left">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                    <TableRow style={{ width: '100%' }}>
                                        <TableCell style={{ width: '50%' }}><Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} /><span className={classes.assgnedUserName}>Nasir Uddin</span></TableCell>
                                        <TableCell style={{ width: '12%' }} align="left">
                                            <GreenCheckbox
                                                // onChange={this.handleChangeCheckBox('A')}
                                                value="A"
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: '12%' }} align="left">
                                            <GreenCheckbox
                                                // onChange={this.handleChangeCheckBox('B')}
                                                value="B"
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: '12%' }} align="left">
                                            <GreenCheckbox
                                                // onChange={this.handleChangeCheckBox('C')}
                                                value="C"
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: '12%' }} align="left">
                                            <GreenCheckbox
                                                // onChange={this.handleChangeCheckBox('E')}
                                                value="E"
                                            />
                                        </TableCell>
                                    </TableRow>



                                    <TableRow style={{ width: '100%' }}>
                                        <TableCell style={{ width: '50%' }}><Avatar alt="Avatar" src={UserOne} className={classes.avatarSmall} /><span className={classes.assgnedUserName}>Nasir Uddin</span></TableCell>
                                        <TableCell style={{ width: '12%' }} align="left">
                                            <GreenCheckbox
                                                // onChange={this.handleChangeCheckBox('A')}
                                                value="A"
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: '12%' }} align="left">
                                            <GreenCheckbox
                                                // onChange={this.handleChangeCheckBox('B')}
                                                value="B"
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: '12%' }} align="left">
                                            <GreenCheckbox
                                                // onChange={this.handleChangeCheckBox('C')}
                                                value="C"
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: '12%' }} align="left">
                                            <GreenCheckbox
                                                // onChange={this.handleChangeCheckBox('E')}
                                                value="E"
                                            />
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </div>

                    </div>
                </Paper>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(PartnersPage));
