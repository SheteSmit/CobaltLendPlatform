import { Box, ListItem, Typography, makeStyles } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1.5rem',
    borderTop: '1px solid #e2e2e2',
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'row'
    // }
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    JustifyContent: 'space-around',
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title:{
    fontWeight: 700,
    opacity: 0.8,
    lineHeight: 1.5,
    letterSpacing: '0.00938em'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  
  },
  text: {
    textAlign: 'right',
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
    opacity: 0.8
  },
  fullWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}))

interface props {
  icon: React.ReactNode,
  title: string,
  subTitle: string,
  titleData: string,
  subTitleData: string
  children: React.ReactNode
  wrap?: boolean
}

export default function PortfolioLi({icon, title, subTitle, titleData, subTitleData, children, wrap}: props) {
  const classes = useStyles()
  return (
    <ListItem className={classes.root} style={{flexWrap: wrap ? 'wrap' : 'nowrap'}}>
      <Box className={classes.titleContainer}>
        {icon}
        <Box>
          <Typography variant="body2" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2">
            {subTitle}
          </Typography>
        </Box>
      </Box>
      <Box className={`${classes.textContainer} ${wrap && classes.fullWidth}`} >
        {children}
        {!children && (
          <>
          <Typography variant="h3" className={classes.text}>
            {titleData}
          </Typography>
          <Typography variant="h5" className={classes.text}>
            {subTitleData}
          </Typography>
          </>
        )}
      </Box>
  </ListItem>
  )
}