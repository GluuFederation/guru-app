import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/styles";
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

const styles = (theme: Theme) =>
    createStyles({
        cardGroup: {
            width: '100%',
            height: 100,
            backgroundColor: '#00b572',
            color: '#ffffff',
        },
        catagoryName: {
            marginTop: 30,
            marginLeft: 30,
            textAlign: 'left',
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: '"Lato", sans-serif',
        },
        catagoryClick: {
            marginLeft: 30,
            textAlign: 'left',
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
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
        textRegu: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#727272',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
        },
        divGenralPedd: {
            padding: 20,
        },
        headerTitle: {
            marginTop: 0,
            marginBottom: 0,
            textAlign: 'left',
            color: '#232323',
            fontSize: 24,
            fontWeight: 500,
            fontFamily: '"Lato", sans-serif',
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
                <Card className={classes.cardGroup} onClick={this.handleOpenRoleDash}>
                    <CardActionArea>
                        <Typography className={classes.catagoryName}>Users</Typography>
                        <Typography className={classes.catagoryClick}>Click here<img alt="" className={classes.nextArrow} src={NextArrow} /></Typography>
                        <img alt="" className={classes.dashboardClickImg} src={GroupIcon} />
                    </CardActionArea>
                </Card>
                <Modal open={this.state.openRoleDash} onClose={this.handleCloseRoleDash}>
                    <div style={{ width: '35%' }} className={classes.paperModel}>
                        <form>
                            <div>
                                <div className={classes.divGenralPedd}>
                                    <Typography className={classes.headerTitle}>Roles</Typography>
                                    <p className={classes.textRegu}>Permission granted to user rules in Gluu</p>
                                    <hr style={{ backgroundColor: '#ffffff', height: 0.1, width: '100%', marginBottom: 10, }} />
                                    <div style={{ overflowX: 'auto' }}>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell className={classes.textRegu} style={{ width: '40%', padding: 0, }} align="left">Permission</TableCell>
                                                    <TableCell className={classes.textRegu} style={{ width: '14%', padding: 0, }} align="left">Staff</TableCell>
                                                    <TableCell className={classes.textRegu} style={{ width: '14%', padding: 0, }} align="left">Admin</TableCell>
                                                    <TableCell className={classes.textRegu} style={{ width: '18%', padding: 0, }} align="left">Named user</TableCell>
                                                    <TableCell className={classes.textRegu} style={{ width: '14%', padding: 0, }} align="left">User</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow style={{ width: '100%' }}>
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>All Permission</span></TableCell>
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
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>Add and remove staff</span></TableCell>
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
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>Assign tickets</span></TableCell>
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
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>View billing information</span></TableCell>
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
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>Change billing information</span></TableCell>
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
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>View tickets</span></TableCell>
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
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>Create tickets</span></TableCell>
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
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>Response to tickets</span></TableCell>
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
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>Change member role</span></TableCell>
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
                                                    <TableCell style={{ width: '40%', padding: 0, }}><span className={classes.textRegu}>Add and remove members</span></TableCell>
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
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>

                {/* //////////////  Popup Moded Code End //////// */}

            </div>

        );
    }
}

export default withRouter(withStyles(styles)(AdminUserRolePopover));
