import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriIcon from '@material-ui/icons/MoreHoriz';
const styles = (theme: Theme) =>
    createStyles({
        card: {},
        CardHeader: {
            backgroundColor: '#f1f5f9',
            textAlign: 'left',
            fontFamily: 'arial',
            height: 40,
            fontSize: 12,
            fontWeight: 600
        },
        SettingsIcon: {
            color: '#858585',
            float: 'right',
            flex: 1,
            justifyContent: 'right',
            alignItems: 'right'
        },
        textVoteNo: {
            fontSize: 14,
            fontFamily: 'arial',
            marginLeft: 10,
            marginRight: 5,
            fontWeight: 500,
            color: '#858585',
        },
        textVote: {
            fontSize: 14,
            fontFamily: 'arial',
            marginLeft: 5,
            fontWeight: 500,
            color: '#858585',
        },
        textPanel: {
            fontSize: 14,
            fontFamily: 'arial',
            textAlign: 'left',
            fontWeight: 500,
            color: '#989898',
            marginTop: 5,
        },
        textLink: {
            fontSize: 14,
            fontFamily: 'arial',
            textAlign: 'left',
            fontWeight: 500,
            color: '#7FD0FF',
            marginTop: 5,
        },
        textVoteDT: {
            fontSize: 14,
            fontFamily: 'arial',
            marginLeft: 5,
            fontWeight: 500,
            right: 0,
            color: '#858585',
        },
    });

type Props = WithStyles<typeof styles> & RouteComponentProps & WithInfoProps;


class TicketDetail extends Component<Props> {


    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>

                <CardActions className={classes.CardHeader} disableSpacing>
                    <Grid style={{ float: 'left' }} item={true} md={8} xs={7} sm={8}><Typography className={classes.textVoteDT}>18 Agust 2018 at 2:24 PM GMT </Typography></Grid>

                    <Grid style={{ float: 'left', marginTop: 9, }} item={true} md={4} xs={5} sm={4}>
                        <span style={{ marginLeft: 35 }}>
                            <span className={classes.textVote}>Edit </span>
                            <span className={classes.textVoteNo}>Copy link </span>
                        </span>
                        <IconButton style={{ float: 'right', marginTop: -15, }} className={classes.SettingsIcon} aria-label="Settings">
                            <MoreHoriIcon />
                        </IconButton>
                    </Grid>


                </CardActions>

                <CardContent>
                    <Typography className={classes.textPanel} component="p">
                        Hi Team
                    </Typography>
                    <Typography className={classes.textPanel} component="span">
                        Reference Link : <Typography className={classes.textLink}>https://github.com/mui-org</Typography>
                    </Typography>
                    <Typography className={classes.textPanel} component="p">
                        Invitation letters are generally written in order to notify and invite the guests for ant particular ceremony or event. For example suppose an art exhibition is going to be held and the invitation letter would serve the purpose of inviting the art lovers to the exhibition. The invitation letter is generally written by the host of the event because it is his/her responsibility to notify all the guests.
                        All the necessary details about the event must be mentioned in the invitation letter. In case of the art exhibition it is the responsibility of the art gallery to distribute the invitation letters to the guests.
                    </Typography>


                    <Typography className={classes.textPanel} component="span">
                        Reference Link : <Typography className={classes.textLink}>https://material-ui.com/components/cards/</Typography>
                    </Typography>

                    <Typography className={classes.textPanel} component="span">
                        <Typography className={classes.textLink}>Website.jpg</Typography>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withInfo(withRouter(withStyles(styles)(TicketDetail)));
