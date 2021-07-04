import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '1rem',
    maxWidth: 500,
    minWidth: 250,
    padding: '2rem 1rem',
    borderRadius: 25,
    background: 'radial-gradient(circle, rgba(1,4,64,0.2497373949579832) 0%, rgba(0,1,228,0.9780287114845938) 100%)',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);'
  },
  text: {
    color: '#fff',
    fontSize: '1.5rem'
  },
  header: {
    fontSize: '1.5rem', 
    color: '#fff', 
    textDecoration: 'upper-case'
  },
  iconContainer: {
    display: 'flex', 
    justifyContent: 'flex-end',
    width: '100%',
  },
  dataContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))

export default function MainCard() {
  const classes = useStyles()
  return (
    <Box className={`${classes.root} card`}>
      <Box className={classes.dataContainer}>
        <Typography variant="h3" className={classes.header}>
          Treasury Balance
        </Typography>
        <Typography className={classes.text}>
        $70M
        </Typography>
      </Box>
      <Box className={classes.dataContainer}>
        <Typography variant="h3" className={classes.header}>
          Chromium Balance
        </Typography>
        <Typography  className={classes.text}>
          $10M
        </Typography>
      </Box>
      <Box className={classes.dataContainer}>
        <Typography variant="h3" className={classes.header}>
          CBLT PRICE
        </Typography>
        <Typography  className={classes.text}>
          $0.10
        </Typography>
      </Box>
      {/* <Box className={classes.iconContainer}>
        <IconButton>
          <ArrowForwardIcon />
        </IconButton>
      </Box> */}
    </Box>
  )
}