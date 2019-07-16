import React, { Component } from "react";
import { WithUserProps, withUser } from "../../state/hocs/profiles";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles} from "@material-ui/styles";
/// Container
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/// Nav bar Import
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
			flexGrow: 1
    },
    ContainerAlign: {
      marginBottom: 40,
      marginTop: -40,
      marginLeft: 0,
      marginRight: -40,
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
			marginTop: 40,
		},
		titleBar: {
			color: '#3E3E3E',
			fontFamily: 'arial',
			fontWeight: 600,
			fontSize: 24,
			textAlign: 'left',
			left: 0
		},
		gridContainer: {
			marginTop: 20,
      marginBottom: 20,
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
    buttonLock:{
      padding: 5,
      width: '5%',
			height: 30,
			marginLeft: 5,
			marginRight: 5,
      marginTop: 10,
      borderRadius: 3,
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
		bigAvatar: {
			width: 55,
			height: 55,
			textAlign: 'left'
		},
		btnStaffAlig: {
			textAlign: 'left'
		},
		btnStaff: {
      width: '50%',
      textAlign: 'center',
      height: 28,
      borderRadius: 4,
			fontFamily: 'arial',
			color: '#ffffff',
			backgroundColor: '#3BBC38',
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
			fontWeight: 600,
			marginTop: 5,
			height: 20,
      width: '50%',
			padding: 3,
			borderRadius: 5,
			backgroundColor: '#D0FDCF',
			color: '#3BBC38'
		},
		btnEnterprise: {
			fontSize: 10,
			fontFamily: 'arial',
			fontWeight: 600,
			marginTop: 5,
			height: 20,
      width: '50%',
			padding: 3,
			borderRadius: 5,
			backgroundColor: '#FFD499',
			color: '#FFA428'
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
			backgroundColor: '#EAF3F3',
			textAlign: 'left',
			fontFamily: 'arial',
			height: 40,
			fontSize: 12,
			fontWeight: 600
		},
		textVote: {
			fontSize: 14,
			fontFamily: 'arial',
			marginLeft: 5,
      fontWeight: 500,
      right: 0,
      color: '#858585',
    },
    iconVote: {
      color: '#858585',
      right: 0,
    },
		textVoteNo: {
			fontSize: 14,
			fontFamily: 'arial',
			marginLeft: 15,
			marginRight: 15,
			fontWeight: 500,
      right: 0,
      color: '#858585',
    },
    SettingsIconAlign: {
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
    card:{},
    GridThreeRight:{
    },
    createdBy: {
      fontSize: 14,
      fontFamily: 'arial',
      marginTop: 5,
      marginLeft: '20%',
    },
    createdGrid:{
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
      width: '75%',
    },
    editPancile: {
      float: 'right',
      marginTop: -20,
      marginRight: -5,
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
    formControl:{
      width: '100%',
      marginBottom: 20,
    },
    cardSubscribe: {
      width: '80%',
      marginLeft: '33%',
      backgroundColor: '#F6FEFE',
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
      backgroundColor: '#ECECEC',
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
      fontSize: 18,
      fontFamily: 'arial',
      fontWeight: 600,
      float: 'left',
      margin: 15, 
    }, 
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '98%',
    },
    fromTextField: {
      width: '47%',
      margin: 8,
      float: 'left',
    },
    fromtxtField: {
      fontSize: 14,
      fontFamily: 'arial',
      fontWeight: 600,
      float: 'left',
    },
    buttonComment:{
      backgroundColor: '#3EC512',
      float: 'left',
      padding: 5,
      color: '#ffffff',
      margin: 10,
    },
    buttonTicket:{
      backgroundColor: '#F0F0F0',
      float: 'left',
      padding: 5,
      color: '#717070',
      margin: 10,
    },

	})
);

type Props = WithUserProps & RouteComponentProps & WithStyles<typeof styles>;

