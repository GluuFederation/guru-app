import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import UserTwo from '../../assets/images/user_two.jpg';
const styles = (theme: Theme) =>
    createStyles({
        avatarBig: {
            width: 55,
            height: 55,
            textAlign: 'left',
        },
        btnStaffAlig: {
            textAlign: 'left',
            marginTop: 10,
        },
        btnStaff: {
            width: '40%',
            textAlign: 'center',
            height: 28,
            borderRadius: 4,
            fontFamily: '"Lato", sans-serif',
            fontSize: 13,
            color: '#ffffff',
            backgroundColor: '#00b372',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 4,
            paddingBottom: 4,
            marginRight: 5,
            marginTop: 10
        },
        userName: {
            fontSize: 12,
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            marginTop: 5,
            textAlign: 'left'
        },
        userEmail: {
            textAlign: 'left',
            fontSize: 11,
            color: '#A9A9A9'
        },
        btnGluu: {
            fontSize: 10,
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
            marginTop: 5,
            height: 20,
            width: '50%',
            padding: 3,
            borderRadius: 5,
            backgroundColor: '#e5f7f0',
            color: '#33c28e',
            textAlign: 'center',
        },
        btnEnterprise: {
            fontSize: 10,
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
            marginTop: 5,
            height: 20,
            width: '50%',
            padding: 3,
            borderRadius: 5,
            backgroundColor: '#fff1d2',
            color: '#c7962d',
            textAlign: 'center',
        },

    });

type Props = WithStyles<typeof styles> & RouteComponentProps & WithInfoProps;


class TicketDetail extends Component<Props> {


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Avatar alt="Avatar" src={UserTwo} className={classes.avatarBig} />
                <Typography className={classes.btnStaffAlig}>
                  <span className={classes.btnStaff}>
                    Staff
                  </span>
                </Typography>
                <Typography noWrap className={classes.userName}>User Name - DA</Typography>
                <Typography noWrap className={classes.userEmail}>email@example.com</Typography>

                <Typography className={classes.btnGluu}>Gluu</Typography>

                <Typography className={classes.btnEnterprise}>Enterprise</Typography>
            </div>
        );
    }
}

export default withInfo(withRouter(withStyles(styles)(TicketDetail)));
