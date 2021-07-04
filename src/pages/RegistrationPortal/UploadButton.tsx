import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Button } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0'
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#757575',
    border: 'none'
  },
  text: {}
}))

interface props {
  title: string
  fn?: () => void
}

export default function UploadButton({title, fn}: props) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Button className={classes.button} onClick={fn}>
        <Typography className={classes.text}>
          {title}
        </Typography>
      </Button>
    </Box>
  )
}