class TciketDetail extends Component<Props>{
	render () {
        const { classes, user } = this.props;
        const isLoggedIn = user === null;
        return(
            <div className="TicketDetail">
			<Container className={classes.ContainerAlign} fixed>
				<Grid className={classes.contentContainer} container>
					<Grid item xs={12}>
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

          <Grid container xs={9}>
            {/* Top Content Start */}
            <Grid className={classes.gridContainer} xs={9}>
              <Typography className={classes.titleBar}>
                502 Gateway Error - Failed to load configuration from LDAP - Gluu Docker Multi-node #5234
              </Typography>
            </Grid>

            <Grid className={classes.gridContainer} xs={3}>
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
              
              <Grid wrap="nowrap" className={classes.gridContainer} xs={2}>
                <Avatar alt="Avatar" src={UserOne} className={classes.avatar} />
                <Typography className={classes.btnStaffAlig}>
                  <Typography className={classes.btnStaff}>
                    Staff
                  </Typography>
                </Typography>
                <Typography noWrap className={classes.userName}>User Name - AV</Typography>
                <Typography noWrap className={classes.userEmail}>email@example.com</Typography>

                <Typography className={classes.btnGluu}>Gluu</Typography>

                <Typography className={classes.btnEnterprise}>Enterprise</Typography>
              </Grid>

              {/* Content Panel Start */}
              <Grid className={classes.gridContainer} xs={10}>
                <Card className={classes.card}>

                  <CardActions className={classes.CardHeader} disableSpacing>
                    <Typography className={classes.textVoteNo}>18 Agust 2018 at 2:24 PM GMT </Typography>



                    <CardHeader
                        className={classes.SettingsIcon}
                        action={
                          <IconButton aria-label="Settings">
                            <MoreHoriIcon />
                          </IconButton>
                        }
                      />
                    
                    {/* <HowtoVote className={classes.iconVote} />
                    <Typography className={classes.textVote}>Upvotes | </Typography>
                    <Typography className={classes.textVoteNo}>12 </Typography>
                    
                    <Typography className={classes.SettingsIconAlign}>
                      <IconButton className={classes.SettingsIcon} aria-label="Settings">
                        <MoreVertIcon />
                      </IconButton>
                    </Typography> */}
                  </CardActions>

                  <CardContent>
                    <Typography className={classes.textPanel} component="p">
                      Hi Team
                    </Typography>
                    <Typography className={classes.textPanel} component="p">
                      Reference Link : <Typography className={classes.textLink}>https://github.com/mui-org</Typography>
                    </Typography>
                    <Typography className={classes.textPanel} component="p">
                      Invitation letters are generally written in order to notify and invite the guests for ant particular ceremony or event. For example suppose an art exhibition is going to be held and the invitation letter would serve the purpose of inviting the art lovers to the exhibition. The invitation letter is generally written by the host of the event because it is his/her responsibility to notify all the guests.
                      All the necessary details about the event must be mentioned in the invitation letter. In case of the art exhibition it is the responsibility of the art gallery to distribute the invitation letters to the guests.
                    </Typography>
                    
                    
                    <Typography className={classes.textPanel} component="p">
                      Paragraph File : <Typography className={classes.textLink}>Resource.txt</Typography>
                    </Typography>
                    
                    <Typography className={classes.textPanel} component="p">
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
                    
                    <Typography className={classes.textPanel} component="p">
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
              <Grid xs={12}>
                <Typography className={classes.titleBar}>3 Responses</Typography>
              </Grid>
            </Grid>


            {/* Content Body Start */}
              {/* Side bar Profile Start */}
              
              <Grid wrap="nowrap" className={classes.gridContainer} xs={2}>
                <Avatar alt="Avatar" src={UserTwo} className={classes.avatar} />
                <Typography className={classes.btnStaffAlig}>
                  <Typography className={classes.btnStaff}>
                    Staff
                  </Typography>
                </Typography>
                <Typography noWrap className={classes.userName}>User Name - DA</Typography>
                <Typography noWrap className={classes.userEmail}>email@example.com</Typography>

                <Typography className={classes.btnGluu}>Gluu</Typography>

                <Typography className={classes.btnEnterprise}>Enterprise</Typography>
              </Grid>

              {/* Content Panel Start */}
              <Grid className={classes.gridContainer} xs={10}>
                <Card className={classes.card}>

                  <CardActions className={classes.CardHeader} disableSpacing>
                    <Typography className={classes.textVoteNo}>18 Agust 2018 at 2:24 PM GMT </Typography>

                    {/* <Typography className={classes.textVote}>Edit </Typography>
                    <Typography className={classes.textVoteNo}>Copy link </Typography> */}

                      <CardHeader
                        className={classes.SettingsIcon}
                        action={
                          <IconButton aria-label="Settings">
                            <MoreHoriIcon />
                          </IconButton>
                        }
                      />


                    {/* <Typography className={classes.textVote}>Edit </Typography>
                    <Typography className={classes.textVoteNo}>Copy link </Typography>
                    
                    <Typography className={classes.SettingsIconAlign}>
                      <IconButton className={classes.SettingsIcon} aria-label="Settings">
                        <MoreVertIcon />
                      </IconButton>
                    </Typography> */}


                  </CardActions>

                  <CardContent>
                    <Typography className={classes.textPanel} component="p">
                      Hi Team
                    </Typography>
                    <Typography className={classes.textPanel} component="p">
                      Reference Link : <Typography className={classes.textLink}>https://github.com/mui-org</Typography>
                    </Typography>
                    <Typography className={classes.textPanel} component="p">
                      Invitation letters are generally written in order to notify and invite the guests for ant particular ceremony or event. For example suppose an art exhibition is going to be held and the invitation letter would serve the purpose of inviting the art lovers to the exhibition. The invitation letter is generally written by the host of the event because it is his/her responsibility to notify all the guests.
                      All the necessary details about the event must be mentioned in the invitation letter. In case of the art exhibition it is the responsibility of the art gallery to distribute the invitation letters to the guests.
                    </Typography>


                    <Typography className={classes.textPanel} component="p">
                      Reference Link : <Typography className={classes.textLink}>https://material-ui.com/components/cards/</Typography>
                    </Typography>
                    
                    <Typography className={classes.textPanel} component="p">
                      <Typography className={classes.textLink}>Website.jpg</Typography>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Content Panel End */}
            {/* Content Body End */}



            {/* Content Body Start */}

              {/* Content Panel Start */}
              <Grid className={classes.gridContainer} xs={12}>
                <Card className={classes.card}>

                  <CardContent>
                    <Typography className={classes.formTitle} component="p">
                      Post a response
                    </Typography>
                  </CardContent>

                  <CardContent>
                    <TextField
                      id="filled-multiline-static"
                      label="Write the answer"
                      multiline
                      rows="8"
                      className={classes.textField}
                      margin="normal"
                      variant="filled"
                    />
                  </CardContent>

                  <CardContent>
                    <TextField className={classes.fromTextField}
                      id="outlined-bare"
                      placeholder="Search name..."
                      margin="normal"
                      variant="outlined"
                    />
                      
                    <TextField className={classes.fromTextField}
                      id="outlined-bare"
                      placeholder="Search name..."
                      margin="normal"
                      variant="outlined"
                    />
                  </CardContent>   

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
          <Grid className={classes.GridThreeRight} container xs={3}> 
            
            <div >
              <Typography className={classes.createdBy}>Created by</Typography>
              <Typography className={classes.createdGrid}>
                <Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} />
                <TextField
                  placeholder="Name Enter"
                  className={classes.textFieldcreated}
                  margin="normal"
                  value="Nasir Uddin"
                />
                <EditIcon className={classes.editPancile}/>
              </Typography>

              
              <Typography className={classes.createdBy}>Assigned to</Typography>
              <Typography className={classes.createdGrid}>
                <Avatar alt="Avatar" src={UserOne} className={classes.avatarSmall} />
                <TextField
                  placeholder="Name Enter"
                  className={classes.textFieldcreated}
                  margin="normal"
                  value="christopher D.Blanton"
                />
                <EditIcon className={classes.editPancile}/>
              </Typography>
              <div>
              
              
              <Card className={classes.assignUpPeople}>
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
              </Card>

    
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
                      <Grid spacing={2} xs={2}><Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} /></Grid>
                      <Grid spacing={2} xs={2}><Avatar alt="Avatar" src={UserOne} className={classes.avatarSmall} /></Grid>
                      <Grid spacing={2} xs={2}><Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} /></Grid>
                      <Grid spacing={2} xs={2}><Avatar alt="Avatar" src={UserOne} className={classes.avatarSmall} /></Grid>
                      <Grid spacing={2} xs={2}><Avatar alt="Avatar" src={UserTwo} className={classes.avatarSmall} /></Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              
              </div>
            </div>
            
          </Grid>
          {/* SideBar Panel End */}

        </Grid>

			</Container>
		</div>
        );
    };
};

export default withRouter(withUser(withStyles(styles)(TciketDetail)));