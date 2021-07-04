import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    
    minHeight: 425,
    background: theme.palette.common.white,
    borderRadius: 8,
    margin: '1rem 0',
    padding: '1rem',
    boxShadow: ' 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
    '@media (max-width:1200px)': {
      width: '100%',

    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 300,
    }
  },
  headerContainer: {
    borderBottom: `1px solid #e2e2e2`,
    minHeight: '100%'
  },
  header: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 700,
    borderBottom: `1px solid #e2e2e2`
  },
  list: {},
  listItem: {
    opacity: 0.7,
    
  },
  listIcon: {
    minWidth: '20px !important',
  },
  text: {fontWeight: 700},
  bullet: {
    width: 8,
    height: 8,
    backgroundColor: theme.palette.primary.main,
    borderRadius:'50%',
    padding: 0,
    margin: 0
  }

}))

interface props {
  title: string
  listItems: any[]
  children?: React.ReactNode
  bullets?: boolean
  margin?: number | string
  height?: number | string
}

export default function InfoPanels({title, listItems, children, bullets, margin, height}: props) {
  const classes = useStyles()
  return (
    <Box className={classes.root} style={{margin: margin, height: height}}>
      <Box className={classes.headerContainer}>
        <Typography className={classes.header}>
          {title}
        </Typography>
        <List className={classes.list}>
          {listItems.map((text, index) => (
            <ListItem key={index} className={classes.listItem}>
              {bullets && (
                <ListItemIcon className={classes.listIcon}>
                 <Box className={classes.bullet}></Box>
                </ListItemIcon>
              )}
              <Typography className={classes.text}>{text}</Typography>
              {/* <ListItemText className={classes.text} primary={text} /> */}
            </ListItem>
          ))}
         
        </List>
        {children}
      </Box>
    </Box>
  )
}