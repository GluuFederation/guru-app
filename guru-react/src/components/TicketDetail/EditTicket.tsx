import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { withInfo, WithInfoProps } from "../../state/hocs/info";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import RadioGroup from '@material-ui/core/RadioGroup';
import Modal from '@material-ui/core/Modal';
import { green } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const styles = (theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: '50%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 4),
            outline: 'none',
            left: '30%',
            top: '30%',
        },
        buttonEdit: {
            width: 3,
            height: 30,
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            color: '#ABABAB',
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
            float: 'right',
        },
        titleEditeForm: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
        },
        subjectEditeForm: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
            marginTop: 5,
            marginBottom: 5,
        },
        subjectTextField: {
            margin: 0,
            width: '100%'
        },
        discriptionEditeForm: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
            marginTop: 5,
            marginBottom: 5,
        },
        radioFont: {
            fontFamily: '"Lato", sans-serif',
            marginTop: 12,
            marginRight: 10,
        },
        radioTitle: {
            fontFamily: '"Lato", sans-serif',
            fontWeight: 500,
            fontSize: 16,
            marginTop: 7,
            marginLeft: 0,
            marginRight: 5,
        },
        editBtnSave: {
            padding: 10,
            color: '#ffffff',
            backgroundColor: '#00b372',
            fontFamily: '"Lato", sans-serif',
            marginRight: 5,
        },
        editBtnCancel: {
            padding: 10,
            color: '#CACFD2',
            backgroundColor: 'white',
            fontFamily: '"Lato", sans-serif',
            marginLeft: 5,
        },

    });

type Props = WithStyles<typeof styles> & RouteComponentProps & WithInfoProps;

interface State {
    open: boolean;
    value: string;
}


class TicketDetail extends Component<Props> {
    state = {
        open: false,
        value: 'public'
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    radiobtnChange = (event: React.ChangeEvent<unknown>) => {
        this.setState({ value: (event.target as HTMLInputElement).value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained" className={classes.buttonEdit} onClick={this.handleOpen}>
                    Edit
                </Button>
                <Modal open={this.state.open} onClose={this.handleClose}>
                    <div style={{ top: '0%', left: '25%' }} className={classes.paper}>
                        <form>
                            <h2 className={classes.titleEditeForm}>Edit ticket information</h2>
                            <p className={classes.subjectEditeForm}>Subject</p>
                            <TextField
                                className={classes.subjectTextField}
                                variant="outlined"
                            />
                            <p className={classes.discriptionEditeForm}>Discription</p>
                            <SimpleMDE
                                id="your-id"
                                // label="Your label"
                                // onChange={this.handleChange}
                                // value={this.state.textValue}
                                options={{
                                    autofocus: true,
                                    spellChecker: false
                                    // etc.
                                }}
                            />

                            <RadioGroup aria-label="position" name="position" value={this.state.value} onChange={this.radiobtnChange} row>
                                <label className={classes.radioTitle}>Visibility: </label>
                                <GreenRadio
                                    value="private"
                                />
                                <label className={classes.radioFont}>Private</label>


                                <GreenRadio
                                    value="public"
                                />
                                <label className={classes.radioFont}>Public</label>
                            </RadioGroup>
                            <Button variant="outlined" className={classes.editBtnSave}>
                                Save
                            </Button>
                            <Button onClick={this.handleClose} variant="outlined" className={classes.editBtnCancel}>
                                Cancel
                            </Button>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withInfo(withRouter(withStyles(styles)(TicketDetail)));
