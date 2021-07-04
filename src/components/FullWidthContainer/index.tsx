import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: theme.palette.common.white,
    height: '100%',

  },
  test: {
    width: '100%',
    maxWidth: 1220,
    padding: '40px 16px',
  }
}))


interface props {
  children: React.ReactNode
}

export default function FullWidthContainer({children}: props) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.test}>
        {children}
      </Box>
    </Box>
  )
}