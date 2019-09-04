import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import UserOne from '../../assets/images/user_one.png';
import Modal from '@material-ui/core/Modal';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addNewUser: {
            color: '#00b372',
            fontFamily: '"Lato", sans-serif',
            fontWeight: 600,
            fontSize: 12,
            marginLeft: 0,
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
            top: '15%',
        },
        btnSuccess: {
            padding: 10,
            width: '30%',
            marginTop: 20,
            color: '#ffffff',
            backgroundColor: '#00b372',
            fontFamily: '"Lato", sans-serif',
            textTransform:'capitalize',
            '&:hover': {
                backgroundColor:'#ffffff',
                color: '#00b372',
            },
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontFamily: '"Lato", sans-serif',
            marginTop: 5,
        },
        MenuListName: {
            fontFamily: '"Lato", sans-serif',
            '&:hover': {
                color: '#00b372',
            },
        },
        avatarXsmall: {
            width: 31,
            height: 31,
            float: 'left',
            marginTop: 5,
            marginLeft: 5,
        },
    }),
);

export default function AddUserPopover() {
    const classes = useStyles();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    const [openInviteNewPartn, setOpenInviteNewPartn] = React.useState(false);
    const handleOpenInviteNewPartn = () => {
        setOpenInviteNewPartn(true);
    };

    const handleCloseInviteNewPartn = () => {
        setOpenInviteNewPartn(false);
    };
    const [personName, setPersonName] = React.useState<string[]>([]);

    function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
        setPersonName(event.target.value as string[]);
    };
    return (
        <div>
            <a href="#" onClick={handleOpenInviteNewPartn} className={classes.addNewUser}>Add New User</a>

            <Modal open={openInviteNewPartn} onClose={handleCloseInviteNewPartn}>
                <Box style={{ width: '28%' }} className={classes.paperModel}>
                    <form>
                        <Box>
                            <Typography variant="subtitle1" align="left" color="textPrimary">Add new user</Typography>
                            <Typography variant="caption" align="left" color="textSecondary">Assign resources that are available to help manage this customer's Gluu support account.</Typography>
                            <Typography variant="caption" align="left" color="textPrimary" display="block">Customer : <span style={{ color: '#00b372' }}>Team Orizon</span></Typography>
                            <Select
                                style={{ width: '100%', marginTop: 15 }}
                                multiple
                                variant="outlined"
                                value={personName}
                                onChange={handleChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <Box className={classes.chips}>
                                        {(selected as string[]).map(value => (
                                            <span style={{ backgroundColor: '#00b372', borderRadius: 20, margin: 2, }}>
                                                <Avatar alt="Avatar" src={UserOne} className={classes.avatarXsmall} />
                                                <Chip label={value} className={classes.chip} />
                                            </span>
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {names.map(name => (
                                    <MenuItem key={name} value={name}>
                                        <Avatar style={{ marginRight: 15, marginBottom: 4 }} alt="Avatar" src={UserOne} className={classes.avatarXsmall} />
                                        <span className={classes.MenuListName}>{name}</span>
                                    </MenuItem>
                                ))}
                            </Select>
                            <Box mt={2}>
                                <Button variant="contained" className={classes.btnSuccess} size="medium" color="primary">
                                    Assign
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}
