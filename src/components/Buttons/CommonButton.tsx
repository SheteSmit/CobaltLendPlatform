import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: 'none',
    height: 50,
    borderRadius: 8,
    background: 'linear-gradient(90deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 15%, rgba(0,212,255,1) 100%)', 
    '&:hover': {
      background: 'linear-gradient(90deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 15%, rgba(0,212,255,1) 100%)', 
    },
    '&:disabled': {
      opacity: 0.4
    }

      // linear-gradient(0deg, rgba(8,3,84,1) 0%, rgba(9,9,121,1) 20%, rgba(0,212,255,1) 100%)
  },
  text: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
    color: '#fff'
  }
}))

type ButtonType = "submit"

interface props {
  label: string
  width?: number | string
  fullWidth?: boolean
  fn?: () => void
  disabled?: boolean
  height?: string | number
  padding?: number | string
  radius?: number
  type?: ButtonType
}

export default function CommonButton({label, width, fullWidth, fn, disabled, height, padding, radius, type}: props) {
  const classes = useStyles()
  return (
    <Button  className={classes.root} style={{width: width, height: height, padding: padding, borderRadius: radius}} fullWidth={fullWidth} onClick={fn} disabled={disabled} type={type}>
      <Typography className={classes.text}>
        {label}
      </Typography>
    </Button>
  )
}