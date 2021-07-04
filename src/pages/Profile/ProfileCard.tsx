import React from 'react';
import {Card, Box, Typography, makeStyles, Grid} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    width: '100%',
    minHeight: 300,
    padding: '1rem',
    boxShadow: ' inset 1px 1px 11px 0px rgba(17, 160, 238, 0.84);',
  },
  headerContainer: {
    width: '100%',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '4px solid #e2e2e2'
  },
  header: {},
  container: {
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  text: {
    fontSize: theme.typography.pxToRem(26),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(18),
    }
    // padding: '4px 0'
  }
}))

interface props {
  header?: string
  children?: React.ReactNode
  data?: any[]
}

export default function ProfileCard({header, children, data}: props) {
  const classes = useStyles()
  return (
    <Card className={classes.root} elevation={2}>
      <Box className={classes.headerContainer}>
        <Typography variant="h1" className={classes.header}>{header}</Typography>
      </Box>
      <Box className={classes.container}>
        {data && data.map((item) => {
          const items = Object.entries(item)[0]
            return (
              <Box className={classes.textContainer}>
                <Typography className={classes.text}>
                  {items[0]}
                </Typography>
                <Typography className={classes.text}>
                  {items[1] as any}
                </Typography>
              </Box>
            )
          })}
        {children}
      </Box>
    </Card>
  )
}