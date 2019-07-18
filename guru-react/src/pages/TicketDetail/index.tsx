import React, { Component } from "react";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles } from "@material-ui/styles";
/// Container
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/// Nav bar Import
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// Grids
import Grid from '@material-ui/core/Grid';

// Breadcrumbs
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

// Buttons
import Button from '@material-ui/core/Button';

// Button Icon & Avatar
import Avatar from '@material-ui/core/Avatar';
import Lock from '@material-ui/icons/Lock';
import HowtoVote from '@material-ui/icons/ThumbUpAlt';
import Ticket from '@material-ui/icons/ConfirmationNumber';
import Comment from '@material-ui/icons/Comment';

// Profile Image
import UserOne from '../../assets/images/user_one.png';
import UserTwo from '../../assets/images/user_two.jpg';
import imgUserSend from '../../assets/images/modular.png';
import CardMedia from '@material-ui/core/CardMedia';
import AddAdditional from '@material-ui/icons/AddCircleOutlineRounded';
// Card
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriIcon from '@material-ui/icons/MoreHoriz';
import { border } from '@material-ui/system';
import EditIcon from '@material-ui/icons/Edit';

import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const styles = ((theme: Theme) =>
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
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    textGreen: {
      color: '#7BC073',
      fontFamily: 'arial',
      fontWeight: 600,
      fontSize: 12
    },
    textGray: {
      color: '#B3B3B3',
      fontFamily: 'arial',
      fontWeight: 600,
      fontSize: 14
    },
    contentContainer: {
      marginTop: 10,
      marginBottom: 10,
    },
    titleBar: {
      color: '#3E3E3E',
      fontFamily: 'arial',
      fontWeight: 600,
      fontSize: 24,
      textAlign: 'left',
      left: 0
    },
    titleRespons: {
      color: '#3E3E3E',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: 24,
      textAlign: 'left',
      left: 0
    },
    gridContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    button: {
      width: 3,
      height: 30,
      fontFamily: 'arial',
      fontWeight: 600,
      color: '#ABABAB',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
    },
    buttonLock: {
      width: '5%',
      height: 30,
      fontFamily: 'arial',
      fontWeight: 600,
      color: '#ABABAB',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      borderRadius: 2,
      float: 'right',
    },
    buttonEdit: {
      width: 3,
      height: 30,
      fontFamily: 'arial',
      fontWeight: 600,
      color: '#ABABAB',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      float: 'right',
    },
    buttonTxt: {
      color: '#08AC20',
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      display: 'none'
    },
    avatar: {},
    avatarSmall: {
      width: 28,
      height: 28,
      textAlign: 'left',
    },
    avatarBig: {
      width: 55,
      height: 55,
      textAlign: 'left',
    },
    bigAvatar: {
      width: 60,
      height: 60,
      textAlign: 'left'
    },
    btnStaffAlig: {
      textAlign: 'left'
    },
    btnStaff: {
      width: '40%',
      textAlign: 'center',
      height: 28,
      borderRadius: 4,
      fontFamily: 'arial',
      fontSize: 13,
      color: '#ffffff',
      backgroundColor: '#00b372',
      padding: 3,
      marginRight: 5,
      marginTop: 10
    },
    userName: {
      fontSize: 12,
      fontFamily: 'arial',
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
      fontFamily: 'arial',
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
      fontFamily: 'arial',
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
    CardHeader: {
      backgroundColor: '#f1f5f9',
      textAlign: 'left',
      fontFamily: 'arial',
      height: 40,
      fontSize: 12,
      fontWeight: 600
    },
    textVoteDT: {
      fontSize: 14,
      fontFamily: 'arial',
      marginLeft: 5,
      fontWeight: 500,
      right: 0,
      color: '#858585',
    },
    voteContent: {
    },
    textVote: {
      fontSize: 14,
      fontFamily: 'arial',
      marginLeft: 5,
      fontWeight: 500,
      color: '#858585',
    },
    iconVote: {
      color: '#858585',
      marginBottom: -7,
    },
    textVoteNo: {
      fontSize: 14,
      fontFamily: 'arial',
      marginLeft: 10,
      marginRight: 10,
      fontWeight: 500,
      color: '#858585',
    },
    SettingsIconAlign: {
      color: '#858585',
      float: 'right',
      flex: 1,
      justifyContent: 'right',
      alignItems: 'right'
    },
    SettingsIcon: {
      color: '#858585',
      float: 'right',
      flex: 1,
      justifyContent: 'right',
      alignItems: 'right'
    },
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
    card: {},
    GridThreeRight: {
    },
    createdBy: {
      fontSize: 14,
      fontFamily: 'arial',
      marginBottom: 5,
      marginLeft: '21%',
      textAlign: 'left',
    },
    createdGrid: {
      fontSize: 14,
      fontFamily: 'arial',
      marginLeft: '20%',
      marginTop: 5,
    },
    textFieldcreated: {
      fontSize: 12,
      fontFamily: 'arial',
      marginTop: -30,
      marginLeft: 30,
      width: '100%',
    },
    editPancile: {
      float: 'right',
      textAlign: 'right',
      fontSize: 14,
    },
    editPancileLable: {
      float: 'right',
      textAlign: 'right',
      fontSize: 14,
    },
    assignUpPeople: {
      width: '125%',
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
      borderRadius: 5,
      boder: 2,
    },
    assignUpPeopleTxt: {
      fontSize: 16,
      fontWeight: 700,
      margin: 10,
    },
    searchTextField: {
      width: '100%',
    },
    formControl: {
      width: '100%',
      marginBottom: 20,
    },
    cardSubscribe: {
      width: '80%',
      marginLeft: '20%',
      backgroundColor: '#f7f9fa',
    },
    notificationTxt: {
      fontFamily: 'arial',
      fontWeight: 600,
      fontSize: 14,
      float: 'left',
    },
    btnSubscribe: {
      width: '100%',
      left: 0,
      fontSize: 14,
      backgroundColor: '#e7ebed',
      fontFamily: 'arial',
    },



    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
      marginTop: 12,
      textAlign: 'left',
      fontFamily: 'arial',
      fontSize: 12,
      fontWeight: 600,
    },
    formTitle: {
      fontSize: 16,
      fontFamily: 'arial',
      fontWeight: 500,
      float: 'left',
      margin: 0,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '98%',
    },
    fromTextField: {
      width: '90%',
      marginLeft: '5%',
      marginRight: '5%',
    },
    fromtxtField: {
      fontSize: 14,
      fontFamily: 'arial',
      fontWeight: 600,
      float: 'left',
    },
    buttonComment: {
      backgroundColor: '#00b372',
      float: 'left',
      textTransform: 'capitalize',
      color: '#ffffff',
      marginBottom: 20,
      marginRight: 10,
      fontFamily: 'arial',
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
      fontFamily: 'arial',
      fontSize: 12,
      fontWeight: 500,
    },
    fromLabel: {
      float: 'left',
      fontFamily: 'arial',
      fontSize: 14,
      marginLeft: 22,
      fontWeight: 600,
    },

    margin: {
      margin: theme.spacing(1),
    },

    preProduction: {
      color: '#ffffff',
      borderRadius: 3,
      padding: 5,
      fontSize: 12,
      backgroundColor: '#b736ff',
      float: 'left',
      marginBottom: 20,
    },
    statusLable: {
      color: '#ffffff',
      borderRadius: 3,
      padding: 5,
      fontSize: 12,
      backgroundColor: '#53c507',
      float: 'left',
      marginBottom: 20,
    },
    CategoryLable: {
      color: '#353b38',
      borderRadius: 3,
      padding: 5,
      fontSize: 15,
      fontWeight: 600,
      textAlign: 'left',
      marginBottom: 20,
      float: 'left',
    },
    additionalProducts: {
      color: '#00b372',
      fontSize: 12,
      fontWeight: 600,
      fontFamily: 'arial',
      marginBottom: 20,
      float: 'left',
      marginLeft: 4,
    },
    addAdditional: {
      float: 'left',
      fontSize: 14,
      fontWeight: 600,
      marginLeft: '23%',
      marginTop: 2,
      color: '#00b372',
    },
    createdName: {
      marginTop: '-10%',
      marginLeft: '16%',
      float: 'left',
      marginBottom: 20,
    },
    assignedName: {
      marginTop: '-10%',
      marginLeft: '16%',
      float: 'left',
      marginBottom: 20,
    },
    typography: {
      padding: theme.spacing(2),
    },



  })
);

