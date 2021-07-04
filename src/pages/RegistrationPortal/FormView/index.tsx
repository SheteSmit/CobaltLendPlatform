import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import ProgressBar from './ProgressBar'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 8,
    marginTop: 40,
    padding: '2rem',
  },
  left: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'flex-start'
  }
}))

interface props {
  children: React.ReactNode
}

export default function FormView({children}: props) {
  const classes = useStyles()
  return (
    <Box className={`${classes.root} ${classes.left}`}>
      {children}
      <ProgressBar />
    </Box>
  )
}