import { Box, Card, IconButton, makeStyles, Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import user from '../../assets/user.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  button: {
    // height: '100%',
    // width: '100%',
    padding: '100%',
    // opacity: 0.4
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center'
  },
  icon: {
    width: 100,
    height: 100,
    // marginLeft: -20
  },
  text: {
    position: 'absolute',
    bottom: '10%',
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 'bold',
    opacity: 0.8
  }
}))

export default function TakePhoto() {
  const classes = useStyles()
  return (
    <Card className={classes.root} elevation={2}>
      <IconButton className={classes.button}>
        <img src={user} className={classes.icon}/>
      </IconButton>
      <Typography className={classes.text}>
        Take a video selfie 
      </Typography>
    </Card>
  )
}