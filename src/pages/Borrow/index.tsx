import { Box, makeStyles, Container, Typography, Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import BorrowButton from './BorrowButton'
import BorrowFields from './RateCalculation/BorrowFields'
import CommonButton from '../../components/Buttons/CommonButton'

import RateCalculation from './RateCalculation'
import MiddleLoanActionArea from './MiddleLoanDescriptionArea';
import IncreaseStack from './IncreaseStack'
import AccordionSection from './AccordionSection'
import BottomAppData from './BottomAppData';
import StickyHelper from '../../components/StickyHelper';
import useWindowSize from '../../hooks/useWindowSize';
import { useHistory } from 'react-router-dom';
import BorrowMenu from './BorrowMenu';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    isolation: 'isolate',
    width: '100%',
    maxWidth: 1280,
    minWidth: 300
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  bannerContainer: {
    marginBottom: 40,
    padding: '1rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: theme.palette.common.white
  },
  banner: {
    fontSize: theme.typography.pxToRem(32),
    fontWeight: 700,
    color: theme.palette.common.black,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(24),
      textAlign: 'center'
    }
  },
  header: {
    fontSize: theme.typography.pxToRem(44),
    fontWeight: 700,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(28),
    }
  },
  subHeader: {
    fontSize: theme.typography.pxToRem(18),
    padding: '1rem 0'
  },
  borrowContainer: {
    backgroundColor: theme.palette.common.white,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '1rem',
    borderRadius: 8
  },
  test: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
 
}))

export default function Borrow() {
  const { width } = useWindowSize()
  const classes = useStyles()

  const history = useHistory()
  return (
    <Box className={classes.test}>
    <Container maxWidth="lg">
      <Box className={classes.root}>    
      <Box className={classes.bannerContainer}>
        <Typography variant="h1" className={classes.banner}>
          Titanium Lending Protocol
        </Typography>
        <Typography variant="h1" className={classes.banner}>
          The 1st Community Governed Lending Platform
        </Typography>
        <Typography variant="h1" className={classes.banner}>
          Coming Soon!
        </Typography>
      </Box>    
        <Grid container className={classes.topContainer} spacing={width > 950 ? 4 : 0}>
          <Grid item md={4} >
            <Box className={classes.borrowContainer}>
              <Typography variant="h2" className={classes.header}>
              Borrow Crypto at rates as low as 2 % APR
              </Typography>
              <Typography variant="h2" className={classes.subHeader}>
              The 1st TRULY Fair Credit / Lending ecosystem on the “Blockchain”
              Register for the Lending Platform and submit your loan proposal to your community for vote, if approved you can have your funds in as little as 7 days.
              </Typography>
              <CommonButton label="Register and Collateral NFT" fn={() => history.push('/registration-portal')}/>
            </Box>
          </Grid>
          <Grid item md={8}>
            <RateCalculation />
          </Grid>
        </Grid>
        <MiddleLoanActionArea />
        </Box>
      </Container>
      <IncreaseStack />
      <Container maxWidth="lg">
        <AccordionSection />
      </Container>
      <BottomAppData />
      <BorrowMenu />
    </Box>
  )
}