import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem'
  },
  balance: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 'bold'
  },
  header: {
    fontSize: theme.typography.pxToRem(14),
  },
  btcAmmount: {
    fontSize: theme.typography.pxToRem(14),
  },
  bottomText: {
    fontSize: theme.typography.pxToRem(14),
  }

}))

export default function BackCard() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography className={classes.header}>
      Cobalt is the future
      </Typography>
      <Typography className={classes.balance}>
        $25,007
      </Typography>
      <Typography className={classes.btcAmmount}>
        = 0.5412312
      </Typography>
      <Typography className={classes.bottomText}>
        LTV
      </Typography>



    </Box>
  )
}