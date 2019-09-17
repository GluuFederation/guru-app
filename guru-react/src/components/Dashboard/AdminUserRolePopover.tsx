import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
import { connect } from 'react-redux';
import { createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import NextArrow from '../../assets/images/next_arrow.png';
import GroupIcon from '../../assets/images/group_icon.png';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { green } from '@material-ui/core/colors';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
const styles = (theme: Theme) =>
    createStyles({
        cardGroup: {
            width: '100%',
            height: 100,
            backgroundColor: '#00b572',
            color: '#ffffff',
        },
        nextArrow: {
            width: 15,
            marginTop: 5,
            marginLeft: 10,
            height: 'auto',
        },
        dashboardClickImg: {
            width: 90,
            height: 90,
            marginTop: -34,
            opacity: 0.3,
            float: 'right',
        },
        paperModel: {
            position: 'absolute',
            width: '60%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 4),
            outline: 'none',
            left: '35%',
            top: '2%',
        },
        table: {
            minWidth: '100%',
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

type Props = WithStyles<typeof styles> & RouteComponentProps
interface State {
    openRoleDash: boolean
}

class AdminUserRolePopover extends Component<Props, State> {
    state = {
        openRoleDash: false,
    }

    handleOpenRoleDash = () => {
        this.setState({ openRoleDash: true });
    };

    handleCloseRoleDash = () => {
        this.setState({ openRoleDash: false });
    };


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Box ml={1} mr={1}>
                    <Card onClick={this.handleOpenRoleDash} className={classes.cardGroup}>
                        <CardActionArea>
                            <Box mt={3} ml={5}><Typography variant="subtitle1" align="left">Users</Typography></Box>
                            <Box ml={5}><Typography variant="caption" align="left">Click here<img className={classes.nextArrow} alt="" src={NextArrow} /></Typography></Box>
                            <img className={classes.dashboardClickImg} alt="" src={GroupIcon} />

                        </CardActionArea>
                    </Card>
                </Box>
                <Modal open={this.state.openRoleDash} onClose={this.handleCloseRoleDash}>
                    <Box style={{ width: '40%' }} className={classes.paperModel}>
                        <form>
                            <Box>

                                <Box>
                                    <Typography variant="h6" align="left">Roles</Typography>
                                    <Typography variant="caption" align="left">Permission granted to user rules in Gluu.</Typography>

                                    <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%', marginBottom: 10, }} />


                                    <Box style={{ overflowX: 'auto' }}>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }} align="left"><Typography variant="caption">Permission</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left"><Typography variant="caption">Staff</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left"><Typography variant="caption">Admin</Typography></TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left"><Typography variant="caption">Named user</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left"><Typography variant="caption">User</Typography></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">All Permission</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0 }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">Add and remove staff</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">Assign tickets</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">View billing information</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">Change billing information</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">View tickets</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">Create tickets</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">Response to tickets</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">Change member role</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><Typography variant="caption">Add and remove members</Typography></TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('A')}
                                                            value="A"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('B')}
                                                            value="B"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '18%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('C')}
                                                            value="C"
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ width: '14%', padding: 0, }} align="left">
                                                        <GreenCheckbox
                                                            // onChange={handleChangeCheckBox('E')}
                                                            value="E"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Modal>


                {/* //////////////  Popup Moded Code End //////// */}

            </div>

        );
    }
}

export default withRouter(connect()(withStyles(styles)(AdminUserRolePopover)));
