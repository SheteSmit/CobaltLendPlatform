import { Box, Card, makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { Button } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 380,
    minWidth: 280,
    height: 280,
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: '1rem',
    paddingBottom: 25
  },
  buttonContainer: {
    height: 125,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }, 
  importButton: {
    width: 250,
    padding: 10,
    background: 'linear-gradient(90deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 15%, rgba(0,212,255,1) 100%)', 
    '&:hover': {
      background: 'linear-gradient(90deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 15%, rgba(0,212,255,1) 100%)', 
    }

  },
  importButtonText: {
    color: theme.palette.common.white
  },
  cancelButton: {
    width: 250,
    padding: 10,
    border: '1px solid #afafaf',
    '&:hover': {
      // borderImage: ' linear-gradient(to right bottom, #260B3C, #a053df);',
    }
  },
  cancelButtonText: {
    color: theme.palette.common.black,
    '&:hover': {
      color: 'linear-gradient(90deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 15%, rgba(0,212,255,1) 100%)',
    }
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  voteText: {
    fontSize: theme.typography.pxToRem(18),
    paddingBottom: 8,
    fontWeight: 700
  },
  dateText: {
    fontSize: theme.typography.pxToRem(18),
    paddingBottom: 8
  }

}))

export default function ProjectCompletionCard() {
  const classes = useStyles()
  return (
    <Card className={classes.root} variant="elevation" elevation={2}>
      <Box className={classes.textContainer}>
        <Typography className={classes.voteText} variant="h3">
          Vote on Project
        </Typography>
        <Typography className={classes.dateText} variant="h3">
          End Date: {moment().add(365,'days').format('DD/MM/YYYY')}
        </Typography>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button className={classes.importButton}>
          <Typography className={classes.importButtonText}>
            Fund
          </Typography>
        </Button>
        <Button className={classes.cancelButton} variant="outlined">
          <Typography className={classes.cancelButtonText}>
            Deny
          </Typography>
        </Button>
      </Box>
    </Card>
  )
}