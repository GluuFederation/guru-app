import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SimpleMDE from "react-simplemde-editor";

const styles = (theme: Theme) =>
    createStyles({
        card: {},
        formTitle: {
            fontSize: 16,
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
            float: 'left',
            margin: 0,
        },
        fromLabel: {
            float: 'left',
            fontFamily: '"Lato", sans-serif',
            fontSize: 14,
            marginLeft: 22,
            fontWeight: 500,
        },
        fromTextField: {
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
        },
        buttonComment: {
            backgroundColor: '#00b372',
            float: 'left',
            textTransform: 'capitalize',
            color: '#ffffff',
            marginBottom: 20,
            marginRight: 10,
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            fontWeight: 500,
        },
        buttonTicket: {
            backgroundColor: '#F0F0F0',
            float: 'left',
            textTransform: 'capitalize',
            padding: 5,
            color: '#747474',
            marginBottom: 20,
            marginRight: 10,
            fontFamily: '"Lato", sans-serif',
            fontSize: 12,
            fontWeight: 500,
        },

    });

type Props = WithStyles<typeof styles> & RouteComponentProps & WithInfoProps;


class TicketDetail extends Component<Props> {


    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>

                <CardContent>
                    <Typography className={classes.formTitle} component="p">
                        Post a response
                    </Typography>
                </CardContent>

                <CardContent>
                    <SimpleMDE
                        id="your-custom-id"
                        // style= {yourCustom}
                        // label="Your label"
                        // onChange={this.handleChange}
                        // value={this.state.textValue}
                        // yourCustom = {{height: 140}}

                        options={{
                            autofocus: true,
                            spellChecker: false,
                        }}
                    />
                </CardContent>



                <Grid container spacing={3}>
                    <Grid item={true} md={6} xs={12} sm={12}>
                        <label className={classes.fromLabel}>Assign To</label>
                        <FormControl className={classes.fromTextField}
                            placeholder="Search name..."
                            margin="normal"
                            variant="outlined">
                            <Select
                                value={10}
                            // onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>


                    </Grid>
                    <Grid item={true} md={6} xs={12} sm={12}>
                        <label className={classes.fromLabel}>Ticket Status</label>
                        <FormControl className={classes.fromTextField}
                            placeholder="Search name..."
                            margin="normal"
                            variant="outlined">
                            <Select
                                value={20}
                            // onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <CardContent>
                    <Button variant="contained" className={classes.buttonComment}>
                        Comment
                  </Button>
                    <Button variant="contained" className={classes.buttonTicket}>
                        Close Ticket
                  </Button>
                </CardContent>

            </Card>

        );
    }
}

export default withInfo(withRouter(withStyles(styles)(TicketDetail)));
