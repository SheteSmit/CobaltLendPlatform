import { makeStyles, Card, Typography, Box } from '@material-ui/core';
import React from 'react';
import StickyHelper from '../../components/StickyHelper'
import { theme } from '../../theme/theme';


const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: theme.typography.pxToRem(24),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    }
  },
  cards: {
    width: '100%',
    maxWidth: 500,
    minWidth: 300,
    margin: '1rem',
    padding: '1rem'
  },
  text: {
    // fontSize: theme.typography.pxToRem(26)
  },
  container: {

  },
  disclaimerText: {
    fontWeight: 700
  }
}))

export default function VotingStickyMenu() {
  const classes = useStyles()
  return (
    <StickyHelper>
       <Card className={classes.cards} elevation={2}>
          <Typography className={classes.header}>
            How to Vote.
          </Typography>
          {/* <Box className={classes.container}>
            <Typography className={classes.text}>
            Rewards are paid out at the end of the contract unless otherwise specified in CBLT based on the Amount of Ethereum staked, for how long. (See Table)
            </Typography>
            <Typography className={classes.text}>
            180 day & 365 day Stakers get a portion of their rewards up front. 180 day Stakers get 25% of their CBLT rewards up front and the remaining balance when the staking period is finished. 365 day Stakers get 50% of their CBLT rewards up front and the remaining balance when the staking period is finished.
            </Typography>
            <Typography className={classes.text}>
            A $3.00 fee is deducted from your staking balance and paid to the Cobalt Treasury for facilitating the process, this fee is aside from the Gas fees incurred for interacting with a smart contract that will be displaying inside the Stakers wallet at execution.
            </Typography>
            <Typography className={classes.text}>
            Your “Earned Rewards” are paid to your Virtual wallet and can be withdrawn to your external wallet when you have reached the minimum amount (See terms & conditions)
            </Typography>
            <Typography className={classes.disclaimerText}>
            Staking Disclaimer 
            </Typography>
            <Typography className={classes.disclaimerText}>
            Rewards will be paid out in the form of CBLT @ Current Market value at the time being paid to the Actual Staker
            </Typography>
          </Box> */}
        </Card>
        <Card className={classes.cards} elevation={2}>
          <Typography className={classes.header}>
            How to Claim your Intrest on a Closed Loan.
          </Typography>
          {/* <Box className={classes.container}>
            <Typography className={classes.text}>
            30 day to 365 day Staking is “LOCKED” which means the Ethereum you stake is inaccessible to you during the “Staking Period”. During this period, the Cobalt 
            Treasury will be using a portion and in some cases all the “staked Funds” for the Lending Platform.
            </Typography>
            <Typography className={classes.text}>
            Staking Contracts for 180 days to 5 years that have the option for early withdraw – Coming Soon!
            </Typography>
            <Typography className={classes.text}>
            Staking other assets besides Ethereum – Coming Soon!
            </Typography>
            <Typography className={classes.text}>
            Receiving rewards in other assets besides CBLT – Coming Soon!
            </Typography>
            <Typography className={classes.text}>
            At the conclusion of the “staking Contract” the WITHDRAW button inside My Portfolio will allow the Staker to remove his Original Staked Cryptocurrency or Re-Stake it.
            </Typography>
          </Box> */}
        </Card>
    </StickyHelper>
  )
}