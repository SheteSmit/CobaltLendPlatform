import { Box, makeStyles, TableCell, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root:{},
  textContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    fontWeight: 700
  },
  text:{
    fontSize: theme.typography.pxToRem(12),
    whiteSpace: 'nowrap'
  },
  headerBlue: {
    fontWeight: 700,
    color: theme.palette.secondary.light
  },
  textBlue:{
    fontSize: theme.typography.pxToRem(12),
    whiteSpace: 'nowrap',
    color: theme.palette.secondary.light
  },

}))

interface props {
  tier: string
  range: string
  staking?: boolean
}

export default function HeaderData({tier, range, staking}: props) {
  const classes = useStyles()
  return (
  <TableCell className={classes.root}>
    {staking && (
      <Box className={classes.textContainer}>
        <Typography className={`${classes.headerBlue}`}>
          {tier}
        </Typography>
        <Typography className={`${classes.textBlue}`}>
          {range}
        </Typography>
      </Box>
    )}
      {!staking && (
      <Box className={classes.textContainer}>
        <Typography className={classes.header}>
          {tier}
        </Typography>
        <Typography className={classes.text}>
          {range}
        </Typography>
      </Box>
    )}
  </TableCell>
  )
}