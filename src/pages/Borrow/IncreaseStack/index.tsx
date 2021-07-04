import { Box, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import BorrowButton from '../BorrowButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import InfoStack from './InfoStack';
import FullWidthContainer from '../../../components/FullWidthContainer';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    // minWidth: 300,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    }
    // margin: 'auto',
    // maxWidth: 1280
  },
  infoContainer: {
    width: '100%',
    maxWidth: 550,
    // minWidth: 300,
    [theme.breakpoints.down('md')]: {
      paddingBottom: 50
      // display: 'flex',
      // flexDirection: 'row',
      // justifyContent:'flex-start'
    }
  },
  header: {
    fontSize: theme.typography.pxToRem(44),
    fontWeight: 'bold',
    lineHeight: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(26),
    }
  },
  listItem: {
    paddingLeft: 0,
    paddingTop: 0
  },
  listText: {
    marginLeft: -15
  },
  icon: {
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      minWidth: 30
    }
  }
}))

export default function IncreaseStack() {
  const history = useHistory()
  const classes = useStyles()
  return (
    <FullWidthContainer>
      <Box className={classes.root}>
        <Box className={classes.infoContainer}>
          <Typography className={classes.header}>
          Fund your Idea with the Cobalt Lend Community
          </Typography>
          <List>  
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <CheckCircleOutlineIcon className={classes.icon}/>
              </ListItemIcon>
              <ListItemText className={classes.listText} primary="With a Cobalt loan, you can borrow up to 5M upon approved credit risk rating" /> 
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <CheckCircleOutlineIcon className={classes.icon}/>
              </ListItemIcon>
              <ListItemText className={classes.listText} primary="And you can use your crypto loan to fund any approved proposal" /> 
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <CheckCircleOutlineIcon className={classes.icon}/>
              </ListItemIcon>
              <ListItemText className={classes.listText} primary="It’s a popular option for individuals, along with small businesses" /> 
            </ListItem>
          </List>
          <BorrowButton buttonText="Get Started" onClick={() => history.push('/registration-portal')}/>
        </Box>
        <InfoStack />
      </Box>
    </FullWidthContainer>
  )
}