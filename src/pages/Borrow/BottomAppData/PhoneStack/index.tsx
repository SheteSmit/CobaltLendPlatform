import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import phone from '../../../../assets/phone.png'
import iphoneCMC from '../../../../assets/iphoneCMC.png'
import cobaltdark from '../../../../assets/cobaltdark.png'

const useStyles = makeStyles((theme) => ({
  root: {
    isolation: 'isolate',
    position: 'relative',
    left: -300,
    top: -50,
    [theme.breakpoints.down('md')]: {
      // left: 0,
      left: -120,
    }
  },
  phone: {
    top: 0,
    position: 'absolute',
    zIndex: 3,
  },
  img: {
    width: 800,
    height: 550
  },
  logoContainer: {
    top: 100,
    right: -350,
    position: 'relative',
    zIndex: 2,
  },
  logo: {
    width: 365,
    // height: 300
  }
}))

export default function PhoneStack() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.phone}>
        <img src={iphoneCMC} alt="phone" className={classes.img}/>
      </Box>
      <Box className={classes.logoContainer}>
        <img src={cobaltdark} alt="logo" className={classes.logo}/>
      </Box>
    </Box>
  )
}