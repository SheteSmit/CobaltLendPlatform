import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '5px',
    paddingRight: '5px'  
  },
  innerBorder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: '1px solid #e2e2e2',
    marginRight: '5px',
    paddingRight: '5px'
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: theme.typography.pxToRem(14),
    [theme.breakpoints.down('sm')]:{
      fontSize: theme.typography.pxToRem(12)
    },
    [theme.breakpoints.down('xs')]:{
      fontSize: theme.typography.pxToRem(10)
    }
  }
}))

interface props {
  date: string, 
  number: number, 
  available: boolean,
  inner?: boolean
}

export default function BPDTile({date, number, available, inner}: props) {
  const classes = useStyles();

  return (
    <Box className={inner ? classes.innerBorder : classes.root}>
       <span className={classes.text}>
      {available ? (
        <CheckIcon />
      ):(
        <ClearIcon />
      )}
      Tier {number}</span>
      <span className={classes.text}>{date}</span>
    </Box>
  )
}