import React from 'react';
import {Box, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  banner: {
    minHeight: 150,
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
    // margin: '0 1rem',
    padding: '0 1rem',
    backgroundColor: theme.palette.common.white,
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
  },
  header: {
    fontSize: theme.typography.pxToRem(44),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
    }
  }
}))

interface props {
  header: string
}

export default function Banner({header}: props) {
  const classes = useStyles()
  return (
    <Box className={classes.banner}>
      <Typography variant="h1" className={classes.header}>{header}</Typography>
    </Box>
  )
}