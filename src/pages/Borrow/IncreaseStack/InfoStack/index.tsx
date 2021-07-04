import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import cobaltDark from '../../../../assets/cobaltdark.png'
import DataCard from './DataCard'
import BackCard from './BackCard'

const useStyles = makeStyles((theme) => ({
  root: {
    // isolation: 'isolate',
    position: 'relative',
    left: -100,
    [theme.breakpoints.down('md')]: {
      left: 0,
      // padding: 40
    }
  },
  topContainer: {
    top: 0,
    position: 'absolute',
    zIndex: 3,
    background: 'linear-gradient(90deg, rgba(1,4,64,1) 0%, rgba(0,0,128,1) 46%, rgba(0,1,228,1) 100%)',
    padding: '2rem 0',
    borderRadius: 8,
    width: '100%',
    maxWidth: 250,
    height: 350,
  
  },
  dataContainer: {
    borderTop: `1px solid hsla(240, 100%, 25%, 0.5)`,
    borderBottom: `1px solid hsla(240, 100%, 25%, 0.5)`,
    padding: '3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  }, 
  middleContainer: {
    top: -10,
    right: -80,
    position: 'relative',
    zIndex: 2,
  },
  img: {
    width: 365
  },
  bottomContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 100,
    left: -100,
    opacity: 0.1
  }
}))

export default function InfoStack() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.topContainer}>
        <Box className={classes.dataContainer}>
          <DataCard header="Easy to secure capital" subHeader="Community votes to fund in a week"/>
          <DataCard header="Community benefits from interest" subHeader="Community becomes “Investors”"/>
          <DataCard header="Cobalt CBLT is used as “Collateral”" subHeader="Loans starting at 2% APR"/>
        </Box>
      </Box>
      <Box className={classes.middleContainer}>
        <img src={cobaltDark} alt="cobalt" className={classes.img}/>
      </Box>
      <Box className={classes.bottomContainer}>
       <BackCard />
      </Box>
    </Box>
  )
}