type Props = WithUserProps & RouteComponentProps & WithStyles<typeof styles>;

class TciketDetail extends Component<Props>{
  render() {
    const { classes, user } = this.props;
    const isLoggedIn = user === null;
    return (

      <div style={{backgroundColor: 'white'}} className="TicketDetail">
        <Navbar />
        <Container className={classes.ContainerAlign} fixed>
          <Grid className={classes.contentContainer} container>
            <Grid item={true} md={12} xs={12} sm={12}>
              <Breadcrumbs aria-label="Breadcrumb">
                <Link className={classes.textGray} href="">
                  Dashboard
							</Link>
                <Link className={classes.textGreen} href="">
                  Tickets
							</Link>
                <Typography className={classes.textGray}>#5234</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>


          <Grid container spacing={3}>

            <Grid container  item={true} md={9} xs={12} sm={12}>
              {/* Top Content Start */}
              <Grid className={classes.gridContainer} item={true} md={9} xs={12} sm={12}>
                <Typography className={classes.titleBar}>
                  502 Gateway Error - Failed to load configuration from LDAP - Gluu Docker Multi-node #5234
              </Typography>
              </Grid>

              <Grid className={classes.gridContainer} item={true} md={3} xs={12} sm={12}>
                <Button variant="contained" className={classes.buttonEdit}>
                  Edit
              </Button>




                <Button variant="outlined" className={classes.buttonLock}>
                  <Lock className={classes.buttonTxt} />
                </Button>

              </Grid>
              {/* Top Content End */}





              {/* Content Body Start */}
              {/* Side bar Profile Start */}

              <Grid className={classes.gridContainer} item={true} md={2} xs={12} sm={12}>
                <Avatar alt="Avatar" src={UserOne} className={classes.avatarBig} />
                <Typography className={classes.btnStaffAlig}>
                  <span className={classes.btnStaff}>
                    Staff
                  </span>
                </Typography>
                <Typography noWrap className={classes.userName}>User Name - AV</Typography>
                <Typography noWrap className={classes.userEmail}>email@example.com</Typography>

                <Typography className={classes.btnGluu}>Gluu</Typography>

                <Typography className={classes.btnEnterprise}>Enterprise</Typography>
              </Grid>

              {/* Content Panel Start */}
              <Grid className={classes.gridContainer} item={true} md={10} xs={12} sm={12}>
                <Card className={classes.card}>

                  <CardActions className={classes.CardHeader} disableSpacing>
                    <Grid style={{ float: 'left' }} item={true} md={8} xs={8} sm={8}><Typography className={classes.textVoteDT}>18 Agust 2018 at 2:24 PM GMT </Typography></Grid>


                    <Grid style={{ float: 'left', marginTop: 9,}} item={true} md={4} xs={4} sm={4}>
                      <HowtoVote className={classes.iconVote} />
                      <span className={classes.textVote}>Upvotes | </span>
                      <span className={classes.textVoteNo}>12 </span>
                      <IconButton style={{float: 'right', marginTop: -15,}} className={classes.SettingsIcon} aria-label="Settings">
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
                      Paragraph File : <Typography className={classes.textLink}>Resource.txt</Typography>
                    </Typography>
                    <Typography className={classes.textPanel} component="span">
                      Website File : <Typography className={classes.textLink}>Logo.pdf</Typography>
                    </Typography>
                    <Typography className={classes.textPanel} component="p">
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={imgUserSend}
                        title="Contemplative Reptile"
                      />
                    </Typography>

                    <Typography className={classes.textPanel} component="span">
                      <Typography className={classes.textLink}>Website.jpg</Typography>
                    </Typography>
                  </CardContent>
                </Card>

                {/* History Users Coments Start */}
                <Grid className={classes.gridHistory}>
                  <Avatar className={classes.iconBg}><Ticket className={classes.Ticket} /></Avatar>
                  <Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                  <Typography className={classes.textUser}>William Assigned Robi 2 hours ago</Typography>
                </Grid>
                {/* History Users Coments End */}

                {/* History Users Coments Start */}
                <Grid className={classes.gridHistory}>
                  <Avatar className={classes.iconBg}><Comment className={classes.Ticket} /></Avatar>
                  <Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                  <Typography className={classes.textUser}>William Added a Comment 9 hours ago</Typography>
                </Grid>
                {/* History Users Coments End */}

                {/* History Users Coments Start */}
                <Grid className={classes.gridHistory}>
                  <Avatar className={classes.iconBg}><Ticket className={classes.Ticket} /></Avatar>
                  <Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                  <Typography className={classes.textUser}>William Assigned Robi 5 hours ago</Typography>
                </Grid>
                {/* History Users Coments End */}

              </Grid>

              {/* Content Panel End */}
              {/* Content Body End */}



              <Grid className={classes.contentContainer} container>
                <Grid item={true} md={12} xs={12} sm={12}>
                  <Typography className={classes.titleRespons}>3 Responses</Typography>
                </Grid>
              </Grid>

              <Grid className={classes.contentContainer} container>
                <Grid item={true} md={12} xs={12} sm={12}>
                  <hr style={{ color: "#F1F1F1", backgroundColor: "#F1F1F1", height: 1, marginTop: -10, }} />
                </Grid>
              </Grid>

              {/* Content Body Start */}
              {/* Side bar Profile Start */}

              <Grid className={classes.gridContainer} item={true} md={2} xs={12} sm={12}>
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
              </Grid>

              {/* Content Panel Start */}
              <Grid className={classes.gridContainer} item={true} md={10} xs={12} sm={12}>
                <Card className={classes.card}>

                  <CardActions className={classes.CardHeader} disableSpacing>
                    <Grid style={{ float: 'left' }} item={true} md={8} xs={8} sm={8}><Typography className={classes.textVoteDT}>18 Agust 2018 at 2:24 PM GMT </Typography></Grid>


                    <Grid style={{ float: 'left', marginTop: 9, }} item={true} md={4} xs={4} sm={4}>
                      <span className={classes.textVote}>Edit </span>
                      <span className={classes.textVoteNo}>Copy link </span>
                      <IconButton style={{float: 'right', marginTop: -15,}} className={classes.SettingsIcon} aria-label="Settings">
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
              </Grid>

              {/* Content Panel End */}
              {/* Content Body End */}



              {/* Content Body Start */}

              {/* Content Panel Start */}
              <Grid className={classes.gridContainer} item={true} md={12} xs={12} sm={12}>
                <Card className={classes.card}>

                  <CardContent>
                    <Typography className={classes.formTitle} component="p">
                      Post a response
                    </Typography>
                  </CardContent>

                  <CardContent>
                    <SimpleMDE
                      id="your-custom-id"
                      // label="Your label"
                      // onChange={this.handleChange}
                      // value={this.state.textValue}
                      options={{
                        autofocus: true,
                        spellChecker: false
                        // etc.
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
              </Grid>

              {/* Content Panel End */}
              {/* Content Body End */}




            </Grid>



            {/* SideBar Panel Start */}
            <Grid className={classes.GridThreeRight} container item={true} md={3} xs={12} sm={12}>

              <div >

                <div style={{ float: 'left', width: '100%' }}>
                  <Typography className={classes.createdBy}>Created by</Typography>
                  <Typography className={classes.createdGrid} component="div">
                    <Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                    <label className={classes.createdName}>William Lowe</label>
                    <IconButton style={{ float: 'right', marginTop: -30, }}><EditIcon className={classes.editPancile} /></IconButton>
                  </Typography>
                </div>

                <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

                <div style={{ float: 'left', width: '100%' }}>
                  <Typography className={classes.createdBy}>Assigned to</Typography>
                  <Typography className={classes.createdGrid} component="div">
                    <Avatar alt="Avatar" src={UserOne} className={classes.avatarSmall} />
                    <label className={classes.assignedName}>Nasir Uddin</label>
                    <IconButton style={{ float: 'right', marginTop: -30, }}><EditIcon className={classes.editPancile} /></IconButton>
                  </Typography>
                </div>

                <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

                <div style={{ float: 'left', width: '100%' }}>
                  <Typography className={classes.createdBy}>Issue type</Typography>
                  <Typography className={classes.createdGrid}>
                    <label className={classes.preProduction}>Pre-Production</label>
                    <IconButton style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
                  </Typography>
                </div>

                <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

                <div style={{ float: 'left', width: '100%' }}>
                  <Typography className={classes.createdBy}>Status</Typography>
                  <Typography className={classes.createdGrid}>
                    <label className={classes.statusLable}>in-Pogress</label>
                    <IconButton style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
                  </Typography>
                </div>

                <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

                <div style={{ float: 'left', width: '100%' }}>
                  <Typography className={classes.createdBy}>Category</Typography>
                  <Typography className={classes.createdGrid}>
                    <label className={classes.CategoryLable}>Installation</label>
                    <IconButton style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
                  </Typography>
                </div>

                <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

                <div style={{ float: 'left', width: '100%' }}>
                  <Typography className={classes.createdBy}>Gluu Version</Typography>
                  <Typography className={classes.createdGrid}>
                    <label className={classes.CategoryLable}>Gluu 3.1.4</label>
                    <IconButton style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
                  </Typography>
                </div>

                <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

                <div style={{ float: 'left', width: '100%' }}>
                  <Typography className={classes.createdBy}>OS Version</Typography>
                  <Typography className={classes.createdGrid}>
                    <label className={classes.CategoryLable}>CentOS 7</label>
                    <IconButton style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
                  </Typography>
                </div>

                <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />

                <div style={{ float: 'left', width: '100%' }}>
                  <Typography className={classes.createdBy}>Additional Products</Typography>
                  <Typography className={classes.createdGrid}>
                    <label className={classes.CategoryLable}>OXD 3.1.4</label>
                    <IconButton style={{ float: 'right' }}><EditIcon className={classes.editPancileLable} /></IconButton>
                  </Typography>
                </div>



                <hr style={{ backgroundColor: '#F1F1F1', height: 0.2, width: '80%', marginLeft: '20%' }} />
                <a href="/">
                  <div style={{ float: 'left', width: '100%' }}>
                    <AddAdditional className={classes.addAdditional} />
                    <Typography className={classes.additionalProducts}>Add Additional Products</Typography>
                  </div>
                </a>


                {/* <Typography className={classes.createdBy}>Assigned to</Typography>
              <Typography className={classes.createdGrid}>
                <Avatar alt="Avatar" src={UserOne} className={classes.avatarSmall} />
                <TextField
                  placeholder="Name Enter"
                  className={classes.textFieldcreated}
                  margin="normal"
                  value="christopher D.Blanton"
                />
                <EditIcon className={classes.editPancile}/>
              </Typography> */}

                <div>


                  {/* <Card className={classes.assignUpPeople}>
                <Container>
                  <Typography className={classes.assignUpPeopleTxt}>
                    Assign up to 5 people this issues
                  </Typography>
                  <TextField className={classes.searchTextField}
                    id="outlined-bare"
                    placeholder="Search name..."
                    margin="normal"
                    variant="outlined"
                  />
              
                  <FormControl className={classes.formControl}>
                    <Select
                      multiple
                      native
                      inputProps={{
                        id: 'select-multiple-native',
                      }}
                    >
                    </Select>
                  </FormControl>
                </Container>
              </Card> */}


                  <Card className={classes.cardSubscribe}>
                    <CardContent>
                      <Typography className={classes.notificationTxt}>Notification</Typography>
                      <Button className={classes.btnSubscribe}>
                        Subscribe
                  </Button>
                      <Typography className={classes.pos} color="textSecondary">
                        You are receiving this Notification because You're watching this Ticket
                  </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        5 subscriber's
                  </Typography>
                      <Grid container>
                        <Grid item={true} sm={2}><Avatar style={{margin:10}} alt="Avatar" src={UserTwo} className={classes.avatarSmall} /></Grid>
                        <Grid item={true} sm={2}><Avatar style={{margin:10}} alt="Avatar" src={UserOne} className={classes.avatarSmall} /></Grid>
                        <Grid item={true} sm={2}><Avatar style={{margin:10}} alt="Avatar" src={UserTwo} className={classes.avatarSmall} /></Grid>
                        <Grid item={true} sm={2}><Avatar style={{margin:10}} alt="Avatar" src={UserOne} className={classes.avatarSmall} /></Grid>
                        <Grid item={true} sm={2}><Avatar style={{margin:10}} alt="Avatar" src={UserTwo} className={classes.avatarSmall} /></Grid>
                      </Grid>
                    </CardContent>
                  </Card>


                </div>
              </div>

            </Grid>
            {/* SideBar Panel End */}

          </Grid>

        </Container>
        <Footer></Footer>
      </div>
    );
  };
};

export default withRouter(withUser(withStyles(styles)(TciketDetail)));
