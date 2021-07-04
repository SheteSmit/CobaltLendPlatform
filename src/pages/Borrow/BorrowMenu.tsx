import React from 'react';
import {Typography, List, ListItem, ListItemIcon, makeStyles, ListItemText, Card} from '@material-ui/core'
import StickyHelper from '../../components/StickyHelper'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: theme.typography.pxToRem(24)
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
  logo: {
    width: 80,
    height: 80
  },
  cards: {
    // width: 500,
    // minWidth: 300,
    // height: 500,
    margin: '1rem',
    padding: '1rem'
  }, 
}))

export default function BorrowMenu() {
  const classes = useStyles()
  return (
  
      <StickyHelper>
          <Card className={classes.cards} elevation={2}>
          <Typography className={classes.header}>
            Interest Rate
          </Typography>
          <List>  
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <CheckCircleOutlineIcon className={classes.icon}/>
            </ListItemIcon>
            <ListItemText className={classes.listText} primary="With a Cobalt loan, you can borrow up to 5M at a MAX % Rate of 20%" /> 
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <CheckCircleOutlineIcon className={classes.icon}/>
            </ListItemIcon>
            <ListItemText className={classes.listText} primary="More Data & Information COMING SOON!" /> 
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <CheckCircleOutlineIcon className={classes.icon}/>
            </ListItemIcon>
            <ListItemText className={classes.listText} primary="More Data & Information COMING SOON!" /> 
          </ListItem>
        </List>
        </Card>
        <Card className={classes.cards} elevation={2}>
          <Typography className={classes.header}>
            Collateral
          </Typography>
          <List>  
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <CheckCircleOutlineIcon className={classes.icon}/>
            </ListItemIcon>
            <ListItemText className={classes.listText} primary="More Data & Information COMING SOON!" /> 
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <CheckCircleOutlineIcon className={classes.icon}/>
            </ListItemIcon>
            <ListItemText className={classes.listText} primary="More Data & Information COMING SOON!" /> 
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <CheckCircleOutlineIcon className={classes.icon}/>
            </ListItemIcon>
            <ListItemText className={classes.listText} primary="More Data & Information COMING SOON!" /> 
          </ListItem>
        </List>
        </Card>
      </StickyHelper>
  
  )
}