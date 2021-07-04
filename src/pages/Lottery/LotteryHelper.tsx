import React from 'react';
import StickyHelper from '../../components/StickyHelper'
import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white
  },
  settings: {
    fontSize: '2rem',
    marginRight: -12,
    color: theme.palette.primary.dark
  },
  menuContainer: {
    // padding: '1rem',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);'

  },
  menuItems: {
    width: '100%',
    maxWidth: 500,
    minWidth: 300,
    minHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    // boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
    border: '2px solid #e2e2e2',
    // margin: '16px'
  },
  menuItemHeader: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700
  },
  text: {

  },
  disclaimer: {
    padding: '1rem',
    borderTop: '2px solid #e2e2e2',
    width: '100%',
    maxWidth: 500,
    minWidth: 300,
  }
}))



export default function LotteryHelper() {
  const classes = useStyles()
  return (
    <StickyHelper >
        <Box className={classes.menuContainer}>
          <Box className={classes.menuItems}>
            <Typography className={classes.menuItemHeader}>
              Rules and Regulations
            </Typography>
            <Box>
              <Typography className={classes.text}>
                Reules and Regulations
              </Typography>
              <Typography className={classes.text}>
              Each transaction has a standard flat fee of $3.00usd paid in ETH that will be deducted from the amount you send to Chromium to complete your trade.
              </Typography>
             
            </Box>
          </Box>
          <Box className={classes.menuItems}>
            <Typography className={classes.menuItemHeader}>
            Fees
            </Typography>
            <Box>
              <Typography className={classes.text}>
                Each transaction fee will .0003 of the amount of Ethereum being traded & will paid in ETH that will be deducted from the amount you send to Chromium to complete your trade.
              </Typography>
              <Typography className={classes.text}>
                NOTE: Gas fees (WEI) charged by the Ethereum Blockchain is separate from Chromium fee listed above and will be calculated in side your wallet
              </Typography>          
            </Box>
          </Box>
          <Box className={classes.disclaimer}>
            <Typography className={classes.menuItemHeader}>
              Transactions Details
            </Typography>
            <Box>
              <Typography className={classes.text}>
                The Chromium exchange is owned, operated and governed by the community. 
              </Typography>
              <Typography className={classes.text}>
                ALL funds inside Chromium can only come out one way, by being traded by the community.
              </Typography>          
            </Box>
          </Box>
        </Box>
    </StickyHelper>
  )
}