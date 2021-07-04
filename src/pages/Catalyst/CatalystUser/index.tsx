import { Box, Container,List,Typography, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import HorizontalCard from '../../../components/HorizontalCard'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%', 
    height: '100%',
  },
  topArea: {
    background: theme.palette.common.white,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);'
  },
  accountContainer: {
    width: 300,
    height: 300,
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 2rem'
  },
  centerBoxContainer: {
    width: '100%',
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center'
  },
  servicesContainer: {
    // display: 'flex',
    // flexDirection: ''
  },

  profileIconContainer: {
    width: '100%',
    height: '100%',
    border: '2px solid #e2e2e2',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileIcon: {
    fontSize: 144
  },
  profileBioContainer: {
    marginTop: 8,
    width: '100%',
  },
  text: {

  },
  accountStatus: {

  },
  feedback: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem',
    border: '2px solid #000',
    maxWidth: 300
  },
  feedBackText:{
    fontWeight: 700
  },
  listItem: {
    paddingLeft: 0,
    paddingTop: 0
  },
  icon: {
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      minWidth: 30
    }
  },
  listText: {
    marginLeft: -15
  },
}))

export default function CatalystUser() {
  const classes = useStyles()
  return (
    <Container maxWidth="lg">
      <Box className={classes.root}>
        <Box className={classes.topArea}>
          <Box className={classes.accountContainer}>
            <Box className={classes.profileIconContainer}>
              <AccountBoxIcon className={classes.profileIcon}/>
            </Box>
            <Box className={classes.profileBioContainer}>
              <Typography className={classes.text}>User bio</Typography>
              <Typography className={classes.text}>User bio</Typography>
              <Typography className={classes.text}>User bio</Typography>
            </Box>
          </Box>
          <Box className={classes.centerBoxContainer}>
            <Box className={classes.accountStatus}>
              <List>
                <ListItem>
                  <ListItemIcon className={classes.listItem}>
                    <CheckCircleOutlineIcon className={classes.icon}/>
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary="Vendor is Verified" /> 
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.listItem}>
                    <CheckCircleOutlineIcon className={classes.icon}/>
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary="Holds NFT" /> 
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.listItem}>
                    <CheckCircleOutlineIcon className={classes.icon}/>
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary="To reflect comm. Feedback" /> 
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.listItem}>
                    <CheckCircleOutlineIcon className={classes.icon}/>
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary="CBLT Holder" /> 
                </ListItem>
              </List>
            </Box>
            <Box className={classes.feedback}>
              <Typography className={classes.feedBackText}>
                Rating / FeedBack
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.servicesContainer}>
          <HorizontalCard 
            position="Gtx 1070ti"
            location="San Diego, California"
            compensation="0.5 ETH"
          />
          <HorizontalCard 
            position="LV Purse"
            location="San Diego, California"
            compensation="1 ETH"
          />
          <HorizontalCard 
            position="Front-end Developer"
            location="San Diego, California"
            compensation="1 BTC Monthy"
            employmentType="Full Time"
            service
          />
          {/* <CatalystCard 
            position="Front-end Developer"
            location="San Diego, California"
            compensation="110k"
            employmentType="Full Time"
            service
          /> */}
        
        </Box>
      </Box>
    </Container>
  )
}