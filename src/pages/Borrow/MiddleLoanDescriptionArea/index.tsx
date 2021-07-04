import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ActionCards from './ActionCards';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 90,
    paddingBottom: 150,
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.common.white
  },
  textContainer: {
    paddingBottom: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    fontSize: theme.typography.pxToRem(44),
    color: theme.palette.common.white,
    paddingBottom: 24,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(28),
    }
  },
  subHeader: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.common.white,
    maxWidth: 560,
    textAlign: 'center'
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
    
  }

}))

export default function MiddleLoanActionArea() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.textContainer}>
        <Typography variant="h2" className={classes.header}>
          Why get a Cobalt Loan?
        </Typography>
        <Typography variant="h5" className={classes.subHeader}>
        It’s fast, secure, and the fairest way to borrow MORE crypto using your own crypto as collateral. Cobalt helps you establish a system of “Credit” on the blockchain allowing you to access capital that traditional lending institutions can’t. Use the funds to reach ANY financial goal!
        </Typography>
      </Box>
      <Box className={classes.cardContainer}>
        <ActionCards 
          title="Receive Funds Within 7 Days" 
          subTitle="Cobalt bases your collateral & interest of our sophisticated DID’s" 
          text="With Artificial Intelligence building credit on the blockchain that is tracked by “Unique NFTs” is simple within the Cobalt Lend ecosystem."
          buttonText="Start Your Application"/>
        <ActionCards 
          title="Repayment" 
          subTitle="Already a customer?" 
          text="Check your loan status or make a payment here."
          buttonText="My Profile" />
      </Box>
    </Box>
  )
}