import { Box, makeStyles, Typography, Button } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 350,
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.common.white,
    borderRadius: 8,
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      margin: '1rem'
    }
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  header: {
    color: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '10px 0 16px 0'
  },
  text: {
    textAlign: 'left',
    color: theme.palette.common.black,
    paddingBottom: 12
  },
  buttonContainer: {},
  button: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 8,
    height: 50,
  },
  buttonText: {
    color: theme.palette.common.white,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  }
}))

interface props {
  title: string,
  buttonText: string
  prepayment?: boolean
  text: string
  subTitle: string
}

export default function ActionCards({title, subTitle, buttonText, prepayment, text}: props) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h5" className={classes.header}>
          {subTitle}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {text}
        </Typography>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button className={classes.button}>
          <Typography variant="body1" className={classes.buttonText}>
            {buttonText}
          </Typography>
        </Button>
      </Box>
    </Box>
  )
}