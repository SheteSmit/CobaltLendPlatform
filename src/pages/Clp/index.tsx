import React from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import Cobalt from '../../assets/cobalt.png'
import InfoBoxs from './InfoBoxs'
import ClpForm from './ClpForm'

const useStyles = makeStyles((theme) => ({
  root: {
   display: 'flex',
   flexDirection: 'column'

  },
  banner: {
    width: 'auto',
    height: 150,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: 8,
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  bannerText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(26)
    }
  },
  bannerSubText: {

  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))


export default function Clp() {
  const classes = useStyles()
  return (
    <Container maxWidth="lg">
      <Box className={classes.root}>
        <Box className={classes.banner}>
          <img src={Cobalt} alt="cobalt" className={classes.logo} />
          <Box className={classes.headingContainer}>
            <Typography variant="h1" className={classes.bannerText}>
              Cobalt Launch Page
            </Typography>
            <Typography variant="h3" className={classes.bannerSubText}>
            Coming Soon!
            </Typography>
          </Box>
          <img src={Cobalt} alt="cobalt" className={classes.logo} />
        </Box>
        <InfoBoxs /> 
        <ClpForm />
      </Box>
    </Container>
  )
}