import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Ticket from '@material-ui/icons/ConfirmationNumber';
import Comment from '@material-ui/icons/Comment';
import UserTwo from '../../assets/images/user_two.jpg';
const styles = (theme: Theme) =>
    createStyles({
        gridHistory: {
            marginTop: 8,
        },
        textUser: {
            float: 'left',
            marginTop: -23,
            marginLeft: 35,
            color: '#6B6B6B',
            fontSize: 14,
        },
        Ticket: {
            color: '#DCDCDC',
            fontSize: 18,
        },
        iconBg: {
            float: 'left',
            color: '#E9E9E9',
            backgroundColor: '#F3F2F2',
            borderRadius: 20,
            width: 30,
            height: 30,
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        avatarSmall: {
            width: 28,
            height: 28,
            textAlign: 'left',
        },
    });

type Props = WithStyles<typeof styles> & RouteComponentProps & WithInfoProps;


class TicketDetail extends Component<Props> {


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid className={classes.gridHistory} >
                    <Avatar className={classes.iconBg}><Ticket className={classes.Ticket} /></Avatar>
                    <Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                    <Typography className={classes.textUser}>William Assigned Robi 2 hours ago</Typography>
                </Grid >
                <Grid className={classes.gridHistory}>
                    <Avatar className={classes.iconBg}><Comment className={classes.Ticket} /></Avatar>
                    <Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                    <Typography className={classes.textUser}>William Added a Comment 9 hours ago</Typography>
                </Grid>
                <Grid className={classes.gridHistory}>
                    <Avatar className={classes.iconBg}><Ticket className={classes.Ticket} /></Avatar>
                    <Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                    <Typography className={classes.textUser}>William Assigned Robi 5 hours ago</Typography>
                </Grid>
            </div>
        );
    }
}

export default withInfo(withRouter(withStyles(styles)(TicketDetail)));
