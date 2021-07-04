import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.common.white
  },
  subHeader: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  apy: {
    position: 'relative',
    top: -5,
    right: -5,
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.common.white,
 
  }
}))

interface props {
  header: string
  subHeader: string
}

export default function DataCard({header, subHeader}: props) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography className={classes.header}>
        {header}
      </Typography>
      <Typography className={classes.subHeader}>
        {subHeader}
        <span className={classes.apy}>APY*</span>
      </Typography>
    </Box>
  )
}