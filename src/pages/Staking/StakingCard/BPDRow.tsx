import { Box, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexBasis: '50%',
  },
  bottomBorder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexBasis: '50%',
    borderBottom: '1px solid #e2e2e2'
  },
  textTop: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700
  },
  textBottom: {
    fontSize: theme.typography.pxToRem(16)
  }
}))

interface props {
  topData: string | number,
  bottomData: string | number,
  bottom?: boolean,
  right?: boolean,
}

export default function BPDRow({topData, bottomData, bottom, right }: props) {
  const classes = useStyles();
  return(
    <Box className={bottom ? classes.bottomBorder : classes.root} 
      style={{borderRight: right ? '1px solid #e2e2e2' : 'none' }}
      >
      <Typography variant="h3" className={classes.textTop}>
        {topData}
      </Typography>
      {/* <Typography variant="h3" className={classes.textBottom}>
        {bottomData}
      </Typography> */}
    </Box>
  )
}