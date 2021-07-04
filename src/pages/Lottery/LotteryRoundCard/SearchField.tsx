import { makeStyles, TextField, withStyles } from '@material-ui/core';
import React from 'react';

const StyledTextField = withStyles((theme) => ({
  root: {
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.common.white,
    
    '& .MuiOutlinedInput-root': {  
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '13px 14px',
    }
  }
}))(TextField)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
   
  },
  forgotParent: {
    position: 'relative',
    marginTop: 10
  },
  link: {
    position: 'absolute',
    right: 0,
    top: -20,
    textDecoration: 'none'
  },
  text: {
    fontWeight: 700,
    fontSize: 13,
    color: theme.palette.primary.dark,
  }
}))


export default function SearchField() {
  const classes = useStyles()
  return (
    <>
      <StyledTextField 
        variant="outlined"
        fullWidth
      />
    </>

  )
}