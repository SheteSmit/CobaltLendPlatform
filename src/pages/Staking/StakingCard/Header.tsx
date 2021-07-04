import { Box, createStyles, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography, withStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {},
  listContainer: {
    padding: 0
  },
  listItem: {
    paddingLeft: 0,
    paddingTop: 0,

  },
  listItemText: {
    fontSize: theme.typography.pxToRem(12),
    marginLeft: -25,
    marginTop: 8,
    padding: 0
  },
  tableLegened: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  redText: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    color: 'red',
    padding: '0 4px'
  },
  greenText: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    color: 'green',
    padding: '0 4px'
  }
}))

const StyledListText = withStyles((theme) =>
  createStyles({
    root: {
      '&.MuiTypography-root': {
      fontSize: theme.typography.pxToRem(12)
      }
    }
  }),
)((props: any) => <ListItemText {...props} />)


export default function Header() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography>
        Stake in 2 EASY Steps!
      </Typography>
      <List className={classes.listContainer}>
        <ListItem className={classes.listItem}>
          <ListItemIcon>1)</ListItemIcon>
          <ListItemText className={classes.listItemText}
            secondary="Input the amount of Ethereum you would like to stake according to desired interest (If available)"
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemIcon>2)</ListItemIcon>
          <StyledListText className={classes.listItemText}
            secondary='Select the "Time Locked Period" you would like to stake for'
          />
        </ListItem>
      </List>
      <Box className={classes.tableLegened}>
        <Typography className={classes.redText}>Red = Unavailable</Typography>
        <Typography className={classes.greenText}>Green = Available</Typography>
      </Box>
    </Box>
  )
}