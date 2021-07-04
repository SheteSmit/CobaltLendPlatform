import { Box, makeStyles, Typography, Link } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem 0',
    width: '100%',
    maxWidth: 700

  },
  titleContainer: {
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'row',

  },
  title: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 'bold',
    opacity: 0.6,
    paddingLeft: 8,

  },
  text: {
    paddingtop: 4,
    // fontWeight: 700
   
  },
  link: {
    color: theme.palette.common.black,
    fontWeight: 700
  }
}))

interface props {
  title?: string;
  data?: any;
  obj?: boolean;
  children?: React.ReactNode,
  link?: string
}

export default function ProjectData({title, data, obj, children, link}: props) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
   
      </Box>
      {obj && (
        Object.entries(data).map(([key, value]) => (
          <Box>
            <Typography key={key} className={classes.text}>
              <strong>{key}</strong>: {value}
            </Typography>
          </Box>
        ))
      )}
      {(!obj && !children) && (
        <Typography className={classes.text}>
          {data}
        </Typography>
        
      )} 
      { link && (
        <Typography >
          <Link href={link} target="_blank" rel="noopener" className={classes.link}>Website</Link>
        </Typography>
      )}
      {children} 
    </Box>
  )
}