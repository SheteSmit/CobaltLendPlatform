import { Box, Button, Grid, Typography } from '@material-ui/core';
import ProjectTabs from './ProjectTabs'
import React from 'react';
import Cards from '../Card';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {

  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    flexWrap: 'wrap',
  },
  bannerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    borderRadius: 8,

  },
  banner: {
    fontSize: theme.typography.pxToRem(44),
    fontWidth: 700,
    color: theme.palette.common.black,
    padding: '1rem',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(36),
    }
  },
  bannerSub: {
    fontSize: theme.typography.pxToRem(44),
    fontWidth: 700,
    color: theme.palette.common.black,
    padding: '1rem',
    textAlign: 'center',
    opacity: 0.3,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(36),
    }
  },
  paginationContainer: {
    padding: '1rem',
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: theme.palette.common.white,
    marginBottom: '1rem'
  }
}))

export default function Main() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.bannerContainer}>
        <Typography className={classes.banner} variant="h1">Cobalt Voting Platform</Typography>
        <Typography className={classes.bannerSub} variant="h1">Coming Soon!</Typography>
      </Box>
      <ProjectTabs />
      <Box className={classes.cardContainer}>
        {[0,1,2,3,4,5,6,7,8,9,10,11].map((item) => (
          <Cards />
        ))}
        <Box className={classes.paginationContainer}>
          <Pagination count={10} variant="outlined" color="primary"/>
        </Box>
      </Box>
    </Box>
  )
}