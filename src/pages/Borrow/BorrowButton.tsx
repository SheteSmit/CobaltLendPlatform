import { makeStyles, Typography, Button, Box } from '@material-ui/core';
import React from 'react';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  openAccountButton: {
    height: 50,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: theme.palette.common.white,
    textTransform: 'none',
    fontWeight: 'bold'
  },
  icon: {
    color: theme.palette.common.white
  }
}))

interface props {
  buttonText: string
  onClick: () => void
}

export default function BorrowButton({buttonText, onClick}: props) {
  const classes = useStyles()


  return (
    <Box className={classes.root}>
      <Button className={classes.openAccountButton} onClick={onClick}>
        <Typography className={classes.buttonText}>
          {buttonText}
        </Typography>
        <ArrowRightAltIcon className={classes.icon}/>
      </Button>

    </Box>
 
  )
}